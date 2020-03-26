import React from "react";
import ShowCaseProps from "./showCaseProps";

const OneColumnShowCase = (props: ShowCaseProps) => {
    const { icon, preTitle, title, description, linkText, linkUrl, image} = props;
    return (
        <div className="show-case show-case-one-column">
            <div className="show-case-col-left">
                {icon ? <img className="show-case-icon" src={icon} /> : null}
                <h2 className="show-case-pretitle">{preTitle}</h2>
                <h3 className="show-case-title">{title}</h3>
                <p className="show-case-description">{description}</p>
                <a className="show-case-link" href={linkUrl}>{linkText}</a>
            </div>
            <div className="show-case-col-right">
                <img className="show-case-image" src={image} />
            </div>
            <div style={{clear: "left"}}></div>
        </div>
    );
};

export default OneColumnShowCase;
