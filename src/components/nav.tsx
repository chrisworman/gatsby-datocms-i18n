import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Menu, PersonOutline, ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { List, ListItem, Divider, ListItemText, Collapse } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#eee"
    },
    firstBanner: {
        backgroundColor: "#4E5057",
        textAlign: "center",
        padding: "0.3rem 0px",
        '& a, & span': {
            textTransform: "uppercase", 
            textDecoration: "none",
            color: "#f4f4f2",
            fontSize: "0.75rem"
        },
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
    secondBanner: {
        padding: '1rem',
        backgroundColor: "#000",
        textAlign: 'center',
        color: '#fff',
        '& h3, & a': {
            margin: '0 0 0.5rem 0',
            color: '#fff',
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 'bold',
            display: 'inline-block',
        },
        '& h5': {
            margin: '0',
            color: '#fff',
            fontSize: "10px",
            lineHeight: '1.5',
            fontWeight: 'normal',
        },
    },
    fullNav: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
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
    compactNavItemNoMenuItemsContainer: {
        padding: '12px 0',
    },
    compactNavItem: {
        color: '#000',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'inline-block',
        margin: '20px',
        cursor: 'pointer',
    },
    compactNavItemContainer: {
        margin: '0 20px',
        borderBottom: 'solid 1px #ccc',
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    compactNavExpansion: {
        border: 'none',
        boxShadow: 'none',
        width: '100%',
        '&::before': {
            display: 'none', // Remove divider
        }
    },
    compactNavGroupHeading: {
        margin: '0 0 0 20px',
    },
    compactNavExpansionSummary: {
        padding: '0',
    },
    compactNavExpansionPanelDetails: {
        display: 'block',
    },
    compactNavMenuLink: {
        display: 'block',
        color: '#000',
        textDecoration: 'none',
        margin: '1rem 0',
    },
    drawerPaper: {
        width: '100%',
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

const getFirstBanner = (allDatoCmsFirstbanner, bannerCssClassName) => {
    if (!allDatoCmsFirstbanner || !allDatoCmsFirstbanner.edges || !allDatoCmsFirstbanner.edges.length) {
        return null;
    }
    
    const firstBanner = allDatoCmsFirstbanner.edges[0].node;
    if (!firstBanner || !firstBanner.enabled || !firstBanner.text) {
        return null;
    }

    if (firstBanner.url) {
        return (
            <div className={bannerCssClassName}>
                <a href={firstBanner.url}>{firstBanner.text}</a>
            </div>
        );
    } else {
        return (
            <div className={bannerCssClassName}>
                <span>{firstBanner.text}</span>
            </div>
        );
    }
};

const getSecondBanner = (allDatoCmsSecondbanner, bannerCssClassName) => {
    if (!allDatoCmsSecondbanner || !allDatoCmsSecondbanner.edges || !allDatoCmsSecondbanner.edges.length) {
        return null;
    }

    const secondBanner = allDatoCmsSecondbanner.edges[0].node;
    if (!secondBanner || !secondBanner.enabled || !secondBanner.text) {
        return null;
    }

    if (secondBanner.url) {
        return (
            <div className={bannerCssClassName}>
                <a href={secondBanner.url}>{secondBanner.text}</a>
                { secondBanner.subtitle ? <h5>{secondBanner.subtitle}</h5> : null }
            </div>
        );
    } else {
        return (
            <div className={bannerCssClassName}>
                <h3>{secondBanner.text}</h3>
                { secondBanner.subtitle ? <h5>{secondBanner.subtitle}</h5> : null }
            </div>
        );
    }
};

export default function Nav() {

    const [state, setState] = React.useState({
        drawerOpen: false,
        phoneCasesOpen: false,
        drawerMenus: new Map<string, boolean>(),
    });

    const toggleDrawer = (drawerOpen) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
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
                    allDatoCmsFirstbanner {
                        edges {
                            node {
                                text
                                url
                                enabled
                            }
                        }
                    }
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
                    allDatoCmsSecondbanner {
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
            render={data => {
                const classes = useStyles();
                const { edges } = data?.allDatoCmsMainnav;
                if (edges) {
                    
                    return (
                        <header className={classes.header}>

                            {/* First Banner */}
                            {getFirstBanner(data.allDatoCmsFirstbanner, classes.firstBanner)}

                            {/* Full Navigation */}
                            <Grid container className={classes.fullNav}>
                                <Grid item md={1}>
                                    <div className={classes.fullNavLogoContainer}>
                                        <a href="https://pelacase.com">
                                            <img className={classes.logo} src="/pela-logo-sm.png" />
                                        </a>
                                    </div>
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
                                                                    Array.from(createMenuGroupColumns(menugroups, menuitems).entries()).map((entry, index) => {
                                                                        const group = entry[0];
                                                                        const columns = entry[1];
                                                                        return (
                                                                            <Grid item key={index}>
                                                                                {group ? <h5 className={classes.fullNavMenuGroupHeading}>{group}</h5> : null }
                                                                                <Grid container spacing={5}>
                                                                                    {columns.map((column, i) => {
                                                                                        return (
                                                                                            <Grid item key={i}>
                                                                                                { column.map((menuItem, j) => {
                                                                                                    return (
                                                                                                        <a key={`${i}.${j}`} className={classes.fullNavMenuLink} href={menuItem.url}>{menuItem.text}</a>
                                                                                                    );
                                                                                                })}
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
                                        <Button onClick={toggleDrawer(true)}>
                                            <Menu className={classes.compactNavMenuIcon} fontSize="large" />
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6} className={classes.compactNavLogoContainer}>
                                    <a href="https://pelacase.com">
                                        <img className={classes.logo} src="/pela-logo-sm.png" />
                                    </a>
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>

                            {/* Drawer */}
                            <Drawer 
                                open={state.drawerOpen}
                                onClose={toggleDrawer(false)}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                
                                {/* Close Drawer and Account Icon */}
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Button onClick={toggleDrawer(false)}>
                                            <ArrowBack fontSize="large" />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} className={classes.account}>
                                        <a href="https://pelacase.com/account">
                                            <PersonOutline fontSize="large" />
                                        </a>
                                    </Grid>
                                </Grid>




                                <List>
                                    <ListItem button onClick={() => toggleDrawerMenu('phoneCases')}>
                                        <ListItemText primary="Phone Cases" />
                                    </ListItem>
                                    <Collapse in={state.drawerMenus.get('phoneCases')} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button onClick={() => toggleDrawerMenu('iPhoneCases')}>
                                                <ListItemText primary="iPhone Cases" />
                                            </ListItem>
                                            <Collapse in={state.drawerMenus.get('iPhoneCases')} timeout="auto" unmountOnExit>
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                                <a href="#">iPhone 6</a><br />
                                            </Collapse>
                                        </List>
                                        <List component="div" disablePadding>
                                            <ListItem button onClick={() => toggleDrawerMenu('androidCases')}>
                                                <ListItemText primary="Android Cases" />
                                            </ListItem>
                                            <Collapse in={state.drawerMenus.get('androidCases')} timeout="auto" unmountOnExit>
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                                <a href="#">Android 1</a><br />
                                            </Collapse>
                                        </List>
                                    </Collapse>
                                    <Divider />
                                    <ListItem>
                                        <a href="#">AirPod Cases</a>
                                    </ListItem>
                                    <ListItem>
                                        Accessories
                                    </ListItem>
                                    <ListItem>
                                        Inside Pela
                                    </ListItem>
                                </List>

                                {/* Drawer Nav Links */}
                                {/* {edges.map(edge => {
                                    const { text, url, menugroups, menuitems } = edge.node;
                                    return (  
                                        <div key={text} className={classes.compactNavItemContainer}>
                                            {
                                                !menuitems || menuitems.length === 0
                                                ? 
                                                <div className={classes.compactNavItemNoMenuItemsContainer}>
                                                    <a className={classes.compactNavItem} href={url}>{text}</a>
                                                </div>
                                                : 
                                                <ExpansionPanel className={classes.compactNavExpansion}>
                                                    <ExpansionPanelSummary className={classes.compactNavExpansionSummary}>
                                                        <span className={classes.compactNavItem}>{text}</span> 
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails className={classes.compactNavExpansionPanelDetails}>
                                                    {                                                        
                                                        menugroups 
                                                        ? Array.from(createMenuGroupColumns(menugroups, menuitems).entries()).map((entry, index) => {
                                                            const group = entry[0];
                                                            const columns = entry[1];
                                                            return (
                                                                <ExpansionPanel key={index} className={classes.compactNavExpansion}>
                                                                    <ExpansionPanelSummary className={classes.compactNavExpansionSummary}>
                                                                        { group ? <h5 className={classes.compactNavGroupHeading}>{group}</h5> : null }
                                                                    </ExpansionPanelSummary>
                                                                    <ExpansionPanelDetails>
                                                                        <div key={`${index}`}>
                                                                            {columns.map((column, i) => {
                                                                                return (
                                                                                    column.map((menuItem, j) => {
                                                                                        return (
                                                                                            <a key={`${i}.${j}}`} className={classes.compactNavMenuLink} href={menuItem.url}>{menuItem.text}</a>
                                                                                        );
                                                                                    })
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </ExpansionPanelDetails>
                                                                </ExpansionPanel>
                                                            );
                                                        })
                                                        : 
                                                        <>
                                                            { menuitems.map((menuItem, i) => <a key={i} className={classes.compactNavMenuLink} href={menuItem.url}>{menuItem.text}</a>) }
                                                        </>
                                                    }
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                
                                                
                                            }
                                        </div>
                                    );
                                })} */}
                            </Drawer>

                            {/* Second Banner */}
                            {getSecondBanner(data.allDatoCmsSecondbanner, classes.secondBanner)}
                            
                        </header>
                    )
                }

                console.log(`No "edges" found in data.allDatoCmsMainnav: data=${JSON.stringify(data)}`);
            }
        }
    />
  )
};
