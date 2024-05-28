import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { format } from 'date-fns';

const EditModal = ({ isOpen, onClose, project, projectTypes, projectStatuses, onSave }) => {
  const [projectData, setProjectData] = useState({
    name: project.name,
    acronym: project.acronym,
    description: project.description,
    website: project.website,
    start_date: format(new Date(project.start_date), 'yyyy-MM-dd'),
    end_date: format(new Date(project.end_date), 'yyyy-MM-dd'),
    funding: project.funding,
    funding_reference: project.funding_reference,
    external_partners: project.external_partners,
    project_type_id: project.project_type_id,
    project_status_id: project.project_status_id
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(projectData);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={projectData.name} onChange={handleChange} required className="form-control" />
          </label>
          <label>
            Acronym:
            <input type="text" name="acronym" value={projectData.acronym} onChange={handleChange} required className="form-control" />
          </label>
          <label>
            Description:
            <textarea name="description" value={projectData.description} onChange={handleChange} maxLength="100" required className="form-control" />
          </label>
          <label>
            Website:
            <input type="url" name="website" value={projectData.website} onChange={handleChange} className="form-control" />
          </label>
          <label>
            Start Date:
            <input type="date" name="start_date" value={projectData.start_date} onChange={handleChange} required className="form-control" />
          </label>
          <label>
            End Date:
            <input type="date" name="end_date" value={projectData.end_date} onChange={handleChange} required className="form-control" />
          </label>
          <label>
            Funding:
            <input type="text" name="funding" value={projectData.funding} onChange={handleChange} className="form-control" />
          </label>
          <label>
            Funding Reference Code:
            <input type="text" name="funding_reference" value={projectData.funding_reference} onChange={handleChange} className="form-control" />
          </label>
          <label>
            External Partners:
            <input type="text" name="external_partners" value={projectData.external_partners} onChange={handleChange} className="form-control" />
          </label>
          <label>
            Project Type:
            <select name="project_type_id" value={projectData.project_type_id} onChange={handleChange} required className="form-control">
              <option value="">Select a type</option>
              {projectTypes.map(type => (
                <option key={type.id} value={type.id}>{type.type_name}</option>
              ))}
            </select>
          </label>
          <label>
            Project Status:
            <select name="project_status_id" value={projectData.project_status_id} onChange={handleChange} required className="form-control">
              <option value="">Select a status</option>
              {projectStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.status_name}</option>
              ))}
            </select>
          </label>
          <Button type="submit" variant="primary" className="mt-2">Save Changes</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
