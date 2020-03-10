import React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import Image from "gatsby-image";

type ProductProps = {
  data: {
    allShopifyProduct: {
      edges: ProductEdge[];
    };
  };
};

type ProductEdge = {
  node: {
    handle: string;
    title: string;
    descriptionHtml: string;
    // TODO: extract GatsbyFluidImage (LocalGatsbyFluidImage?) type into new file?
    // images: {
    //   localFile: {
    //     childImageSharp: {
    //       fluid: FluidObject;
    //     };
    //   };
    // };
  };
};

class Product extends React.Component<ProductProps> {
  render() {
    console.log(JSON.stringify(this.props));
    const { edges } = this.props.data.allShopifyProduct;
    if (edges && edges.length === 1) {
      const { descriptionHtml, title } = edges[0].node;
      if (title && descriptionHtml) {
        // TODO: site data (eg. site title)
        // TODO: i18n?
        return (
          <Layout siteTitle={"Pela"} pageTitle={title}>
            <h1>{title}</h1>
            {/* {images ? (
              <Image fluid={images.localFile.childImageSharp.fluid} />
            ) : null} */}
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </Layout>
        );
      }
    }
    return <p>No data for product page</p>;
  }
}

export default Product;

export const query = graphql`
  query ProductQuery($handle: String!) {
    allShopifyProduct(filter: { handle: { eq: $handle } }) {
      edges {
        node {
          handle
          title
          descriptionHtml
        }
      }
    }
  }
`;

// images {
//   localFile {
//     childImageSharp {
//       fluid(maxWidth: 1000) {
//         ...GatsbyImageSharpFluid
//       }
//     }
//   }
// }
