import React, { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import ProfileModal from '../components/ProfileModal';
import EmployeeCard from '../components/EmployeeCard';
import { Plus, Home, LogOut } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [userIdForEmployee, setUserIdForEmployee] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    // Fetch employees
    const fetchEmployees = async () => {
        try {
            // Get the current session to retrieve the logged-in admin's ID
            const { data: session, error: sessionError } = await supabase.auth.getSession();
    
            console.log("Session Data:", session);
            if (sessionError || !session.session) {
                throw new Error('User not logged in');
            }
    
            const adminId = session.session.user.id;
    
            // Fetch employees created by the logged-in admin
            const { data, error } = await supabase
                .from('employees')
                .select('*')
                .eq('created_by', adminId); // Filter by the logged-in admin's ID
    
            if (error) {
                console.error('Error fetching employees:', error);
            } else {
                setEmployees(data || []); // Set the employees list (empty array if no employees)
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    const handleFormOpen = (userId) => {
        setUserIdForEmployee(userId);
        openModal();
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee); // Set the selected employee for editing
        openModal();
    };

    const handleDelete = (employeeId) => {
        setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
    };

    const handleLogout = async () => { // Add handleLogout function
      try {
          await supabase.auth.signOut();
          navigate('/login'); // Redirect to login after logout
      } catch (error) {
          console.error('Logout error:', error);
      }
  };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Home className="text-white" size={24} />
                        <span className="text-xl font-semibold">Admin Dashboard</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => handleFormOpen(null)}
                            className="flex items-center bg-white text-indigo-600 hover:bg-gray-200 px-4 py-2 rounded-md transition duration-300 shadow"
                        >
                            <Plus className="mr-2" size={20} />
                            Create Employee
                        </button>
                        <button onClick={handleLogout} className="flex items-center text-white hover:text-blue-200">
                    <LogOut className="mr-2" size={24} />
                    Logout
                </button>
                    </div>
                </div>
            </nav>

            {isModalOpen && (
                <ProfileModal isOpen={isModalOpen} onClose={closeModal}>
                    <Form
                        userId={userIdForEmployee}
                        employee={selectedEmployee} // Pass the selected employee for editing
                        onClose={closeModal}
                        onSuccess={fetchEmployees}
                    />
                </ProfileModal>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {employees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} onEdit={handleEdit}
                            onDelete={handleDelete}/>
                    ))}
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;
