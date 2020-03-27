import React from "react";
import ShowCaseProps from "./showCaseProps";
import { makeStyles } from '@material-ui/core/styles';
import ButtonLink from '../buttonLink';

const useStyles = makeStyles((theme => ({
    heroShowCase: (props: ShowCaseProps) => ({
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        flex: '0 0 75%',
        marginBottom: '50px',
        [theme.breakpoints.up('xs')]: {
            height: "36.25rem",
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.image})`,
        },
        [theme.breakpoints.up('sm')]: {
            height: "46.25rem",
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.image})`,
        },
        [theme.breakpoints.up('md')]: {
            height: "46.25rem",
            padding: "3.75rem 0",
            backgroundImage: `url(${props.image})`,
        }
    }),
    textContainer: {
        padding: "6.25rem 3.75rem 5rem 0",
        [theme.breakpoints.up('xs')]: {
            textAlign: "center",
        },
        [theme.breakpoints.up('md')]: {
            width: "66%",
            background: 'white',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
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
            color: '#fff',
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
        },
        [theme.breakpoints.up('md')]: {
            color: '#000',
            fontSize: '2.5rem',
            lineHeight: '3.0625rem',
        }
    },
    description: {
        color: "#4f5057",
        paddingLeft: "1.875rem",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            textAlign: "left",
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
                {/* TODO: gatsby responsive image */}
            </div>
        </div>
    );
};
