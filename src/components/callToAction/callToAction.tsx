import React from "react";
import CallToActionProps from "./CallToActionProps";
import HeroCallToAction from "./heroCallToAction";
import OneColumnCallToAction from "./oneColumnCallToAction";
import TwoColumnCallToAction from "./twoColumnCallToAction";

const CallToAction = (props: CallToActionProps) => {
    const { layout } = props;
    switch (layout) {
        case 'Hero':
            return <HeroCallToAction {...props} />;
        case 'One Column':
            return <OneColumnCallToAction {... props} />;
        case 'Two Column': 
            return <TwoColumnCallToAction {... props} />;
        default:
            console.log(`CallToAction layout "${layout}" not recognized.`);
            return null;
    }
};

export default CallToAction;