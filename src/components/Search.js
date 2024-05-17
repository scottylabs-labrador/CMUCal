import React, { useState, useId } from "react";
import "./Search.css";
import SearchCard from "./SearchCard";
// import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js

function Search() {
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
	}

	const endDateFn = (date) => {
		setEndDate(date);
		console.log(`end: ${date}`);
	}

	// for date range: start to end
	let dateContent;
	if (showDatePicker) {
		dateContent = (
			<>
				<DatePicker
					className="datePickerBtn"
					selected={startDate}
					onChange={(date) => {
						startDateFn(date);
					}}
				/>
				<span id="to">to</span>
				<DatePicker
					className="datePickerBtn"
					selected={endDate}
					onChange={(date) => {
						endDateFn(date);
					}}
				/>
			</>
		);
	}

	// bogus values
	let eventName1 = "Committee Work Session";
	let orgName1 = "Scotty Labs";
	let date1 = "Sat, Apr 6";
	let time1 = "3PM - 5PM";
	let location1 = "POS 146";
	return (
		<div className="searchComp">
			<div className="searchBarContainer">
				<input
					type="text"
					placeholder="Search here"
					onChange={handleChange}
					value={searchInput}
					className="searchBar"
				/>
				<i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
			</div>


			<div>{dateContent}</div> 
			
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
	);
}

export default Search;
