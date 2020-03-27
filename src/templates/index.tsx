import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ShowCase from "../components/showCase/showCase";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X | null;
};

type IndexProps = {
  layout: {
    sitetitle: string;
  };
  home: {
      edges: HomeEdge[];
  };
};

type HomeEdge = {
    node: {
        sections: HomeSection[];
    }
};

type HomeSection = {
    id: string;
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

class IndexPage extends React.Component<DatoCmsProps<IndexProps>> {
  render() {
    const { data } = this.props;
    if (data) {
      const layout = data?.layout;
      if (layout) {
        const { edges } = data?.home;
        const sections = edges && edges.length ? edges[0]?.node?.sections : [];
        return (
            <Layout siteTitle={layout.sitetitle} pageTitle=''>
              {sections.map(section => {
                  // TODO: switch on section type
                return (
                    <ShowCase
                      key={section.id}
                      layout={section.layout}
                      icon={section.icon?.url}
                      preTitle={section.pretitle}
                      title={section.title}
                      description={section.description}
                      linkText={section.linktext}
                      linkUrl={section.linkurl}
                      image={section.image?.url}
                    />
                );
              })}
            </Layout>
        );
      }
    }
    return <p>No data for index page</p>;
  }
}

export default IndexPage;

// TODO: section queries partitioned by section type (aka modular block type)
export const query = graphql`
  query IndexQuery {
    layout: datoCmsLayout {
      sitetitle
    }
    home: allDatoCmsHome {
        edges {
          node {
            sections {
              id
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
          }
        }
    }
  }
`;