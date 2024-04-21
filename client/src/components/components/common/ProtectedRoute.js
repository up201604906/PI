
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or some other loading indicator
    }

    return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
