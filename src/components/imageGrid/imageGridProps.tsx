import { FluidImageProps } from "../fluidImage/fluidImageProps";

export type ImageGridImage = {
    image: FluidImageProps;
    imageLinkText: string;
    imageLinkUrl: string;
};

export type ImageGridProps = {
    images: ImageGridImage[],
};