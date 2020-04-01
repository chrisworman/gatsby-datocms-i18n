import React, { FC } from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "./nav";
import "./layout.css";
import Footer from "./footer";
import { HelmetDatoCms } from "gatsby-source-datocms";

type LayoutProps = {
  title?: string;
  titleSuffix?: string;
  // TODO: page specific meta tags
};

const Layout : FC<LayoutProps> = props => {
    const { title, titleSuffix, children } = props;
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
              <HelmetDatoCms favicon={data.datoCmsSite.faviconMetaTags}>
                <title>{title || globalSeo.fallbackSeo.title} {titleSuffix || globalSeo.titleSuffix}</title>
                <meta name="description" content={globalSeo.fallbackSeo.description} />
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