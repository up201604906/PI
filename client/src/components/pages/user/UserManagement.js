import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const roles = ["Student", "Collaborator", "Admin"];

function Table({ users }) {
    return (
        <table>
            <thead>
            <tr>
                <th style={{ width: '35%'}}>Name</th>
                <th style={{ width: '35%'}}>Email</th>
                <th style={{ width: '20%'}}>Role</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td><Link to={`/user/${user.id}`} className={"truncate-title"}>{user.name}</Link></td>
                    <td>{user.contact_email} </td>
                    <td>{user.permission.charAt(0).toUpperCase() + user.permission.slice(1)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function Filters({ selectedRole, onRoleChange, searchTerm, onSearchChange }) {
    return (
        <div id={"search_filters"}>
            <input
                type="text"
                placeholder={'\uD83D\uDD0E\uFE0E Search...'}
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
            />
            <label>Filters:</label>
            <select value={selectedRole} onChange={e => onRoleChange(e.target.value)}>
                <option value="">All Roles</option>
                {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                ))}
            </select>
            <Link to="/add-user" className="create-resource btn-primary">
                Add User
            </Link>
        </div>
    )
}

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/user-mgmt`)
            .then(res => res.json())
            .then(setUsers)
            .catch(err => console.error("Error fetching user:", err));
    }, []);

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const filteredUsers = users.filter(user => {
        const matchesRole = selectedRole ? user.permission.toLowerCase() === selectedRole.toLowerCase() : true;
        const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.contact_email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRole && matchesSearchTerm;
    });

    return (
        <div className={"d-flex flex-column"}>
            <div className={"title"}><span>U</span>sers</div>
            <Filters
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />
            <Table users={filteredUsers} />
            {filteredUsers.length === 0 &&
                <div className={"mx-auto title mt-5"}>Oops... no users found</div>
            }
        </div>
    );
}
