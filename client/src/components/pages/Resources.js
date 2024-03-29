import React from 'react';
import "../../styles/Home.css";

class Table extends React.Component {
    render() {
        const { title, tableHead, data, seeMore } = this.props;

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
        fetch("http://localhost:4000/")
          .then((res) => res.json())
          .then((res) => this.setState({ resources: res }))
          .catch((err) => err);
    }

    componentDidMount() { // Changed from componentWillMount to componentDidMount
        this.callAPI();
    }

    render() {
        console.log(this.state.resources);
        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>R</span>esources</div>
                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    <div>
                        <Table title={"Resources"} tableHead={["Name", "Description", "Quantity", "Available", "Supplier", "Room", "Cabinet", "Shelf", "Box", "Price", "Priority"]} data={this.state.resources} seeMore={""}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Resources;