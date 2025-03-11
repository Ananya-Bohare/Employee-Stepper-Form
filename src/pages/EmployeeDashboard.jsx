// src/pages/EmployeeDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Calendar, MapPin, User, DollarSign, Briefcase, Clock, Award, LogOut } from 'lucide-react';

const EmployeeDashboard = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const { data: session, error: sessionError } = await supabase.auth.getSession();

                if (sessionError || !session.session) {
                    throw new Error('User not logged in');
                }

                const userId = session.session.user.id;

                const { data: employeeData, error: employeeError } = await supabase
                    .from('employees')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (employeeError) {
                    throw employeeError;
                }

                if (!employeeData) {
                    throw new Error('Employee data not found');
                }

                setEmployee(employeeData);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    if (!employee) {
        return <div className="flex justify-center items-center h-screen">No employee data found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="bg-blue-600 p-4 text-white rounded-lg mb-6 shadow-md flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
                <button onClick={handleLogout} className="flex items-center text-white hover:text-blue-200">
                    <LogOut className="mr-2" size={20} />
                    Logout
                </button>
            </header>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center">
                    {employee.avatar_url ? (
                        <img
                            className="w-28 h-28 rounded-full object-cover shadow-md mb-4"
                            src={employee.avatar_url}
                            alt={`${employee.display_name}'s Avatar`}
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <User className="text-gray-500" size={50} />
                        </div>
                    )}
                    <h2 className="text-2xl font-semibold text-gray-800">{employee.display_name}</h2>
                    <p className="text-gray-600">{employee.job_title}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* ... (rest of the employee details grid) */}
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Mail className="text-blue-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Email:</strong> {employee.personal_email}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Phone className="text-green-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Mobile:</strong> {employee.mobile_number}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <User className="text-purple-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Gender:</strong> {employee.gender}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Calendar className="text-red-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>DOB:</strong> {employee.date_of_birth}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Briefcase className="text-blue-500 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Department:</strong> {employee.department}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <MapPin className="text-yellow-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Location:</strong> {employee.location}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Clock className="text-gray-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Shift:</strong> {employee.shift}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Calendar className="text-orange-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Start Date:</strong> {employee.start_date}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <DollarSign className="text-green-700 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Base Salary:</strong> ${employee.base_salary}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Award className="text-purple-700 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Bonus:</strong> ${employee.bonus_incentives}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <User className="text-pink-600 mr-2" size={20} />
                        <span className="text-gray-700"><strong>Job Type:</strong> {employee.job_type}</span>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                        <Clock className="text-blue-700 mr-2" size={20} />
                        <span className="text-gray-700">
                            <strong>Work Hours:</strong> {employee.work_schedule?.startTime} - {employee.work_schedule?.endTime}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;