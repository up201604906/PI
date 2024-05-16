import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../../styles/Home.css";
import '../../../styles/Projects.css'; 

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the project details
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div className="project-page">
      <div className="project-header">
        <h1>{project.name}</h1>
        <p>Acronym: {project.acronym}</p>
        <p>Status: {project.state}</p>
        <p>Website: <a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></p>
        <p>Funding: {project.funding} (${project.funding_reference.toLocaleString()})</p>
        <p>External Partners: {project.external_partners}</p>
        <p>Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
        <p>Due on: {new Date(project.end_date).toLocaleDateString()}</p>
      </div>
      <div className="project-content">
        <div className="task-assignments">
          <h2>Task Assignments</h2>
          {/* Dummy data for tasks */}
          {[
            { id: 1, description: 'Task 1: Initial Research', assignee: 'Maria' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' },
            { id: 2, description: 'Task 2: Data Collection', assignee: 'Joao' }
          ].map(task => (
            <div key={task.id} className="task-card">
              <p>{task.description}</p>
              <span>Assigned to: {task.assignee}</span>
            </div>
          ))}
          <button>Create</button>
        </div>
        <div className="history">
          <h2>History</h2>
          {/* Dummy data for history */}
          {[
            { id: 1, description: 'Maria created the project' },
            { id: 2, description: 'Maria invited Joao' }
          ].map(event => (
            <p key={event.id}>{event.description}</p>
          ))}
        </div>
        <div className="collaboration-hub">
          <h2>Collaboration Hub</h2>
          <div className="members">
            <h3>Members</h3>
            {/* Dummy data for members */}
            {[
              { id: 1, name: 'Maria', role: 'Robotics Researcher' },
              { id: 2, name: 'Joao', role: 'AI Researcher' },
              { id: 3, name: 'Pedro', role: 'Student' }
            ].map(member => (
              <div key={member.id} className="member-card">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
            <button>Add</button>
          </div>
          <div className="sharing-communication">
            <h3>Sharing & Communication</h3>
            <div className="communication-item">
              <span>GD Folder - SHARED_IA</span>
            </div>
            <div className="communication-item">
              <span>Slack Channel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
