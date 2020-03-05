import React from "react";
import { graphql } from "gatsby";
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
    console.log("SecondPage.render()");
    console.log(`SecondPage this.props=${JSON.stringify(this.props)}`);
    const { data } = this.props;
    console.log(`SecondPage data=${JSON.stringify(data)}`);
    return (
      <Layout>
        <p>{data ? data.datoCmsSecondpage.text : "No data!"}</p>
        <a href="/">Home</a>
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
