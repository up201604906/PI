import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../../../styles/Home.css";
import "../../../styles/Create.css";

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    acronym: '',
    description: '',
    state: '',
    website: '',
    start_date: '',
    end_date: '',
    funding: '',
    funding_reference: '',
    external_partners: '',
    project_type_id: '',
    project_status_id: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:4000/projects/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    })
    .then(() => {
      window.location.href = '/projects';
    })
    .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className={"title"}><span>C</span>reate <span>P</span>roject</div>
      <div className={"create-form"}>
        <Link to="/projects" className="go-back">←</Link>
        <form onSubmit={handleSubmit}>
          <div className={"subtitle"}>New Project</div>
          <label>
            Name:
            <input type="text" name="name" value={projectData.name} onChange={handleChange} required />
          </label>
          <label>
            Acronym:
            <input type="text" name="acronym" value={projectData.acronym} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={projectData.description} onChange={handleChange} required />
          </label>
          <label>
            State:
            <input type="text" name="state" value={projectData.state} onChange={handleChange} required />
          </label>
          <label>
            Website:
            <input type="url" name="website" value={projectData.website} onChange={handleChange} />
          </label>
          <label>
            Start Date:
            <input type="date" name="start_date" value={projectData.start_date} onChange={handleChange} required />
          </label>
          <label>
            End Date:
            <input type="date" name="end_date" value={projectData.end_date} onChange={handleChange} required />
          </label>
          <label>
            Funding:
            <input type="text" name="funding" value={projectData.funding} onChange={handleChange} />
          </label>
          <label>
            Funding Reference:
            <input type="text" name="funding_reference" value={projectData.funding_reference} onChange={handleChange} />
          </label>
          <label>
            External Partners:
            <input type="text" name="external_partners" value={projectData.external_partners} onChange={handleChange} />
          </label>
          <button type="submit">Create Project</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
