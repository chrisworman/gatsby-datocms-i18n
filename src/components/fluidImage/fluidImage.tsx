import React from "react";
import { FluidImageProps } from "./fluidImageProps";
import { makeStyles } from "@material-ui/core";
import Image from 'gatsby-image';

const useStyles = makeStyles(theme => ({
    responsiveImage: {
        maxWidth : '100%',
        height: 'auto',
    },
}));

export default function FluidImage(props: FluidImageProps) {
    const classes = useStyles();
    const { fluid, imageUrl, alt } = props;
    if (fluid) { // Prefer gatsby fluid images for better UX / SEO
        return <Image alt={alt} fluid={fluid} />;
    } else if (imageUrl) {
        return <img alt={alt} className={classes.responsiveImage} src={imageUrl} />;
    } else {
        return null;
    }
}