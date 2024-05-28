import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../../../contexts/AuthContext';
import "../../../styles/Home.css";
import "../../../styles/Theses.css"; 

const MyProjects = () => {
    const { currentUser } = useAuth();
    const [myProjects, setMyProjects] = useState([]);
    const [otherProjects, setOtherProjects] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectStatuses, setProjectStatuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchMyProjects = fetch(`http://localhost:4000/projects/assigned/${currentUser}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch assigned projects');
                }
                return response.json();
            })
            .then(data => {
                setMyProjects(data);
            });

        const fetchAllProjects = fetch('http://localhost:4000/projects')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                return response.json();
            })
            .then(data => {
                const assignedProjectIds = new Set(data.map(project => project.assigned_to).flat());
                const otherProjectsList = data.filter(project => !assignedProjectIds.has(project.id));
                setOtherProjects(otherProjectsList);
            });

        const fetchProjectTypes = fetch('http://localhost:4000/projects/types')
            .then(response => response.json())
            .then(data => setProjectTypes(data));

        const fetchProjectStatuses = fetch('http://localhost:4000/projects/statuses')
            .then(response => response.json())
            .then(data => setProjectStatuses(data));

        Promise.all([fetchMyProjects, fetchAllProjects, fetchProjectTypes, fetchProjectStatuses])
            .then(() => setIsLoading(false))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [currentUser.id]);

    const getProjectTypeName = (typeId) => {
        const type = projectTypes.find(type => type.id === typeId);
        return type ? type.type_name : 'Unknown Type';
    };

    const getProjectStatusName = (statusId) => {
        const status = projectStatuses.find(status => status.id === statusId);
        return status ? status.status_name : 'Unknown Status';
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeFilterChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const filteredMyProjects = myProjects.filter(project => {
        const fieldsToSearch = [project.name, project.description, getProjectTypeName(project.project_type_id), getProjectStatusName(project.project_status_id)];
        return fieldsToSearch.some(field => field ? field.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false);
    }).filter(
        project => typeFilter === '' || project.project_type_id === parseInt(typeFilter)
    ).filter(
        project => statusFilter === '' || project.project_status_id === parseInt(statusFilter)
    );

    const filteredOtherProjects = otherProjects.filter(project => {
        const fieldsToSearch = [project.name, project.description, getProjectTypeName(project.project_type_id), getProjectStatusName(project.project_status_id)];
        return fieldsToSearch.some(field => field ? field.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false);
    }).filter(
        project => typeFilter === '' || project.project_type_id === parseInt(typeFilter)
    ).filter(
        project => statusFilter === '' || project.project_status_id === parseInt(statusFilter)
    );

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const types = [...new Set(myProjects.concat(otherProjects).map(project => project.project_type_id))].filter(typeId => typeId);
    const statuses = [...new Set(myProjects.concat(otherProjects).map(project => project.project_status_id))].filter(statusId => statusId);

    return (
        <div className={"d-flex flex-column"}>
            <div className={"title"}><span>P</span>rojects</div>
            <div id={"search_filters"}>
                <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={searchTerm} onChange={handleSearch} />
                <label>Filter:</label>
                <select value={typeFilter} onChange={handleTypeFilterChange}>
                    <option value="">All Types</option>
                    {types.map((typeId, index) => (
                        <option key={index} value={typeId}>{getProjectTypeName(typeId)}</option>
                    ))}
                </select>
                <select value={statusFilter} onChange={handleStatusFilterChange}>
                    <option value="">All Statuses</option>
                    {statuses.map((statusId, index) => (
                        <option key={index} value={statusId}>{getProjectStatusName(statusId)}</option>
                    ))}
                </select>
                <Link to="/projects/create" className="create-project">
                    <button>Create New Project</button>
                </Link>
            </div>
            <div>
                <h2>My Projects</h2>
                {filteredMyProjects.map((project) => {
                    const { id, name, description, start_date, end_date, project_type_id, project_status_id } = project;
                    return (
                        <div className="thesis" key={id}>
                            <Link className="thesis-link" to={`/project/${id}`} key={id}>
                                <div className="line" id="line1">
                                    <div className="title">{name}</div>
                                    <div id="state">
                                        <div className="item"><strong>Type:</strong> {getProjectTypeName(project_type_id)}</div>
                                        <div className="item"><strong>Status:</strong> {getProjectStatusName(project_status_id)}</div>
                                    </div>
                                </div>
                                <div className="description">{description}</div>
                                <div className="line" id="line2">
                                    <div className="item"><strong>Start Date:</strong> {format(new Date(start_date), 'dd/MM/yyyy')}</div>
                                    <div className="item"><strong>Due Date:</strong> {format(new Date(end_date), 'dd/MM/yyyy')}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
                <h2>All Projects</h2>
                {filteredOtherProjects.map((project) => {
                    const { id, name, description, start_date, end_date, project_type_id, project_status_id } = project;
                    return (
                        <div className="thesis" key={id}>
                            <Link className="thesis-link" to={`/project/${id}`} key={id}>
                                <div className="line" id="line1">
                                    <div className="title">{name}</div>
                                    <div id="state">
                                        <div className="item"><strong>Type:</strong> {getProjectTypeName(project_type_id)}</div>
                                        <div className="item"><strong>Status:</strong> {getProjectStatusName(project_status_id)}</div>
                                    </div>
                                </div>
                                <div className="description">{description}</div>
                                <div className="line" id="line2">
                                    <div className="item"><strong>Start Date:</strong> {format(new Date(start_date), 'dd/MM/yyyy')}</div>
                                    <div className="item"><strong>Due Date:</strong> {format(new Date(end_date), 'dd/MM/yyyy')}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyProjects;
