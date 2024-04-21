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

        const titles = ["Recent Projects", "Notifications", "Events"];
        const links = ["/projects", "/notifications", "/event-mgmt"];
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
            { title: "Notification 1", author: "User 1", status: "01/01/2024", href: "/href/1" },
            { title: "Notification 2", author: "User 2", status: "01/01/2024", href: "/href/2" },
            
        ];

        const tableThree_Head = ["Title", "Type", "When"];
        const tableThree_Data = [
            { title: "Event 1", type: "User 1", status: "Now", href: "/event/1" },
            { title: "Event 2", type: "User 2", status: "06/06/2024", href: "/event/2" },
        ];

        const tableFour_Head = ["Title", "Author", "Year", "Type"];
        const tableFour_Data = [
            { title: "Quantum Computing Advances", author: "Alice Smith", year: 2024, type: "Conference", href: "/article/1" },
            { title: "AI and Ethics", author: "Bob Johnson", year: 2024, type: "Journal", href: "/article/2" }
            
        ];

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>O</span>verview</div>
                <HomeStats/>

                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    {/* Column for Projects and Articles */}
                    <div className={"d-flex flex-column"}>
                        <Table title={titles[0]} tableHead={tableOne_Head} data={tableOne_Data} seeMore={links[0]}/>
                    </div>

                    <div className={"d-flex flex-column justify-content-between"}>
                        <Table title={titles[1]} tableHead={tableTwo_Head} data={tableTwo_Data} seeMore={links[1]}/>
                        <Table title={titles[2]} tableHead={tableThree_Head} data={tableThree_Data} seeMore={links[2]}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default Home;
