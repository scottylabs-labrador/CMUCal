import React, { useState, useId, Text } from "react";
import "./Search.css";
import SearchCard from "./SearchCard";
// import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { render } from "react-dom";

// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js

function Search() {
	const [searchInput, setSearchInput] = useState("");
	const [dropdownValue, setDropdownValue] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [showDateRange, setShowDateRange] = useState(false);
	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	const dateId = useId();

	// for dropdown
	// const selectDropdownValue = (e) => {
	// 	setDropdownValue(e.target.value);
	// 	console.log(dropdownValue);
	// };

	const handleDateDropdown = (e) => {
		setDropdownValue(e.target.value);
		console.log(e.target.value);
		if (
			e.target.value === "Select Single Date" ||
			e.target.value === "Select Start Date" ||
			e.target.value === "Select End Date"
		) {
			setShowDatePicker(true);
		}
		
	};

	const datePickerFn = (date) => {
		// console.log("ran date picker function");
		// console.log(dropdownValue);
		if (dropdownValue === "Select Single Date") {
			// console.log("single date datepicker");
			setStartDate(date);
			setEndDate(date);
			console.log(`start: ${startDate}, end: ${endDate}`);
		} else if (dropdownValue === "Select Start Date") {
			setStartDate(date);
			console.log(`start: ${startDate}`);
		} else if (dropdownValue === "Select End Date") {
			setEndDate(date);
			console.log(`end: ${endDate}`);
		}

		setShowDatePicker(false);
	};

	// const options = ["one", "two", "three"];
	// const [defaultOption, setDefaultOption] = useState("");
	// setDefaultOption(options[0]);
	// const {_onSelect} = this.props;

	// Dropdown._onSelect = () => {
	// 	setDefaultOption(this);
	// }

	// function handleInput(props) {
	// 	const buttonValue= this.props.value;
	// 	console.log(buttonValue)
	// }

	// const handleMenuTwo = () => {
	// 	console.log("clicked two");
	// };

	let content;
	if (showDatePicker) {
		content = (
			<>
				<DatePicker
					className="datePickerBtn"
					selected={startDate}
					onChange={(date) => {
						setStartDate(date);
					}}
				/>
				<span id="to">to</span>
				<DatePicker
					className="datePickerBtn"
					selected={endDate}
					onChange={(date) => {
						setEndDate(date);
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

			{/* <label htmlFor={dateId}>Pick a date(s): </label> */}

			{/* (
				<DatePicker
					className="datePickerBtn"
					selected={startDate}
					onChange={(date) => {
						datePickerFn(date);
					}}
				/>
			) */}

			{showDatePicker && dropdownValue !== "null date" ? (
				<div>{content}</div>
			) : (
				<select
					id={dateId}
					name="selectedDates"
					className="dropDownBtn"
					onChange={(e) => handleDateDropdown(e)}
				>
					<option
						value="null date"
						className="instructions"
						style={{ color: "#008000" }}
					>
						Date or Date Range
					</option>
					<option value="Select Single Date">Select Single Date</option>
					<option value="Select Start Date">Select Start Date</option>
					<option value="Select End Date">Select End Date</option>
				</select>
			)}
			{/* <Dropdown
				options={options}
				// onChange={this._onSelect}
				// onChange={e => setDefaultOption(e.target.value)}
				value={defaultOption}
				placeholder="Select an option"
			/> */}

			{/* <Dropdown
				trigger={<button className="dropdownBtn">Dropdown</button>}
				// menu = {[
				// 	{ id: 1, text: "Select Month" },
				// 	{ id: 2, text: "Select Week" },
				// 	{ id: 3, text: "Select Date" },
				// ]}  

				menu={[
					
					<button value={"April"} onClick={()=>{}} >Select Month</button>,
					<button value={"4/21/24 - 4/27/24"} onClick={()=>{setSelectedDate("4/21/24 - 4/27/24")}} >Select Week</button>,
					<button value={"4/27/24"} onClick={()=>{setSelectedDate("4/27/24")}} >Select Date</button>,
					// <button value={"Menu 2"} onClick={()=>{handleMenuOne(this.target.value)}}>Menu 2</button>,
				]}
			/> */}
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
