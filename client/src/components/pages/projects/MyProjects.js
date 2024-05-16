import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import "../../../styles/Home.css";
import '../../../styles/Projects.css';

const MyProjects = () => {
    const { id } = useParams();
    const [projects, setProjects] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectStatuses, setProjectStatuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch project data
        const fetchProjects = fetch(`http://localhost:4000/projects/assigned/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                return response.json();
            })
            .then(data => {
                setProjects(data);
            });

        // Fetch project types
        const fetchProjectTypes = fetch('http://localhost:4000/projects/types')
            .then(response => response.json())
            .then(data => setProjectTypes(data));

        // Fetch project statuses
        const fetchProjectStatuses = fetch('http://localhost:4000/projects/statuses')
            .then(response => response.json())
            .then(data => setProjectStatuses(data));

        // Wait for all fetches to complete
        Promise.all([fetchProjects, fetchProjectTypes, fetchProjectStatuses])
            .then(() => setIsLoading(false))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [id]);

    // Helper function to get project type name
    const getProjectTypeName = (typeId) => {
        const type = projectTypes.find(type => type.id === typeId);
        return type ? type.type_name : 'Unknown Type';
    };

    // Helper function to get project status name
    const getProjectStatusName = (statusId) => {
        const status = projectStatuses.find(status => status.id === statusId);
        return status ? status.status_name : 'Unknown Status';
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="my-projects-page">
            <h1>My Projects</h1>
            <div className="projects-list">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <p className="typee">{getProjectTypeName(project.project_type_id)}</p>
                        <h3>{project.name}</h3>
                        <h5>{project.description}</h5>
                        <p>Start Date: {format(new Date(project.start_date), 'dd/MM/yyyy')}</p>
                        <p>Due on: {format(new Date(project.end_date), 'dd/MM/yyyy')}</p>
                        
                        <Link to={`/project/${project.id}`} className="btn btn-primary">View Project</Link>
                        <p className="status">Status: {getProjectStatusName(project.project_status_id)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProjects;
