import React from 'react';

class HomeStats extends React.Component {

    projStats = [
        {text: "Active Investigations", num: 12},
        {text: "Completed Investigations", num: 53},
        {text: "Investigation Types", num: 2},
        {text: "Investigation Tags", num: 3},
    ]

    render() {
        return (
            <div className={"d-flex flex-wrap justify-content-around"}>
                {this.projStats.map((item, index) => (
                    <div key={index} className={"counter-container col-5 col-md-2 mb-3"}>
                        <span>{item.text}</span>
                        <div className={"counter"} data-target={item.num}></div>
                    </div>
                ))}

            </div>
        );
    }
}


export default HomeStats