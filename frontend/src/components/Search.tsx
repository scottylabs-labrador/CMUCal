import React, { useEffect, useState } from "react";
// search input
import { SearchCard, SearchBar } from "./index";

import Fuse from 'fuse.js'
import { IoSearch, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
// saved searches
import { saveArrayToLocalStorage, getArrayFromLocalStorage } from "../utils/localStorageUtil";

// for date picker
import dayjs, { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';

import "react-dropdown/style.css";
import "./Search.css";
import { Button } from "./Button";
import SearchContent from "./SearchContent";
import CategoryDropdown from "./CategoryDropdown";
import DatePickerSearch from "./DatePickerSearch";
import { AddFCEventProps, AddFCEventType, RemoveFCEventType } from "../types";
import FullCalendar from "@fullcalendar/react";
import SavedSearchBtn from "./SavedSearches";


// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js


interface SearchComponentProps {
  page: string;
  showSearchBar: boolean;
  handleSearchBarClick: () => void;
  handleAddFCEvent: AddFCEventType;
  eventId: number;
  setEventId: React.Dispatch<React.SetStateAction<number>>;
  calendarRef: React.RefObject<FullCalendar>;
  events:any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  handleRemoveFCEvent: RemoveFCEventType;
}

const Search: React.FC<SearchComponentProps> = ({ page, showSearchBar, 
  handleSearchBarClick, handleAddFCEvent, eventId, setEventId, calendarRef, events, setEvents,
  handleRemoveFCEvent }) => {
  // Chang name to search bar
  const [searchInput, setSearchInput] = useState("");

  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [addedSearchCards, setAddedSearchCards] = useState([]);

  // date picker
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(7, 'day'));
  const showDatePicker = true;
  
  useEffect(() => {
    // Load the array from local storage when the component mounts
    const storedItems = getArrayFromLocalStorage<string>('savedSearches');
    // const storedEvents = getArrayFromLocalStorage<string>('savedEvents');
    setSavedItems(storedItems);
    // clearSavedItems();
    // console.log(savedItems);
  }, [searchInput]);
 

  const clearSavedItems = () => {
    setSavedItems([]);
    localStorage.removeItem('savedSearches');
  };

  const clearSingleSavedItems = (value:string) => {
    const index:number = savedItems.indexOf(value);
    const newArray = savedItems.slice(0,index).concat(savedItems.slice(index+1,));
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
    // If searchInput is already in savedSearches, delete the elem in the array 
      if (savedItems.includes(searchInput) && (savedItems.length > 1)) {
        const index = savedItems.indexOf(searchInput);
        if (index > -1) { 
          savedItems.splice(index, 1); 
        }
      }
    if (!savedItems.includes(searchInput)) {
      const newItems = [searchInput, ...savedItems];
      setSavedItems(newItems);
      saveArrayToLocalStorage('savedSearches', newItems);
    } 
    // console.log(savedItems);
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
    // console.log(`start: ${date}`);
  };

  const endDateFn = (date: Dayjs|null) => {
    setEndDate(date);
    // console.log(`end: ${date}`);
  };


  return (
    <div className="bg-[#F5F5F5] relative -top-1 w-full min-h-screen pl-8 pt-7 text-sans resize-x">
      {/* hide and show search bar */}
      <div className="flex mb-2 mt-1.5 absolute right-2 -top-1" onClick={()=>handleSearchBarClick()}>
          <div className="flex flex-row text-right items-center hover:bg-gray-200 p-0.5 rounded-md">
            {showSearchBar ? (
              <>
              <p className="text-gray-500 mr-1 text-sm">Hide</p>
              <IoChevronBack className="h-4 w-4 text-gray-500 mr-1" />
              </>
            ):(
              <>
              <p className="text-gray-500 mr-1 text-sm">Show</p>
              <IoChevronForward className="h-4 w-4 text-gray-500 mr-6" />
              </>
            )}
            
          </div>
      </div>
      {showSearchBar && (
        <div className="flex flex-col w-11/12 gap-y-2">
        {/* Scroll bar of saved searches */}
        {/* <div className="no-scroll-bar flex flex-nowrap flex-row gap-x-1.5 overflow-scroll w-11/12">
          {savedItems && savedItems.map((item, index) => {
            return (
              <SavedSearchBtn key={index} content={item} clickStay={true} clearSingleSavedItems={clearSingleSavedItems} 
              textSize="text-xs" enterSearchInput={enterSearchInput} clearSearchInput={clearSearchInput}/>
            )
          })}
        </div> */}
        
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
          <div className="w-3/5 items-center flex flex-row justify-between space-x-2">
            {showDatePicker && (
              <DatePickerSearch startDate={startDate} endDate={endDate} startDateFn={startDateFn} endDateFn={endDateFn}/>
            )}
          </div>
          {(page === "academics" || page === "clubs" || page==="career") ? (
            // <div className="w-2/6">{categoryContent}</div>
            <div className="w-2/6">
              <CategoryDropdown page={page} categoryName={categoryName} handleChangeCategory={handleChangeCategory} />
            </div>
          ) : (
            <></>
          )}
        </div>
        

        <div className="w-full mt-2 flex justify-between">
          {/* <Dropdown/> */}
          <Button content="Add All" clickStay={false} textSize="text-base"/>
          <Button content="Reset CMUCal Events" clickStay={false} textSize="text-base"/>
          {/* <Button content="Upload to GCal" bgColor={true} clickStay={false} textSize="text-base"/> */}
        </div>
        
        <div className="overflow-scroll" style={{height: '70vh'}}>
          { searchInput && <SearchContent searchInput={searchInput} page={page} categoryName={categoryName} startDate={startDate} 
          endDate={endDate} addToSavedItems={addSavedItem} handleAddFCEvent={handleAddFCEvent} eventId={eventId} 
          setEventId={setEventId} calendarRef={calendarRef} events={events} setEvents={setEvents} handleRemoveFCEvent={handleRemoveFCEvent}/>}
        </div>
        
        </div>
      )}

    </div>
  );
}

export { Search };
