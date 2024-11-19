import { useState } from 'react';
import toast from 'react-hot-toast';
import './EditEmployeeForm.css'; // Import the CSS file

const EditEmployeeForm = ({ employee, onClose }) => {
    const [formData, setFormData] = useState({
        ...employee
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/employee/employee/${employee._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update job');
            }

            toast.success('Job updated successfully');
            onClose(); // Close the form after successful update
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-header">Edit Job</h2>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label className="label">
                                <span className="text-black label-text">Company Name</span>
                            </label>
                            <input
                                type="text"
                                name="companyname"
                                className="input-field"
                                value={formData.companyname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Job Role</span>
                            </label>
                            <input
                                type="text"
                                name="jobrole"
                                className="input-field"
                                value={formData.jobrole}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">No of Vacancies</span>
                            </label>
                            <input
                                type="text"
                                name="noofvacancies"
                                className="input-field"
                                value={formData.noofvacancies}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Job Description</span>
                            </label>
                            <input
                                type="text"
                                name="jobdescription"
                                className="input-field"
                                value={formData.jobdescription}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="text-black label-text">Job Type</span>
                            </label>
                            <select
                                name="jobtype"
                                className="select-field"
                                value={formData.jobtype}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Refferal">Refferal</option>
                                <option value="Open for All">Open for All</option>                              
                            </select>
                        </div>

                        <div>
                            <label className="label">
                                <span className="text-black label-text">Edit Job URL</span>
                            </label>
                            <input
                                type="url"
                                name="joburl"
                                className="input-field"
                                value={formData.joburl}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="text-black label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                className="input-field"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">LinkedIn</span>
                            </label>
                            <input
                                type="url"
                                name="linkedin"
                                className="input-field"
                                value={formData.linkedin}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Mobile Number</span>
                            </label>
                            <input
                                type="text"
                                name="mobileNo"
                                className="input-field"
                                value={formData.mobileNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Domain</span>
                            </label>
                            <select
                                name="domain"
                                className="select-field"
                                value={formData.domain}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="IT">IT</option>
                                <option value="Software">Software</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Pharma">Pharma</option>
                                <option value="Business">Business</option>
                                <option value="Govt">Govt Job</option>

                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className="button-group">
                            <button className="btn-submit">Edit</button>
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeForm;
