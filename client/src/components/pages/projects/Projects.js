import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import "../../../styles/Home.css";
import "../../../styles/Projects.css";
import { useAuth } from '../../../contexts/AuthContext';

const Projects = () => {
    const { currentUser, permission } = useAuth();
    const [projects, setProjects] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectStatuses, setProjectStatuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all projects
        const fetchProjects = fetch('http://localhost:4000/projects/')
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
    }, []);

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
            <h1>All Projects</h1>
            <div className="projects-list">
                {projects.map(project => (
                    <Link to={`/project/${project.id}`} key={project.id} className="project-card-link">
                        <div className="project-card">
                            <p className="typee">{getProjectTypeName(project.project_type_id)}</p>
                            <h3>{project.name}</h3>
                            <h5>{project.description}</h5>
                            <p>Start Date: {format(new Date(project.start_date), 'dd/MM/yyyy')}</p>
                            <p>Due on: {format(new Date(project.end_date), 'dd/MM/yyyy')}</p>
                            <p className="status">Status: {getProjectStatusName(project.project_status_id)}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {permission === 'admin' && (
                <div className="floating-buttons-container">
                    <Link to="/projects/create" className="floating-button">CREATE NEW PROJECT</Link>
                </div>
            )}
        </div>
    );
};

export default Projects;