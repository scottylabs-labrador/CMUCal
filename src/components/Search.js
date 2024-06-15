import React, { useState, useId } from "react";
import "./Search.css";
import SearchCard from "./SearchCard";
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
  let date1 = "Sat, Apr 6";
  let time1 = "3PM - 5PM";
  let location1 = "POS 146";
  return (
    <div class="bg-gray-200 relative -top-2 w-full min-h-screen pl-8 pt-7">
      <div class="flex flex-col w-11/12">
        <div class="bg-gray-200 relative h-12 w-full rounded-md border border-black border-[1.5] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
            class="bg-gray-200 flex-grow px-4 focus:outline-none"
          />
          {/* Search icon. Add onClick function in the future */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-500 mr-2"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M20.0325 20.654L13.7705 14.392C13.2705 14.818 12.6955 15.1477 12.0455 15.381C11.3955 15.6144 10.7421 15.731 10.0855 15.731C8.48414 15.731 7.1288 15.1767 6.01947 14.068C4.91014 12.9594 4.35547 11.6044 4.35547 10.003C4.35547 8.40171 4.90947 7.04605 6.01747 5.93605C7.12547 4.82605 8.48014 4.27038 10.0815 4.26905C11.6828 4.26771 13.0388 4.82238 14.1495 5.93305C15.2601 7.04371 15.8155 8.39938 15.8155 10C15.8155 10.6947 15.6925 11.367 15.4465 12.017C15.2005 12.667 14.8771 13.223 14.4765 13.685L20.7385 19.946L20.0325 20.654ZM10.0865 14.73C11.4131 14.73 12.5331 14.2734 13.4465 13.36C14.3598 12.4467 14.8165 11.3264 14.8165 9.99904C14.8165 8.67171 14.3598 7.55171 13.4465 6.63905C12.5331 5.72638 11.4131 5.26971 10.0865 5.26905C8.7598 5.26838 7.63947 5.72505 6.72547 6.63905C5.81147 7.55305 5.3548 8.67305 5.35547 9.99904C5.35614 11.325 5.8128 12.445 6.72547 13.359C7.63814 14.273 8.75814 14.7297 10.0855 14.729"
              fill="#6A6565"
            />
          </svg>
        </div>

        <div class="mt-3">{dateContent}</div>

        <SearchCard
          eventName={eventName1}
          orgName={orgName1}
          date={date1}
          time={time1}
          location={location1}
        />
        <SearchCard
          eventName={eventName1}
          orgName={orgName1}
          date={date1}
          time={time1}
          location={location1}
        />
      </div>
    </div>
  );
}

export default Search;
