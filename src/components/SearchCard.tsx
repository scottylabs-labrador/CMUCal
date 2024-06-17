import React, { useState } from "react";
import { IoLocationSharp, IoAdd } from "react-icons/io5";
import { FaRegClock, FaCheck } from "react-icons/fa";

interface SearchCardProps {
  eventName: string;
  orgName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  eventCategory: string;
  eventSubcategory: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  eventName,
  orgName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  eventCategory,
  eventSubcategory,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleAddToCalendar = () => {
    setButtonClicked((prevClicked) => !prevClicked);
    // Logic for calling GCal
  };

  return (
    <div className="bg-white w-full my-3.5 px-6 py-4 rounded-lg flex items-center align-stretch">
      <div className="flex-1">
        <p className="text-xl">{eventName}</p>
        <p className="text-base">By {orgName}</p>
        <div className="flex items-center gap-2">
          <FaRegClock className="h-4 w-4 text-gray-600 mr-2" />
          {endDate !== startDate ? (
            <p>
              {startDate}, {startTime} - {endDate}, {endTime}
            </p>
          ) : (
            <p>
              {startDate}, {startTime} - {endTime}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <IoLocationSharp className="h-4 w-4 text-gray-600 mr-2" />
          <p>{location}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          className={`rounded-full border border-teal px-4 py-2 flex items-center gap-1 ${
            buttonClicked ? "bg-teal text-white" : ""
          }`}
          style={{ minWidth: "7rem" }}
          onClick={handleAddToCalendar}
        >
          {buttonClicked ? (
            <FaCheck className="h-4 w-4 text-white mr-2" />
          ) : (
            <IoAdd className="h-6 w-6 text-white mr-2 stroke-teal" />
          )}
          {buttonClicked ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};

export { SearchCard };
