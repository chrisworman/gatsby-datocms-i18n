import React from "react";
import Layout from "../../components/layout";
import { graphql, Link } from "gatsby";
import Image, { FluidObject } from "gatsby-image";

type ProductProps = {
  data: {
    allShopifyProduct: {
      edges: ProductEdge[];
    };
  };
  pageContext: any;
};

type ProductEdge = {
  node: {
    colour: string;
    handle: string;
    title: string;
    descriptionHtml: string;
    images: LocalGatsbyFluidImage[];
  };
};

// TODO: extract
type LocalGatsbyFluidImage = {
  id: string;
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
      if (title) {
        // TODO: site data (eg. site title)
        // TODO: i18n?
        return (
          <Layout siteTitle={"Pela"} pageTitle={title}>
            <h1>{title}</h1>
            {descriptionHtml ?
             <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> : null
             }
            {this.variants()}
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
        return image ? <Image key={image.id} fluid={image.localFile.childImageSharp.fluid} /> : null;
      });
    }
    return null;
  }

  variants() {
    const colourToHex = {
      black: '#000000',
      green: '#416365',
      lavender: '#9ea3e3',
      beetroot: '#661c1a',
      blue: '#3a376d',
      ocean_turquoise: '#a5e5d5',
      rose_quartz: '#efc9e0',
      oceana_blue: '#167cdf',
      skyblue: '#a3d3ee',
      sunshine_yellow: '#f3f36d',
      white: '#fafafa',
      red: '#aa2c37',
      red_canada: '#c80707',
      shark_skin: '#767b7f',
      light_brown: '#d6b691',
      oceana_blue_wavemaker: '#177fdd',
      honey: '#deaa15',
      honey_bee: '#f2b811',
      coral: '#ff6d6d',
      seashell: '#fceec2',
      seashell_flower: '#f9ecd0',
      tidal: '#308ba1',
      moss: '#427141',
      moss_flower: '#859b84',
      brown: '#5e3434',
      clear_shiny: '#fef8f8',
      gray: '#d0d0d0',
      matt_black: '#000000',
      clear_matt: '#fefbfb',
      pumpkin_spice: '#f6a538',
      clay: '#969090',
      wave: '#706f7d',
      orange: '#ed9111',
      cassis: '#9b0808',
      cantaloupe: '#f2965a',
      puristblue: '#20ade9',
      neomint: '#91f3a5',
      yellow: '#f4c712'
    };
    const { edges } = this.props.data.allShopifyProduct;
    const { handle } = edges[0].node; // TODO: use to highlight current swatch
    const { variants } = this.props.pageContext;
    if (variants) {
      variants.sort((x, y) => x.handle.localeCompare(y.handle));
      return variants
        .filter(x => x.colour && x.handle)
        .map(x => {
          const backgroundColor = colourToHex[x.colour] || "#000";
          const border = handle === x.handle ? "solid 2px #333" : "solid 2px #fff";
          return (
            <Link key={x.handle} to={`/products/${x.handle}`}>
              <div style={{ display: "inline-block", marginLeft: "10px", width : "25px", height: "25px", border, backgroundColor}}></div>
            </Link>
          );
        });
    } else {
      console.log('No variants found in this.props.pageContext');
    }
  }
}

export default Product;

export const query = graphql`
  query ProductQuery($id: String!) {
    allShopifyProduct(filter: { id: { eq: $id } }) {
      edges {
        node {
          handle
          title
          descriptionHtml
          images {
            id
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

