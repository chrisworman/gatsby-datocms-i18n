import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ShowCase from "../components/showCase/showCase";
import { ImageGridImage } from '../components/imageGrid/imageGridProps';
import ImageGrid from "../components/imageGrid/imageGrid";
import { Partner } from "../components/partners/partnersProps";
import Partners from "../components/partners/partners";
import { FluidObject } from "gatsby-image";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X | null;
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

type DatoShowCase = {
    id: string;
    model: { 
      apiKey: string 
    }
    layout: string;
    icon: {
        url: string; // TODO: gatsby image
    }
    description: string;
    linktext: string;
    linkurl: string;
    pretitle: string;
    title: string;
    image: {
        fluid: FluidObject;
    }
};

type DatoImageGrid = {
  id: string;
  model: { 
    apiKey: string 
  }
  image1: {
    fluid: FluidObject;
  },
  image1linktext: string;
  image1linkurl: string;
  image2: {
    fluid: FluidObject;
  }
  image2linktext: string;
  image2linkurl: string;
};

type DatoPartner = {
  id: string;
  model: { apiKey: string; }
  partner1image: {
    url: string;
  }
  partner1linkurl: string;
  partner1text: string;
  partner1description: string;
  partner2image: {
    url: string;
  }
  partner2linkurl: string;
  partner2text: string;
  partner2description: string;
  partner3image: {
    url: string;
  }
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
    let imageLinkText = anyImageGrid[`image${imageNumber}linktext`];
    let imageLinkUrl = anyImageGrid[`image${imageNumber}linkurl`];
    if (fluid && imageLinkText && imageLinkUrl) {
      result.push({
        fluid,
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
    let text = anyPartner[`partner${partnerNumber}text`];
    let linkUrl = anyPartner[`partner${partnerNumber}linkurl`];
    let description = anyPartner[`partner${partnerNumber}description`];
    if (fluid && text && linkUrl && description) {
      result.push({
        image: { fluid },
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
    const { data } = this.props;
    if (data) {
      const { edges } = data?.home;
      const sections = edges && edges.length ? edges[0]?.node?.sections : [];
      return (
          <Layout>
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
                        image={ { fluid: showCase.image?.fluid } }
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
              ... on DatoCmsShowcase {
                id
                model { apiKey }
                icon {
                  url
                }
                layout
                description
                linktext
                linkurl
                pretitle
                title
                image {
                  fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
              }
              ... on DatoCmsImagegrid {
                id
                model { apiKey }
                image1 {
                  fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                image1linktext
                image1linkurl
                image2 {
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
                  fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                partner1linkurl
                partner1text
                partner1description
                partner2image {
                  fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
                    ...GatsbyDatoCmsFluid
                  }
                }
                partner2linkurl
                partner2text
                partner2description
                partner3image {
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