import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ShowCase from "../components/showCase/showCase";
import { ImageGridImage } from '../components/imageGrid/imageGridProps';
import ImageGrid from "../components/imageGrid/imageGrid";
import { Partner } from "../components/partners/partnersProps";
import Partners from "../components/partners/partners";

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
        url: string;
    }
    description: string;
    linktext: string;
    linkurl: string;
    pretitle: string;
    title: string;
    image: {
        url: string;
    }
};

type DatoImageGrid = {
  id: string;
  model: { 
    apiKey: string 
  }
  image1: {
    url: string;
  },
  image1linktext: string;
  image1linkurl: string;
  image2: {
    url: string;
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
  const result: ImageGridImage[] = [];
  if (imageGrid.image1?.url && imageGrid.image1linktext && imageGrid.image1linkurl) {
    result.push({
      imageUrl: imageGrid.image1.url,
      imageLinkText: imageGrid.image1linktext,
      imageLinkUrl: imageGrid.image1linkurl,
    });
  }
  if (imageGrid.image2?.url && imageGrid.image2linktext && imageGrid.image2linkurl) {
    result.push({
      imageUrl: imageGrid.image2.url,
      imageLinkText: imageGrid.image2linktext,
      imageLinkUrl: imageGrid.image2linkurl,
    });
  }
  return result;
};

const createPartnersArray = (partner: DatoPartner) => {
  const anyPartner = partner as any;
  const result: Partner[] = [];

  let partnerNumber = 1;
  let imageField = `partner${partnerNumber}image`;
  while (anyPartner.hasOwnProperty(imageField)) {
    let imageUrl = anyPartner[imageField]?.url;
    let text = anyPartner[`partner${partnerNumber}text`];
    let linkUrl = anyPartner[`partner${partnerNumber}linkurl`];
    let description = anyPartner[`partner${partnerNumber}description`];
    console.log(`imageUrl=${imageUrl}, text=${text}, linkUrl=${linkUrl}, description=${description}`)
    if (imageUrl && text && linkUrl && description) {
      result.push({
        imageUrl,
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
                // TODO: switch on section type
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
                        image={showCase.image?.url}
                      />
                    );
                  case 'imagegrid':
                    return (
                      <ImageGrid images={createImageGridArray(section as DatoImageGrid)} />
                    );
                  case 'partner':
                    return (
                      <Partners partners={createPartnersArray(section as DatoPartner)} />
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

// TODO: section queries partitioned by section type (aka modular block type)
// TODO: do we need a something like sort: { fields: [position], order: ASC } for sections?
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
                  url
                }
              }
              ... on DatoCmsImagegrid {
                id
                model { apiKey }
                image1 {
                  url
                }
                image1linktext
                image1linkurl
                image2 {
                  url
                }
                image2linktext
                image2linkurl
              }
              ... on DatoCmsPartner {
                id
                model { apiKey }
                partner1image {
                  url
                }
                partner1linkurl
                partner1text
                partner1description
                partner2image {
                  url
                }
                partner2linkurl
                partner2text
                partner2description
                partner3image {
                  url
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