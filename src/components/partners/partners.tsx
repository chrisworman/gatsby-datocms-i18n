import React from "react";
import { FC } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { PartnersProps } from "./partnersProps";

const useStyles = makeStyles(theme => ({
    container: {
        padding: '50px',
        textAlign: 'center',
    },
    ourPartners: {
        textTransform: 'uppercase',
        marginBottom: '0.625rem',
        color: '#000',
        fontFamily: '"Rubik", sans-serif',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        letterSpacing: '0.3125rem',
        lineHeight: '1.375rem',
    },
    preamble: {
        fontSize: '1.5rem',
        lineHeight: '2.125rem',
        letterSpacing: '-0.00625rem',
        margin: '0 0 1rem',
        color: '#000',
        fontFamily: '"Lora", serif',
    },
    image: {
        width: '100%',
    },
    text: {
        textDecoration: 'none',
        color: '#000',
        fontSize: '1.375rem',
        lineHeight: '1.875rem',
        marginTop: '1rem',
        marginBottom: '0.625rem',
        fontFamily: '"Lora", serif',
        display: 'inline-block',
    },
    description: {
        margin: '1rem 0 1rem',
        color: '#4f5057',
        lineHeight: '1.5',
        fontSize: '1rem',
    },
}));
  
const Partners : FC<PartnersProps> = props => {
    const { partners } = props;
    if (!partners || partners.length === 0) {
        return null;
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h3 className={classes.ourPartners}>OUR PARTNERS</h3>
            <p className={classes.preamble}>5% of total sales (not just profit) from these collections is donated directly to our causes so they can do the hard work.</p>
            <Grid container spacing={3}>
                {
                    partners.map(partner => {
                        return (
                            <Grid xs={12} sm item key={partner.imageUrl}>
                                <a href={partner.linkUrl}>
                                    <img src={partner.imageUrl} className={classes.image} />
                                </a>
                                <a className={classes.text} href={partner.linkUrl}>{partner.text}</a>
                                <p className={classes.description}>{partner.description}</p>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
    );
};

export default Partners;