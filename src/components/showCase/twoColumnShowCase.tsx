import React from "react";
import ShowCaseProps from "./showCaseProps";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ButtonLink from '../buttonLink/buttonLink';
import FluidImage from '../fluidImage/fluidImage';

const useStyles = makeStyles(theme => ({
    twoColumnShowCase: {
        margin: "8rem 2rem"
    },
    column1: {
        textAlign: "center",
    },
    column2: {
        [theme.breakpoints.up('xs')]: {
            textAlign: 'center',
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        }
    },
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
        margin: '10px 0px',
        fontWeight: 'normal',
        [theme.breakpoints.up('xs')]: {
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.5rem',
            lineHeight: '3.0625rem',
        }
    },
    description: {
        color: "#4f5057",
        paddingLeft: "1.875rem",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        [theme.breakpoints.up('xs')]: {
            textAlign: "center"
        },
        [theme.breakpoints.up('md')]: {
            textAlign: "left"
        },
    }
}));

export default function TwoColumnShowCase(props: ShowCaseProps) {
    const classes = useStyles();
    const { icon, preTitle, title, description, linkText, linkUrl, image} = props;
    return (
        <div className={classes.twoColumnShowCase}>
            <Grid container spacing={3} direction="row-reverse">
                <Grid item xs={12} sm={12} md={6} className={classes.column1}>
                    <FluidImage { ... image } />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.column2}>
                    {icon ? <img src={icon} className={classes.icon} /> : null}
                    <h2 className={classes.preTitle}>{preTitle}</h2>
                    <h3 className={classes.title}>{title}</h3>
                    <p className={classes.description}>{description}</p>
                    <ButtonLink text={linkText} url={linkUrl} />
                </Grid>
            </Grid>
        </div>
    );
};
