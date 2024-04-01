import React from 'react';
import "../../styles/Home.css";
import "../../styles/Inventory.css";

class Table extends React.Component {
    render() {
        const { tableHead, data } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        {tableHead.map((head, index) => <th key={index}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, i) => <td key={i}>{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

class Resources extends React.Component {
    state = {
        resources: [],
    };

    callAPI() {
    fetch("http://localhost:4000/inventory/resources")
        .then((res) => res.json())
        .then((res) => {
            // Convert each object in res into an array, excluding the id, price, and priority
            const resources = res.map(({ id, price, priority, ...resource }) => Object.values(resource));
            this.setState({ resources });
        })
        .catch((err) => console.error(err));
}

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>R</span>esources</div>
                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    <div>
                        <Table title={"Resources"} tableHead={["Name", "Description", "Quantity", "Available", "Supplier", "Room", "Cabinet", "Shelf", "Box"]} data={this.state.resources}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Resources;