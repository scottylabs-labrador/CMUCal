import React from "react";
import { Button } from "../Button";
import SearchCard from "../SearchCard";
import MyCalendar from "../MyCalendar";
import Search from "../Search";

function Academics() {
	let eventName1 = "Committee Work Session";
	let orgName1 = "Scotty Labs";
	let date1 = "Sat, Apr 6";
	let time1 = "3PM - 5PM";
	let location1 = "POS 146";
	return (
		<div>
			<div className="searchPageContainer">
				<div className="searchCol">
					<Search />
				</div>

				<div className="Calendar">
					<MyCalendar />
				</div>
			</div>
		</div>
	);
}

export default Academics;
