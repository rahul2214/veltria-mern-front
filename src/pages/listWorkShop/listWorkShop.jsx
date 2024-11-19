import { useState, useMemo } from 'react';
import useFetchWorkShop from '../../hooks/useFetchWorkShop';
import NavBar from '../navBar/NavBar';
import EditWorkShopForm from '../editWorkShop/editWorkShop'; // Assuming you have a corresponding EditWorkShopForm component
import { useNavigate } from 'react-router-dom';
import WorkShopSearchInput from '../../components/SearchWorkShoop';

const WorkShopList = () => {
    const { workshops, totalWorkShops, loading, fetchWorkShops, deleteWorkShop } = useFetchWorkShop();
    const [editingWorkShop, setEditingWorkShop] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder] = useState("asc");
    const navigate = useNavigate();

    const sortedWorkshops = useMemo(() => {
        let filteredList = [...workshops];

        // Filter by search term
        filteredList = filteredList.filter(workshop =>
            workshop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort workshops based on selected field
        if (sortField) {
            filteredList.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                if (sortField === "createdAt") {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                } else if (sortField === "_id") {
                    aValue = aValue.toString();
                    bValue = bValue.toString();
                } else {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortOrder === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortOrder === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredList;
    }, [workshops, sortField, sortOrder, searchTerm]);

    const handleEdit = (workshop) => {
        setEditingWorkShop(workshop);
    };

    const handleUpdateSuccess = () => {
        fetchWorkShops();
        setEditingWorkShop(null);
    };

    const handleCreateWorkShop = () => {
        navigate('/createWorkshop');
    };

    if (loading) {
        return <p className='text-white'>Loading...</p>;
    }

    return (
        <div>
            <NavBar />
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold text-gray-300">WorkShops List</h1>
                    <WorkShopSearchInput onSearch={setSearchTerm} /> {/* Renamed to WorkshopSearchInput */}
                </div>
                <br />
                <div className="fetch flex justify-between items-center">
                    <h1 className="text-center text-gray-300">Total workshops: {totalWorkShops}</h1>
                    <span>
                        <button onClick={handleCreateWorkShop} className="bg-blue-500 text-white px-4 py-2 rounded">Create Workshop</button>
                    </span>
                </div>
                <div className="flex justify-between items-center mt-4 mb-2">
                    <label className="text-gray-300">
                        Sort By:
                        <select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                            className="ml-2 p-2"
                        >
                            <option value="">Select Field</option>
                            <option value="name">Name</option>
                            <option value="title">Title</option>
                            <option value="createdAt">Date Created</option>
                        </select>
                    </label>
                </div>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="w-1/4 px-4 py-2 text-black">Hosting By</th>
                            <th className="w-1/4 px-4 py-2 text-black">Title</th>
                            <th className="w-1/4 px-4 py-2 text-black">Agenda</th>
                            <th className="w-1/4 px-4 py-2 text-black">Hosting Date</th>
                            <th className="w-1/4 px-4 py-2 text-black">Meeting Link</th>
                            <th className="w-1/4 px-4 py-2 text-black">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedWorkshops.map((workshop) => (
                            <tr key={workshop._id}>
                                <td className="border px-4 py-2 text-black">{workshop.name}</td>
                                <td className="border px-4 py-2 text-black">{workshop.title}</td>
                                <td className="border px-4 py-2 text-black">{workshop.agenda}</td>
                                <td className="border px-4 py-2 text-black">{new Date(workshop.hostedDate).toLocaleDateString()}</td>

                                <td className="border px-4 py-2 text-black">
                                    <a href={workshop.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {workshop.url}
                                    </a>
                                </td>
                                <td className="border px-4 py-2 text-black">
                                    <button
                                        className='bg-blue-300 w-14 text-white m-2'
                                        onClick={() => handleEdit(workshop)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='bg-red-800 w-14 text-white m-2'
                                        onClick={() => deleteWorkShop(workshop._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editingWorkShop && (
                    <EditWorkShopForm workshop={editingWorkShop} onClose={handleUpdateSuccess} />
                )}
            </div>
        </div>
    );
};

export default WorkShopList;
