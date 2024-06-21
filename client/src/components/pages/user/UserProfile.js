import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import "../../../styles/App.css";

function Table({projects, projectTypes}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project, index) => (
                <tr key={index}>
                    <td><Link to={`/project/${project.id}`}>{project.acronym}</Link></td>
                    <td>
                        {projectTypes.find(area => area.id === project.project_type_id)?.type_name}
                    </td>
                    <td>{project.state}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function Filters({projectTypes, selectedType, onTypeChange}) {
    return (
        <div id="search_filters">
            <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'}/>
            <label>Filters:</label>
            <select value={selectedType} onChange={onTypeChange}>
                <option value="">All Types</option>
                {projectTypes.map((type, index) => (
                    <option key={index} value={type.id}>{type.type_name}</option>
                ))}
            </select>
        </div>
    );
}

function UserProfile() {
    const [user, setUser] = useState({
        id: '',
        name: '',
        contact_email: '',
        personal_email: '',
        phone_number: '',
        permission: '',
        picture: ''
    });

    const [allAreas, setAllAreas] = useState([]);
    const [areas, setAreas] = useState([]);

    const [projects, setProjects] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);

    const [selectedType, setSelectedType] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        if (!isEditing) {
            getUserData(id);
            fetchAndFilterAreas(id).then(r => r);

            fetchUserProjects(id);
            fetchProjectTypes();
        }
    }, [id, isEditing]);

    function getUserData(userId) {
        fetch(`http://localhost:4000/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(err => console.error("Error fetching user:", err));
    }

    async function getUserAreas(userId) {
        try {
            const response = await fetch(`http://localhost:4000/user-areas/${userId}`);
            const userData = await response.json();
            setAreas(userData);
            return userData;
        } catch (err) {
            console.error("Error fetching user areas:", err);
        }
    }

    async function getAllAreas() {
        try {
            const response = await fetch(`http://localhost:4000/areas`);
            return await response.json();
        } catch (err) {
            console.error("Error fetching all areas:", err);
            return [];
        }
    }

    async function fetchAndFilterAreas(userId) {
        const userAreas = await getUserAreas(userId);
        const allAreas = await getAllAreas();

        sortAreas(userAreas);
        sortAreas(allAreas);

        const userAreaNames = userAreas.map(area => area.type_name);

        const filteredAreas = allAreas.filter(area => !userAreaNames.includes(area.type_name));

        setAllAreas(filteredAreas);
    }

    function fetchUserProjects(userId) {
        fetch(`http://localhost:4000/projects/assigned/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                return response.json();
            })
            .then(data => {
                setProjects(data);
            });
    }

    function fetchProjectTypes() {
        fetch('http://localhost:4000/projects/types')
            .then(response => response.json())
            .then(data => setProjectTypes(data));
    }

    function saveUser() {
        const combinedData = {
            ...user,
            areas
        };
        fetch(`http://localhost:4000/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedData),
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setIsEditing(false); // Exit edit mode
            })
            .catch(err => console.error("Error updating user:", err));
    }

    function sortAreas(areas) {
        areas.sort((a, b) => {
            const typeA = a.type_name.toUpperCase(); // ignore upper and lowercase
            const typeB = b.type_name.toUpperCase(); // ignore upper and lowercase

            if (typeA < typeB) {
                return -1;
            }
            if (typeA > typeB) {
                return 1;
            }
            return 0;
        });
    }

    const handleSelectChange = (type_name) => {
        if (type_name) {
            setAreas((prevAreas) => {
                const newAreas = [...prevAreas, {type_name: type_name}];

                sortAreas(newAreas);

                setAllAreas(prevAllAreas => prevAllAreas.filter(area => area.type_name !== type_name));

                return newAreas;
            });
        }
    };

    const removeArea = (areaName) => {
        setAreas((prevAreas) => {
            return prevAreas.filter((area) => area.type_name !== areaName);
        });

        setAllAreas((prevAllAreas) => {
            return [...prevAllAreas, {type_name: areaName}];
        });
        sortAreas(allAreas);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const filteredProjects = projects.filter(project => {
        return selectedType === '' || project.project_type_id.toString() === selectedType.toString();
    });

    const filteredProjectTypes = projectTypes.filter(type =>
        projects.some(project => project.project_type_id === type.id)
    );

    function profileData() {
        return (
            <div className="col-7">
                <div className={"d-flex flex-row mb-3"} style={{gap: '30px'}}>
                    <div className={"title"}>{user.name} Profile</div>
                    {isEditing ? (
                        <>
                            <button 
                                className="btn-primary rounded ms-5" 
                                onClick={saveUser} 
                                style={{height: '40px', padding: 'revert'}}
                            >
                                Save
                            </button>
                            <button 
                                className="btn-secondary rounded ms-5"
                                onClick={() => setIsEditing(false)}
                                style={{height: '40px', padding: 'revert'}}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={"btn-primary rounded ms-5"} onClick={() => setIsEditing(true)} style={{height: '40px', padding: 'revert'}}>
                                Edit Profile
                            </button>
                            {/*deleteModal()*/}
                        </>
                    )}
                </div>
                {dataForm(isEditing)}
            </div>
        );
    }

    function dataForm(isEditing) {
        return (
            <div className="container">
                <div className="profile-info d-flex flex-column">
                    <div className="form-group mb-3 d-inline-flex w-50">
                        <label className={"col-4 fw-bold align-self-center"} htmlFor="nameInput">Name:</label>
                        <input
                            id="nameInput"
                            type="text"
                            className="form-control ms-1"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                            placeholder="Name"
                            disabled={!isEditing}  // Disable input if not editing
                        />
                    </div>
                    <div className="form-group mb-3 d-inline-flex w-50">
                        <label className={"col-4 fw-bold align-self-center"} htmlFor="email1Input">Contact
                            Email:</label>
                        <input
                            id="email1Input"
                            type="email"
                            className="form-control ms-1"
                            value={user.contact_email}
                            onChange={(e) => setUser({...user, contact_email: e.target.value})}
                            placeholder="example@email.com"
                            disabled={!isEditing}  // Disable input if not editing
                        />
                    </div>
                    <div className="form-group mb-3 d-inline-flex w-50">
                        <label className={"col-4 fw-bold align-self-center"} htmlFor="email2Input">Personal
                            Email:</label>
                        <input
                            id="email2Input"
                            type="email"
                            className="form-control ms-1"
                            value={user.personal_email || ""}
                            onChange={(e) => setUser({...user, personal_email: e.target.value})}
                            placeholder="no email"
                            disabled={!isEditing}  // Disable input if not editing
                        />
                    </div>
                    <div className="form-group mb-3 d-inline-flex w-50">
                        <label className={"col-4 fw-bold align-self-center"} htmlFor="phone">Phone Number:</label>
                        <input
                            id="phone"
                            type="phone"
                            className="form-control ms-1"
                            value={user.phone_number || ""}
                            onChange={(e) => setUser({...user, phone_number: e.target.value})}
                            placeholder="no number"
                            disabled={!isEditing}  // Disable input if not editing
                        />
                    </div>
                    <div className="form-group mb-3 d-inline-flex w-50">
                        <label className={"col-4 fw-bold align-self-center"} htmlFor="roleSelect">Role:</label>
                        <select
                            id="roleSelect"
                            className="form-control ms-1"
                            value={user.permission}
                            onChange={(e) => setUser({...user, permission: e.target.value})}
                            disabled={!isEditing}  // Disable select if not editing
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    function researchAreas() {
        return (
            <div>
                <h1 className="title text-end">
                    Areas of Interest
                </h1>
                <div className="container" style={{ marginRight: '-25px' }}>
                    <div className="d-flex flex-row flex-wrap justify-content-end align-items-center">
                        {areas.length < 6 && isEditing && (
                            <div className={"area-dropdown"}>
                                <button type={"button"} className={"btn dropdown-btn m-0 mb-2"}
                                        data-bs-toggle={"dropdown"}
                                        aria-expanded={"false"}>
                                    <i className="bi bi-plus-lg btn-secondary mx-auto py-3 px-3 rounded-circle square-icon-btn"></i>
                                </button>
                                <ul className={"dropdown-menu"}>
                                    {allAreas.map((area, index) => (
                                        <li key={index}>
                                            <button onClick={() => handleSelectChange(area.type_name)}
                                                    className={"dropdown-item"}>
                                                {area.type_name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {areas.map((area, index) => (
                            <div key={index} className="badgeArea rounded-pill me-2 mb-2 d-flex flex-row">
                                {area.type_name}
                                {isEditing && (
                                    <button
                                        className="ms-1 square-icon-btn rounded-circle"
                                        onClick={() => removeArea(area.type_name)}
                                    >
                                        <i className="bi bi-x-lg p-0 btn-primary square-icon-btn rounded-circle"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    function userProjects() {
        return (
            <div>
                <div className="container">
                    <div className={"d-flex flex-row mb-3"}>
                        <div className={"title"}>{user.name} Projects</div>
                        <Link to={`/my-projects/${user.id}`} class={"btn-primary rounded ms-5"}>See All</Link>
                    </div>

                    <div className="projects">
                        <Filters
                            projectTypes={filteredProjectTypes}
                            selectedType={selectedType}
                            onTypeChange={handleTypeChange}
                        />
                        <Table projects={filteredProjects} projectTypes={filteredProjectTypes}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className={"container d-flex flex-row justify-content-between"}>
                {profileData()}
                {researchAreas()}
            </div>
            {userProjects()}
        </div>
    );
}

export default UserProfile;
