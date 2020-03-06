import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

// TODO: move to its own file
type DatoCmsProps<X> = {
  data: X,
};

type SecondPageProps = {
  datoCmsSecondpage: {
    text: string;
  };
};

class SecondPage extends React.Component<DatoCmsProps<SecondPageProps>> {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <p>{data ? data.datoCmsSecondpage.text : "No data!"}</p>
        <Link to="">Home</Link>
      </Layout>
    );
  }
}

export default SecondPage;

// TODO: get this working
export const query = graphql`
  query SecondPageQuery($locale: String!) {
    datoCmsSecondpage(locale: { eq: $locale }) {
      text
    }
  }
`;
