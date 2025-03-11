// src/components/Form/Form.jsx
import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ userId, employee, onClose, onSuccess }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        profilePhoto:null,
        firstName: '',
        lastName: '',
        displayName: '',
        gender: '',
        dateOfBirth: '',
        workEmail: '',
        email: '',
        mobileNumber: '',
        password: '',
        jobTitle: '',
        department: '',
        reportingManager: '',
        jobType: '',
        location: '',
        startDate: '',
        startTime: '',
        endTime: '',
        workStatus: '',
        shift: '',
        baseSalary: '',
        bonusIncentives: '',
        salaryFrequency: '',
        insuranceCoverage: '',
    });

    useEffect(() => {
        if (employee) {
            // Pre-fill the form with the employee's data
            setFormData({
                ...employee,
                profilePhoto: null, // Reset profile photo (or handle it separately)
            });
        }
    }, [employee]);

    const navigate = useNavigate();

    const nextStep = () => {
        if (step === 1 && !validateStep1()) {
            toast.error('Please fill out all required fields in Step 1.');
            return;
        }
        if (step === 2 && !validateStep2()) {
            toast.error('Please fill out all required fields in Step 2.');
            return;
        }
        if (step === 3 && !validateStep3()) {
            toast.error('Please fill out all required fields in Step 3.');
            return;
        }
        if (step === 4 && !validateStep4()) {
            toast.error('Please fill out all required fields in Step 4.');
            return;
        }
        setStep(step + 1);
    }
    const prevStep = () => setStep(step - 1);


    const handleChange = (e) => {
        if (e.target.name === 'profilePhoto' && e.target.files && e.target.files[0]) {
            setFormData({ ...formData, profilePhoto: e.target.files[0] }); // Store the file object
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const validateStep1 = () => {
        const { firstName, lastName, displayName, gender, dateOfBirth, workEmail, email, mobileNumber, password } = formData;
        if (!firstName || !lastName || !displayName || !gender || !dateOfBirth || !workEmail || !email || !mobileNumber || !password) {
            return false;
        }
        return true;
    };
    const validateStep2 = () => {
        const { department, jobTitle, reportingManager , jobType, location, startDate,} = formData;
        if (!department || !jobTitle || !jobType || !location || !startDate || !reportingManager) {
            return false;
        }
        return true;
    };
    
    const validateStep3 = () => {
        const { startTime, endTime, workStatus, shift } = formData;
        if (!startTime || !endTime || !workStatus || !shift ) {
            return false;
        }
        return true;
    };
    
    const validateStep4 = () => {
        const { baseSalary, bonusIncentives, salaryFrequency, insuranceCoverage } = formData;
        if (!baseSalary || !bonusIncentives || !salaryFrequency || !insuranceCoverage) {
            return false;
        }
        return true;
    };
    

    const handleSubmit = async () => {
        try {
            const { email, password, firstName, lastName, displayName, gender, dateOfBirth, workEmail, mobileNumber, jobTitle, department, reportingManager, jobType, location, startDate, startTime, endTime, workStatus, shift, baseSalary, bonusIncentives, salaryFrequency, insuranceCoverage, profilePhoto } = formData;
    
            // Step 1: Get the ID of the currently logged-in admin
            const { data: session, error: sessionError } = await supabase.auth.getSession();
    
            console.log("Session Data:", session); // Log session data
    
            if (sessionError || !session.session) {
                console.error('Error fetching session:', sessionError);
                toast.error('Unable to fetch admin details. Please try again.');
                return;
            }
    
            const adminId = session.session.user.id; // ID of the logged-in admin
            console.log("Admin ID:", adminId); // Log admin ID
    
            let userIdToUse = userId;
    
            // Step 2: Create a new user in Supabase Auth (if userId is not provided)
            if (!userId) {
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                });
    
                console.log("Auth Data:", authData); // Log auth data
    
                if (authError) {
                    console.error('Signup error:', authError);
                    toast.error('Signup failed. Please try again.');
                    return;
                }
    
                userIdToUse = authData.user.id;
            }
    
            // Step 3: Insert employee data into the `employees` table
            const { error: employeeError } = await supabase
                .from('employees')
                .insert([{
                    id: userIdToUse,
                    avatar_url: null, // Assuming avatar URL is not uploaded yet
                    first_name: firstName,
                    last_name: lastName,
                    display_name: displayName,
                    gender,
                    date_of_birth: dateOfBirth,
                    work_email: workEmail,
                    personal_email: email,
                    mobile_number: mobileNumber,
                    job_title: jobTitle,
                    department,
                    reporting_manager: reportingManager,
                    job_type: jobType,
                    location,
                    start_date: startDate,
                    work_schedule: { startTime, endTime },
                    work_status: workStatus,
                    shift,
                    base_salary: baseSalary,
                    bonus_incentives: bonusIncentives,
                    salary_frequency: salaryFrequency,
                    insurance_coverage: insuranceCoverage,
                    created_by: adminId, // Set the admin's ID as the creator
                }]);
    
            if (employeeError) {
                console.error('Employee creation error:', employeeError);
                toast.error('Employee creation failed. Please try again.');
                return;
            }
    
            console.log('Employee created successfully!');
            toast.success('Employee created successfully!');
            onClose();
            onSuccess();
            navigate('/admin'); // Redirect to admin dashboard
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };
    

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 formData={formData} handleChange={handleChange} validateStep1={validateStep1}/>;
            case 2:
                return <Step2 formData={formData} handleChange={handleChange} />;
            case 3:
                return <Step3 formData={formData} handleChange={handleChange} />;
            case 4:
                return <Step4 formData={formData} handleChange={handleChange} />;
            default:
                return <Step1 formData={formData} handleChange={handleChange} />;
        }
    };

    const stepLabels = ['Basic Details', 'Job Details', 'Work Details', 'Compensation'];

    return (
        <div>
            <div className="relative mb-8 w-full">
                {/* Progress Bar */}
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-1 bg-gray-300 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center">
                    <div
                        className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                        style={{
                            width: `${(step - 1) / (stepLabels.length - 1) * 100}%`,
                        }}
                    ></div>
                </div>
                {/* Step Indicators */}
                <div className="relative z-10 flex justify-between w-full">
                    {stepLabels.map((label, index) => (
                        <div key={index} className="flex items-center w-full">
                            <div className="flex flex-col items-center relative w-full">
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                                        step > index + 1
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : step === index + 1
                                            ? 'bg-white border-blue-600 text-blue-600'
                                            : 'bg-white border-gray-300 text-gray-600'
                                    }`}
                                >
                                    {step > index + 1 ? (
                                        <CheckCircle size={20} className="text-white" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <span
                                    className={`absolute top-10 text-sm transition-all duration-300 ${
                                        step >= index + 1 ? 'text-blue-600' : 'text-gray-600'
                                    }`}
                                >
                                    {label}
                                </span>
                            </div>
                            {index < stepLabels.length - 1 && (
                                <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-6">{renderStep()}</div>
            <div className="flex justify-between mt-6">
                {step > 1 && (
                    <button
                        onClick={prevStep}
                        className="flex items-center bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        Previous
                    </button>
                )}
                {step < 4 ? (
                    <button
                        onClick={nextStep}
                        className="ml-auto flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    >
                        Next
                        <ArrowRight className="ml-2" size={20} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="ml-auto flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    >
                        <CheckCircle className="mr-2" size={20} />
                        Submit
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default Form;