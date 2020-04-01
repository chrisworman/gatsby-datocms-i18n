import React, { FC } from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "./nav";
import Footer from "./footer";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { createGlobalStyle } from "styled-components";

type LayoutProps = {
  title?: string;
  titleSuffix?: string;
  description? : string;
  // TODO: page specific meta tags
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Rubik", sans-serif;
    font-size: 1rem;
    margin: 0;
  }
`;

const Layout : FC<LayoutProps> = props => {
    const { title, titleSuffix, description, children } = props;
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            datoCmsSite {
              faviconMetaTags {
                ...GatsbyDatoCmsFaviconMetaTags
              }
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
          return (
            <>
              <GlobalStyle />
              <HelmetDatoCms favicon={data.datoCmsSite.faviconMetaTags}>
                <title>{title || globalSeo.fallbackSeo.title} {titleSuffix || globalSeo.titleSuffix}</title>
                <meta name="description" content={description || globalSeo.fallbackSeo.description} />
              </HelmetDatoCms>
              <Nav />
              <main>{children}</main>
              <Footer />
            </>
          );
        }} 
      />
    );
};

export default Layout;