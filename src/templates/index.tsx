import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X;
};

type IndexProps = {
  datoCmsIndex: {
    heading: string;
  };
};

class IndexPage extends React.Component<DatoCmsProps<IndexProps>> {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <h1>{data ? data.datoCmsIndex.heading : "No data"}</h1>
        <Link to="/secondPage">Second Page</Link>
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
