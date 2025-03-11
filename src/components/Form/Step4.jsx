// src/components/Form/Step4.jsx
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Step4 = ({ formData, handleChange }) => {
    const [errors, setErrors] = useState({});

    // Validate a specific field
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'baseSalary':
                if (!value) error = 'Base Salary is required.';
                else if (isNaN(value) || value < 0) error = 'Invalid Base Salary.';
                break;
            case 'bonusIncentives':
                if (!value) error = 'Bonus/Incentives is required.';
                else if (isNaN(value) || value < 0) error = 'Invalid Bonus/Incentives.';
                break;
            case 'salaryFrequency':
                if (!value) error = 'Salary Frequency is required.';
                break;
            case 'insuranceCoverage':
                if (!value) error = 'Insurance Coverage is required.';
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
        <div className="grid grid-cols-2 gap-6 col-span-2">
            {/* Base Salary */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Base Salary</label>
                <input 
                    type="number" 
                    name="baseSalary" 
                    value={formData.baseSalary} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3" 
                    placeholder="Enter base salary"
                />
                {errors.baseSalary && (
                    <p className="text-red-500 text-sm mt-1">{errors.baseSalary}</p>
                )}
            </div>

            {/* Bonus/Incentives */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Bonus/Incentives</label>
                <input 
                    type="number" 
                    name="bonusIncentives" 
                    value={formData.bonusIncentives} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3" 
                    placeholder="Enter bonus or incentives"
                />
                {errors.bonusIncentives && (
                    <p className="text-red-500 text-sm mt-1">{errors.bonusIncentives}</p>
                )}
            </div>

            {/* Salary Frequency */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Salary Frequency</label>
                <select 
                    name="salaryFrequency" 
                    value={formData.salaryFrequency} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3"
                >
                    <option value="">Select Salary Frequency</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                {errors.salaryFrequency && (
                    <p className="text-red-500 text-sm mt-1">{errors.salaryFrequency}</p>
                )}
            </div>

            {/* Insurance Coverage */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Insurance Coverage</label>
                <textarea 
                    name="insuranceCoverage" 
                    value={formData.insuranceCoverage} 
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-full border rounded py-2 px-3" 
                    placeholder="Describe the insurance coverage"
                />
                {errors.insuranceCoverage && (
                    <p className="text-red-500 text-sm mt-1">{errors.insuranceCoverage}</p>
                )}
            </div>
        </div>
    );
};

export default Step4;