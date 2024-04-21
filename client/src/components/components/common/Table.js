import React from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Topnav.css';

class Table extends React.Component {

    capitalizeFirstLetter = (string) => {
        return string.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    render() {
        const {title, tableHead, data, seeMore} = this.props; // Destructure props

        const capitalizedTitle = this.capitalizeFirstLetter(title);

        return (
            <>
                <div className={"d-flex flex-row justify-content-between table-title"}>
                    <div>
                        {capitalizedTitle.split(" ").map((word, index) => (
                            <span key={index} className={"sub-title"}>
                                <span style={{color: "#E5470E"}}>{word.charAt(0)}</span>{word.slice(1)}
                                {index !== capitalizedTitle.split(" ").length - 1 && " "} {/* Add a space if not the last word */}
                            </span>
                        ))}
                    </div>
                    <Link to={seeMore}>See More</Link>
                </div>

                <div id={"table"} className={"d-flex flex-column"}>
                    <div id="table-head" className={"d-flex flex-row justify-content-around fw-bold text-uppercase"}>
                        {tableHead.map((item, index) => (
                            <div key={index} className={"text-center"}>{item}</div>
                        ))}
                    </div>
                    <div id="table-body" className={"d-flex flex-column"}>
                        {data.map((item, index) => (
                            <div key={index} className={"d-flex flex-row justify-content-between my-3"}>
                                <div><Link to={item.href} className={"text-truncate"}>{item.title}</Link></div>
                                <div className={"text-center"}>{item.author || item.type}</div>
                                <div className={"text-center"}>{item.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
            ;
    }
}

export default Table;
