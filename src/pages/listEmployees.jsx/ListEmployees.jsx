import { useState, useMemo } from 'react';
import useFetchEmployees from '../../hooks/useFetchEmployees';
import NavBar from '../navBar/NavBar';
import EditEmployeeForm from '../editEmployee/EditEmployeeForm';
import { useNavigate } from 'react-router-dom';
import EmployeeSearchInput from '../../components/SearchInput';

const EmployeeList = () => {
    const { employees, totalEmployees, loading, fetchEmployees, deleteEmployee } = useFetchEmployees();
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder] = useState("asc");
    const [selectedDomain, setSelectedDomain] = useState("");  // State for domain filter
    const navigate = useNavigate();

    const sortedEmployees = useMemo(() => {
        let filteredList = [...employees];

        // Filter employees by domain if a domain is selected
        if (selectedDomain) {
            filteredList = filteredList.filter(employee => employee.domain === selectedDomain);
        }

        // Filter by search term
        filteredList = filteredList.filter(employee =>
            employee.location.toLowerCase().includes(searchTerm.toLowerCase())

        );

        // Sort employees based on selected field
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
    }, [employees, sortField, sortOrder, searchTerm, selectedDomain]);

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const handleUpdateSuccess = () => {
        fetchEmployees();
        setEditingEmployee(null);
    };

    const handleCreateEmployee = () => {
        navigate('/createJob');
    };

    if (loading) {
        return <p className='text-white'>Loading...</p>;
    }

    // Get a list of unique domains for the dropdown
    const uniqueDomains = [...new Set(employees.map(emp => emp.domain))];

    return (
        <div>
            <NavBar />
            <div className="">
                <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold text-gray-700">Jobs List</h1>
                        <EmployeeSearchInput onSearch={setSearchTerm} />
                    </div>
                    <br />
                    <div className="fetch flex justify-between items-center">
                        <h1 className="text-center text-gray-700">Total Jobs: {totalEmployees}</h1>
                        <span>
                            <button onClick={handleCreateEmployee} className="bg-blue-500 text-white px-4 py-2 rounded">Post Job</button>
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <label className="text-gray-700">
                            Sort By:
                            <select
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                                className="ml-2 p-2 bg-white border"
                            >
                                <option value="">Select Field</option>
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                                <option value="createdAt">Date Created</option>
                            </select>
                        </label>
                        

                        {/* Domain Filter */}
                        <label className="text-gray-700 ml-4">
                            Filter by Domain:
                            <select
                                value={selectedDomain}
                                onChange={(e) => setSelectedDomain(e.target.value)}
                                className="ml-2 p-2 bg-white border"
                            >
                                <option value="">All Domains</option>
                                {uniqueDomains.map((domain) => (
                                    <option key={domain} value={domain}>
                                        {domain}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="w-1/4 px-4 py-2 text-black">Company Name</th>
                                <th className="w-1/4 px-4 py-2 text-black">Job Domain</th>
                                <th className="w-1/4 px-4 py-2 text-black">Job role</th>
                                <th className="w-1/4 px-4 py-2 text-black">No of Vacancies</th>
                                <th className="w-1/4 px-4 py-2 text-black">Job Description</th>
                                <th className="w-1/4 px-4 py-2 text-black">Job type</th>
                                <th className="w-1/4 px-4 py-2 text-black">Job URL</th>
                                <th className="w-1/4 px-4 py-2 text-black">Location</th>
                                <th className="w-1/4 px-4 py-2 text-black">Email</th>
                                <th className="w-1/4 px-4 py-2 text-black">Mobile Number</th>
                                <th className="w-1/4 px-4 py-2 text-black">LinkedIn</th>
                                <th className="w-1/4 px-4 py-2 text-black">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEmployees.map((employee) => (
                                <tr key={employee._id}>
                                    <td className="border px-4 py-2 text-black">{employee.companyname}</td>
                                    <td className="border px-4 py-2 text-black">{employee.domain}</td>
                                    <td className="border px-4 py-2 text-black">  {employee.jobrole ? employee.jobrole : "N/A"}</td>
                                    <td className="border px-4 py-2 text-black">{employee.noofvacancies ? employee.noofvacancies : "N/A"}
</td>
                                    <td className="border px-4 py-2 text-black">
                                        {employee.jobdescription ? employee.jobdescription : "N/A"}
                                    </td>
                                    <td className="border px-4 py-2 text-black">
                                        {employee.jobtype ? employee.jobtype : "N/A"}
                                    </td>
                                    <td className="border px-4 py-2 text-black">
                                        <a href={employee.joburl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {employee.joburl ? employee.joburl : "N/A"}
                                        </a>
                                    </td>
                                    <td className="border px-4 py-2 text-black">{employee.location}</td>
                                    <td className="border px-4 py-2 text-black">{employee.email ? employee.email : "N/A"}</td>
                                    <td className="border px-4 py-2 text-black">{employee.mobileNo ? employee.mobileNo : "N/A"}</td>
                                    <td className="border px-4 py-2 text-black">
                                        <a href={employee.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {employee.linkedin}
                                        </a>
                                    </td>
                                    <td className="border px-4 py-2 text-black">
                                        <button
                                            className='bg-blue-300 w-14 text-white m-2'
                                            onClick={() => handleEdit(employee)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='bg-red-800 w-14 text-white m-2'
                                            onClick={() => deleteEmployee(employee._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editingEmployee && (
                        <EditEmployeeForm employee={editingEmployee} onClose={handleUpdateSuccess} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
