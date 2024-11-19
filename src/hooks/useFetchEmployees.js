import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employee/employees');
            const data = await response.json();
            setEmployees(data);
            setTotalEmployees(data.length);
        } catch (error) {
            toast.error('Error fetching employees');
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/employee/jobs');
            const data = await response.json();
            setJobs(data);
            setTotalJobs(data.length);
                } catch (error) {
            toast.error('Error fetching jobs');
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);
   

    const deleteEmployee = async (id) => {
        try {
            await fetch(`/api/employee/employee/${id}`, {
                method: 'DELETE',
            });
            setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
            setTotalEmployees(prevTotal => prevTotal - 1);
            toast.success('job deleted successfully');
        } catch (error) {
            toast.error('Error deleting job');
            console.error('Error deleting job:', error);
        }
    };

    return { employees, totalEmployees, loading, jobs, deleteEmployee, fetchEmployees, totalJobs, fetchJobs };
};

export default useFetchEmployees;
