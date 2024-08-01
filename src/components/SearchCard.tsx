import React, { useEffect, useState, useContext } from "react";
import { IoLocationSharp, IoAdd } from "react-icons/io5";
import { FaRegClock, FaCheck } from "react-icons/fa";
import { AddFCEventType } from "../types";
import { getFormattedDateStr } from "../utils/DateManipulations";
import { handleEventRemoveFC } from "./calendar/event-utils";
import FullCalendar from "@fullcalendar/react";


type ButtonClickHandler = () => void;

interface SearchCardProps {
  eventName: string;
  orgName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  addToSavedItems: ButtonClickHandler;
  handleAddFCEvent: AddFCEventType;
  eventId: number;
  setEventId: React.Dispatch<React.SetStateAction<number>>;
  calendarRef: React.RefObject<FullCalendar>;
  // events: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  // eventCategory: string;
  // eventSubcategory: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  eventName,
  orgName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  addToSavedItems,
  handleAddFCEvent,
  eventId,
  setEventId,
  calendarRef,
  // events,
  setEvents
  // eventCategory,
  // eventSubcategory,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);
  const [currEventId, setCurrEventId] = useState<number>(-1);

  // const [savedItems, setSavedItems] = useState<string[]>([]);


  const handleAddToCalendar = () => {
    if (buttonClicked) {
      setButtonClicked((prevClicked) => !prevClicked);
      setEvents((prevItems) => prevItems.filter((item) => item.id !== `${currEventId}`));
      handleEventRemoveFC(calendarRef, `${currEventId}`);
      console.log('delete',currEventId);
      
    } else {
      setButtonClicked((prevClicked) => !prevClicked);
      addToSavedItems();
      const startDateTime = getFormattedDateStr(startDate, startTime);
      // console.log(currEventId);

      if (endDate) {
        const endDateTime = getFormattedDateStr(endDate, endTime);
        handleAddFCEvent({id:`${eventId}`, title:eventName, start:startDateTime, end: endDateTime, allDay: !endTime });
      } else {
        const endDateTime = getFormattedDateStr(startDate, endTime);
        // console.log(endDateTime);
        handleAddFCEvent({id:`${eventId}`, title:eventName, start:startDateTime, end: endDateTime, allDay: !endTime });
      }

      setCurrEventId(_=>eventId);
      setEventId(prev => prev+1);
      // console.log(eventId);
      
      
    }
    
  };

  const handleCardClicked = () => {
    setCardClicked(!cardClicked);
  }
  // {eventName}
  return (
    <div className="bg-white w-full my-3.5 px-6 py-4 rounded-lg flex items-center align-stretch relative">
      <div className="flex-1" onClick={handleCardClicked}>
        <p className={`text-xl w-3/5 my-0.5 ${cardClicked? "": "ease-in-out truncate"}`}>{eventName}</p>
        <p className="text-base my-0.5">By {orgName}</p>
        <div className="flex items-center gap-2 my-0.5">
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
        <div className="flex items-center gap-2 my-0.5">
          <IoLocationSharp className="h-4 w-4 text-gray-600 mr-2" />
          <p>{location}</p>
        </div>
      </div>
      <div className="flex-shrink-0 absolute right-3">
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
