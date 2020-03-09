import React from "react";
import Layout from "../components/layout";

type CustomPageProps = {
  pageContext: {
    title: string;
    html: string;
  };
};

class CustomPage extends React.Component<CustomPageProps> {
  render() {
    const { title, html } = this.props.pageContext;
    return (
      <Layout siteTitle="TODO: Custom Pages need site title!" pageTitle={title}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    );
  }
}

export default CustomPage;
