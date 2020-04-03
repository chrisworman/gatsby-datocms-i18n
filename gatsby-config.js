require("dotenv").config({
  // TODO: env specific files
  path: `.env` // `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Pela Headless Prototype`,
    description: `The prototype for the Pela Headless website`,
    author: `chris.worman@pelacase.com`
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-material-ui`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
        preview: false,
        disableLiveReload: false
      }
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en' // TODO: change for i18n
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pela Case`,
        short_name: `Pela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#9AC426`,
        display: `standalone`,
        icon: `static/pela-logo-lg.jpg`,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
          workboxConfig: {
            globPatterns: ['**/*']
          }
      }
    },
    // {
    //   resolve: "gatsby-source-shopify",
    //   options: {
    //     // The domain name of your Shopify shop. This is required.
    //     // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
    //     // 'gatsby-source-shopify-test-shop.myshopify.com'.
    //     // If you are running your shop on a custom domain, you need to use that
    //     // as the shop name, without a trailing slash, for example:
    //     // shopName: "gatsby-shop.com",
    //     shopName: "pelacase.com",

    //     // An API access token to your Shopify shop. This is required.
    //     // You can generate an access token in the "Manage private apps" section
    //     // of your shop's Apps settings. In the Storefront API section, be sure
    //     // to select "Allow this app to access your storefront data using the
    //     // Storefront API".
    //     // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
    //     accessToken: process.env.SHOPIFY_STORE_FRONT_API_TOKEN,

    //     // Set the API version you want to use. For a list of available API versions,
    //     // see: https://help.shopify.com/en/api/storefront-api/reference/queryroot
    //     // Defaults to 2019-07
    //     apiVersion: "2020-01",

    //     // Set verbose to true to display a verbose output on `npm run develop`
    //     // or `npm run build`. This prints which nodes are being fetched and how
    //     // much time was required to fetch and process the data.
    //     // Defaults to true.
    //     verbose: true,

    //     // Number of records to fetch on each request when building the cache
    //     // at startup. If your application encounters timeout errors during
    //     // startup, try decreasing this number.
    //     paginationSize: 5,

    //     // List of collections you want to fetch.
    //     // Possible values are: 'shop' and 'content'.
    //     // Defaults to ['shop', 'content'].
    //     includeCollections: ["shop"]
    //   }
    // }
  ]
};
