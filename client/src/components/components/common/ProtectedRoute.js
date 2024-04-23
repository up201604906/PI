import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();

    console.log("Current User:", currentUser);
    console.log("Is Loading:", isLoading);

    if (isLoading) {
        return <div>Loading...</div>; // Or some other loading indicator
    }

    return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
