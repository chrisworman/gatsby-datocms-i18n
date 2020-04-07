import { graphql } from "gatsby";

export const showCaseFragment = graphql`
    fragment ShowCase on DatoCmsShowcase {
    id
    model { 
        apiKey 
    }
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
        alt
        fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsFluid
        }
    }
}
`;
