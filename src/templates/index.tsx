import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LocalizedLink from "../components/localizedLink";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X | null;
};

type IndexProps = {
  layout: {
    sitetitle: string;
  };
  index: {
    pagename: string; // TODO: change to linkname?
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
      const layout = data ? data.layout : null;
      if (index && secondPage && layout) {
        const { heading, locale } = index;
        return (
          // TODO: introduce "title" to page models instead of using "pagename"
          <Layout siteTitle={layout.sitetitle} pageTitle={index.pagename}>
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
    layout: datoCmsLayout(locale: { eq: $locale }) {
      sitetitle
    }
    index: datoCmsIndex(locale: { eq: $locale }) {
      pagename
      heading
      locale
    }
    secondPage: datoCmsSecondpage(locale: { eq: $locale }) {
      pagename
      slug
    }
  }
`;
