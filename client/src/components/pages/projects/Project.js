import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import "../../../styles/Home.css";
import '../../../styles/Projects.css';

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProject(data);
        setTeamMembers(data.teamMembers); // Assuming team members are included in the project response
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const getAssigneeName = (assigneeId) => {
    const member = teamMembers.find(member => member.id === assigneeId);
    return member ? member.name : "Unknown";
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setTaskDescription(task.description);
    setTaskAssignee(task.assignee); // Assuming assignee_id is the field for the member's id
  };

  const handleSaveTask = async (task) => {
    try {
      await fetch(`http://localhost:4000/projects/assignments/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...task, description: taskDescription, assignee_id: taskAssignee })
      });
      const response = await fetch(`http://localhost:4000/projects/${id}`);
      const data = await response.json();
      setProject(data);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (task) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetch(`http://localhost:4000/projects/assignments/${task.id}`, {
          method: 'DELETE'
        });
        const response = await fetch(`http://localhost:4000/projects/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEditLink = (link) => {
    setEditingLink(link.id);
    setLinkDescription(link.link_type);
    setLinkUrl(link.link_url);
  };

  const handleSaveLink = async (link) => {
    try {
      await fetch(`http://localhost:4000/projects/sharingLinks/${link.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...link, link_type: linkDescription, link_url: linkUrl })
      });
      const response = await fetch(`http://localhost:4000/projects/${id}`);
      const data = await response.json();
      setProject(data);
      setEditingLink(null);
    } catch (error) {
      console.error('Error saving link:', error);
    }
  };

  const handleDeleteLink = async (link) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await fetch(`http://localhost:4000/projects/sharingLinks/${link.id}`, {
          method: 'DELETE'
        });
        const response = await fetch(`http://localhost:4000/projects/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  const handleDeleteMember = async (member) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
        await fetch(`http://localhost:4000/projects/teamMembers/${member.id}`, {
          method: 'DELETE'
        });
        const response = await fetch(`http://localhost:4000/projects/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error removing member:', error);
      }
    }
  };

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
        <div className="header-left">
          <h1>{project.name}</h1>
          <p>Acronym: {project.acronym}</p>
          <p>Status: {project.state}</p>
        </div>
        <div className="header-center">
          <p>Website: <a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></p>
          <p>Funding Reference: {project.funding} (${parseInt(project.funding_reference).toLocaleString()})</p>
          <p>External Partners: {project.external_partners}</p>
        </div>
        <div className="header-right">
          <p>Start Date: {format(new Date(project.start_date), 'dd/MM/yyyy')}</p>
          <p>Due on: {format(new Date(project.end_date), 'dd/MM/yyyy')}</p>
        </div>
      </div>
      <div className="project-content">
        <div className="task-assignments">
          <h2>Task Assignments</h2>
          <div className="scrollable-content">
            {project.assignments.length > 0 ? (
              project.assignments.map(task => (
                <div key={task.id} className="task-card">
                  {editingTask === task.id ? (
                    <>
                      <input
                        type="text"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                      />
                      <select
                        value={taskAssignee}
                        onChange={(e) => setTaskAssignee(e.target.value)}
                      >
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleSaveTask(task)}>Save</button>
                      <button onClick={() => setEditingTask(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>{task.description}</p>
                      <span>Assigned to: {getAssigneeName(task.assignee)}</span>
                      <div className="action-buttons">
                        <button className="edit" onClick={() => handleEditTask(task)}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteTask(task)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No task assignments available.</p>
            )}
            <button>Create</button>
          </div>
        </div>
        <div className="history">
          <h2>History</h2>
          <div className="scrollable-content">
            {project.history && project.history.length > 0 ? (
              project.history.map(event => (
                <p key={event.id}>{event.description}</p>
              ))
            ) : (
              <p>No history available.</p>
            )}
          </div>
        </div>
        <div className="collaboration-hub">
          <h2>Collaboration Hub</h2>
          <div className="members">
            <h3>Members</h3>
            <div className="scrollable-content">
              {teamMembers.length > 0 ? (
                teamMembers.map(member => (
                  <div key={member.id} className="member-card">
                    <h4>{member.name}</h4>
                    <p>{member.field}</p>
                    <div className="action-buttons">
                      <button className="delete" onClick={() => handleDeleteMember(member)}>Remove</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No team members available.</p>
              )}
              <button>Add</button>
            </div>
          </div>
          <div className="sharing-communication">
            <h3>Sharing & Communication</h3>
            <div className="scrollable-content">
              {project.sharingLinks.length > 0 ? (
                project.sharingLinks.map(link => (
                  <div key={link.id} className="communication-item">
                    {editingLink === link.id ? (
                      <>
                        <input
                          type="text"
                          value={linkDescription}
                          onChange={(e) => setLinkDescription(e.target.value)}
                        />
                        <input
                          type="text"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                        />
                        <button onClick={() => handleSaveLink(link)}>Save</button>
                        <button onClick={() => setEditingLink(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <span>{link.link_type} - <a href={link.link_url} target="_blank" rel="noopener noreferrer">{link.link_url}</a></span>
                        <div className="action-buttons">
                          <button className="edit" onClick={() => handleEditLink(link)}>Edit</button>
                          <button className="delete" onClick={() => handleDeleteLink(link)}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>No sharing and communication links available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
