import React from "react";
import { StaticQuery, graphql } from "gatsby";

const Footer = () => {  
  return (
    <StaticQuery
        query={graphql`
            query FooterNavQuery {
                allDatoCmsFooternav(sort: { fields: [position], order: ASC }) {
                    edges {
                        node {
                            text
                            url
                        }
                    }
                }
            }
        `}
        render={data => {
            const { edges } = data?.allDatoCmsFooternav;
            if (edges) {
                const navLinkWidth = `${Math.trunc(100.0 / edges.length)}%`; 
                return (
                    <footer
                        style={{
                            backgroundColor: "#4F4F57",
                            color: "#fff"
                        }}
                    >
                        <div style={{
                            padding: "0 15px",
                            margin: "0 auto",
                            width: "100%",
                            maxWidth: "1320px"
                        }}>
                            <div style={{ float: "left", width: "66%"}}>
                                {edges.map(edge => {
                                    const { text, url } = edge.node;
                                    return (
                                        <div
                                            key={text}
                                            className="footer-nav-item"
                                            style={{ 
                                                display: "inline-block",
                                                width: navLinkWidth
                                            }}
                                        >
                                            <a
                                                href={url}
                                                style={{
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                    fontFamily: "Rubik, sans-serif",
                                                    display: "inline-block",
                                                    whiteSpace: "nowrap",
                                                    textDecoration: "none",
                                                    padding: "1.375rem 0",
                                                    textAlign: "center",
                                                    width: "100%"
                                                }}
                                            >
                                                {text}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ clear: "left" }}></div>
                        </div>
                    </footer>
                )
            }
        }
        }
    />
  )
};

export default Footer;
