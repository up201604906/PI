import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModal = ({ isOpen, onClose, type, onSave, teamMembers, projectTypes, users, statuses }) => {
  const [isDigi2Member, setIsDigi2Member] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    name: '',
    field: '',
    email: '',
    optional_email: '',
    capacity: 'Full-time',
    user_id: ''
  });
  const [customField, setCustomField] = useState('');
  const [isCustomField, setIsCustomField] = useState(false);

  const [taskData, setTaskData] = useState({
    description: '',
    assignee_id: '',
    due_date: '',
    status: ''
  });

  const [linkData, setLinkData] = useState({
    link_type: '',
    link_url: ''
  });

  useEffect(() => {
    if (isDigi2Member) {
      setUserList(users);
    } else {
      setSelectedUser({
        name: '',
        field: '',
        email: '',
        optional_email: '',
        capacity: 'Full-time',
        user_id: ''
      });
    }
  }, [isDigi2Member, users]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find(user => user.id === parseInt(userId, 10));
    if (user) {
      setSelectedUser({
        name: user.name,
        field: selectedUser.field,
        email: user.contact_email,
        optional_email: user.personal_email || '',
        capacity: selectedUser.capacity,
        user_id: user.id
      });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === 'field' && value === 'custom') {
      setIsCustomField(true);
      setSelectedUser(prevState => ({
        ...prevState,
        field: ''
      }));
    } else {
      setIsCustomField(false);
      setSelectedUser(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCustomFieldChange = (e) => {
    setCustomField(e.target.value);
    setSelectedUser(prevState => ({
      ...prevState,
      field: e.target.value,
    }));
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLinkData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === 'Task') {
      onSave(taskData);
    } else if (type === 'Link') {
      onSave(linkData);
    } else if (type === 'Member') {
      onSave(selectedUser);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{`Add New ${type}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {type === 'Task' && (
            <>
              <label>Description</label>
              <input name="description" type="text" required className="form-control" onChange={handleTaskChange} />
              <label>Assignee</label>
              <select name="assignee_id" required className="form-control" onChange={handleTaskChange}>
                <option value="">Select an assignee</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <label>Due Date</label>
              <input name="due_date" type="date" required className="form-control" onChange={handleTaskChange} />
              <label>Status</label>
              <select name="status" required className="form-control" onChange={handleTaskChange}>
                <option value="">Select status</option>
                {statuses.map(status => (
                  <option key={status.id} value={status.status_name}>
                    {status.status_name}
                  </option>
                ))}
              </select>
            </>
          )}
          {type === 'Member' && (
            <>
              <label>Name</label>
              <input
                name="name"
                type="text"
                required
                className="form-control"
                value={selectedUser.name}
                onChange={handleFieldChange}
                readOnly={isDigi2Member}
              />
              <label>Field</label>
              <select
                name="field"
                required
                className="form-control"
                value={isCustomField ? 'custom' : selectedUser.field}
                onChange={handleFieldChange}
              >
                <option value="">Select a field</option>
                <option value="custom">Custom</option>
                {projectTypes.map(type => (
                  <option key={type.id} value={type.type_name}>
                    {type.type_name}
                  </option>
                ))}
              </select>
              {isCustomField && (
                <input
                  name="custom_field"
                  type="text"
                  required
                  className="form-control mt-2"
                  placeholder="Enter custom field"
                  value={customField}
                  onChange={handleCustomFieldChange}
                />
              )}
              <label>Email</label>
              <input
                name="email"
                type="email"
                required
                className="form-control"
                value={selectedUser.email}
                onChange={handleFieldChange}
                readOnly={isDigi2Member}
              />
              <label>Optional Email</label>
              <input
                name="optional_email"
                type="email"
                className="form-control"
                value={selectedUser.optional_email}
                onChange={handleFieldChange}
                readOnly={isDigi2Member}
              />
              <label>Capacity</label>
              <select
                name="capacity"
                required
                className="form-control"
                value={selectedUser.capacity}
                onChange={handleFieldChange}
              >
                <option value="">Select capacity</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
              <label>
                <input 
                  type="checkbox" 
                  checked={isDigi2Member} 
                  onChange={(e) => {
                    setIsDigi2Member(e.target.checked);
                    if (!e.target.checked) {
                      setSelectedUser({
                        name: '',
                        field: '',
                        email: '',
                        optional_email: '',
                        capacity: 'Full-time',
                        user_id: ''
                      });
                    }
                  }} 
                />
                Is DIGI2 Member
              </label>
              {isDigi2Member && (
                <select name="user_id" required className="form-control" onChange={handleUserChange}>
                  <option value="">Select a user</option>
                  {userList.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
          {type === 'Link' && (
            <>
              <label>Type</label>
              <input name="link_type" type="text" required className="form-control" onChange={handleLinkChange} />
              <label>URL</label>
              <input name="link_url" type="url" required className="form-control" onChange={handleLinkChange} />
            </>
          )}
          <Button type="submit" variant="primary" className="mt-2">Save</Button>
          <Button type="button" onClick={onClose} variant="secondary" className="mt-2">Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
