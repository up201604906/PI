import React from 'react';
import {Link} from 'react-router-dom';
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

class UserProfile extends React.Component {
    state = {
        user: {
            name: '',
            email: '',
            permission: '',
            picture: '' // Replace this with the path to the actual profile picture
        },
        articles: [],
    };

    getUserData() {
        const userId = localStorage.getItem('user');
        if (userId) {
            fetch(`http://localhost:4000/user/${userId}`)
                .then(res => res.json())
                .then(user => {
                    console.log("Fetched user:", user);
                    this.setState({ user });
                })
                .catch(err => console.error("Error fetching user:", err));
        } else {
            console.error("User ID not found in local storage.");
        }
    }

    getUserProjects() {
        const userId = localStorage.getItem('user');
        if (userId) {
            fetch(`http://localhost:4000/articles?userId=${encodeURIComponent(userId)}`)
                .then(res => res.json())
                .then(articles => {
                    console.log("Fetched articles:", articles);
                    this.setState({ articles });
                })
                .catch(err => console.error("Error fetching articles:", err));
        } else {
            console.error("User ID not found in local storage.");
        }
    }


    componentDidMount() {
        this.getUserData();
        this.getUserProjects();
    }

    profileData = () => {
        return (
            <div>
                <div className="container">
                    <div className={"d-flex flex-row mb-3"}>
                        <div className={"title"}>User Profile</div>
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
                        <p><strong>Name:</strong> {this.state.user.name}</p>
                        <p><strong>Email:</strong> {this.state.user.email}</p>
                        <p><strong>Role:</strong> {this.state.user.permission}</p>
                    </div>
                </div>
            </div>
        )
    }

    userProjects = () => {
        return (
            <div>
                <div className="container">
                    <div className={"d-flex flex-row mb-3"}>
                        <div className={"title"}>User Projects</div>
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

    render() {
        console.log("current state:", this.state);
        return (
            <div>
                {this.profileData()}
                {this.userProjects()}
            </div>
        );
    }
}

export default UserProfile;