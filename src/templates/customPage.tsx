import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ShowCase from "../components/showCase/showCase";
import DatoShowCase from "../models/dato/datoShowCase";

type CustomPageProps = {
    data: {
        customPage: {
            edges: CustomPageEdge[];
        }
    },
    location: {
        href: string;
    }
};

type CustomPageEdge = {
    node: {
        sections: DatoShowCase[];
        seo: { // TODO: refactor for reuse in other pages
          title?: string|null;
          description?: string|null;
          twitterCard?: string|null;
        };
    }
};

export default function CustomPage(props: CustomPageProps) {
    const edges = props?.data?.customPage?.edges;
    if (edges && edges.length > 0) {
        const { sections, seo } = edges[0]?.node;
        // TODO: social meta (twitter, FB)
        return (
            <Layout 
                currentUrl={props.location.href}
                title={seo.title}
                description={seo.description}
                twitterCard={seo.twitterCard}
            >
                {
                    sections.map(section =>
                        <ShowCase
                            key={section.id}
                            layout={section.layout}
                            icon={section.icon?.url}
                            preTitle={section.pretitle}
                            title={section.title}
                            description={section.description}
                            linkText={section.linktext}
                            linkUrl={section.linkurl}
                            image={ { fluid: section.image?.fluid, alt: section.image?.alt } }
                        />
                    )
                }
            </Layout>
        );
    }
};

export const query = graphql`
  query CustomPageQuery($id: String!) {
    customPage: allDatoCmsCustompage(filter: { id: { eq: $id } }) {
        edges {
            node {
                sections {
                    ... ShowCase
                }
                seo {
                    title
                    description
                    twitterCard
                }
            }
        }
    }
}
`;