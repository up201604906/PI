import React from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Sidenav.css';

class Table extends React.Component {
    render() {
        const {tableHead, data} = this.props; // Destructure props

        return (
            <div id={"table"} className={"d-flex flex-column"}>
                <div id="table-head" className={"d-flex flex-row justify-content-around fw-bold text-uppercase"}>
                    {tableHead.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
                <div id="table-body" className={"d-flex flex-column"}>
                    {data.map((item, index) => (
                        <div key={index} className={"d-flex flex-row justify-content-between my-3"}>
                            <div><Link to={item.href} className={"text-truncate"}>{item.title}</Link></div>
                            <div className={"text-center"}>{item.type}</div>
                            <div className={"text-center"}>{item.status}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Table;
