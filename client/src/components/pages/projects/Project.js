import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import MyModal from './MyModal';
import EditModal from './EditModal';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext'; // Import useAuth hook
import "../../../styles/Projects.css";

const Table = ({ title, columns, data }) => (
  <div className="">
    <div className='title'>
      <span>{title}</span>
    </div>
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { currentUser, permission } = useAuth(); // Access current user and their permissions
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const [projectRes, projectTypesRes, usersRes, statusesRes] = await Promise.all([
          fetch(`http://localhost:4000/projects/${id}`),
          fetch(`http://localhost:4000/projects/types`),
          fetch(`http://localhost:4000/projects/users`),
          fetch(`http://localhost:4000/projects/statuses`)
        ]);

        const projectData = await projectRes.json();
        const projectTypesData = await projectTypesRes.json();
        const usersData = await usersRes.json();
        const statusesData = await statusesRes.json();

        setProject({
          ...projectData,
          assignments: projectData.assignments || [],
          sharingLinks: projectData.sharingLinks || []
        });
        setTeamMembers(projectData.teamMembers || []); // Assuming team members are included in the project response
        setProjectTypes(projectTypesData);
        setUsers(usersData);
        setStatuses(statusesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

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

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, project_id: id })
      });

      const newItem = await response.json();

      if (modalType === 'Task') {
        setProject(prevProject => ({
          ...prevProject,
          assignments: [...prevProject.assignments, newItem]
        }));
      } else if (modalType === 'Member') {
        setProject(prevProject => ({
          ...prevProject,
          teamMembers: [...prevProject.teamMembers, newItem]
        }));
      } else if (modalType === 'Link') {
        setProject(prevProject => ({
          ...prevProject,
          sharingLinks: [...prevProject.sharingLinks, newItem]
        }));
      }

    } catch (error) {
      console.error(`Error saving new ${modalType.toLowerCase()}:`, error);
    } finally {
      setModalOpen(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTaskDescription(task.description);
    setTaskAssignee(task.assignee); // Use task.assignee instead of task.assignee_id
    setTaskDueDate(format(new Date(task.due_date), 'yyyy-MM-dd'));
    setTaskStatus(task.status);
  };

  const handleSaveTask = async () => {
    const taskData = { 
        description: taskDescription, 
        assignee: taskAssignee, 
        due_date: taskDueDate, 
        status: taskStatus 
    };

    //console.log('Data being sent:', taskData);

    try {
      const response = await fetch(`http://localhost:4000/projects/assignments/${editingTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        setProject(prevProject => ({
          ...prevProject,
          assignments: prevProject.assignments.map(t =>
            t.id === editingTaskId ? { ...t, description: taskDescription, assignee: taskAssignee, due_date: taskDueDate, status: taskStatus } : t
          )
        }));

        setEditingTaskId(null);
      } else {
        console.error('Error saving task:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };


  const handleEditLink = (link) => {
    setEditingLinkId(link.id);
    setLinkDescription(link.link_type);
    setLinkUrl(link.link_url);
  };

  const handleSaveLink = async () => {
    try {
      const response = await fetch(`http://localhost:4000/projects/sharingLinks/${editingLinkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link_type: linkDescription, link_url: linkUrl })
      });

      if (response.ok) {
        setProject(prevProject => ({
          ...prevProject,
          sharingLinks: prevProject.sharingLinks.map(l =>
            l.id === editingLinkId ? { ...l, link_type: linkDescription, link_url: linkUrl } : l
          )
        }));

        setEditingLinkId(null);
      } else {
        console.error('Error saving link:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving link:', error);
    }
  };

  const handleDeleteTask = async (task) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`http://localhost:4000/projects/assignments/${task.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setProject(prevProject => ({
            ...prevProject,
            assignments: prevProject.assignments.filter(t => t.id !== task.id)
          }));
        } else {
          console.error('Error deleting task:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleDeleteLink = async (link) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        const response = await fetch(`http://localhost:4000/projects/sharingLinks/${link.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setProject(prevProject => ({
            ...prevProject,
            sharingLinks: prevProject.sharingLinks.filter(l => l.id !== link.id)
          }));
        } else {
          console.error('Error deleting link:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  const handleDeleteMember = async (member) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
        const response = await fetch(`http://localhost:4000/projects/teamMembers/${member.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setProject(prevProject => ({
            ...prevProject,
            teamMembers: prevProject.teamMembers.filter(m => m.id !== member.id)
          }));
        } else {
          console.error('Error removing member:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing member:', error);
      }
    }
  };

  const getProjectStatusName = (statusId) => {
    const status = statuses.find(status => status.id === statusId);
    return status ? status.status_name : 'Unknown Status';
  };

  const handleSaveProject = async (updatedProjectData) => {
    try {
      const response = await fetch(`http://localhost:4000/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProjectData)
      });

      if (response.ok) {
        setProject(prevProject => ({
          ...prevProject,
          ...updatedProjectData
        }));
        setEditModalOpen(false);
      } else {
        console.error('Error saving project:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`http://localhost:4000/projects/${project.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          navigate(-1);
        } else {
          console.error('Error deleting project:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting project:', error);
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

  const taskColumns = ["Description", "Assignee", "Due Date", "Status"];
  if (permission === 'admin') {
    taskColumns.push("Actions");
  }

  const taskData = (project.assignments || []).map(task => [
    editingTaskId === task.id ? (
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
    ) : (
      task.description
    ),
    editingTaskId === task.id ? (
      <select value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)}>
        <option value="">Select an assignee</option>
        {teamMembers.map(member => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </select>
    ) : (
      teamMembers.find(member => member.id === task.assignee)?.name || "Unknown"
    ),
    editingTaskId === task.id ? (
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
      />
    ) : (
      format(new Date(task.due_date), 'dd/MM/yyyy')
    ),
    editingTaskId === task.id ? (
      <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
        <option value="">Select status</option>
        {statuses.map(status => (
          <option key={status.id} value={status.status_name}>{status.status_name}</option>
        ))}
      </select>
    ) : (
      task.status
    ),
    ...(permission === 'admin' ? [
      editingTaskId === task.id ? (
        <>
          <div className="actions">
            <button variant="link" onClick={handleSaveTask}>Save</button>
            <button variant="link" onClick={() => setEditingTaskId(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="actions">
            <button variant="link" onClick={() => handleEditTask(task)}>Edit</button>
            <button variant="link" onClick={() => handleDeleteTask(task)}>Delete</button>
          </div>
        </>
      )
    ] : [])
  ]);


  const historyColumns = ["Event"];
  const historyData = [];

  const memberColumns = ["Name", "Field", "Email", "Alternative Email", "Capacity"];
  if (permission === 'admin') {
    memberColumns.push("Actions");
  }

  const memberData = teamMembers.map(member => [
    member.name,
    member.field,
    member.email,
    member.optional_email,
    member.capacity,
    ...(permission === 'admin' ? [
      <div className="actions">
        <button onClick={() => handleDeleteMember(member)}>Remove</button>
      </div>
    ] : [])
  ]);


  const linkColumns = ["Type", "URL"];
  if (permission === 'admin') {
    linkColumns.push("Actions");
  }

  const linkData = (project.sharingLinks || []).map(link => [
    editingLinkId === link.id ? (
      <input
        type="text"
        value={linkDescription}
        onChange={(e) => setLinkDescription(e.target.value)}
      />
    ) : (
      link.link_type
    ),
    editingLinkId === link.id ? (
      <input
        type="text"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
      />
    ) : (
      <a href={link.link_url} target="_blank" rel="noopener noreferrer">{link.link_url}</a>
    ),
    ...(permission === 'admin' ? [
      editingLinkId === link.id ? (
        <>
          <div className="actions">
            <button onClick={handleSaveLink}>Save</button>
            <button onClick={() => setEditingLinkId(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="actions">
            <button onClick={() => handleEditLink(link)}>Edit</button>
            <button onClick={() => handleDeleteLink(link)}>Delete</button>
          </div>
        </>
      )
    ] : [])
  ]);


  return (
    <div className="project-page">
      <div className="project-header">
        <div className="header-left">
          <h1>{project.name}</h1>
          <p>Description: {project.description}</p>
          <p>Acronym: <b>{project.acronym}</b></p>
          <p className="status">Status: {getProjectStatusName(project.project_status_id)}</p>
        </div>
        <div className="header-center">
          <p><b>Website:</b> <a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></p>
          <p><b>Funding:</b> {project.funding}</p>
          <p><b>Reference:</b> {project.funding_reference}</p>
          <p><b>External Partners:</b> {project.external_partners}</p>
        </div>
        <div className="header-right">
          <p>Start Date: {format(new Date(project.start_date), 'dd/MM/yyyy')}</p>
          <p>Due on: {format(new Date(project.end_date), 'dd/MM/yyyy')}</p>
          {permission === 'admin' && (
            <Button onClick={() => setEditModalOpen(true)}>EDIT PROJECT</Button>
          )}
        </div>
      </div>
      <div className="project-content">
        <div className='collaboration-hub'>
          <Table title="Task Assignments" columns={taskColumns} data={taskData} />
          {permission === 'admin' && (
            <Button onClick={() => { setModalType('Task'); setModalOpen(true); }} className="mt-2 add-button">Create</Button>
          )}
        </div>
        <div className="collaboration-hub">
          <Table title="Members" columns={memberColumns} data={memberData} />
          {permission === 'admin' && (
            <Button onClick={() => { setModalType('Member'); setModalOpen(true); }} className="mt-2 add-button">Add</Button>
          )}
          <Table title="Sharing & Communication" columns={linkColumns} data={linkData} />
          {permission === 'admin' && (
            <Button onClick={() => { setModalType('Link'); setModalOpen(true); }} className="mt-2 add-button">Add</Button>
          )}
        </div>
      </div>
      {permission === 'admin' && (
        <div className="floating-buttons-container">
          <Link to="/projects/create" className="floating-button">CREATE NEW PROJECT</Link>
          <button onClick={handleDeleteProject} className="floating-button delete-button">DELETE THIS PROJECT</button>
        </div>
      )}
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
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={project}
        projectTypes={projectTypes}
        projectStatuses={statuses}
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default Project;
