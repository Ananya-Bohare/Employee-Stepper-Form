// src/components/Form/Step3.jsx
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Step3 = ({ formData, handleChange }) => {
    const [errors, setErrors] = useState({});

    // Validate a specific field
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'startTime':
                if (!value) error = 'Start Time is required.';
                break;
            case 'endTime':
                if (!value) error = 'End Time is required.';
                break;
            case 'workStatus':
                if (!value) error = 'Work Status is required.';
                break;
            case 'shift':
                if (!value) error = 'Shift is required.';
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
        <div className="space-y-6">
            {/* Work Schedule */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Work Schedule</label>
                <div className="flex space-x-4">
                    <input 
                        type="time" 
                        name="startTime" 
                        value={formData.startTime} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border rounded py-2 px-3"
                    />
                    {errors.startTime && (
                        <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
                    )}
                    <input 
                        type="time" 
                        name="endTime" 
                        value={formData.endTime} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border rounded py-2 px-3"
                    />
                    {errors.endTime && (
                        <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
                    )}
                </div>
            </div>

            {/* Work Status and Shift */}
            <div className="grid grid-cols-2 gap-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Work Status</label>
                    <select 
                        name="workStatus" 
                        value={formData.workStatus} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border rounded py-2 px-3"
                    >
                        <option value="">Select Work Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="on-leave">On Leave</option>
                    </select>
                    {errors.workStatus && (
                        <p className="text-red-500 text-sm mt-1">{errors.workStatus}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Shift</label>
                    <select 
                        name="shift" 
                        value={formData.shift} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border rounded py-2 px-3"
                    >
                        <option value="">Select Shift</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="night">Night</option>
                    </select>
                    {errors.shift && (
                        <p className="text-red-500 text-sm mt-1">{errors.shift}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step3;