import React, { useState } from "react";
import { StaticQuery, graphql } from "gatsby";

const Nav = () => {  
  return (
    <StaticQuery
        query={graphql`
            query NavQuery {
                allDatoCmsMainnav(sort: { fields: [position], order: ASC }) {
                    edges {
                        node {
                            text
                            url
                            menuitems {
                                text
                                url
                                group
                            }
                        }
                    }
                }
            }
        `}
        render={data => {
            const { edges } = data?.allDatoCmsMainnav;
            if (edges) {
                const navLinkWidth = `${Math.trunc(100.0 / edges.length)}%`; 
                return (
                    <header
                        style={{
                            backgroundColor: "#eee"
                        }}
                    >
                        {/* TODO: cms */}
                        <div style={{ backgroundColor: "#4E5057", textAlign: "center", padding: "0.3rem 0px"}}>
                            <a 
                                style={{ 
                                    textTransform: "uppercase", 
                                    textDecoration: "none",
                                    color: "#f4f4f2",
                                    fontSize: "0.75rem"
                                }} 
                                href="https://pelacase.com/pages/shipping-returns"
                            >
                                Free Global Shipping on all orders
                            </a>
                        </div>
                        <div style={{ padding: "0 15px"}}>
                            <a style={{ float: "left", textAlign: "left", width: "10%"}} href="https://pelacase.com">
                                <img style={{ maxWidth: "3.5rem", marginTop: "8px"}} src="/pela-logo-sm.webp" />
                            </a>
                            <div style={{ float: "left", width: "80%"}}>
                                {edges.map(edge => {
                                    const { text, url, menuitems } = edge.node;
                                    return (
                                        <div
                                            key={text}
                                            className="nav-menu-item"
                                            style={{ 
                                                display: "inline-block",
                                                width: navLinkWidth
                                            }}
                                        >
                                            <a
                                                href={url}
                                                style={{
                                                    color: "#000",
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
                                            {
                                                menuitems && menuitems.length ?
                                                <div 
                                                    className="nav-sub-menu"
                                                >
                                                    {
                                                        menuitems.map(menuitem => {
                                                            const { text, url } = menuitem;
                                                            return <a key={url} className="nav-sub-menu-link" href={url}>{text}</a>;
                                                        })
                                                    }
                                                </div> : null
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                            <a 
                                style={{ 
                                    float: "left",
                                    width: "10%",
                                    textAlign: "right"
                                    }} 
                                href="https://pelacase.com/account"
                                title="My Account"
                            >
                                Account
                            </a>
                            <div style={{ clear: "left" }}></div>
                        </div>
                    </header>
                )
            }

            console.log(`No "edges" found in data.allDatoCmsMainnav: data=${JSON.stringify(data)}`);
        }
        }
    />
  )
};

export default Nav;

{/* <ul>
                                            {
                                                menuitems.map(menuitem => {
                                                    const { text, url } = menuitem;
                                                    return (
                                                        <li key={url}>
                                                            <a href={url}>{text}</a>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul> */}