import React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import Image, { FluidObject } from "gatsby-image";

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
    images: LocalGatsbyFluidImage[];
  };
};

type LocalGatsbyFluidImage = {
  localFile: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

class Product extends React.Component<ProductProps> {
  render() {
    const { edges } = this.props.data.allShopifyProduct;
    if (edges && edges.length === 1) {
      const { descriptionHtml, title, images } = edges[0].node;
      if (title && descriptionHtml) {
        // TODO: site data (eg. site title)
        // TODO: i18n?
        return (
          <Layout siteTitle={"Pela"} pageTitle={title}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            {this.productImages(images)}
          </Layout>
        );
      }
    }
    return <p>No data for product page</p>;
  }

  // TODO: replace with carousel/slider
  productImages(images: LocalGatsbyFluidImage[]) {
    if (images) {
      return images.map(image => {
        return <Image fluid={image.localFile.childImageSharp.fluid} />
      });
    }
    return null;
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
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

