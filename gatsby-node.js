const path = require(`path`);
const sharp = require('sharp');

sharp.cache(false);
sharp.simd(false);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/',
    component: path.resolve('./src/templates/index.tsx'),
  });

  /* Create custom pages defined in CMS (eg. landing pages for ads) */
  const datoCustomPageResult = await graphql(`
    {
      customPage: allDatoCmsCustompage {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);
  datoCustomPageResult.data.customPage.edges.forEach(edge => {
    const { id, slug } = edge.node;
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/customPage.tsx`),
      context: { id }
    });
  });

  // TODO: consider i18n for shopify content

  /* Shopify collection landing pages */
  // graphql(`
  //   {
  //     allShopifyCollection {
  //       edges {
  //         node {
  //           id
  //           handle
  //         }
  //       }
  //     }
  //   }
  // `).then(result => {
  //   result.data.allShopifyCollection.edges.forEach(({ node }) => {
  //     const { id, handle } = node;
  //     createPage({
  //       path: `/collections/${handle}`,
  //       component: path.resolve(`./src/templates/shopify/collection.tsx`),
  //       context: { id }
  //     });
  //   });
  // });

  /* Shopify product landing pages */

  // First build a map of products by handle
  // graphql(`
  //   {
  //     allShopifyProduct {
  //       edges {
  //         node {
  //           id
  //           handle
  //           metafields {
  //             key
  //             value
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).then(result => {
  //   const productsByHandle = new Map();
  //   result.data.allShopifyProduct.edges.forEach(({ node }) => {
  //     const { id, handle, metafields } = node;
  //     const colourMeta = metafields.find(x => x.key === "colour");
  //     const colour = colourMeta ? colourMeta.value : null;
  //     const handlesMeta = metafields.find(x => x.key === "handles");
  //     const variants = handlesMeta && handlesMeta.value ? handlesMeta.value.split("|").map(x => x.trim()).filter(x => x !== handle).map(x => { return { handle: x } }) : [];

  //     // Add the actual product as a variant (for swatches)
  //     variants.push({ colour, handle });

  //     productsByHandle.set(
  //       handle, 
  //       {
  //         id,
  //         handle,
  //         colour,
  //         variants
  //       });
  //   });

  //   console.log(`${productsByHandle.size} products found`);

  //   // Populate variant colours
  //   for (let product of productsByHandle.values()) {
  //     const { variants } = product;
  //     for (let i=0; i<variants.length; i++) {
  //       const variant = variants[i];
  //       const variantProduct = productsByHandle.get(variant.handle);
  //       if (variantProduct) {
  //         variant.colour = variantProduct.colour;
  //       } else {
  //         console.log(`WARNING: no product variant found for handle "${variant.handle}".  The "${product.handle}" product page will not show this variant.`);
  //       }
  //     }
  //   }

  //   // Create the shopify product landing pages
  //   for (let product of productsByHandle.values()) {
  //     const { id, handle, variants, colour } = product;
  //     createPage({
  //       path: `/products/${handle}`,
  //       component: path.resolve(`./src/templates/shopify/product.tsx`),
  //       context: { id, variants, handle, colour }
  //     });
  //   }
  // });
};
