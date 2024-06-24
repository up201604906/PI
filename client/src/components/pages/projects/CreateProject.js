import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/Home.css";
import "../../../styles/Create.css";
import { useAuth } from "../../../contexts/AuthContext";

const CreateProject = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    name: '',
    acronym: '',
    description: '',
    website: '',
    start_date: '',
    end_date: '',
    funding: '',
    funding_reference: '',
    external_partners: '',
    project_type_id: '',
    project_status_id: ''
  });

  const [projectTypes, setProjectTypes] = useState([]);
  const [projectStatuses, setProjectStatuses] = useState([]);

  useEffect(() => {
    // Fetch project types
    fetch('http://localhost:4000/projects/types')
      .then(res => res.json())
      .then(data => setProjectTypes(data))
      .catch(err => console.error('Error fetching project types:', err));

    // Fetch project statuses
    fetch('http://localhost:4000/projects/statuses')
      .then(res => res.json())
      .then(data => setProjectStatuses(data))
      .catch(err => console.error('Error fetching project statuses:', err));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const projectDataWithUser = {
      ...projectData,
      user_id: currentUser,
    };
    console.log(projectDataWithUser);

    fetch('http://localhost:4000/projects/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectDataWithUser),
    })
    .then(response => response.json())
    .then(data => {
      // Redirect to the newly created project's page
      navigate(`/projects/`);
    })
    .catch((err) => console.error(err));
  };

  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <div>
      <div className={"title"}><span>C</span>reate <span>P</span>roject</div>
      <div className={"create-form projects"}>
        <a href="#" onClick={handleGoBack} class="go-back">←</a>
        <form onSubmit={handleSubmit}>
          <div className={"subtitle"}>New Project</div>
          <label>
            Name:
            <input type="text" name="name" value={projectData.name} onChange={handleChange} placeholder="" required />
          </label>
          <label>
            Acronym:
            <input type="text" name="acronym" value={projectData.acronym} onChange={handleChange} placeholder="" required />
          </label>
          <label>
            Description:
            <textarea name="description" value={projectData.description} onChange={handleChange} placeholder="A detailed description with 100 words max" maxLength="100" required />
          </label>
          <label>
            Website:
            <input type="url" name="website" value={projectData.website} onChange={handleChange} placeholder="https://digi2.fe.up.pt/digi2/" />
          </label>
          <label>
            Start Date:
            <input type="date" name="start_date" value={projectData.start_date} onChange={handleChange} required />
          </label>
          <label>
            End Date:
            <input type="date" name="end_date" value={projectData.end_date} onChange={handleChange} required />
          </label>
          <div className="form-row">
            <label>
              Funding:
              <input type="text" name="funding" value={projectData.funding} onChange={handleChange} placeholder="eg:. FCT" />
            </label>
            <label>
              Funding Reference Code:
              <input type="text" name="funding_reference" value={projectData.funding_reference} onChange={handleChange} placeholder="" />
            </label>
          </div>
          <label>
            External Partners:
            <input type="text" name="external_partners" value={projectData.external_partners} onChange={handleChange} placeholder="SisTrade, INEGI, IDEPA, Demoscore, IEP, ISEP, CTIC" />
          </label>
          <div className="form-row">
            <label>
              Project Type:
              <select name="project_type_id" value={projectData.project_type_id} onChange={handleChange} required>
                <option value="">Select a type</option>
                {projectTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.type_name}</option>
                ))}
              </select>
            </label>
            <label>
              Project Status:
              <select name="project_status_id" value={projectData.project_status_id} onChange={handleChange} required>
                <option value="">Select a status</option>
                {projectStatuses.map(status => (
                  <option key={status.id} value={status.id}>{status.status_name}</option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Create Project</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
