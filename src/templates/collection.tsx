import React from "react";
import Layout from "../components/layout";

type ColllectionProps = {
  pageContext: {
    handle: string;
    title: string;
    descriptionHtml: string;
    products: CollectionProduct[];
  };
};

type CollectionProduct = {
  availableForSale: boolean;
  title: string;
  descriptionHtml: string;
};

class Collection extends React.Component<ColllectionProps> {
  render() {
    const { pageContext } = this.props;
    if (pageContext) {
      const { handle, descriptionHtml, title, products } = pageContext;
      // Not all collections have descriptionHtml
      if (handle && title && products) {
        // TODO: site data (eg. site title)
        // TODO: i18n?
        return (
          <Layout siteTitle={"Pela"} pageTitle={title}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            {products.map(product => this.getCollectionProduct(product))}
          </Layout>
        );
      }
    }
    console.log(`pageContext ${JSON.stringify(pageContext)}`);
    return <p>No data for collection page</p>;
  }

  getCollectionProduct(product: CollectionProduct) {
    if (product && product.availableForSale) {
      return (
        <div>
          <hr />
          <h3>{product.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </div>
      );
    }
    return null;
  }
}

export default Collection;
