import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import '../editEmployee/EditEmployeeForm.css';

const EditWorkShopForm = ({ workshop, onClose }) => {
    const [formData, setFormData] = useState({
        ...workshop,
        hostedDate: '' // Ensure hostedDate is initialized to avoid issues with uncontrolled inputs
    });

    // Ensure the date is formatted correctly for the date input field
    useEffect(() => {
        if (workshop.hostedDate) {
            const formattedDate = new Date(workshop.hostedDate).toISOString().split('T')[0];
            setFormData((prevData) => ({ ...prevData, hostedDate: formattedDate }));
        }
    }, [workshop.hostedDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/workshop/workshop/${workshop._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update workshop');
            }

            toast.success('Workshop updated successfully');
            onClose(); // Close the form after successful update
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-header">Edit Workshop</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Workshop Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="input-field"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Agenda</span>
                            </label>
                            <input
                                type="text"
                                name="agenda"
                                className="input-field"
                                value={formData.agenda}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Hosted By</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Hosting Date</span>
                            </label>
                            <input
                                type="date"
                                name="hostedDate"
                                className="input-field"
                                value={formData.hostedDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-black label-text">Meeting Link</span>
                            </label>
                            <input
                                type="url"
                                name="url"
                                className="input-field"
                                value={formData.url}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="button-group">
                            <button className="btn-submit">Update</button>
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

export default EditWorkShopForm;
