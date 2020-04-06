import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ButtonLinkProps } from "./buttonLinkProps";

const useStyles = makeStyles(theme => ({
    buttonLink: {
        display: "inline-block",
        border: "solid thin #ccc",
        textDecoration: "none",
        fontWeight: "bolder",
        backgroundColor: '#fff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&:hover $text': {
            transition: 'all 0.15s',
            color: '#fff',
        },
        '&:hover $strip': {
            transition: 'all 0.2s',
            height: '90px',
            margin: '-90px 0 0 0',
        },
    },
    text: {
        transition: 'all 0.15s',
        color : "#000",
        padding: "15px 30px",
        backgroundColor: 'transparent',
        fontWeight: 500,
    },
    strip: {
        transition: 'all 0.2s',
        height: '2px',
        backgroundColor: '#000',
        bottom: '0',
        margin: '-2px 20px 0 20px',
    },
}));

export default function ButtonLink(props: ButtonLinkProps) {
    const classes = useStyles();
    const { text, url } = props;
    return (
        <a className={classes.buttonLink} href={url}>
            <div className={classes.text}>{text}</div>
            <div className={classes.strip}></div>
        </a>
    );
};