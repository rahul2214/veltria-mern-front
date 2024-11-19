import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const EmployeeSearchInput = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 2) {
      return toast.error("Search term must be at least 2 characters long");
    }

    onSearch(search.toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='search job role or location'
        className='input input-bordered rounded-full bg-white '
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};

export default EmployeeSearchInput;
