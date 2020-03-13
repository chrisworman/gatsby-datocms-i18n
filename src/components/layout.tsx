import React from "react";
import Nav from "./nav";
import { Helmet } from "react-helmet";
import "./layout.css";

type LayoutProps = {
  siteTitle: string;
  pageTitle: string;
  // TODO: footer, SEO?, etc.
};

class Layout extends React.Component<LayoutProps> {
  render() {
    const { siteTitle, pageTitle } = this.props;
    const collatedTitle = siteTitle + (pageTitle ? ` - ${pageTitle}` : "");
    return (
      <>
        <Helmet title={collatedTitle} />
        <Nav />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{this.props.children}</main>
          <footer>Footer goes here</footer>
        </div>
      </>
    );
  }
}

export default Layout;
