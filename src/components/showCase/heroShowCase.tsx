import React from "react";
import ShowCaseProps from "./showCaseProps";
import { makeStyles } from '@material-ui/core/styles';
import ButtonLink from '../buttonLink/buttonLink';

const useStyles = makeStyles((theme => ({
    heroShowCase: (props: ShowCaseProps) => ({
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        flex: '0 0 75%',
        position: 'relative',
        [theme.breakpoints.only('xs')]: {
            height: "25rem",
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.image?.fluid?.src})`,
        },
        [theme.breakpoints.only('sm')]: {
            margin: '0 50px 50px 50px',
            height: "30rem",
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.image?.fluid?.src})`,
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 50px 50px 50px',
            height: "46.25rem",
            backgroundImage: `url(${props.image?.fluid?.src})`,
        },
        [theme.breakpoints.up('lg')]: {
            height: "50rem",
        }
    }),
    textContainer: {
        padding: "1rem 3.75rem 1rem 3.75rem",
        [theme.breakpoints.down('sm')]: {
            textAlign: "center",
        },
        [theme.breakpoints.up('md')]: {
            width: "400px",
            background: 'white',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            height: '43%', // center vertically
            margin: 'auto 0',
        },
        [theme.breakpoints.up('lg')]: {
            width: "500px",
            height: '35%', // center vertically
        },
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
        [theme.breakpoints.only('xs')]: {
            color: '#fff',
            margin: '70px 0px',
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
            textAlign: 'center',
        },
        [theme.breakpoints.only('sm')]: {
            color: '#fff',
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
            margin: '150px 0 100px 0px',
            textAlign: 'center',
        },
        [theme.breakpoints.up('md')]: {
            color: '#000',
            fontSize: '2.5rem',
            lineHeight: '3.0625rem',
            textAlign: 'left',
            margin: '10px 0px',
        }
    },
    description: {
        color: "#4f5057",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            textAlign: "left",
            marginBottom: '40px',
        },
    }
})));

export default function HeroShowCase(props: ShowCaseProps) {
    const classes = useStyles(props);
    const { icon, preTitle, title, description, linkText, linkUrl } = props;
    return (
        <div className={classes.heroShowCase}>
            <div className={classes.textContainer}>
                {icon ? <img src={icon} className={classes.icon} /> : null}
                <h2 className={classes.preTitle}>{preTitle}</h2>
                <h3 className={classes.title}>{title}</h3>
                <p className={classes.description}>{description}</p>
                <ButtonLink text={linkText} url={linkUrl} />
            </div>
        </div>
    );
};
