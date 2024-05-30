import React, { useState, useEffect } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { fetchUsers, fetchProjectTypes, fetchStatuses, updateUser, deleteUser, updateProjectType, deleteProjectType, updateStatus, deleteStatus } from './api';
import Table from './Table';
import "../../../styles/Projects.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [editMode, setEditMode] = useState({}); // Track edit mode for users, project types, and statuses

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchProjectTypes().then(setProjectTypes);
    fetchStatuses().then(setStatuses);
  }, []);

  const handleEdit = (type, id) => {
    setEditMode({ type, id });
  };

  const handleSave = async (type, id) => {
    let updateFunc;
    let data;

    switch (type) {
      case 'user':
        updateFunc = updateUser;
        data = users.find(user => user.id === id);
        break;
      case 'projectType':
        updateFunc = updateProjectType;
        data = projectTypes.find(type => type.id === id);
        break;
      case 'status':
        updateFunc = updateStatus;
        data = statuses.find(status => status.id === id);
        break;
      default:
        return;
    }

    await updateFunc(id, data);
    setEditMode({});
  };

  const handleDelete = async (type, id) => {
    let deleteFunc;
    let updateState;

    switch (type) {
      case 'user':
        deleteFunc = deleteUser;
        updateState = setUsers;
        break;
      case 'projectType':
        deleteFunc = deleteProjectType;
        updateState = setProjectTypes;
        break;
      case 'status':
        deleteFunc = deleteStatus;
        updateState = setStatuses;
        break;
      default:
        return;
    }

    await deleteFunc(id);
    updateState(prevState => prevState.filter(item => item.id !== id));
  };

  const handleChange = (type, id, field, value) => {
    const updateState = {
      user: setUsers,
      projectType: setProjectTypes,
      status: setStatuses,
    }[type];

    updateState(prevState => prevState.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const userColumns = ["Name", "Contact Email", "Personal Email", "Phone Number", "Permission", "Actions"];
  const userData = users.map(user => [
    editMode.type === 'user' && editMode.id === user.id ? (
      <FormControl
        value={user.name}
        onChange={(e) => handleChange('user', user.id, 'name', e.target.value)}
      />
    ) : (
      user.name
    ),
    editMode.type === 'user' && editMode.id === user.id ? (
      <FormControl
        value={user.contact_email}
        onChange={(e) => handleChange('user', user.id, 'contact_email', e.target.value)}
      />
    ) : (
      user.contact_email
    ),
    editMode.type === 'user' && editMode.id === user.id ? (
      <FormControl
        value={user.personal_email}
        onChange={(e) => handleChange('user', user.id, 'personal_email', e.target.value)}
      />
    ) : (
      user.personal_email
    ),
    editMode.type === 'user' && editMode.id === user.id ? (
      <FormControl
        value={user.phone_number}
        onChange={(e) => handleChange('user', user.id, 'phone_number', e.target.value)}
      />
    ) : (
      user.phone_number
    ),
    editMode.type === 'user' && editMode.id === user.id ? (
      <FormControl
        value={user.permission}
        onChange={(e) => handleChange('user', user.id, 'permission', e.target.value)}
      />
    ) : (
      user.permission
    ),
    editMode.type === 'user' && editMode.id === user.id ? (
      <>
        <Button onClick={() => handleSave('user', user.id)}>Save</Button>
        <Button onClick={() => setEditMode({})}>Cancel</Button>
      </>
    ) : (
      <>
        <Button onClick={() => handleEdit('user', user.id)}>Edit</Button>
        <Button onClick={() => handleDelete('user', user.id)}>Delete</Button>
      </>
    )
  ]);

  const projectTypeColumns = ["Type Name", "Actions"];
  const projectTypeData = projectTypes.map(type => [
    editMode.type === 'projectType' && editMode.id === type.id ? (
      <FormControl
        value={type.type_name}
        onChange={(e) => handleChange('projectType', type.id, 'type_name', e.target.value)}
      />
    ) : (
      type.type_name
    ),
    editMode.type === 'projectType' && editMode.id === type.id ? (
      <>
        <div className="actions">
            <button onClick={() => handleSave('projectType', type.id)}>Save</button>
            <button onClick={() => setEditMode({})}>Cancel</button>
        </div>
      </>
    ) : (
      <>
        <div className="actions">
            <button onClick={() => handleEdit('projectType', type.id)}>Edit</button>
            <button onClick={() => handleDelete('projectType', type.id)}>Delete</button>
        </div>
      </>
    )
  ]);

  const statusColumns = ["Status Name", "Actions"];
  const statusData = statuses.map(status => [
    editMode.type === 'status' && editMode.id === status.id ? (
      <FormControl
        value={status.status_name}
        onChange={(e) => handleChange('status', status.id, 'status_name', e.target.value)}
      />
    ) : (
      status.status_name
    ),
    editMode.type === 'status' && editMode.id === status.id ? (
      <>
        <div className="actions">
            <button onClick={() => handleSave('status', status.id)}>Save</button>
            <button onClick={() => setEditMode({})}>Cancel</button>
        </div>
      </>
    ) : (
      <>
       <div className="actions">
            <button onClick={() => handleEdit('status', status.id)}>Edit</button>
            <button onClick={() => handleDelete('status', status.id)}>Delete</button>
        </div>
      </>
    )
  ]);

  return (
    <div className="project-page">
        <div className="project-content">
        <div className='collaboration-hub'>
        <Table title="Users" columns={userColumns} data={userData} />
        <Table title="Project Types" columns={projectTypeColumns} data={projectTypeData} />
        </div>
        <div className='collaboration-hub'>
        <Table title="Project Statuses" columns={statusColumns} data={statusData} />
        </div>
        </div>
    </div>
  );
};

export default AdminPage;
