import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
export default function PrivateRoute({children}){
    const isAuthenticated = !!localStorage.getItem('token'); // 假設你將 token 存儲在 localStorage 中
    return isAuthenticated ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
    children: PropTypes.object.isRequired,
};