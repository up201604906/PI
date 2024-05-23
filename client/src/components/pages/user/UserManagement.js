import React from 'react';
import {Link} from "react-router-dom";
import "../../../styles/Home.css";
import "../../../styles/Inventory.css";

const roles = ["Student", "Collaborator", "Admin"];


class Table extends React.Component {

    render() {
        const { users } = this.props;
        console.log(users);

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td><Link to={"http://localhost:3000/user/"+user.id}>{user.name}</Link></td>
                        <td>{user.email}</td>
                        <td>
                            <select defaultValue={user.permission.charAt(0).toUpperCase() + user.permission.slice(1)}>
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                        </td>
                        <td className="actions">
                            <button>Edit</button>
                            <button>Delete</button>
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
                    <option value="">All Roles</option>
                    {roles.map((role, index) => (
                        <option key={index} value={role}>{role}</option>
                    ))}
                </select>
                <Link to="/add-user" className="create-resource">
                    <button>Add User</button>
                </Link>
            </div>
        )
    }
}

class UserManagement extends React.Component {
    state = {
        users: []
    };

    getUsers() {
        fetch(`http://localhost:4000/user-mgmt`)
            .then(res => res.json())
            .then(users => {
                this.setState({ users });
            })
            .catch(err => console.error("Error fetching user:", err));
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>U</span>sers</div>
                <Filters/>
                <Table users={this.state.users}/>  {/* Pass users as props */}
            </div>
        );
    }
}


export default UserManagement;