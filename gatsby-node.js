const path = require(`path`);

exports.createPages = ({ actions }) => {
  // Create the core pages
  const { createPage } = actions;
  ["index", "secondPage"].forEach(page => {
    ["it", "en"].forEach(locale => {
      const pathLocalePrefix = locale === "en" ? "" : `/${locale}`;
      const slug = page === "index" ? "" : page;
      const pagePath = `${pathLocalePrefix}/${slug}`;
      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/${page}.tsx`),
        context: { locale }
      });
    });
  });
  // TODO: create pages defined in CMS
};
