import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { PersonOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#eee"
    },
    bannerAboveNav: {
        backgroundColor: "#4E5057",
        textAlign: "center",
        padding: "0.3rem 0px",
        '& a': {
            textTransform: "uppercase", 
            textDecoration: "none",
            color: "#f4f4f2",
            fontSize: "0.75rem"
        },
    },
    fullNav: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    fullNavItem: {
        '&:hover $fullNavMenu': {
            display: 'block',
        },
    },
    fullNavItemLink: {
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
    },
    fullNavMenu: {
        display: 'none',
        zIndex: 2,
        position: 'absolute',
        left: '0',
        width: '100%',
        backgroundColor: '#fff',
        borderTop: '0.0625rem solid rgb(226, 226, 226)',
        paddingBottom: '50px',
        borderBottom: '0.0625rem solid rgb(226, 226, 226)',
        '& h5': {
            fontWeight: 'bold',
            fontSize: '1rem',
            marginBottom: '10px',
        }
    },
    fullNavMenuLink: {
        color: '#4f5057',
        textDecoration: 'none',
        display: 'block',
        paddingRight: '0.3125rem',
        fontSize: '0.875rem',
        lineHeight: '1.6875rem',
        whiteSpace: 'nowrap',
        '&:hover': {
            color: '#8fbe00',
        }
    },
    compactNav: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }
    },
    logo: {
        maxWidth: "3.5rem",
        margin: "8px 0 0 10px",
    },
    account: {
        textAlign: "right",
        '& a': {
            color: "#4f5057",
            display: "inline-block",
            margin: "8px 10px 0 0px",
        }
    },
    bannerBelowNav: {
        height : "60px",
        backgroundColor: "#000",
    },
}));

const groupMenuItems = (menuGroups, menuItems) => {
    if (!menuItems || menuItems.length === 0) {
        return new Map();
    }

    // Initialize a map from "menuGroup" to array of menu items for that group
    const menuItemsByGroup = new Map();
    const orderedMenuGroups = menuGroups.split('|');
    for (let i=0; i<orderedMenuGroups.length; i++) {
        menuItemsByGroup.set(orderedMenuGroups[i].trim(), []);
    }
    
    // Populate the map with menu items
    for (let i=0; i<menuItems.length; i++) {
        const menuItem = menuItems[i];
        const canonicalGroup = menuItem.group.trim();
        if (menuItemsByGroup.has(canonicalGroup)) {
            menuItemsByGroup.get(canonicalGroup).push(menuItem);
        }
    }

    return menuItemsByGroup;
};

export default function Nav() {  
  return (
    <StaticQuery
        query={graphql`
            query MainNavQuery {
                allDatoCmsMainnav(sort: { fields: [position], order: ASC }) {
                    edges {
                        node {
                            text
                            url
                            menugroups
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
            const classes = useStyles();
            const { edges } = data?.allDatoCmsMainnav;
            if (edges) {
                return (
                    <header className={classes.header}>
                        {/* TODO: cms */}
                        <div className={classes.bannerAboveNav}>
                            <a href="#">Free Global Shipping on all orders</a>
                        </div>
                        <Grid container className={classes.fullNav}>
                            <Grid item md={1}>
                                <a href="https://pelacase.com">
                                    <img className={classes.logo} src="/pela-logo-sm.webp" />
                                </a>
                            </Grid>
                            <Grid item md={10}>
                                <Grid container spacing={0}>
                                    {edges.map(edge => {
                                        const { text, url, menugroups, menuitems } = edge.node;
                                        return (
                                            <Grid item xs key={text} className={classes.fullNavItem}>
                                                <a href={url} className={classes.fullNavItemLink}>{text}</a>
                                                {
                                                    menuitems && menuitems.length ?
                                                    <div className={classes.fullNavMenu}>
                                                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                                                        {
                                                            Array.from(groupMenuItems(menugroups, menuitems).entries()).map(entry => {
                                                                const group = entry[0];
                                                                const menuItems = entry[1];
                                                                return (
                                                                    <Grid item>
                                                                        {group ? <h5>{group}</h5> : null }
                                                                        {menuItems.map((menuItem, index) => {
                                                                            return <a key={index} className={classes.fullNavMenuLink} href={menuItem.url}>{menuItem.text}</a>;
                                                                        })}
                                                                    </Grid>
                                                                );
                                                            })
                                                        }
                                                        </Grid>
                                                    </div> : null
                                                }
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                            <Grid item md={1} className={classes.account}>
                                <a href="https://pelacase.com/account">
                                    <PersonOutline fontSize="large" />
                                </a>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.compactNav}>
                            Compact
                        </Grid>

                        <div className={classes.bannerBelowNav}></div>
                        
                    </header>
                )
            }

            console.log(`No "edges" found in data.allDatoCmsMainnav: data=${JSON.stringify(data)}`);
        }
        }
    />
  )
};
