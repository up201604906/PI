import React, {useEffect, useState} from 'react';
import '../../styles/Home.css'
import { initializeCounters } from '../../scripts/Home.js';
import HomeStats from "../components/home/HomeStats";
import {Link} from "react-router-dom";


function Table({projects, projectTypes}) {
    return (
        projects && projectTypes ?
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project, index) => (
                    <tr key={index}>
                        <td><Link to={`/project/${project.id}`}>{project.acronym}</Link></td>
                        <td>
                            {projectTypes.find(area => area.id === project.project_type_id)?.type_name}
                        </td>
                        <td>{project.state}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            : null
    );
}


export default function Dashboard() {

    const [projects, setProjects] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const filteredProjectTypes = projectTypes.filter(type =>
        projects.some(project => project.project_type_id === type.id)
    );

    useEffect(() => {
        initializeCounters();
        fetchProjects();
        fetchProjectTypes();
    }, []);

    function fetchProjects() {
        fetch('http://localhost:4000/projects/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                return response.json();
            })
            .then(data => {
                // Shuffle array
                for (let i = data.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [data[i], data[j]] = [data[j], data[i]];
                }
                // Set the first 5 elements
                setProjects(data.slice(0, 5));
            });
    }

    function fetchProjectTypes() {
        fetch('http://localhost:4000/projects/types')
            .then(response => response.json())
            .then(data => setProjectTypes(data));
    }

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>O</span>verview</div>
                <HomeStats/>

                <div id={"info"} className={"d-flex flex-column justify-content-around w-100"}>
                    <div className={"d-flex flex-row justify-content-between table-title w-100 mb-3 px-3"}>
                        <div className={"title"}>Recent Projects</div>
                    </div>
                    <Table projects={projects} projectTypes={filteredProjectTypes}/>
                </div>

            </div>
        );

}
