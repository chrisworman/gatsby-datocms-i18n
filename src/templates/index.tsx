import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LocalizedLink from "../components/localizedLink";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X | null;
};

type IndexProps = {
  datoCmsIndex: {
    heading: string;
    locale: string;
  };
};

class IndexPage extends React.Component<DatoCmsProps<IndexProps>> {
  render() {
    const { data } = this.props;
    const datoCmsIndex = data ? data.datoCmsIndex : null;
    if (datoCmsIndex) {
      const { heading, locale } = datoCmsIndex;
      return (
        <Layout>
          <h1>{heading}</h1>
          <LocalizedLink to="/secondPage" locale={locale}>Second Page</LocalizedLink>
        </Layout>
      );
    } else {
      // TODO: introduce component for "no page data"
      return <p>No data for index page</p>;
    }
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery($locale: String!) {
    datoCmsIndex(locale: { eq: $locale }) {
      heading
      locale
    }
  }
`;
