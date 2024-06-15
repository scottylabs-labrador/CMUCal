import React from "react";
import iconClock from "./icons/clock.svg";
import iconLocation from "./icons/location.svg";
import iconAdd from "./icons/add.svg";

function SearchCard({ eventName, orgName, date, time, location }) {
  return (
    <div class="bg-white w-full my-3.5  px-6 py-4 rounded-lg flex items-center align-stretch">
      <div className="flex-1">
        <p class="text-xl">{eventName}</p>
        <p class="text-base">By {orgName}</p>
        <div class="flex items-center gap-2">
          <img src={iconClock} class="h-4 w-4 text-gray-600 mr-2" />
          <p className="orgName">
            {date}, {time}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <img src={iconLocation} class="h-4 w-4 text-gray-600 mr-2" />
          <p>{location}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button className="rounded-full border border-teal bg-transparent px-4 py-2 flex items-center gap-1">
          <img src={iconAdd} class="h-4 w-4 text-gray-600 mr-2" />
          Add
        </button>
      </div>
    </div>
  );
}

export default SearchCard;
