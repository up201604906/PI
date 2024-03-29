import React from 'react';
import "../../styles/Home.css";
import Table from "../components/common/Table";
import { getResources } from './../../../../backend/api/src/controllers/resources_controller';

class Resources extends React.Component {
    state = {
        resources: [],
    };

    componentDidMount() {
        getResources()
            .then(resources => this.setState({ resources }))
            .catch(error => console.error("Error fetching resources:", error));
    }

    render() {
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