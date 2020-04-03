import React from "react";
import { FC } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ButtonLink from "../buttonLink/buttonLink";
import { ImageGridProps } from "./imageGridProps";
import FluidImage from '../fluidImage/fluidImage'

const useStyles = makeStyles(theme => ({
    gridContainer: {
        padding: '20px',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
    },
    buttonLinkContainer: {
        position: 'absolute',
        bottom: '30px',
        width: '100%',
        textAlign: 'center',
    },
}));
  
const ImageGrid : FC<ImageGridProps> = props => {
    const { images } = props;
    if (!images || images.length === 0) {
        return null;
    }

    const classes = useStyles();
    return (
        <div className={classes.gridContainer}>
            <Grid container spacing={4}>
                {
                    images.map((imageGridImage, index) => {
                        const { image, imageLinkText, imageLinkUrl } = imageGridImage;
                        return (
                            <Grid xs={12} sm item key={index}>
                                <div className={classes.imageContainer}>
                                    <FluidImage { ... image } />
                                    <div className={classes.buttonLinkContainer}>
                                        <ButtonLink text={imageLinkText} url={imageLinkUrl} />
                                    </div>
                                </div>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
    );
};

export default ImageGrid;