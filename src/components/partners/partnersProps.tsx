import { FluidObject } from "gatsby-image";
import { FluidImageProps } from "../fluidImage/fluidImageProps";

export type Partner = {
    image: FluidImageProps;
    linkUrl: string;
    text: string;
    description: string;
};

export type PartnersProps = {
    partners: Partner[],
};