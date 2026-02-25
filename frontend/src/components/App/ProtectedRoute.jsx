import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({children}) {
    const {isAuthenticated, isLoading} = useAuth();
    if(isLoading) {
        return <h1 className='bg-slate-900'>Loading...</h1>;
    }
    if(!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    else {
        return <>{children}</>
    }
}
