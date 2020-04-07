import React, { FC } from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "./nav";
import Footer from "./footer";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { createGlobalStyle } from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

type LayoutProps = {
  title?: string|null;
  titleSuffix?: string|null;
  description?: string|null;
  currentUrl: string;
  twitterCard?: string|null;
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Rubik", sans-serif;
    font-size: 1rem;
    margin: 0;
  }
`;

const useStyles = makeStyles(theme => ({
  main: {
    maxWidth: '1320px',
    margin: '0 auto',
  },
}));

// TODO: confirm this has been replaced by gatsby-plugin-manifest
// faviconMetaTags {
//  ...GatsbyDatoCmsFaviconMetaTags
// }
// favicon={data.datoCmsSite.faviconMetaTags}

const Layout : FC<LayoutProps> = props => {
    const { title, titleSuffix, description, children, currentUrl, twitterCard } = props;
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            datoCmsSite {
              globalSeo {
                siteName
                titleSuffix
                twitterAccount
                facebookPageUrl
                fallbackSeo {
                  title
                  description
                  image {
                    url
                  }
                  twitterCard
                }
              }
            }
          }
        `}
        render={data => {
          const { globalSeo } = data.datoCmsSite;
          const classes = useStyles();
          const fullTitle = `${title || globalSeo.fallbackSeo.title} ${titleSuffix || globalSeo.titleSuffix}`
          const coalescedDescription = description || globalSeo.fallbackSeo.description;
          const metaImageUrl = globalSeo.fallbackSeo?.image?.url;
          return (
            <>
              <GlobalStyle />
              <HelmetDatoCms>
                <title>{fullTitle}</title>
                <meta name="description" content={coalescedDescription} />
                {/* Facebook */}
                <meta property="og:title" content={fullTitle} />
                <meta property="og:description" content={coalescedDescription} />
                { metaImageUrl && <meta property="og:image" content={metaImageUrl} /> }
                <meta property="og:url" content={currentUrl} />
                { globalSeo.siteName && <meta property="og:site_name" content={globalSeo.siteName} /> }
                {/* Twitter */}
                <meta name="twitter:title" content={fullTitle} />
                <meta name="twitter:description" content={coalescedDescription} />
                { metaImageUrl && <meta name="twitter:image" content={metaImageUrl} /> }
                <meta name="twitter:card" content={twitterCard || globalSeo.fallbackSeo.twitterCard} />
                <meta name="twitter:site" content={globalSeo.twitterAccount} />
              </HelmetDatoCms>
              <Nav />
              <main className={classes.main}>{children}</main>
              <Footer />
            </>
          );
        }} 
      />
    );
};

export default Layout;
