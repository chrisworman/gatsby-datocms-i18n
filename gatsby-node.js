const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const locales = ["it", "en"]; // Move to CMS?

  // Create core pages
  return Promise.all(
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
        console.log(`result CW: ${JSON.stringify(result)}`);

        ["index", "secondPage"].forEach(pageId => {
          const pageData = result.data[pageId];
          // TODO: move "en" to constants file
          // TODO: consider consolidating localized link creation to helper utility (see LocalizedLink)
          const localePrefix = pageData.locale === "en" ? "" : `/${pageData.locale}`;
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

  // TODO: create pages defined in CMS (eg. landing pages for ads)
};
