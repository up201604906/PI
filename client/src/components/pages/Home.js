import React, { useEffect, useState } from 'react';
import '../../styles/Home.css';
import { initializeCounters } from '../../scripts/Home.js';
import HomeStats from "../components/home/HomeStats";
import Table from "../components/common/Table";

const Home = () => {
    const [recentProjects, setRecentProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        initializeCounters();

        fetch('http://localhost:4000/projects/recent/5')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch recent projects');
                }
                return response.json();
            })
            .then(data => {
                setRecentProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recent projects:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const titles = ["Recent Projects", "Notifications", "Events"];
    const links = ["/projects", "/notifications", "/event-mgmt"];
    const tableOne_Head = ["Title", "Type", "Status"];
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

    const tableFour_Head = ["Title", "Author", "Year", "Type"];
    const tableFour_Data = [
        { title: "Quantum Computing Advances", author: "Alice Smith", year: 2024, type: "Conference", href: "/article/1" },
        { title: "AI and Ethics", author: "Bob Johnson", year: 2024, type: "Journal", href: "/article/2" }
    ];

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const mappedRecentProjects = recentProjects.map(project => ({
        title: project.name,
        type: project.type_name,
        status: project.status_name,
        href: `/project/${project.id}`
    }));

    return (
        <div className={"d-flex flex-column"}>
            <div className={"title"}><span>O</span>verview</div>
            <HomeStats />

            <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                {/* Column for Projects and Articles */}
                <div className={"d-flex flex-column"}>
                    <Table title={titles[0]} tableHead={tableOne_Head} data={mappedRecentProjects} seeMore={links[0]} />
                </div>

                <div className={"d-flex flex-column justify-content-between"}>
                    <Table title={titles[1]} tableHead={tableTwo_Head} data={tableTwo_Data} seeMore={links[1]} />
                    <Table title={titles[2]} tableHead={tableThree_Head} data={tableThree_Data} seeMore={links[2]} />
                </div>
            </div>
        </div>
    );
};

export default Home;
