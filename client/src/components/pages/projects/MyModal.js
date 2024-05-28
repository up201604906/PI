// MyModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModal = ({ isOpen, onClose, type, onSave }) => {
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
                {/* Populate with team members */}
              </select>
            </>
          )}
          {type === 'Member' && (
            <>
              <label>Name</label>
              <input name="name" type="text" required className="form-control" />
              <label>Field</label>
              <input name="field" type="text" required className="form-control" />
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
