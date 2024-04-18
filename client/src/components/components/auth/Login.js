import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('admin'); // Set default permission or provide a selector
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password, email, permission })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // This line throws if the response is not JSON
            login(data.user, data.token); // Adjust according to your AuthContext setup
            navigate('/'); // Redirect on successful login
        } catch (error) {
            alert('Login failed: ' + (error.message || 'Unknown error'));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                {/* If needed, add an input for 'permission' or handle it differently */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
