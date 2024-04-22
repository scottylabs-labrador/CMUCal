import React, { useState } from "react";
import "./Search.css";
import SearchCard from "./SearchCard";
// import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js

function Search() {
	const [searchInput, setSearchInput] = useState("");
	const [selectedvalue, setSelectedValue] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
	};

	// for dropdown
	const selectValue = (value) => {
		setSelectedValue(value);
		console.log(value);
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
			<DatePicker
				className="dropDownBtn"
				selected={startDate}
				onChange={(date) => setStartDate(date)}
			/>
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
					
					<button value={"April"} onClick={()=>{setSelectedDate("April")}} >Select Month</button>,
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
