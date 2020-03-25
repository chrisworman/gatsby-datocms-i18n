import React from "react";
import CallToActionProps from "./CallToActionProps";

const TwoColumnCallToAction = (props: CallToActionProps) => {
    const { icon, preTitle, title, description, linkText, linkUrl, image} = props;
    return (
        <div className="call-to-action">
            <div className="call-to-action-col-left">
                {icon ? <img className="call-to-action-icon" src={icon} /> : null}
                <h2 className="call-to-action-pretitle">{preTitle}</h2>
                <h3 className="call-to-action-title">{title}</h3>
                <p className="call-to-action-description">{description}</p>
                <a className="call-to-action-link" href={linkUrl}>{linkText}</a>
            </div>
            <div className="call-to-action-col-right">
                <img className="call-to-action-image" src={image} />
            </div>
            <div style={{clear: "left"}}></div>
        </div>
    );
};

export default TwoColumnCallToAction;
