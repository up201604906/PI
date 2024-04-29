import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import "../../styles/App.css";

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
    const [user, setUser] = useState({name: '', email: '', permission: '', picture: ''});
    const [articles, setArticles] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        getUserData(id);
        getUserProjects(id);
    }, [id]);

    function getUserData(userId) {
        console.log(userId)
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

    function profileData() {
        return (
            <div>
                <div className="container">
                    <div className={"d-flex flex-row mb-3"}>
                        <div className={"title"}>{user.name} Profile</div>
                        <button className={"btn-primary rounded ms-5"}>
                            Edit Profile
                        </button>
                        <button className={"btn-secondary rounded ms-5"}>
                            Delete User
                        </button>
                    </div>

                    <div className="profile-picture">
                        {/*<img src={this.user.picture} alt="Profile Picture"/>*/}
                    </div>
                    <div className="profile-info">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.permission}</p>
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
            {profileData()}
            {userProjects()}
        </div>
    );
}

export default UserProfile;