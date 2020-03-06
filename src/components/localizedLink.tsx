import { Link } from "gatsby";
import React from "react";

type LocalizedLinkProps = {
    locale: string;
    to: string;
};

const DEFAULT_LOCALE = "en";

class LocalizedLink extends React.Component<LocalizedLinkProps> {
    render() {
        const { locale, to, children } = this.props;
        const localePrefix = !locale || locale === DEFAULT_LOCALE ? "" : `/${locale}`;
        return <Link to={`${localePrefix}${to}`}>{children}</Link>;
    }
}

export default LocalizedLink;