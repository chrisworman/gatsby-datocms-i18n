import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Menu, PersonOutline, ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemText, Collapse, IconButton } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SlimBanner from "./banners/slimBanner";
import WideBanner from "./banners/wideBanner";

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#eee"
    },
    logo: {
        maxWidth: "3.5rem",
    },
    account: {
        textAlign: "right",
        '& a': {
            color: "#4f5057",
            display: "inline-block",
            margin: "8px 10px 0 0px",
        }
    },
    ie11GridFix: {
        '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': { // Selector only parsed by IE 10+
            width: '50%',
        },
    },
    fullNav: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    fullNavContainer: {
        maxWidth: '1320px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    fullNavLogoContainer: {
        margin: "8px 10px",
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
        padding: '5px',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    compactNavLogoContainer: {
        paddingTop: '4px',
        textAlign: 'center',
    },
    compactNavMenuIconContainer: {
        padding: "3px 0 0 0",
    },
    compactNavMenuIcon: {
        cursor: 'pointer',
    },
    compactNavItemBorder: {
        borderBottom: 'solid 1px #ccc',
        '&:last-of-type': {
            borderBottom: 'none',
        },
    },
    compactNavMenuListItem: {
        padding: '20px',
    },
    compactNavMenuListItemText: {
        fontWeight: 'bold',
    },
    compactNavSubMenuListItemText: {
        fontWeight: 'bold',
        fontSize: '0.875rem',
        margin: '0 0 5px 20px',
    },
    compactNavSubMenuLinkListItemText: {
        color: '#4f5057',
        fontSize: '0.875rem',
        margin: '0 0 0 40px',
    },
    drawerPaper: {
        width: '100%',
    },
}));

const MENU_GROUP_2ND_COLUMN_THRESHOLD = 6; // The number menu items in a group before a second column is added

type NavStaticQueryData = {
    firstBanner: DatoCmsFirstBanner;
    mainNav: DatoCmsMainNav;
    secondBanner: DatoCmsSecondBanner;
};

type DatoCmsMainNav = {
    edges: DatoCmsMainNavEdge[];
};

type DatoCmsMainNavEdge = {
    node: {
        text: string;
        url: string;
        menugroups: string;
        menuitems: MenuItem[];
    }
};

type MenuItem = {
    text: string;
    url: string;
    group: string;
};

type DatoCmsFirstBanner = {
    edges: DatoCmsFirstBannerEdge[];
};

type DatoCmsFirstBannerEdge = {
    node: {
        text: string;
        url: string;
        enabled: boolean;
    }
};

type DatoCmsSecondBanner = {
    edges: DatoCmsSecondBannerEdge[];
};

type DatoCmsSecondBannerEdge = {
    node: {
        text: string;
        subtitle: string;
        url: string;
        enabled: boolean;
    }
};

