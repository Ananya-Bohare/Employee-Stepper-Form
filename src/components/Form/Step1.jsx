import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Step1 = ({ formData, handleChange }) => {
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file)); // Preview the image
            handleChange(e); // Update form data with the photo path
        }
    };

    // Validate a specific field
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
                if (!value) error = 'First Name is required.';
                break;
            case 'lastName':
                if (!value) error = 'Last Name is required.';
                break;
            case 'displayName':
                if (!value) error = 'Display Name is required.';
                break;
            case 'gender':
                if (!value) error = 'Gender is required.';
                break;
            case 'dateOfBirth':
                if (!value) error = 'Date of Birth is required.';
                break;
            case 'workEmail':
                if (!value) error = 'Work Email is required.';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid Work Email.';
                break;
            case 'email':
                if (!value) error = 'Email is required.';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid Email.';
                break;
            case 'mobileNumber':
                if (!value) error = 'Mobile Number is required.';
                else if (!/^\d{10}$/.test(value)) error = 'Invalid Mobile Number (10 digits required).';
                break;
            case 'password':
                if (!value) error = 'Password is required.';
                else if (value.length < 8) error = 'Password must be at least 8 characters.';
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
        <div className="gap-4">
            {/* Profile Photo Upload */}
            <div className="flex justify-center items-center flex-col">
                <label className="block text-gray-800 text-sm font-semibold mb-2">Profile Photo</label>
                <div className="relative w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex justify-center items-center cursor-pointer overflow-hidden">
                    <input
                        type="file"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {/* Default Icon */}
                    {!photo && (
                        <span className="text-gray-500 font-semibold">+</span>
                    )}
                    {/* Preview the photo */}
                    {photo && (
                        <img 
                            src={photo} 
                            alt="Profile Preview" 
                            className="w-full h-full object-cover rounded-full border-2 border-gray-300" 
                        />
                    )}
                </div>
            </div>

            {/* Basic Info Section */}
            <div className="grid grid-cols-3 gap-6 col-span-3">
                {/* First Name */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                </div>

                {/* Display Name */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Display Name</label>
                    <input 
                        type="text" 
                        name="displayName" 
                        value={formData.displayName} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.displayName && (
                        <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
                    )}
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Gender</label>
                    <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                    )}
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Date of Birth</label>
                    <input 
                        type="date" 
                        name="dateOfBirth" 
                        value={formData.dateOfBirth} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                </div>

                {/* Work Email */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Work Email</label>
                    <input 
                        type="email" 
                        name="workEmail" 
                        value={formData.workEmail} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.workEmail && (
                        <p className="text-red-500 text-sm mt-1">{errors.workEmail}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Mobile Number</label>
                    <input 
                        type="tel" 
                        name="mobileNumber" 
                        value={formData.mobileNumber} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.mobileNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 transition duration-200 focus:border-blue-500 focus:outline-none" 
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step1;