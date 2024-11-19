import { useState } from 'react';
import useCreateWorkShop from '../../hooks/useCreateWorkShop';
import NavBar from '../navBar/NavBar';
import '../createEmployee/createEmployee.css';  // Import the CSS file

const CreateWorkShop = () => {
    const [inputs, setInputs] = useState({
        name: '',
        title: '',
        agenda: '',
        hostedDate: '',
        url: ''
    });

    const { loading, createWorkShop } = useCreateWorkShop();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createWorkShop(inputs);
    };

    return (
        <div>
            <NavBar />

            <div className='container'>
                <div className='form-wrapper'>
                    <h1 className='form-header'>Create Work Shop</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <label>Hosting By</label>
                            <input
                                type="text"
                                placeholder='Enter Full Name'
                                value={inputs.name}
                                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Title of Work Shop</label>
                            <input
                                type="text"
                                placeholder='Enter Workshop Title'
                                value={inputs.title}
                                onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>What is the Agenda</label>
                            <input
                                type="text"
                                placeholder='Enter Agenda'
                                value={inputs.agenda}
                                onChange={(e) => setInputs({ ...inputs, agenda: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Hosting Date</label>
                            <input
                                type="date"  // Changed to date type for better UX
                                value={inputs.hostedDate}
                                onChange={(e) => setInputs({ ...inputs, hostedDate: e.target.value })}
                            />
                        </div>

                        <div className='input-group'>
                            <label>Meeting URL</label>
                            <input
                                type="url"
                                placeholder='Enter Meeting URL'
                                value={inputs.url}
                                onChange={(e) => setInputs({ ...inputs, url: e.target.value })}
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

export default CreateWorkShop;
