// src/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ allowedRoles }) => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                if (profileData) {
                    setUserRole(profileData.role);
                }
            }
            setLoading(false);
        };

        fetchSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or message
    }

    if (!userRole) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // Redirect to home if role is not allowed
    }

    return <Outlet />; // Render the protected route
};

export default ProtectedRoute;