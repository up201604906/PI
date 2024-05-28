import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import MyModal from './MyModal';
import { Button } from 'react-bootstrap';
import "../../../styles/Home.css";
import '../../../styles/Projects.css';

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

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

    const fetchProjectTypes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects/types`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjectTypes(data);
      } catch (error) {
        console.error('Error fetching project types:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects/statuses`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatuses(data.map(status => status.status_name));
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchProject();
    fetchProjectTypes();
    fetchUsers();
    fetchStatuses();
  }, [id]);

  const getAssigneeName = (assigneeId) => {
    const member = teamMembers.find(member => member.id === assigneeId);
    return member ? member.name : "Unknown";
  };

  const handleSaveNewItem = async (data) => {
    try {
      let url = '';
      if (modalType === 'Task') {
        url = `http://localhost:4000/projects/assignments`;
      } else if (modalType === 'Member') {
        url = `http://localhost:4000/projects/teamMembers`;
      } else if (modalType === 'Link') {
        url = `http://localhost:4000/projects/sharingLinks`;
      }

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, project_id: id })
      });

      const response = await fetch(`http://localhost:4000/projects/${id}`);
      const updatedData = await response.json();
      setProject(updatedData);
    } catch (error) {
      console.error(`Error saving new ${modalType.toLowerCase()}:`, error);
    } finally {
      setModalOpen(false);
    }
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
          <p> <b>Website:</b> <a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></p>
          <p> <b>Funding:</b> {project.funding}</p>
          <p> <b>Reference:</b> {project.funding_reference}</p>
          <p> <b>External Partners:</b> {project.external_partners}</p>
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
                        className="form-control"
                      />
                      <select
                        value={taskAssignee}
                        onChange={(e) => setTaskAssignee(e.target.value)}
                        className="form-control"
                      >
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={task.due_date}
                        onChange={(e) => task.due_date = e.target.value}
                        className="form-control"
                      />
                      <select
                        value={task.status}
                        onChange={(e) => task.status = e.target.value}
                        className="form-control"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <Button onClick={() => handleSaveTask(task)} variant="primary" className="mt-2">Save</Button>
                      <Button onClick={() => setEditingTask(null)} variant="secondary" className="mt-2">Cancel</Button>
                    </>
                  ) : (
                    <>
                      <p>{task.description}</p>
                      <span>Assigned to: {getAssigneeName(task.assignee)}</span>
                      <div className="action-buttons">
                        <Button className="edit" onClick={() => handleEditTask(task)} variant="link">Edit</Button>
                        <Button className="delete" onClick={() => handleDeleteTask(task)} variant="link">Delete</Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No task assignments available.</p>
            )}
            <Button onClick={() => { setModalType('Task'); setModalOpen(true); }} className="mt-2">Create</Button>
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
                      <Button className="delete" onClick={() => handleDeleteMember(member)} variant="link">Remove</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No team members available.</p>
              )}
              <Button onClick={() => { setModalType('Member'); setModalOpen(true); }} className="mt-2">Add</Button>
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
                          className="form-control"
                        />
                        <input
                          type="text"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          className="form-control"
                        />
                        <Button onClick={() => handleSaveLink(link)} variant="primary" className="mt-2">Save</Button>
                        <Button onClick={() => setEditingLink(null)} variant="secondary" className="mt-2">Cancel</Button>
                      </>
                    ) : (
                      <>
                        <span>{link.link_type} - <a href={link.link_url} target="_blank" rel="noopener noreferrer">{link.link_url}</a></span>
                        <div className="action-buttons">
                          <Button className="edit" onClick={() => handleEditLink(link)} variant="link">Edit</Button>
                          <Button className="delete" onClick={() => handleDeleteLink(link)} variant="link">Delete</Button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>No sharing and communication links available.</p>
              )}
              <Button onClick={() => { setModalType('Link'); setModalOpen(true); }} className="mt-2">Add</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="floating-buttons-container">
        <Link to="/projects/create" className="floating-button">CREATE NEW PROJECT</Link>
      </div>
      <MyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        onSave={handleSaveNewItem}
        teamMembers={teamMembers}
        projectTypes={projectTypes}
        users={users}
        statuses={statuses}
      />
    </div>
  );
};

export default Project;
