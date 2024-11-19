import { useState, useMemo } from 'react';
import useFetchWorkShop from '../../hooks/useFetchWorkShop';
import MainNavbar from "./navbar/index";
import WorkShopSearchInput from '../../components/SearchWorkShoop';

const HomePageWorkShopList = () => {
    const { homepageworkshops, loading } = useFetchWorkShop();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField] = useState("");
    const [sortOrder] = useState("asc");

    const sortedWorkshops = useMemo(() => {
        let filteredList = [...homepageworkshops];

        // Filter by search term
        filteredList = filteredList.filter(workshop =>
            workshop.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [homepageworkshops, sortField, sortOrder, searchTerm]);

    if (loading) {
        return <p className="text-white">Loading...</p>;
    }

    return (
        <div>
            <MainNavbar />

            <div className="w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-semibold text-gray-300">Workshops List</h1>
                </div>

                {/* Search input aligned to the right */}
                <div className="flex justify-end mb-6">
                    <WorkShopSearchInput onSearch={setSearchTerm} />
                </div>

                <br />

                {/* Check if there are no workshops */}
                {sortedWorkshops.length === 0 ? (
                    <p className="text-center text-gray-300 text-xl">No workshops available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sortedWorkshops.map((workshop) => (
                            <div key={workshop._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-300">
                                <h2 className="text-xl font-semibold text-black mb-6 text-center">{workshop.title}</h2>
                                <p className="text-black mb-2">Hosted by: {workshop.name}</p>
                                <p className="text-black mb-2">Agenda: {workshop.agenda}</p>
                                <p className="text-black mb-2">Date: {new Date(workshop.hostedDate).toLocaleDateString()}</p>
                                <a href={workshop.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    Join Workshop
                                </a>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default HomePageWorkShopList;
