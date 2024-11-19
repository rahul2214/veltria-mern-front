import { useState } from 'react';
import useCreateEmployee from '../../hooks/useCreateEmployee';
import MainNavbar from '../mainPage/navbar/index';
import './createEmployee.css';
import toast from 'react-hot-toast';

const CreateEmployee = () => {
    const [inputs, setInputs] = useState({
        email: '',
        mobileNo: '',
        companyname: '',
        jobrole: '',
        noofvacancies: '',
        location: '',
        jobdescription: '',
        jobtype: '',
        domain: '',
        joburl: '',
    });

    const { loading, createEmployee } = useCreateEmployee();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields before submitting
        const success = handleInputErrors(inputs);
        if (!success) return;

        await createEmployee(inputs);
    };

    const handleInputErrors = ({ companyname, jobrole, location, domain, jobdescription, jobtype }) => {
        if (!companyname || !jobrole || !location || !domain || !jobdescription || !jobtype) {
            toast.error('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    return (
        <div>
            <MainNavbar />
            <div className='container'>
                <div className='form-wrapper'>
                    <h1 className='form-header'>Create Job</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <label>Company Name <span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder='Enter Company Name'
                                value={inputs.companyname}
                                required
                                onChange={(e) => setInputs({ ...inputs, companyname: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Job Role <span className="required">*</span></label>
                            <input
                                type="text"
                                required
                                placeholder='Enter Job Role'
                                value={inputs.jobrole}
                                onChange={(e) => setInputs({ ...inputs, jobrole: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Location <span className="required">*</span></label>
                            <input
                                type="text"
                                required
                                placeholder='Enter Location'
                                value={inputs.location}
                                onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Job Description <span className="required">*</span></label>
                            <textarea
                                placeholder='Enter Job Description'
                                value={inputs.jobdescription}
                                required
                                onChange={(e) => setInputs({ ...inputs, jobdescription: e.target.value })}
                                rows={5}
                                cols={30}
                            />
                        </div>
                        <div className='input-group'>
                            <label>Job Type <span className="required">*</span></label>
                            <select
                                value={inputs.jobtype}
                                required
                                className='bg-white'
                                onChange={(e) => setInputs({ ...inputs, jobtype: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="Refferal">Refferal</option>
                                <option value="Open for All">Open for All</option>
                            </select>
                        </div>


                        <div className='input-group'>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                value={inputs.email}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Mobile Number</label>
                            <input
                                type="number"
                                placeholder='Enter Phone Number'
                                value={inputs.mobileNo}
                                onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>No of Vacancies</label>
                            <input
                                type="number"
                                placeholder='Enter No of Vacancies'
                                value={inputs.noofvacancies}
                                onChange={(e) => setInputs({ ...inputs, noofvacancies: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Job Domain <span className="required">*</span></label>
                            <select
                                value={inputs.domain}
                                required
                                className='bg-white'
                                onChange={(e) => setInputs({ ...inputs, domain: e.target.value })}
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

                        <div className='input-group'>
                            <label>Job URL</label>
                            <input
                                type="url"
                                placeholder='Enter Job URL'
                                value={inputs.joburl}
                                onChange={(e) => setInputs({ ...inputs, joburl: e.target.value })}
                            />
                        </div>
                        <div className='input-group'>
                            <label>LinkedIn</label>
                            <input
                                type="url"
                                placeholder='Enter LinkedIN URL'
                                value={inputs.linkedin}
                                onChange={(e) => setInputs({ ...inputs, linkedin: e.target.value })}
                            />
                        </div>

                        <div>
                            <button className="submit-button" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
