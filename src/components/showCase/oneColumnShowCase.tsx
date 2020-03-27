import React from "react";
import ShowCaseProps from "./showCaseProps";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ButtonLink from '../buttonLink';

const useStyles = makeStyles(theme => ({
    oneColumnShowCase: {
        textAlign: "center",
        margin: "3rem 0"
    },
    // column2: {
    //     [theme.breakpoints.up('xs')]: {
    //         textAlign: 'center',
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         textAlign: 'left',
    //     }
    // },
    image: {
        width: "100%",
        height: "auto",
    },
    icon: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    preTitle: {
        marginBottom: "0.625rem",
        color: "black",
        fontFamily: '"Rubik", sans-serif',
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
        fontWeight: 'normal',
        fontSize: '1.75rem',
        marginBottom: '1.375rem',
    },
    description: {
        color: "#4f5057",
        paddingLeft: "1.875rem",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        margin: '0 auto 2rem auto',
        [theme.breakpoints.up('md')]: {
            maxWidth: '50%',
            
        }
    }
  }));

export default function OneColumnShowCase(props: ShowCaseProps) {
    const classes = useStyles();
    const { icon, preTitle, title, description, linkText, linkUrl, image} = props;
    return (
        <div className={classes.oneColumnShowCase}>
            {/* TODO: gatsby responsive image */}
            <img className={classes.image} src={image} />
            {icon ? <img src={icon} className={classes.icon} /> : null}
            <h2 className={classes.preTitle}>{preTitle}</h2>
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.description}>{description}</p>
            <ButtonLink text={linkText} url={linkUrl} />
        </div>
    );
};
