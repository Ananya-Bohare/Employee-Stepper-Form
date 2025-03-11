// src/components/Form/Step2.jsx
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Step2 = ({ formData, handleChange }) => {
    const [errors, setErrors] = useState({});

    // Validate a specific field
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'jobTitle':
                if (!value) error = 'Job Title is required.';
                break;
            case 'department':
                if (!value) error = 'Department is required.';
                break;
            case 'reportingManager':
                if (!value) error = 'Reporting Manager is required.';
                break;
            case 'jobType':
                if (!value) error = 'Job Type is required.';
                break;
            case 'location':
                if (!value) error = 'Location is required.';
                break;
            case 'startDate':
                if (!value) error = 'Start Date is required.';
                break;
            default:
                break;
        }
        return error;
    };

    // Handle input change and validate the field
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e); // Update form data
        const error = validateField(name, value); // Validate the field
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error })); // Update errors
    };

    // Handle input blur and validate the field
    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value); // Validate the field
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error })); // Update errors
    };

    return (
        <div className="grid grid-cols-3 gap-6 col-span-3">
            {/* Job Title */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Job Title</label>
                <input 
                    type="text" 
                    name="jobTitle" 
                    value={formData.jobTitle} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3"
                />
                {errors.jobTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
                )}
            </div>

            {/* Department */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Department</label>
                <input 
                    type="text" 
                    name="department" 
                    value={formData.department} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3"
                />
                {errors.department && (
                    <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                )}
            </div>

            {/* Reporting Manager */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Reporting Manager</label>
                <input 
                    type="text" 
                    name="reportingManager" 
                    value={formData.reportingManager} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3"
                />
                {errors.reportingManager && (
                    <p className="text-red-500 text-sm mt-1">{errors.reportingManager}</p>
                )}
            </div>

            {/* Job Type */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Job Type</label>
                <select 
                    name="jobType" 
                    value={formData.jobType} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3"
                >
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                </select>
                {errors.jobType && (
                    <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
                )}
            </div>

            {/* Location */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Location</label>
                <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3"
                />
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
            </div>

            {/* Start Date */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Start Date</label>
                <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3"
                />
                {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                )}
            </div>
        </div>
    );
};

export default Step2;