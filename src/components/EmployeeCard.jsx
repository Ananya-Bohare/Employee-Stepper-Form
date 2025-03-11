// src/components/EmployeeCard.jsx
import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import EmployeeProfileModal from './EmployeeProfileModal';
import { supabase } from '../services/supabaseClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!employee) {
        return <div>Loading...</div>; // Or handle the case where employee data is not available
    }

    const { display_name, personal_email, avatar_url } = employee;

    // Handle delete action
    const handleDelete = async () => {
        try {
            const { error } = await supabase
                .from('employees')
                .delete()
                .eq('id', employee.id);

            if (error) {
                console.error('Error deleting employee:', error);
                toast.error('Failed to delete employee.');
            } else {
                toast.success('Employee deleted successfully!');
                onDelete(employee.id); // Notify parent component to update the list
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Failed to delete employee.');
        }
    };

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg p-4 relative">
            {/* Menu Icon */}
            <Menu as="div" className="absolute top-2 right-2">
                <Menu.Button className="p-1 text-gray-500 hover:text-gray-700">
                    <MoreVertical size={20} />
                </Menu.Button>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-1 w-23 origin-top-right bg-white border border-gray-200 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => onEdit(employee)}
                                    className={`${
                                        active ? 'bg-blue-500 text-white' : 'text-gray-700'
                                    } group flex items-center w-full px-2 py-1 text-sm`}
                                >
                                    <Pencil className="mr-2" size={16} />
                                    Edit
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleDelete}
                                    className={`${
                                        active ? 'bg-red-500 text-white' : 'text-gray-700'
                                    } group flex items-center w-full px-2 py-1 text-sm`}
                                >
                                    <Trash className="mr-2" size={16} />
                                    Delete
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>

            {/* Employee Details */}
            <div className="flex justify-center mb-4">
                {avatar_url ? (
                    <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={avatar_url}
                        alt={`${display_name}'s Avatar`}
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        {/* Default Avatar or Placeholder */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className="text-center">
                <div className="font-bold text-xl mb-2">{display_name}</div>
                <p className="text-gray-700 text-base">{personal_email}</p>
                <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    View Profile
                </button>
            </div>

            {/* Employee Profile Modal */}
            {isModalOpen && <EmployeeProfileModal employee={employee} onClose={closeModal} />}
        </div>
    );
};

export default EmployeeCard;