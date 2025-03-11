// src/components/EmployeeProfileModal.jsx
import React from 'react';
import { X, User, Mail, Phone, MapPin, Briefcase, Building } from 'lucide-react';

const EmployeeProfileModal = ({ employee, onClose }) => {
    if (!employee) {
        return null;
    }

    const {
        display_name,
        personal_email,
        avatar_url,
        job_title,
        department,
        mobile_number,
        location,
    } = employee;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
                {/* Header with Name and Close Button */}
                <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                    <div className="flex items-center">
                        {avatar_url ? (
                            <img
                                className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-white"
                                src={avatar_url}
                                alt={`${display_name}'s Avatar`}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center mr-3">
                                <User className="text-indigo-600" size={24} />
                            </div>
                        )}
                        <span className="font-semibold text-lg">{display_name}</span>
                    </div>
                    <button onClick={onClose} className="text-white hover:text-indigo-200 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-6">
                    {/* Contact Details */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3 text-sm">CONTACT DETAILS</h3>
                        <div className="flex items-center text-gray-600 space-x-14">
                            <div className="flex items-center text-gray-600">
                                <Mail className="mr-2 text-indigo-600" size={20} />
                                <span>{personal_email || 'N/A'}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Phone className="mr-2 text-indigo-600" size={20} />
                                <span>{mobile_number || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    {location && (
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-3 text-sm">LOCATION</h3>
                            <div className="flex items-center text-gray-600">
                                <MapPin className="mr-2 text-indigo-600" size={20} />
                                <p>{location}</p>
                            </div>
                        </div>
                    )}

                    {/* Job Title */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3 text-sm">JOB TITLE</h3>
                        <div className="flex items-center text-gray-600">
                            <Briefcase className="mr-2 text-indigo-600" size={20} />
                            <p>{job_title || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Department */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3 text-sm">DEPARTMENT</h3>
                        <div className="flex items-center text-gray-600">
                            <Building className="mr-2 text-indigo-600" size={20} />
                            <p>{department || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfileModal;
