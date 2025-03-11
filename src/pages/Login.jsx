// src/pages/Login.jsx
import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState('employee'); // Default role for signup
    const [error, setError] = useState(null); // To display errors
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message

        if (isSignup) {
            // Signup logic
            const { data, error: signupError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signupError) {
                setError(signupError.message);
                console.error('Signup error:', signupError);
            } else {
                console.log('Signup successful (basic)!', data);

                // Insert profile with role
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([{ id: data.user.id, role }]);

                if (profileError) {
                    setError(profileError.message);
                    console.error('Profile creation error:', profileError);
                } else {
                    console.log('Profile created successfully!');
                    navigate(`/${role}`); // Redirect based on role
                }
            }
        } else {
            // Login logic
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (loginError) {
                setError(loginError.message);
                console.error('Login error:', loginError);
            } else {
                console.log('Login successful!');

                // Fetch profile to determine role
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                if (profileError) {
                    setError(profileError.message);
                    console.error('Profile fetch error:', profileError);
                } else if (profileData && profileData.role) {
                    navigate(`/${profileData.role}`); // Redirect based on role
                } else {
                    setError('Role not found for user.');
                    console.error('Role not found for user.');
                }
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white border rounded shadow">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {isSignup ? 'Sign Up' : 'Log In'}
                </h2>
                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-200 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded py-2 px-3"
                            required
                        />
                    </div>
                    {isSignup && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full border rounded py-2 px-3"
                                required
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                </form>
                <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="mt-4 w-full text-blue-500 hover:text-blue-700 text-sm"
                >
                    {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
                </button>
            </div>
        </div>
    );
};

export default Login;