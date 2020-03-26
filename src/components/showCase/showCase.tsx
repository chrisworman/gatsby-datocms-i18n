import React from "react";
import ShowCaseProps from "./showCaseProps";
import HeroShowCase from "./heroShowCase";
import OneColumnShowCase from "./oneColumnShowCase";
import TwoColumnShowCase from "./twoColumnShowCase";

const ShowCase = (props: ShowCaseProps) => {
    const { layout } = props;
    switch (layout) {
        case 'Hero':
            return <HeroShowCase {...props} />;
        case 'One Column':
            return <OneColumnShowCase {... props} />;
        case 'Two Column': 
            return <TwoColumnShowCase {... props} />;
        default:
            console.log(`ShowCase layout "${layout}" not recognized.`);
            return null;
    }
};

export default ShowCase;