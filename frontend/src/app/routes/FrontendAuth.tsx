import { useUserInfoQuery } from '../../features/account/accountApi'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function FrontendAuth() {
    const { data: user, isLoading } = useUserInfoQuery();
    const location = useLocation();

    if (isLoading) return <div>Loading...</div>

    // if not authenticated then redirect
    if (!user) {
        return <Navigate to={'/login'} state={{ from: location }} />
    }

    // otherwise render children component
    return (
        <Outlet />
    )
}
