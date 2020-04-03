import { FluidObject } from "gatsby-image";

// Consumers must set either fluid or imageUrl
export type FluidImageProps = {
    fluid?: FluidObject;
    imageUrl?: string;
    alt?: string;
};
