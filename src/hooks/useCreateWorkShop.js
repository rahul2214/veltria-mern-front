// src/hooks/useCreateEmployee.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const useCreateEmployee = () => {
    const [loading, setLoading] = useState(false);

    const createEmployee = async (inputs) => {
        // Check for validation errors
        const isValid = handleInputErrors(inputs);
        if (!isValid) return; // Stop if validation fails

        setLoading(true);
        try {
            const res = await fetch('/api/employee/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('Job created successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createEmployee };
};

// Validation function for required fields
function handleInputErrors({ companyname, jobrole, location, domain, jobdescription }) {
    if (!companyname || !jobrole || !location || !domain || !jobdescription) {
        toast.error('Please fill in all required fields.');
        return false;
    }
    return true;
}

export default useCreateEmployee;
