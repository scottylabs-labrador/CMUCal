import React, { useState, useId } from "react";
import "./Search.css";
import { IoSearch } from "react-icons/io5";
import { SearchCard } from "./SearchCard";

// import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js

function Search() {
  // Chang name to search bar
  const [searchInput, setSearchInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // const dateId = useId();

  const startDateFn = (date) => {
    setStartDate(date);
    console.log(`start: ${date}`);
  };

  const endDateFn = (date) => {
    setEndDate(date);
    console.log(`end: ${date}`);
  };

  // for date range: start to end
  let dateContent;
  if (showDatePicker) {
    dateContent = (
      <>
        <div className="inlineBlock">
          <DatePicker
            className="datePickerBtn"
            selected={startDate}
            onChange={(date) => {
              startDateFn(date);
            }}
            popperClassName="calendarPopup"
            popperPlacement="top-start"
          />
        </div>
        <span id="to">to</span>
        <div className="inlineBlock">
          <DatePicker
            className="datePickerBtn"
            selected={endDate}
            onChange={(date) => {
              endDateFn(date);
            }}
            popperPlacement="top-start"
          />
        </div>
      </>
    );
  }

  // bogus values
  let eventName1 = "Office Hours";
  let orgName1 = "15-122 Course Staff";
  let startDate1 = "06/17"
  let startTime1 = "3PM"
  let endDate1 = "06/17"
  let endTime1 = "5PM"
  let location1 = "POS 146";
  let eventCategory1 = "academic";
  let eventSubcategory1 = "OfficeHour";
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

        <div className="mt-3">{dateContent}</div>

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
