const path = require(`path`);
const sharp = require('sharp');

sharp.cache(false);
sharp.simd(false);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const locales = ["it", "en"]; // TODO: Move to CMS?

  /* Create pages defined in code, i.e. pages that are "baked-in", but have localized content defined in dato */
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
    }),
  );

  /* Create custom pages defined in CMS (eg. landing pages for ads) */
  // TODO: I think the better pattern is for the slug/locale to be passed to
  // the custom page then the custom page queries 'allDatoCmsCustompage'
  // using the slug/locale to get the title and html
  const datoCustomPageResult = await graphql(`
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
  `);
  
  datoCustomPageResult.data.customPage.edges.forEach(edge => {
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

  // TODO: consider i18n for shopify content

  /* Shopify collection landing pages */
  graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyCollection.edges.forEach(({ node }) => {
      const { id, handle } = node;
      createPage({
        path: `/collections/${handle}`,
        component: path.resolve(`./src/templates/shopify/collection.tsx`),
        context: { id }
      });
    });
  });

  /* Shopify product landing pages */

  // First build a map of products by handle
  graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
            metafields {
              key
              value
            }
          }
        }
      }
    }
  `).then(result => {
    const productsByHandle = new Map();
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      const { id, handle, metafields } = node;
      const colourMeta = metafields.find(x => x.key === "colour");
      const colour = colourMeta ? colourMeta.value : null;
      const handlesMeta = metafields.find(x => x.key === "handles");
      const variants = handlesMeta && handlesMeta.value ? handlesMeta.value.split("|").map(x => x.trim()).filter(x => x !== handle).map(x => { return { handle: x } }) : [];

      // Add the actual product as a variant (for swatches)
      variants.push({ colour, handle });

      productsByHandle.set(
        handle, 
        {
          id,
          handle,
          colour,
          variants
        });
    });

    console.log(`${productsByHandle.size} products found`);

    // Populate variant colours
    for (let product of productsByHandle.values()) {
      const { variants } = product;
      for (let i=0; i<variants.length; i++) {
        const variant = variants[i];
        const variantProduct = productsByHandle.get(variant.handle);
        if (variantProduct) {
          variant.colour = variantProduct.colour;
        } else {
          console.log(`WARNING: no product variant found for handle "${variant.handle}".  The "${product.handle}" product page will not show this variant.`);
        }
      }
    }

    // Create the shopify product landing pages
    for (let product of productsByHandle.values()) {
      const { id, handle, variants, colour } = product;
      createPage({
        path: `/products/${handle}`,
        component: path.resolve(`./src/templates/shopify/product.tsx`),
        context: { id, variants, handle, colour }
      });
    }
  });
};
