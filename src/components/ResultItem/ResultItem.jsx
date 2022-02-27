import React from 'react';
import "./resultItem.css";

export const ResultItems = ({ results }) => {
    const parsedResults = results.map(result => {
        const obj = {};
        Object.keys(result).map(key => {
            obj[key] = result[key].raw;
        });
        return obj;
    });
    return parsedResults.map(result => {

        return <ResultItem
            key={result.id}
            {...result}
        />
    })
};

export const ResultItem = ({
    name, type, description, role,
    facebook, twitter, linkedin, signal, crunchbase,
    investment_portfolio, location, organization_url, mediatech, angel, organization, interests, stage, deal_size
}) => {
    const availableInfoSections = [];
    // location 
    // portfolio companies
    // segments, investory types
    if (!!description) {
        // do nothing.
    }
    if (!!location) {
        availableInfoSections.push({
            title: "Location",
            content: location
        });
    }
    if (!!interests) {
        availableInfoSections.push({
            title: "Interests",
            content: interests
        });
    }
    if (!!stage) {
        availableInfoSections.push({
            title: "Stage",
            content: stage
        });
    }
    if (!!deal_size) {
        availableInfoSections.push({
            title: "Deal Size",
            content: deal_size
        });
    }
    if (!!investment_portfolio) {
        availableInfoSections.push({
            title: "Portfolio Companies",
            content: investment_portfolio
        });
    }

    const navigate = link => {
        window.open(link, '_blank');
    }

    const availableData = (investment_portfolio !== '' || location !== '' || interests !== '' || stage !== '' || deal_size !== '');
    let socialLinks = [
        {
            name: "mediatech",
            link: mediatech,
            icon: require("../../assets/images/MtvLogo.png"),
        },
        {
            name: "Facebook",
            link: facebook,
            icon: require("../../assets/images/facebook.png"),
        },
        {
            name: "Twitter",
            link: twitter,
            icon: require("../../assets/images/twitter.png"),
        },
        {
            name: "LinkedIn",
            link: linkedin,
            icon: require("../../assets/images/linkedin.png"),
        },
        {
            name: "Signal",
            link: signal,
            icon: require("../../assets/images/signal.png"),
        },
        {
            name: "Crunchbase",
            link: crunchbase,
            icon: require("../../assets/images/crunchbase.png"),
        }
        , {
            name: "angel",
            link: angel,
            icon: require("../../assets/images/angel.png")
        }
    ];

    socialLinks = socialLinks.map(socialLink => {
        const link = socialLink.link;
        const isValid = link !== "" && link !== null && link !== undefined;
        return {
            ...socialLink,
            isValid
        }
    });

    const primaryLinks = {
        companyProfile: {
            link: organization_url,
            isValid: organization_url !== "" && organization_url !== null && organization_url !== undefined,
        },
        individualProfile: {
            link: "",
            isValid: false,
        }
    }

    return (

        <div className="profile-card-wrapper">

            <div className="profile-card">

                <div className="profile-card-main-section">
                    <div className="profile-title">
                        <div className="title">{name}</div>
                        <div className="type">{organization}</div>
                    </div>
                    <div className="profile-details">
                        <div className="detail-section">
                            <div className="detail-section-label">{type && 'Type:'}</div>
                            <div className={`detail-section-value ${type || 'dim'}`}>
                                {type}
                            </div>
                        </div>
                        <div className="detail-section">
                            <div className="detail-section-label">{role && 'Role:'}</div>
                            <div className={`detail-section-value ${role || 'dim'}`}>
                                {role}
                            </div>
                        </div>
                        {
                            !!description && (
                                <div className="detail-section">
                                    <div className="detail-section-label">{'Bio:'}</div>
                                    <div className="detail-section-value">{description}</div>
                                </div>
                            )
                        }
                        <div className="detail-section">
                            <div className="detail-section-label">
                                {availableData && 'Info:'}
                            </div>
                            <div className="detail-section-value">
                                <div className="detail-section-sub-values">
                                    {availableInfoSections.content === null ? '' :
                                        availableInfoSections.map((item, index) => (

                                            <div
                                                key={index}
                                                className="detail-section-sub-value"
                                            >

                                                {item.title}: {item.content}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-action-section">
                    <div className="profile-actions-left-section">
                        <div className="profile-action social-links">
                            {
                                socialLinks.map((socialLink, index) => (
                                    <div key={index} className={`social-link ${!socialLink.isValid && 'dim'}`} onClick={socialLink.isValid ? () => navigate(socialLink.link) : null}>
                                        <img src={socialLink.icon} alt={socialLink.name} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};




// [
//     "country",
//     "organization_url",
//     "role",
//     "regions",
//     "city",
//     "facebook",
//     "description",
//     "linkedin",
//     "type",
//     "crunchbase",
//     "twitter",
//     "deso",
//     "stage",
//     "organization",
//     "name",
//     "member",
//     "mediatech",
//     "location",
//     "state",
//     "interests",
//     "signal",
//     "investment_portfolio",
//     "deal_size",
//     "id"
// ];

