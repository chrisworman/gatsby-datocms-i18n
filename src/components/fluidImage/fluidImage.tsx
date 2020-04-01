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
    const { fluid, imageUrl } = props;
    if (fluid) { // Prefer gatsby fluid images for better UX
        return <Image fluid={fluid} />;
    } else if (imageUrl) {
        return <img className={classes.responsiveImage} src={imageUrl} />
    } else {
        return null;
    }
}