import React, {useState} from 'react';
import {useAuth} from '../../../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';


function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
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
        <form className="w-25 mx-auto" onSubmit={handleSubmit}>
            <h1 className="title text-center">Login</h1>

            <div className="form-group my-5 mx-auto w-75">
                <label className="fw-bold">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-group my-5 mx-auto w-75">
                <label className="fw-bold">Password</label>
                <input type="password" className="form-control" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-primary my-3 fw-bold">Login</button>
            </div>
        </form>
    );
}

export default Login;
