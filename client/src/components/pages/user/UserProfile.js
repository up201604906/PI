import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import "../../../styles/App.css";

const projectTypes = ["Type 1", "Type 2", "Type 3", "Type 4"];
const projectStatus = ["Ongoing", "Finished"];

class Table extends React.Component {

    render() {
        const projects = [
            {
                id: 1,
                title: "Project 1",
                type: "Type 1",
                status: "Ongoing",
            },
            {
                id: 2,
                title: "Project 2",
                type: "Type 2",
                status: "Finished"
            }
        ]

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
                        <td><Link to={"http://localhost:3000/project/" + project.id}>{project.title}</Link></td>
                        <td>
                            <select defaultValue={project.type}>
                                {projectTypes.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select defaultValue={project.status}>
                                {projectStatus.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

class Filters extends React.Component {
    render() {

        return (
            <div id={"search_filters"}>
                <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'}/>
                <label>Filters:</label>
                <select>
                    <option value="">All Types</option>
                    {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                <select>
                    <option value="">All Status</option>
                    {projectStatus.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        )
    }
}

function UserProfile() {
    const [user, setUser] = useState({
        name: '',
        contact_email: '',
        personal_email: '',
        phone_number: '',
        permission: '',
        picture: ''
    });
    const [articles, setArticles] = useState([]);
    const [allAreas, setAllAreas] = useState([]);
    const [areas, setAreas] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEditing) {
            getUserData(id);
            getUserProjects(id);
            getUserAreas(id)
        }
    }, [id, isEditing]);

    function getUserData(userId) {
        fetch(`http://localhost:4000/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(err => console.error("Error fetching user:", err));
    }

    function getUserProjects(userId) {
        fetch(`http://localhost:4000/articles?userId=${encodeURIComponent(userId)}`)
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(err => console.error("Error fetching articles:", err));
    }

    function getUserAreas(userId) {
        fetch(`http://localhost:4000/user-areas/${userId}`)
            .then(response => response.json())
            .then(data => setAreas(data))
            .catch(err => console.error("Error fetching user areas:", err));
        console.log(areas)
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

    const removeArea = (index) => {
        setAreas(areas.filter((_, i) => i !== index));
    };

    function profileData() {
        return (
            <div className="col-7">
                <div className={"d-flex flex-row justify-content-between mb-3"}>
                    <div className={"title"}>{user.name} Profile</div>
                    {isEditing ? (
                        <>
                            <button className="btn-primary rounded ms-5" onClick={saveUser}>Save</button>
                            <button className="btn-secondary rounded ms-5"
                                    onClick={() => setIsEditing(false)}>Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={"btn-primary rounded ms-5"} onClick={() => setIsEditing(true)}>
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
                <h1 className={"title text-end"}>
                    Areas of Interest
                </h1>
                <div className={"container"}>
                    <div className={"d-flex flex-row justify-content-end align-items-center"}>
                        {areas.map((area, index) => (
                            <div key={index} className={"badgeArea rounded-pill me-2 d-flex flex-row"}>
                                {area.type_name}
                                {isEditing && (
                                    <button className={"ms-1 square-icon-btn rounded-circle"}
                                            onClick={() => removeArea(index)}>
                                        <i className="bi bi-x-lg btn-primary square-icon-btn rounded-circle"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                        {areas.length < 5 && isEditing &&
                            <div className={"badgeArea rounded-pill me-2 p-2 d-flex flex-row btn-secondary"}>
                                <button className={"square-icon-btn"}>
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    function userProjects() {
        return (
            <div>
                <div className="container">
                    <div className={"d-flex flex-row mb-3"}>
                        <div className={"title"}>{user.name} Projects</div>
                        <button className={"btn-primary rounded ms-5"}>See All</button>
                    </div>

                    <div className="projects">
                        <Filters/>
                        <Table/>
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


/*
        const handleDelete = () => {
            fetch(`http://localhost:4000/user/${user.id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        navigate("/user-mgmt");
                    }
                })
                .catch(err => console.error("Error deleting user:", err));
        };

        function deleteModal() {
            return (
                <>
                    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog d-flex align-self-center" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this user?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn-secondary rounded" data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn-primary rounded ms-3" data-bs-dismiss="modal"
                                            onClick={handleDelete}>Delete User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn-secondary rounded ms-5" data-bs-toggle="modal"
                            data-bs-target="#deleteModal">
                        Delete User
                    </button>
                </>
            )
        }*/