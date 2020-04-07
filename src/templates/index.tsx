import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ShowCase from "../components/showCase/showCase";
import { ImageGridImage } from '../components/imageGrid/imageGridProps';
import ImageGrid from "../components/imageGrid/imageGrid";
import { Partner } from "../components/partners/partnersProps";
import Partners from "../components/partners/partners";
import FluidWithAlt from '../models/gatsby/fluidWithAlt';
import DatoShowCase from '../models/dato/datoShowCase';

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X | null;
  location: { // TODO: refactor (See customPage.tsx)
    href: string;
  }
};

type IndexProps = {
  home: {
      edges: DatoHomeEdge[];
  };
};

type DatoHomeEdge = {
    node: {
        sections: (DatoShowCase|DatoImageGrid|DatoPartner)[];
    }
};



type DatoImageGrid = {
  id: string;
  model: { 
    apiKey: string 
  }
  image1: FluidWithAlt;
  image1linktext: string;
  image1linkurl: string;
  image2: FluidWithAlt;
  image2linktext: string;
  image2linkurl: string;
};

type DatoPartner = {
  id: string;
  model: { apiKey: string; }
  partner1image: FluidWithAlt;
  partner1linkurl: string;
  partner1text: string;
  partner1description: string;
  partner2image: FluidWithAlt;
  partner2linkurl: string;
  partner2text: string;
  partner2description: string;
  partner3image: FluidWithAlt;
  partner3linkurl: string;
  partner3text: string;
  partner3description: string;
};

const createImageGridArray = (imageGrid: DatoImageGrid) => {
  const anyImageGrid = imageGrid as any; // So properties can be accessed using index notation
  const result: ImageGridImage[] = [];

  let imageNumber = 1;
  let imageField = `image${imageNumber}`;
  while (anyImageGrid.hasOwnProperty(imageField)) {
    let fluid = anyImageGrid[imageField]?.fluid;
    let alt =  anyImageGrid[imageField]?.alt;
    let imageLinkText = anyImageGrid[`image${imageNumber}linktext`];
    let imageLinkUrl = anyImageGrid[`image${imageNumber}linkurl`];
    if (fluid && imageLinkText && imageLinkUrl) {
      result.push({
        image: { fluid, alt },
        imageLinkText,
        imageLinkUrl,
      });
    }
    imageNumber++;
    imageField = `image${imageNumber}`;
  }

  return result;
};

const createPartnersArray = (partner: DatoPartner) => {
  const anyPartner = partner as any; // So properties can be accessed using index notation
  const result: Partner[] = [];

  let partnerNumber = 1;
  let imageField = `partner${partnerNumber}image`;
  while (anyPartner.hasOwnProperty(imageField)) {
    let fluid = anyPartner[imageField]?.fluid;
    let alt =  anyPartner[imageField]?.alt;
    let text = anyPartner[`partner${partnerNumber}text`];
    let linkUrl = anyPartner[`partner${partnerNumber}linkurl`];
    let description = anyPartner[`partner${partnerNumber}description`];
    if (fluid && text && linkUrl && description) {
      result.push({
        image: { fluid, alt },
        text,
        linkUrl,
        description,
      });
    }
    partnerNumber++;
    imageField = `partner${partnerNumber}image`;
  }
  
  return result;
};

class IndexPage extends React.Component<DatoCmsProps<IndexProps>> {
  render() {
    const { data, location } = this.props;
    if (data) {
      const { edges } = data?.home;
      const sections = edges && edges.length ? edges[0]?.node?.sections : [];
      return (
          <Layout currentUrl={location.href}>
            {sections.map(section => {
                switch (section.model.apiKey) {
                  case 'showcase':
                    const showCase = section as DatoShowCase;
                    return (
                      <ShowCase
                        key={showCase.id}
                        layout={showCase.layout}
                        icon={showCase.icon?.url}
                        preTitle={showCase.pretitle}
                        title={showCase.title}
                        description={showCase.description}
                        linkText={showCase.linktext}
                        linkUrl={showCase.linkurl}
                        image={ { fluid: showCase.image?.fluid, alt: showCase.image?.alt } }
                      />
                    );
                  case 'imagegrid':
                    return (
                      <ImageGrid key={section.id} images={createImageGridArray(section as DatoImageGrid)} />
                    );
                  case 'partner':
                    return (
                      <Partners key={section.id} partners={createPartnersArray(section as DatoPartner)} />
                    );
                }
            })}
          </Layout>
        );
    }
    return <p>No data for index page</p>;
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    home: allDatoCmsHome {
        edges {
          node {
            sections {
              ... ShowCase
              ... on DatoCmsImagegrid {
                id
                model { apiKey }
                image1 {
                  alt
                  fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                image1linktext
                image1linkurl
                image2 {
                  alt
                  fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                image2linktext
                image2linkurl
              }
              ... on DatoCmsPartner {
                id
                model { apiKey }
                partner1image {
                  alt
                  fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                partner1linkurl
                partner1text
                partner1description
                partner2image {
                  alt
                  fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                partner2linkurl
                partner2text
                partner2description
                partner3image {
                  alt
                  fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                partner3linkurl
                partner3text
                partner3description
              }
            }
          }
        }
    }
  }
`;