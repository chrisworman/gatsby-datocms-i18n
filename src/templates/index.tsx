import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LocalizedLink from "../components/localizedLink";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X | null;
};

type IndexProps = {
  index: {
    heading: string;
    locale: string;
  };
  secondPage: {
    pagename: string;
    slug: string;
  };
};

class IndexPage extends React.Component<DatoCmsProps<IndexProps>> {
  render() {
    const { data } = this.props;
    if (data) {
      const index = data ? data.index : null;
      const secondPage = data ? data.secondPage : null;
      if (index && secondPage) {
        const { heading, locale } = index;
        return (
          <Layout>
            <h1>{heading}</h1>
            <LocalizedLink to={secondPage.slug} locale={locale}>
              {secondPage.pagename}
            </LocalizedLink>
          </Layout>
        );
      }
    }
    return <p>No data for index page</p>;
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery($locale: String!) {
    index: datoCmsIndex(locale: { eq: $locale }) {
      heading
      locale
    }
    secondPage: datoCmsSecondpage(locale: { eq: $locale }) {
      pagename
      slug
    }
  }
`;
