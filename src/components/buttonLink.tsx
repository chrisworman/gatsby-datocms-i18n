import React from "react";
import { makeStyles } from '@material-ui/core/styles';

type ButtonLinkProps = {
    text: string;
    url: string;
};

// TODO: animate background to black on hover
const useStyles = makeStyles(theme => ({
    buttonLink: {
        display: "inline-block",
        padding: "15px 30px",
        color : "#000",
        border: "solid 1px #000",
        textDecoration: "none",
        fontWeight: "bolder",
        backgroundColor: '#fff',
    },
}));

export default function ButtonLink(props: ButtonLinkProps) {
    const classes = useStyles();
    const { text, url } = props;
    return <a className={classes.buttonLink} href={url}>{text}</a>
};