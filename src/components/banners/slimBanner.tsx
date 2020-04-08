import React from "react";
import { SlimBannerProps } from "./slimBannerProps";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    slimBanner: {
        backgroundColor: "#4E5057",
        textAlign: "center",
        padding: "0.3rem 0px",
        fontWeight: 100,
        letterSpacing: '0.0625rem',
        '& a, & span': {
            textTransform: "uppercase", 
            textDecoration: "none",
            color: "#f4f4f2",
            fontSize: "0.75rem"
        },
    }
}));

export default function SlimBanner(props: SlimBannerProps) {
    const classes = useStyles();
    const { text, url } = props;
    
    if (url && text) {
        return (
            <div className={classes.slimBanner}>
                <a href={url}>{text}</a>
            </div>
        );
    } else if (text) {
        return (
            <div className={classes.slimBanner}>
                <span>{text}</span>
            </div>
        );
    }
    
    return null;
}