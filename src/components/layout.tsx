import React, { FC } from "react";
import Nav from "./nav";
import { Helmet } from "react-helmet";
import "./layout.css";
import Footer from "./footer";

type LayoutProps = {
  siteTitle: string;
  pageTitle: string;
  // TODO: footer, SEO?, etc.
};

const Layout : FC<LayoutProps> = props => {
    const { siteTitle, pageTitle, children } = props;
    const collatedTitle = siteTitle + (pageTitle ? ` - ${pageTitle}` : "");
    return (
      <>
        <Helmet title={collatedTitle} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </>
    );
};

export default Layout;