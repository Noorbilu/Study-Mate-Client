import React from "react";

const SearchSortBar = ({ search, setSearch, sort, setSort, onApply }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onApply();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    onApply();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 items-center justify-between my-6"
    >
      <div className="join w-full md:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by subject or name"
          className="input input-bordered join-item w-full border-fuchsia-300"
        />
        <button
          type="submit"
          className="btn join-item bg-fuchsia-700 text-white border-none hover:bg-fuchsia-800"
        >
          Search
        </button>
      </div>

      <select
        value={sort}
        onChange={handleSortChange}
        className="select select-bordered w-full md:w-56 border-fuchsia-300"
      >
        <option value="">Sort by Rating</option>
        <option value="asc">Low → High</option>
        <option value="desc">High → Low</option>
      </select>
    </form>
  );
};

export default SearchSortBar;