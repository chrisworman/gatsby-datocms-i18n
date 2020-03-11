const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const locales = ["it", "en"]; // TODO: Move to CMS?

  // Create pages defined in code, i.e. pages that are "baked-in",
  // but have localized content defined in dato
  Promise.all(
    locales.map(locale => {
      graphql(`
        {
          index: datoCmsIndex(locale: { eq: "${locale}" }) {
            locale
          }
          secondPage: datoCmsSecondpage(locale: { eq: "${locale}" }) {
            locale
            slug
          }
        }
      `).then(result => {
        ["index", "secondPage"].forEach(pageId => {
          const pageData = result.data[pageId];
          // TODO: move "en" to constants file
          // TODO: consider consolidating localized link creation to helper utility (see LocalizedLink)
          const localePrefix =
            pageData.locale === "en" ? "" : `/${pageData.locale}`;
          const slug = pageData.slug ? pageData.slug : "";
          createPage({
            path: `${localePrefix}/${slug}`,
            component: path.resolve(`./src/templates/dato/${pageId}.tsx`), // TODO: add a check to ensure the page template exists?
            context: { locale: pageData.locale } // TODO: coallesce with default locale?
          });
        });
      });
    })
  );

  // Create custom pages defined in CMS (eg. landing pages for ads)
  // TODO: I think the better pattern is for the slug/locale to be passed to
  // the custom page then the custom page queries 'allDatoCmsCustompage'
  // using the slug/locale to get the title and html
  graphql(`
    {
      customPage: allDatoCmsCustompage {
        edges {
          node {
            locale
            title
            slug
            html
          }
        }
      }
    }
  `).then(result => {
    result.data.customPage.edges.forEach(edge => {
      const pageData = edge.node;
      // TODO: move "en" to constants file
      // TODO: consider consolidating localized link creation to helper utility (see LocalizedLink)
      const localePrefix =
        pageData.locale === "en" ? "" : `/${pageData.locale}`;
      const { slug, title, html } = pageData;
      createPage({
        path: `${localePrefix}/${slug}`,
        component: path.resolve(`./src/templates/dato/customPage.tsx`),
        context: { title, html }
      });
    });
  });

  // TODO: consider i18n for shopify content

  // Shopify collection landing pages
  graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyCollection.edges.forEach(({ node }) => {
      const { handle } = node;
      createPage({
        path: `/collections/${handle}`,
        component: path.resolve(`./src/templates/shopify/collection.tsx`),
        context: { handle }
      });
    });
  });

  // Shopify product landing pages
  graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      const { handle } = node;
      createPage({
        path: `/products/${handle}`,
        component: path.resolve(`./src/templates/shopify/product.tsx`),
        context: { handle }
      });
    });
  });
};
