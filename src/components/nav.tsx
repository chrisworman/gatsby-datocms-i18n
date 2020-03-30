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
        borderTop: '0.0625rem solid rgb(226, 226, 226)',
        '& h5': {
            fontWeight: 'bold',
            fontSize: '1rem',
            marginBottom: '10px',
        },
        '&::after': {
            content: "'.'",
            fontSize: 0,
            lineHeight: 0,
            borderTop: '0.0625rem solid rgb(226, 226, 226)',
            display: 'block',
            height : '200px',
            width : '100%',
            background: "linear-gradient(rgba(0.3, 0.3, 0.3, 0.8), rgba(1, 1, 1, 0))",
        }
    },
    fullNavMenuLinkContainer: {
        padding: '20px 0px 50px 0px',
        backgroundColor: '#fff',
    },
    fullNavMenuGroupHeading: {
        marginTop: "0",
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

const MENU_GROUP_2ND_COLUMN_THRESHOLD = 6; // The number menu items in a group before a second column is added

const createMenuGroupColumns = (menuGroups, menuItems) => {
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

    // Create columns
    const menuColumnsByGroup = new Map();
    menuItemsByGroup.forEach((menuItems, group) => {
        if (menuItems.length < MENU_GROUP_2ND_COLUMN_THRESHOLD) { // One column
            menuColumnsByGroup.set(group, [menuItems]);
        } else { // Two columns
            const mid = Math.ceil(menuItems.length / 2)
            const column1 = menuItems.slice(0, mid);
            const column2  = menuItems.slice(mid, menuItems.length);
            menuColumnsByGroup.set(group, [column1, column2]);
        }
    });

    return menuColumnsByGroup;
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
                                                        <div className={classes.fullNavMenuLinkContainer}>
                                                            <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                                                            {
                                                                Array.from(createMenuGroupColumns(menugroups, menuitems).entries()).map(entry => {
                                                                    const group = entry[0];
                                                                    const columns = entry[1];
                                                                    return (
                                                                        <Grid item>
                                                                            {group ? <h5 className={classes.fullNavMenuGroupHeading}>{group}</h5> : null }
                                                                            <Grid container spacing={5}>
                                                                                {columns.map((column, index) => {
                                                                                    return (
                                                                                        <Grid item>
                                                                                            { column.map(menuItem => <a key={index} className={classes.fullNavMenuLink} href={menuItem.url}>{menuItem.text}</a>) }
                                                                                        </Grid>
                                                                                    );
                                                                                })}
                                                                            </Grid>
                                                                        </Grid>
                                                                    );
                                                                })
                                                            }
                                                            </Grid>
                                                        </div>
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
