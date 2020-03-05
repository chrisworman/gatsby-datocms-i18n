import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X,
};

type IndexProps = {
  datoCmsIndex: {
    heading: string;
  };
};

class IndexPage extends React.Component<DatoCmsProps<IndexProps>> {
  render() {
    console.log("IndexPage.render()");
    console.log(`IndexPage.render() this.props=${JSON.stringify(this.props)}`);
    const { data } = this.props;
    return (
      <Layout>
        <h1>{data ? data.datoCmsIndex.heading : "No data"}</h1>
        <a href="/secondPage">Second Page</a>
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery($locale: String!) {
    datoCmsIndex(locale: { eq: $locale }) {
      heading
    }
  }
`;
