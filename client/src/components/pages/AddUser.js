import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const roles = ["student", "collaborator", "admin"];

function AddUser() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [permission, setPermission] = useState(roles[0]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, password, confPass, permission})
            });
            console.log(JSON.stringify({name, email, password, permission}))
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // This line throws if the response is not JSON
            navigate('/user/' + data.user_id); // Redirect on successful login
        } catch (error) {
            alert('Login failed: ' + (error.message || 'Unknown error'));
        }
    };


    return (
        <form className="w-25 mx-auto" onSubmit={handleSubmit}>
            <h1 className="title text-center">Add User</h1>

            <div className="form-group my-5 mx-auto w-75">
                <label className="fw-bold">Name</label>
                <input type="name" className="form-control" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="form-group my-5 mx-auto w-75">
                <label className="fw-bold">Email</label>
                <input type="email" className="form-control" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-group my-5 mx-auto w-75">
                <label className="fw-bold">Password</label>
                <input type="password" className="form-control" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="form-group my-5 mx-auto w-75">
                <label className="fw-bold">Confirm Password</label>
                <input type="password" className="form-control" value={confPass}
                       onChange={(e) => setConfPass(e.target.value)}/>
            </div>

            <div className="form-group my-5 mx-auto w-75">
                <label className="fw-bold">Permission</label>
                <select className="form-control" value={permission}
                        onChange={(e) => setPermission(e.target.value)}>
                    {roles.map(role => (
                        <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                    ))}
                </select>
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-primary my-3 fw-bold">Submit</button>
            </div>
        </form>
    );

}

export default AddUser;