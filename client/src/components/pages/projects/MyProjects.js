import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../../../styles/Home.css";
import '../../../styles/Projects.css';

const MyProjects = () => {
    const { id } = useParams();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/projects/assigned/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                return response.json();
            })
            .then(data => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [id]);

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
                        <h3>{project.title}</h3>
                        <p>Status: {project.status}</p>
                        <Link to={`/project/${project.id}`} className="btn">View Project</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProjects;
