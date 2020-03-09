import React from "react";
import Layout from "../../components/layout";

type ProductProps = {
  pageContext: {
    title: string;
    descriptionHtml: string;
  };
};

class Product extends React.Component<ProductProps> {
  render() {
    const { pageContext } = this.props;
    if (pageContext) {
      const { descriptionHtml, title } = pageContext;
      if (title && descriptionHtml) {
        // TODO: site data (eg. site title)
        // TODO: i18n?
        return (
          <Layout siteTitle={"Pela"} pageTitle={title}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </Layout>
        );
      }
    }
    return <p>No data for product page</p>;
  }
}

export default Product;
