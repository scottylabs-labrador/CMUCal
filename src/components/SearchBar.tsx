import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
    searchInput: string;
    setSearchInput: (value: string) => void;
    handleSaveSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, setSearchInput, handleSaveSearch }) => {
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSaveSearch(searchInput);
        }
      };
    
    return (
        <div className="bg-gray-200 relative h-12 w-full rounded-md border border-black border-[1.5] flex items-center justify-center">
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                value={searchInput}
                className="bg-gray-200 flex-grow px-4 focus:outline-none"
            />
            {searchInput ? (
                <RxCross1 onClick={() => setSearchInput('')} className="h-6 w-6 text-gray-500 mr-2 cursor-pointer" />
            ) : (
                <IoSearch className="h-6 w-6 text-gray-500 mr-2" />
            )}
        </div>
    );
};

export { SearchBar };

