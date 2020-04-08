import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { WideBannerProps } from "./wideBannerProps";

const useStyles = makeStyles(theme => ({
    wideBanner: {
        padding: '1rem',
        backgroundColor: "#000",
        textAlign: 'center',
        color: '#fff',
        '& h3, & a': {
            margin: '0 0 0.5rem 0',
            color: '#fff',
            textDecoration: "none",
            fontSize: "18px",
            display: 'inline-block',
            fontWeight: 'normal',
        },
        '& h5': {
            margin: '0',
            color: '#fff',
            fontSize: "10px",
            lineHeight: '1.5',
            fontWeight: 'normal',
        },
    },
}));

export default function WideBanner(props: WideBannerProps) {
    const classes = useStyles();
    const { text, subTitle, url } = props;

    if (url && text) {
        return (
            <div className={classes.wideBanner}>
                <a href={url}>{text}</a>
                { subTitle ? <h5>{subTitle}</h5> : null }
            </div>
        );
    } else if (text) {
        return (
            <div className={classes.wideBanner}>
                <h3>{text}</h3>
                { subTitle ? <h5>{subTitle}</h5> : null }
            </div>
        );
    }

    return null;
}