const createMenuGroupColumns = (menuGroups: string, menuItems: MenuItem[]) => {
    if (!menuItems || menuItems.length === 0) {
        return new Map();
    }

    // Initialize a map from "menuGroup" to array of menu items for that group
    const menuItemsByGroup = new Map<string, MenuItem[]>();
    const orderedMenuGroups = menuGroups.split('|');
    for (let i=0; i<orderedMenuGroups.length; i++) {
        menuItemsByGroup.set(orderedMenuGroups[i].trim(), []);
    }
    
    // Populate the map with menu items
    for (let i=0; i<menuItems.length; i++) {
        const menuItem = menuItems[i];
        const canonicalGroup = menuItem.group.trim();
        const menuGroup = menuItemsByGroup.get(canonicalGroup);
        if (menuGroup) {
            menuGroup.push(menuItem);
        }
    }

    // Create columns
    const menuColumnsByGroup = new Map<string, MenuItem[][]>();
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

const getFirstBanner = (firstBanner: DatoCmsFirstBanner) => {
    const { text, url, enabled } = firstBanner.edges[0].node;
    if (enabled) {
        return <SlimBanner text={text} url={url} />;
    }
    return null;
};

const getSecondBanner = (secondBanner: DatoCmsSecondBanner) => {
    const { text, subtitle, url, enabled } = secondBanner.edges[0].node;
    if (enabled) {
        return <WideBanner text={text} subTitle={subtitle} url={url} />;
    }
    return null;
};

export default function Nav() {

    const [state, setState] = React.useState({
        drawerOpen: false,
        drawerMenus: new Map<string, boolean>(),
    });

    const toggleDrawer = (drawerOpen: boolean) => {
        setState({ ...state, drawerOpen });
    };

    const toggleDrawerMenu = (menuId: string) => {
        const drawerMenus = new Map(state.drawerMenus);
        drawerMenus.set(menuId, !!!drawerMenus.get(menuId));
        setState({ ...state, drawerMenus});
    };

    return (
        <StaticQuery
            query={graphql`
                query MainNavQuery {
                    firstBanner: allDatoCmsFirstbanner {
                        edges {
                            node {
                                text
                                url
                                enabled
                            }
                        }
                    }
                    mainNav: allDatoCmsMainnav(sort: { fields: [position], order: ASC }) {
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
                    secondBanner: allDatoCmsSecondbanner {
                        edges {
                            node {
                                subtitle
                                text
                                url
                                enabled
                            }
                        }
                    }
                }
            `}
            render={(data: NavStaticQueryData) => {
                const classes = useStyles();
                const { edges } = data?.mainNav;
                if (edges) {
                    return (
                        <header className={classes.header}>

                            {/* First Banner */}
                            {getFirstBanner(data.firstBanner)}

                            {/* Full Navigation */}
                            <Grid container className={classes.fullNav}>
                                <Grid item md={1}>
                                    <div className={classes.fullNavLogoContainer}>
                                        <a href="https://pelacase.com">
                                            <img className={classes.logo} src="/pela-logo-sm.png" alt="Pela" />
                                        </a>
                                    </div>
                                </Grid>
                                <Grid item md={10}>
                                    <Grid container className={classes.fullNavContainer} spacing={0}>
                                        {edges.map((edge: DatoCmsMainNavEdge) => {
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
                                                                    Array.from(createMenuGroupColumns(menugroups, menuitems).entries()).map((entry, index) => {
                                                                        const group = entry[0] as string;
                                                                        const columns = entry[1] as MenuItem[][];
                                                                        return (
                                                                            <Grid item className={classes.ie11GridFix} key={index}>
                                                                                {group ? <h5 className={classes.fullNavMenuGroupHeading}>{group}</h5> : null }
                                                                                <Grid container spacing={5}>
                                                                                    {columns.map((column, i: number) => {
                                                                                        return (
                                                                                            <Grid xs={6} item key={i}>
                                                                                                { 
                                                                                                    column.map((menuItem, j: number) => {
                                                                                                        return (
                                                                                                            <a key={`${i}.${j}`} className={classes.fullNavMenuLink} href={menuItem.url}>{menuItem.text}</a>
                                                                                                        );
                                                                                                    })
                                                                                                }
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

                            {/* Compact Navigation */}
                            <Grid container className={classes.compactNav}>
                                <Grid item xs={3}>
                                    <div className={classes.compactNavMenuIconContainer}>
                                        <IconButton size="small" onClick={() => toggleDrawer(true)} aria-label="Open Menu">
                                            <Menu className={classes.compactNavMenuIcon} fontSize="large" />
                                        </IconButton>
                                    </div>
                                </Grid>
                                <Grid item xs={6} className={classes.compactNavLogoContainer}>
                                    <a href="https://pelacase.com">
                                        <img className={classes.logo} src="/pela-logo-sm.png" alt="Pela" />
                                    </a>
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>

                            {/* Drawer */}
                            <Drawer 
                                open={state.drawerOpen}
                                onClose={() => toggleDrawer(false)}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                
                                {/* Close Drawer and Account Icon.  Containing div prevents iOS Safari issue with menu overlapping drawer icons. */}
                                <div>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <IconButton onClick={() => toggleDrawer(false)} aria-label="Close Menu">
                                                <ArrowBack fontSize="large" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={6} className={classes.account}>
                                            <a href="https://pelacase.com/account" title="Pela Account">
                                                <PersonOutline fontSize="large" />
                                            </a>
                                        </Grid>
                                    </Grid>
                                </div>

                                {/* Note that the containing div prevents iOS Safari issue with menu overlapping drawer icons. */}
                                <div>
                                    <List>
                                        {edges.map((edge, index: number) => {
                                            const { text, url, menugroups, menuitems } = edge.node;
                                            const menuId = `drawerMenuGroup.${index}`;
                                            if (!menuitems || menuitems.length === 0) {
                                                return (
                                                    <div key={index} className={classes.compactNavItemBorder}>
                                                        <ListItem button aria-label={text} component="a" href={url} className={classes.compactNavMenuListItem} key={index}>
                                                            <ListItemText primary={text} classes={{ primary: classes.compactNavMenuListItemText }} />
                                                        </ListItem>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={index} className={classes.compactNavItemBorder}>
                                                    <ListItem className={classes.compactNavMenuListItem} button aria-label={text} onClick={() => toggleDrawerMenu(menuId)}>
                                                        <ListItemText primary={text} classes={{ primary: classes.compactNavMenuListItemText }} />
                                                        {state.drawerMenus.get(menuId) ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItem>
                                                    <Collapse in={state.drawerMenus.get(menuId)} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            {
                                                                menugroups
                                                                ? Array.from(createMenuGroupColumns(menugroups, menuitems).entries()).map((entry, index) => {
                                                                    const group = entry[0] as string;
                                                                    const columns = entry[1] as MenuItem[][];
                                                                    const subMenuId = `${menuId}.${index}`;
                                                                    return (
                                                                        <div key={index}>
                                                                            <ListItem button aria-label={group} onClick={() => toggleDrawerMenu(subMenuId)}>
                                                                                <ListItemText primary={group} classes={{ primary: classes.compactNavSubMenuListItemText }}></ListItemText>
                                                                                {state.drawerMenus.get(subMenuId) ? <ExpandLess /> : <ExpandMore />}
                                                                            </ListItem>
                                                                            <Collapse in={state.drawerMenus.get(subMenuId)} timeout="auto" unmountOnExit>
                                                                                <List>
                                                                                    {columns.map((column, i: number) => {
                                                                                        return (
                                                                                            column.map((menuItem, j: number) => {
                                                                                                return (
                                                                                                    <ListItem key={`${i}.${j}}`} button aria-label={menuItem.text} component="a" href={menuItem.url}>
                                                                                                        <ListItemText primary={menuItem.text} classes={{ primary: classes.compactNavSubMenuLinkListItemText }} />
                                                                                                    </ListItem>
                                                                                                );
                                                                                            })
                                                                                        );
                                                                                    })}
                                                                                </List>
                                                                            </Collapse>
                                                                        </div>
                                                                    );
                                                                })
                                                                : 
                                                                    <>
                                                                        { 
                                                                            menuitems.map((menuItem, i: number) => {
                                                                                return (
                                                                                    <ListItem key={i} button aria-label={menuItem.text} component="a" href={menuItem.url}>
                                                                                        <ListItemText primary={menuItem.text} classes={{ primary: classes.compactNavSubMenuLinkListItemText }} />
                                                                                    </ListItem>
                                                                                );
                                                                            })
                                                                        }
                                                                    </>
                                                            }
                                                        </List>
                                                    </Collapse>
                                                </div>
                                            );
                                        })}
                                    </List>
                                </div>
                            </Drawer>

                            {/* Second Banner */}
                            {getSecondBanner(data.secondBanner)}
                            
                        </header>
                    )
                }

                return null;
            }
        }
    />
  )
};
