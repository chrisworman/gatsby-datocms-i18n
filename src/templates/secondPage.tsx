import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LocalizedLink from "../components/localizedLink";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X,
};

type SecondPageProps = {
  datoCmsSecondpage: {
    text: string;
    locale: string;
  };
};

class SecondPage extends React.Component<DatoCmsProps<SecondPageProps>> {
  render() {
    const { data } = this.props;
    if (data && data.datoCmsSecondpage) {
      const { text, locale } = data.datoCmsSecondpage;
      return (
        <Layout>
          <h1>{text}</h1>
          {/* TODO: localized link names (eg. "Home" vs. "Casa". Add slug to CMS page models) */}
          <LocalizedLink to="/" locale={locale}>Home</LocalizedLink>
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
    datoCmsSecondpage(locale: { eq: $locale }) {
      text
      locale
    }
  }
`;
