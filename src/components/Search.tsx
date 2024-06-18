import React, { useState } from "react";
import "./Search.css";
import { IoSearch } from "react-icons/io5";
import { SearchCard } from "./SearchCard";

// import Dropdown from "react-dropdown";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-dropdown/style.css";
// import "react-datepicker/dist/react-datepicker.css";

// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js

function Search() {
  // Chang name to search bar
  const [searchInput, setSearchInput] = useState("");
  // const [dropdownValue, setDropdownValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // const dateId = useId();

  const startDateFn = (date: Dayjs | null) => {
    setStartDate(date);
    console.log(`start: ${date}`);
  };

  const endDateFn = (date: Dayjs | null) => {
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
            onChange={(date) => {
              startDateFn(date);
            }}
          />
        </div>
        <span className="w-4">to</span>
        <div className="w-36">
          <DatePicker 
            value={endDate}
            onChange={(date) => {
              endDateFn(date);
            }}
          />
        </div>
        </LocalizationProvider>
      </>
    );
  }

  // bogus values
  const eventName1 = "Office Hours";
  const orgName1 = "15-122 Course Staff";
  const startDate1 = "06/17"
  const startTime1 = "3PM"
  const endDate1 = "06/17"
  const endTime1 = "5PM"
  const location1 = "POS 146";
  const eventCategory1 = "academic";
  const eventSubcategory1 = "OfficeHour";
  return (
    <div className="bg-gray-200 relative -top-2 w-full min-h-screen pl-8 pt-7 text-sans">
      <div className="flex flex-col w-11/12">
        <div className="bg-gray-200 relative h-12 w-full rounded-md border border-black border-[1.5] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
            className="bg-gray-200 flex-grow px-4 focus:outline-none"
          />
          {/* Search icon. Add onClick function in the future */}
          <IoSearch className="h-6 w-6 text-gray-500 mr-2" />
        </div>

        <div className="mt-3 w-3/5 items-center flex flex-row justify-between space-x-2">{dateContent}</div>

        <SearchCard
          eventName={eventName1}
          orgName={orgName1}
          startDate={startDate1}
          startTime={startTime1}
          endDate={endDate1}
          endTime={endTime1}
          location={location1}
          eventCategory={eventCategory1}
          eventSubcategory={eventSubcategory1}
        />
        <SearchCard
          eventName={eventName1}
          orgName={orgName1}
          startDate={startDate1}
          startTime={startTime1}
          endDate={endDate1}
          endTime={endTime1}
          location={location1}
          eventCategory={eventCategory1}
          eventSubcategory={eventSubcategory1}
        />
      </div>
    </div>
  );
}

export {Search};
