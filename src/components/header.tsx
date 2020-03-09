import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

const Header = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        allShopifyCollection {
          edges {
            node {
              handle
              title
            }
          }
        }
      }
    `}
    render={data => (
      <header
        style={{
          height: "200px",
          overflow: "scroll",
          borderBottom: "1px solid #666",
          backgroundColor: "#eee",
          marginBottom: "20px"
        }}
      >
        {data.allShopifyCollection.edges.map(edge => {
          const { handle, title } = edge.node;
          return (
            <Link
              key={handle}
              to={`/collections/${handle}`}
              style={{
                fontSize: "12px",
                display: "inline-block",
                width: "200px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginLeft: "20px"
              }}
            >
              {title}
            </Link>
          );
        })}
      </header>
    )}
  />
);

export default Header;
