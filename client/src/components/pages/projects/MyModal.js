import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModal = ({ isOpen, onClose, type, onSave, teamMembers, projectTypes, users, statuses }) => {
  const [isDigi2Member, setIsDigi2Member] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (isDigi2Member) {
      setUserList(users);
    }
  }, [isDigi2Member, users]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find(user => user.id === parseInt(userId, 10));
    setSelectedUser(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onSave(data);
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Add New ${type}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {type === 'Task' && (
            <>
              <label>Description</label>
              <input name="description" type="text" required className="form-control" />
              <label>Assignee</label>
              <select name="assignee_id" required className="form-control">
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <label>Due Date</label>
              <input name="due_date" type="date" required className="form-control" />
              <label>Status</label>
              <select name="status" required className="form-control">
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </>
          )}
          {type === 'Member' && (
            <>
              <label>Name</label>
              <input name="name" type="text" required className="form-control" value={selectedUser ? selectedUser.name : ''} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} readOnly={isDigi2Member} />
              <label>Field</label>
              <select name="field" required className="form-control" defaultValue="">
                {projectTypes.map(type => (
                  <option key={type.id} value={type.type_name}>
                    {type.type_name}
                  </option>
                ))}
              </select>
              <label>Contact Email</label>
              <input name="contact_email" type="email" required className="form-control" value={selectedUser ? selectedUser.contact_email : ''} onChange={(e) => setSelectedUser({ ...selectedUser, contact_email: e.target.value })} readOnly={isDigi2Member} />
              <label>Personal Email</label>
              <input name="personal_email" type="email" className="form-control" value={selectedUser ? selectedUser.personal_email : ''} onChange={(e) => setSelectedUser({ ...selectedUser, personal_email: e.target.value })} readOnly={isDigi2Member} />
              <label>Phone Number</label>
              <input name="phone_number" type="text" required className="form-control" value={selectedUser ? selectedUser.phone_number : ''} onChange={(e) => setSelectedUser({ ...selectedUser, phone_number: e.target.value })} readOnly={isDigi2Member} />
              <label>
                <input 
                  type="checkbox" 
                  checked={isDigi2Member} 
                  onChange={(e) => setIsDigi2Member(e.target.checked)} 
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
              <input name="link_type" type="text" required className="form-control" />
              <label>URL</label>
              <input name="link_url" type="url" required className="form-control" />
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
