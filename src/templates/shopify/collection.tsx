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
    // TODO: extract GatsbyFluidImage type into new file?
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
      return (
        <div>
          <hr />
          <h3>
            <Link to={`/products/${product.handle}`}>{product.title}</Link>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </div>
      );
    }
    return null;
  }
}

export default Collection;

export const query = graphql`
  query CollectionQuery($handle: String!) {
    allShopifyCollection(filter: { handle: { eq: $handle } }) {
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
