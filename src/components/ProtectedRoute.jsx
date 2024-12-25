import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiresAuth = true }) {
    const { user } = useAuth();

    if (requiresAuth && !user) {
        return <Navigate to="/login" />;
    }

    if (!requiresAuth && user) {
        return <Navigate to="/products" />;
    }

    return children;
}

export default ProtectedRoute; 