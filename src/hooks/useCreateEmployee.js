import { useState } from 'react';
import toast from 'react-hot-toast';

const useCreateEmployee = () => {
    const [loading, setLoading] = useState(false);

    const createEmployee = async ({ companyname, jobrole, noofvacancies, location, domain, jobdescription, email, mobileNo, linkedin, joburl, jobtype }) => {
        setLoading(true);
        try {
            const res = await fetch('/api/employee/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ companyname, jobrole, noofvacancies, location, domain, jobdescription, email, mobileNo, linkedin, joburl, jobtype }),
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

export default useCreateEmployee;
