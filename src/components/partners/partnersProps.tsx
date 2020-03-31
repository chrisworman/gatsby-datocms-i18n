export type Partner = {
    imageUrl: string; // TODO: gatsby responsive images
    linkUrl: string;
    text: string;
    description: string;
};

export type PartnersProps = {
    partners: Partner[],
};