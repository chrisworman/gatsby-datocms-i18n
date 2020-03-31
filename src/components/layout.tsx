import React, { FC } from "react";
import Nav from "./nav";
import { Helmet } from "react-helmet";
import "./layout.css";
import Footer from "./footer";

type LayoutProps = {
  title?: string;
};

const Layout : FC<LayoutProps> = props => {
    const { title, children } = props;
    return (
      <>
        {/* TODO: load default title from datocms static query */}
        <Helmet title={title ? title : 'Eco-Friendly iPhone, Google and Samsung Cases - 100% Biodegradable– Pela Case'} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </>
    );
};

export default Layout;