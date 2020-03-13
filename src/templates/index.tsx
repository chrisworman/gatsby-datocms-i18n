import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X | null;
};

type IndexProps = {
  layout: {
    sitetitle: string;
  };
};

class IndexPage extends React.Component<DatoCmsProps<IndexProps>> {
  render() {
    const { data } = this.props;
    if (data) {
      const layout = data ? data.layout : null;
      if (layout) {
        return (
          <Layout siteTitle={layout.sitetitle} pageTitle=''>
              <h1>Stuff and things and stuff and things and stuff and things</h1>
              <h1>Stuff and things and stuff and things and stuff and things</h1>
              <h1>Stuff and things and stuff and things and stuff and things</h1>
              <h1>Stuff and things and stuff and things and stuff and things</h1>
              <h1>Stuff and things and stuff and things and stuff and things</h1>
              <h1>Stuff and things and stuff and things and stuff and things</h1>
          </Layout>
        );
      }
    }
    return <p>No data for index page</p>;
  }
}

export default IndexPage;

// TODO: home page content queries
export const query = graphql`
  query IndexQuery {
    layout: datoCmsLayout {
      sitetitle
    }
  }
`;