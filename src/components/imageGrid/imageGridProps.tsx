import { FluidObject } from "gatsby-image";

export type ImageGridImage = {
    // Consumers can set either fluid (gatsby) or imageUrl
    fluid?: FluidObject;
    imageUrl?: string;
    imageLinkText: string;
    imageLinkUrl: string;
};

export type ImageGridProps = {
    images: ImageGridImage[],
};