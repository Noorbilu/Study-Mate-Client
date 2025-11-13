import React from 'react';

const SearchSortBar = ({ search, setSearch, sort, setSort, onSubmit }) => {

    
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            className="flex flex-col md:flex-row gap-2 items-center justify-between my-4">
            <div className="join w-full md:w-1/2">

                <input value={search} onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered join-item w-full border-purple-400"
                    placeholder="Search by subject (e.g., Math, Programming)" />

                <button className="btn btn-primary join-item m-2 bg-gradient-to-r from-purple-900 to-gray-400 text-white border-none" type="submit">Search</button>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered w-full md:w-56 border-b-fuchsia-800 ">
                <option value="" className='bg-purple-300'>Sort by Experience</option>
                <option value="asc" className='bg-purple-300'>Beginner → Expert</option>
                <option value="desc" className='bg-purple-300'>Expert → Beginner</option>
            </select>
        </form>
    );
};

export default SearchSortBar;