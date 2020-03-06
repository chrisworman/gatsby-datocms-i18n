import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LocalizedLink from "../components/localizedLink";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X,
};

type SecondPageProps = {
  layout: {
    sitetitle: string;
  };
  secondPage: {
    pagename: string;
    heading: string;
    locale: string;
  };
  index: {
    pagename: string;
  };
};

class SecondPage extends React.Component<DatoCmsProps<SecondPageProps>> {
  render() {
    const { data } = this.props;
    const layout = data ? data.layout : null;
    if (data && data.secondPage && layout) {
      const { heading, locale, pagename } = data.secondPage;
      return (
        <Layout siteTitle={layout.sitetitle} pageTitle={pagename}>
          <h1>{heading}</h1>
          {/* Consider adding slug to index for consistency */}
          <LocalizedLink to="/" locale={locale}>
            {data.index.pagename}
          </LocalizedLink>
        </Layout>
      );
    } else {
      return <p>No data for second page</p>;
    }
  }
}

export default SecondPage;

// TODO: get this working
export const query = graphql`
  query SecondPageQuery($locale: String!) {
    layout: datoCmsLayout(locale: { eq: $locale }) {
      sitetitle
    }
    index: datoCmsIndex(locale: { eq: $locale }) {
      pagename
    }
    secondPage: datoCmsSecondpage(locale: { eq: $locale }) {
      pagename
      heading
      locale
    }
  }
`;
