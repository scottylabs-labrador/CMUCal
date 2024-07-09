import React, { useEffect, useState } from "react";
// search input
import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
// saved searches
import { saveArrayToLocalStorage, getArrayFromLocalStorage } from "../utils/localStorageUtil";
// for date picker
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// for categories dropdown
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
import { SelectChangeEvent } from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { categoryListAcademics, categoryListClubs, categoryListCareer } from "../types";
// selectable dropdown
import { Button } from "./Button";

import "react-dropdown/style.css";
import "./Search.css";
import { SavedSearchBtn } from "./SavedSearches";
import SearchContent from "./SearchContent";
import CategoryDropdown from "./CategoryDropdown";

// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js


interface SearchComponentProps {
  page: string;
}

const Search: React.FC<SearchComponentProps> = ({ page }) => {
  // Chang name to search bar
  const [searchInput, setSearchInput] = useState("");
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  // search results
  // const [data, setData] = useState(null)
  // date picker
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(7, 'day'));
  const showDatePicker = true;

  
  useEffect(() => {
    // Load the array from local storage when the component mounts
    const storedItems = getArrayFromLocalStorage<string>('savedSearches');
    setSavedItems(storedItems);
    // clearSavedItems();
    console.log(savedItems);
  }, [searchInput]);

  const clearSavedItems = () => {
    setSavedItems([]);
    localStorage.removeItem('savedSearches');
  };

  const clearSingleSavedItems = (value:string) => {
    const index:number = savedItems.indexOf(value);
    const newArray = savedItems.slice(0,index).concat(savedItems.slice(index+1,-1));
    setSavedItems(newArray);
    saveArrayToLocalStorage('savedSearches', newArray);
    // localStorage.removeItem('savedSearches');
  };

  const enterSearchInput = (value:string) => {
    setSearchInput(value);
  }

  const clearSearchInput = () => {
    setSearchInput("");
  }
  
  const addSavedItem = () => {
    if (!savedItems.includes(searchInput)) {
      const newItems = [...savedItems, searchInput];
      setSavedItems(newItems);
      saveArrayToLocalStorage('savedSearches', newItems);
    } 
    console.log(savedItems);
  };

  
  
  // search
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // passed into CategoryDropdown component
  const handleChangeCategory = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    // target = the element that triggered the event 
    // value = the current value of the element/ the option selected
    setCategoryName(
      // e.g. "Office Hours, Peer Tutoring" --> ["OH", "PT"]
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  const startDateFn = (date: Dayjs|null) => {
    setStartDate(date);
    console.log(`start: ${date}`);
  };

  const endDateFn = (date: Dayjs|null) => {
    setEndDate(date);
    console.log(`end: ${date}`);
  };

  // for date range: start to end
  let dateContent;
  if (showDatePicker) {
    dateContent = (
      <>      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-36">
          <DatePicker
            value={startDate}
            onChange={(date: Dayjs | null) => {
              startDateFn(date);
            }}
            format="MM/DD"
          />
        </div>
        <span className="w-4">to</span>
        <div className="w-36">
          <DatePicker 
            value={endDate}
            onChange={(date) => {
              endDateFn(date);
            }}
            format="MM/DD"
          />
        </div>
        </LocalizationProvider>
      </>
    );
  }

  return (
    <div className="bg-[#F5F5F5] relative -top-2 w-full min-h-screen pl-8 pt-7 text-sans">
      <div className="flex flex-col w-11/12 gap-y-2.5">
        <div className="no-scroll-bar flex flex-nowrap flex-row gap-x-1.5 overflow-scroll">
          {savedItems && savedItems.map((item, index) => {
            return (
              <SavedSearchBtn key={index} content={item} clickStay={true} clearSingleSavedItems={clearSingleSavedItems} 
              textSize="text-xs" enterSearchInput={enterSearchInput} clearSearchInput={clearSearchInput}/>
            )
          })}
        </div>
        <div className="bg-gray-200 relative h-12 w-full rounded-md border border-black border-[1.5] flex items-center justify-center">
          {/* search bar */}
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChangeSearch}
            value={searchInput}
            className="bg-gray-200 flex-grow px-4 focus:outline-none"
          />
          {/* Search icon */}
          {searchInput? 
            <RxCross1 onClick = {()=> setSearchInput("")} className="h-6 w-6 text-gray-500 mr-2" /> : 
            <IoSearch className="h-6 w-6 text-gray-500 mr-2" />
          }
          
        </div>

        {/* drop down filter */}
        <div className="mt-3 flex w-full items-baseline justify-between">
          <div className="w-3/5 items-center flex flex-row justify-between space-x-2">{dateContent}</div>
          {(page === "academics" || page === "clubs" || page==="career") ? (
            // <div className="w-2/6">{categoryContent}</div>
            <div className="w-2/6">
              <CategoryDropdown page={page} categoryName={categoryName} handleChangeCategory={handleChangeCategory} />
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* <div className="w-full mt-2">{actionsMenuComp}</div> */}
        <div className="w-full mt-2 flex justify-between">
          {/* <Dropdown/> */}
          <Button content="Add All" clickStay={false} textSize="text-base"/>
          <Button content="Reset CMUCal Events" clickStay={false} textSize="text-base"/>
        </div>
        
        <div className="overflow-scroll" style={{height: '70vh'}}>
          { searchInput && <SearchContent searchInput={searchInput} page={page} categoryName={categoryName} startDate={startDate} endDate={endDate} addToSavedItems={addSavedItem}/>}
        </div>
        
      </div>
    </div>
  );
}

export {Search};
