import {  Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute = () => {
    const { user }= useAppSelector((state: state)=>state);
    
    return (
        <>
            {user.isAuthenticated ? (<Outlet />) : (<Navigate to={'/'} />)}
        </>
    ) ;
}
 
export default ProtectedRoute;