import React from "react";
import Layout from "../../components/layout";
import { Link, graphql } from "gatsby";
import Image, { FluidObject } from "gatsby-image";

type CollectionProps = {
  data: {
    allShopifyCollection: {
      edges: CollectionEdge[];
    };
  };
};

type CollectionEdge = {
  node: {
    handle: string;
    title: string;
    descriptionHtml: string;
    // TODO: extract LocalGatsbyFluidImage type into new file?  See product.tsx
    image: {
      localFile: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
    products: CollectionProduct[];
  };
};

type CollectionProduct = {
  title: string;
  availableForSale: string;
  descriptionHtml: string;
  handle: string;
};

class Collection extends React.Component<CollectionProps> {
  render() {
    const { edges } = this.props.data.allShopifyCollection;
    if (edges && edges.length === 1) {
      const { title, descriptionHtml, image, products } = edges[0].node;
      // TODO: site data (eg. site title)
      // TODO: i18n?
      return (
        <Layout siteTitle={"Pela"} pageTitle={title}>
          <h1>{title}</h1>
          {image ? (
            <Image fluid={image.localFile.childImageSharp.fluid} />
          ) : null}
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          {products.map(product => this.getCollectionProduct(product))}
        </Layout>
      );
    }
    return (
      <Layout siteTitle={"Pela"} pageTitle={"Unknown"}>
        <p>No edges for collection page</p>
      </Layout>
    );
  }

  getCollectionProduct(product: CollectionProduct) {
    if (product && product.availableForSale) {
      const { handle, title, descriptionHtml } = product;
      return (
        <div key={handle}>
          <hr />
          <h3>
            <Link to={`/products/${handle}`}>{title}</Link>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
      );
    }
    return null;
  }
}

export default Collection;

export const query = graphql`
  query CollectionQuery($id: String!) {
    allShopifyCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          handle
          title
          descriptionHtml
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          products {
            availableForSale
            title
            descriptionHtml
            handle
          }
        }
      }
    }
  }
`;
