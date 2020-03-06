import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LocalizedLink from "../components/localizedLink";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X,
};

type SecondPageProps = {
  secondPage: {
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
    if (data && data.secondPage) {
      const { heading, locale } = data.secondPage;
      return (
        <Layout>
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
    index: datoCmsIndex(locale: { eq: $locale }) {
      pagename
    }
    secondPage: datoCmsSecondpage(locale: { eq: $locale }) {
      heading
      locale
    }
  }
`;
