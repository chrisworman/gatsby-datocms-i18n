export type ImageGridImage = {
    imageUrl: string; // TODO: gatsby responsive images
    imageLinkText: string;
    imageLinkUrl: string;
};

export type ImageGridProps = {
    images: ImageGridImage[],
};