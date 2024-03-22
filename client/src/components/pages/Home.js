import React from 'react';
import '../../styles/Home.css'
import { initializeCounters } from '../../scripts/Home.js';
import HomeStats from "../components/home/HomeStats";
import Table from "../components/common/Table";

class Home extends React.Component {
    componentDidMount() {
        initializeCounters(); // Call the function when the component mounts
    }

    render() {
        const tableOne_Head = ["Title", "Type", "Status"];
        const tableOne_Data = [
            {title: "Machine Learning Model", type: "Model Training", status: "Ongoing", href: "/project/1"},
            {title: "Data Pipeline Optimization", type: "Pipeline Optimization", status: "Ongoing", href: "/project/2"},
            {
                title: "Performance Tuning for Data Analysis",
                type: "Query Performance",
                status: "Ongoing",
                href: "/project/3"
            },
            {
                title: "Error Analysis for Image Recognition Software",
                type: "Error Analysis",
                status: "Finished",
                href: "/project/4"
            },
            {
                title: "Feature Engineering for Fruits and Vegetables",
                type: "Feature Engineering",
                status: "Finished",
                href: "/project/5"
            },
        ];

        const tableTwo_Head = ["Title", "Author", "When"];
        const tableTwo_Data = [
            { title: "Notification 1", type: "User 1", status: "01/01/2024", href: "/href/1" },
            { title: "Notification 2", type: "User 2", status: "01/01/2024", href: "/href/2" },
        ];

        const tableThree_Head = ["Title", "Type", "When"];
        const tableThree_Data = [
            { title: "Event 1", type: "User 1", status: "Now", href: "/event/1" },
            { title: "Event 2", type: "User 2", status: "06/06/2024", href: "/event/2" },
        ];

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>O</span>verview</div>
                <HomeStats/>

                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    <Table tableHead={tableOne_Head} data={tableOne_Data}/>
                    <div className={"d-flex flex-column justify-content-between"}>
                        <Table tableHead={tableTwo_Head} data={tableTwo_Data}/>
                        <Table tableHead={tableThree_Head} data={tableThree_Data}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
