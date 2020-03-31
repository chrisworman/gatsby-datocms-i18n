import React from "react";
import { FC } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ButtonLink from "../buttonLink";
import { ImageGridProps } from "./imageGridProps";

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
                    images.map(image => {
                        return (
                            <Grid xs={12} sm item key={image.imageUrl}>
                                <div className={classes.imageContainer}>
                                    <img src={image.imageUrl} className={classes.image} />
                                    <div className={classes.buttonLinkContainer}>
                                        <ButtonLink text={image.imageLinkText} url={image.imageLinkUrl} />
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