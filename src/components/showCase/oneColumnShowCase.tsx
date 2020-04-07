import React from "react";
import ShowCaseProps from "./showCaseProps";
import { makeStyles } from '@material-ui/core/styles';
import ButtonLink from '../buttonLink/buttonLink';
import FluidImage from '../fluidImage/fluidImage';

const useStyles = makeStyles(theme => ({
    oneColumnShowCase: {
        textAlign: "center",
        margin: "8rem 0"
    },
    imageContainer: {
        width: '66%',
        margin: '0 auto',
    },
    icon: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    preTitle: {
        marginBottom: "0.625rem",
        color: "black",
        fontSize: "0.75rem",
        fontWeight: "bolder",
        letterSpacing: "0.3125rem",
        lineHeight: "1.375rem",
        textTransform: "uppercase",
        [theme.breakpoints.up('md')]: {
            paddingLeft: "1.875rem",
        }
    },
    title: {
        fontFamily: '"Lora", serif',
        fontWeight: 400,
        fontSize: '1.5rem',
        margin: '0 auto 1.375rem auto',
        maxWidth: '66%',
        lineHeight: '2.125rem',
        letterSpacing: '-0.00625rem',
    },
    description: {
        color: "#4f5057",
        padding: "0 1.875rem",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        margin: '0 auto 2rem auto',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50%',
        }
    }
}));

export default function OneColumnShowCase(props: ShowCaseProps) {
    const classes = useStyles();
    const { icon, preTitle, title, description, linkText, linkUrl, image} = props;
    return (
        <div className={classes.oneColumnShowCase}>
            <div className={classes.imageContainer}>
                <FluidImage {... image} />
            </div>
            {icon ? <img src={icon} className={classes.icon} /> : null}
            <h2 className={classes.preTitle}>{preTitle}</h2>
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.description}>{description}</p>
            <ButtonLink text={linkText} url={linkUrl} />
        </div>
    );
};
