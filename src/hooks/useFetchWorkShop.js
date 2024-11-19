import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchWorkShop = () => {
    const [workshops, setWorkShops] = useState([]);
    const [homepageworkshops, setHomePageWorkShops] = useState([]);
    const [totalWorkShops, setTotalWorkShops] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchWorkShops = async () => {
        try {
            const response = await fetch('/api/workshop/workshops');
            const data = await response.json();
            setWorkShops(data);
            setTotalWorkShops(data.length);
        } catch (error) {
            toast.error('Error fetching employees');
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkShops();
    }, []);

    const fetchHomePageWorkShops = async () => {
        try {
            const response = await fetch('/api/workshop/homepageworkshops');
            const data = await response.json();
            setHomePageWorkShops(data);
        } catch (error) {
            toast.error('Error fetching jobs');
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomePageWorkShops();
    }, []);


    const deleteWorkShop = async (id) => {
        try {
            await fetch(`/api/workshop/workshop/${id}`, {
                method: 'DELETE',
            });
            setWorkShops((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
            setTotalWorkShops(prevTotal => prevTotal - 1);
            toast.success('job deleted successfully');
        } catch (error) {
            toast.error('Error deleting job');
            console.error('Error deleting job:', error);
        }
    };

    return { workshops, totalWorkShops, loading, homepageworkshops, deleteWorkShop, fetchWorkShops, fetchHomePageWorkShops };
};

export default useFetchWorkShop;
