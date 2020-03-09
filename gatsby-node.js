const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const locales = ["it", "en"]; // TODO: Move to CMS?

  // Create core pages
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
            component: path.resolve(`./src/templates/${pageId}.tsx`), // TODO: add a check to ensure the page template exists?
            context: { locale: pageData.locale } // TODO: coallesce with default locale?
          });
        });
      });
    })
  );

  // Create custom defined in CMS (eg. landing pages for ads)
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
        component: path.resolve(`./src/templates/customPage.tsx`), // TODO: add a check to ensure the page template exists?
        context: { title, html }
      });
    });
  });

  // Shopify collection landing pages
  // TODO: consider i18n for shopify content
  // TODO: consider organizing components (eg. shopify, dato, etc.)
  graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
            title
            descriptionHtml
            products {
              availableForSale
              title
              descriptionHtml
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyCollection.edges.forEach(({ node }) => {
      const { handle, title, descriptionHtml, products } = node;
      createPage({
        path: `/collections/${node.handle}/`,
        component: path.resolve(`./src/templates/collection.tsx`),
        context: {
          handle,
          title,
          descriptionHtml,
          products
        }
      });
    });
  });

};
