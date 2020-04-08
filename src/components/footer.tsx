import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Facebook, Twitter, Pinterest, Instagram, MailOutline, Face } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: "#4f5057",
        color: "#fff",
        minHeight: "300px",
        paddingTop: "30px",
        paddingBottom: "30px",
        [theme.breakpoints.up('xs')]: {
            paddingLeft: "50px",
            paddingRight: "50px",
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: "100px",
            paddingRight: "100px",
        }
    },
    footerContent: {
        maxWidth: '1320px',
        margin: '0 auto',
    },
    navLinkGrid: {
        textAlign: "center",
    },
    navLink: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1rem",
        textDecoration: "none",
        display: 'inline-block',
        textAlign: 'center',
        padding: "5px 20px 5px 0px",
        [theme.breakpoints.only('md')]: {
            maxWidth: '70px',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
            padding: '5px 10px 5px 10px',
        },
    },
    socialLinks: {
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '40px',
            textAlign: 'center',
        },
        '& a' : {
            color: '#fff',
            display: "inline-block",
            marginLeft: "10px",
            [theme.breakpoints.down('sm')]: {
                margin: '0 5px',
            },
        },
    },
    corpLinks: {
        margin: "70px 0 50px 0",
        textAlign: "center",
    },
    copyright: {
        color: '#d0d0d0',
        [theme.breakpoints.up('xs')]: {
            textAlign: 'center',
            paddingTop: '20px',
            fontSize: '0.625rem',
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
            paddingTop: '0',
            fontSize: '0.875rem',
        },
    },
    policyLinks: {
        [theme.breakpoints.up('xs')]: {
            textAlign: 'center',
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        },
        '& a' : {
            fontSize: '0.875rem',
            color: '#fff',
            display: "inline-block",
            marginLeft: "30px",
            textDecoration: 'none',
        },
    },
}));

type FooterStaticQueryData = {
    footerNav: {
        edges: FooterNavEdge[];
    }
};

type FooterNavEdge = {
    node: {
        text: string;
        url: string;
    }
};

export default function Footer() {  
  return (
    <StaticQuery
        query={graphql`
            query FooterNavQuery {
                footerNav: allDatoCmsFooternav(sort: { fields: [position], order: ASC }) {
                    edges {
                        node {
                            text
                            url
                        }
                    }
                }
            }
        `}
        render={(data: FooterStaticQueryData) => {
            const classes = useStyles();
            const { edges } = data?.footerNav;
            if (edges) {
                return (
                    <footer className={classes.footer}>
                        <div className={classes.footerContent}>
                            <Grid container direction="row-reverse">

                                {/* Social Links */}
                                <Grid item xs={12} md={4} className={classes.socialLinks}>
                                    <a href="https://www.facebook.com/PELACase/" aria-label="Visit our Facebook page">
                                        <Facebook fontSize="large" />
                                    </a>
                                    <a href="https://www.pinterest.ca/pelacase/" aria-label="Visit our Pinterest page">
                                        <Pinterest fontSize="large" />
                                    </a>
                                    <a href="https://twitter.com/pelacase" aria-label="Visit our Twitter page">
                                        <Twitter fontSize="large" />
                                    </a>
                                    <a href="https://www.instagram.com/pelacase/" aria-label="Visit our Instagram page">
                                        <Instagram fontSize="large" />
                                    </a>
                                    <a href="mailto:info@pelacase.com" aria-label="Contact us by email">
                                        <MailOutline fontSize="large" />
                                    </a>
                                </Grid>

                                {/* Footer Nav Links */}
                                <Grid item xs={12} md={8} >
                                    <Grid container>
                                        {edges.map(edge => {
                                            const { text, url } = edge.node;
                                            return (
                                                <Grid item xs={12} sm={12} md="auto" key={text} className={classes.navLinkGrid}>
                                                    <a href={url} className={classes.navLink}>{text} </a>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        
                            {/* Corp Links */}
                            <Grid container className={classes.corpLinks}>
                                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                                <Grid item xs={5} sm={4} md={3} lg={2}>
                                    <a href="https://bcorporation.net/" title="Certified B Corporation" target="_blank" rel="noopener">
                                        <img src="//cdn.shopify.com/s/files/1/0078/1032/files/b-corp_120x.png?v=1582919839" alt="Certified B Corporation" />
                                    </a>
                                </Grid>
                                <Grid item xs={5} sm={4} md={3} lg={2}>
                                    <a href="https://www.onepercentfortheplanet.org/" title="1% for the Planet" target="_blank" rel="noopener">
                                        <img src="//cdn.shopify.com/s/files/1/0078/1032/files/one_percent_for_planet_120x.png?v=1583439015" alt="1% for the Planet" />
                                    </a>
                                </Grid>
                                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                            </Grid>

                            {/* Copyright, Terms, and Privacy Policy */}
                            <Grid container direction="row-reverse">
                                <Grid item xs={12} md={8} className={classes.policyLinks}>
                                    <a href="https://pelacase.com/policies/terms-of-service">
                                        Terms &amp; Conditions
                                    </a>
                                    <a href="https://pelacase.com/policies/privacy-policy">
                                        Privacy Policy
                                    </a>
                                </Grid>
                                <Grid item xs={12} md={4} className={classes.copyright}>
                                    <span>Copyright &copy; {(new Date()).getFullYear()} Pela Case</span>
                                </Grid>
                            </Grid>
                        </div>
                    </footer>
                )
            }
        }}
    />
  )
};
