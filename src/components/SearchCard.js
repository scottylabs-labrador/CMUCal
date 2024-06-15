import React from "react";
import iconClock from "./icons/clock.svg";
import iconLocation from "./icons/location.svg";
import iconAdd from "./icons/add.svg";

function SearchCard({
  eventName,
  orgName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  eventType,
}) {
  // Convert information displayed on search card to dateTime type to pass to fetch request 
  const parseDateTime = ({ startDate, startTime, endDate, endTime }) => {

  };

  const handleAddToCalendar = () => {
    console.log("Adding event to Google Calendar...");
    fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        // 'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`, // Need method to find access token after authorization
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: eventName,
        description: `Event organized by ${orgName}`,
        start: {
          dateTime: `${startDate}T${startTime}:00`,
          timeZone: "Asia/Ho_Chi_Minh",
        },
        end: {
          dateTime: `${endDate}T${endTime}:00`,
          timeZone: "Asia/Ho_Chi_Minh",
        },
        location: location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event created successfully:", data);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  };

  return (
    <div className="bg-white w-full my-3.5 px-6 py-4 rounded-lg flex items-center align-stretch">
      <div className="flex-1">
        <p className="text-xl">{eventName}</p>
        <p className="text-base">By {orgName}</p>
        <div className="flex items-center gap-2">
          <img
            src={iconClock}
            className="h-4 w-4 text-gray-600 mr-2"
            alt="Clock Icon"
          />
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
          <img
            src={iconLocation}
            className="h-4 w-4 text-gray-600 mr-2"
            alt="Location Icon"
          />
          <p>{location}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          className="rounded-full border border-teal bg-transparent px-4 py-2 flex items-center gap-1"
          onClick={handleAddToCalendar}
        >
          <img
            src={iconAdd}
            className="h-4 w-4 text-gray-600 mr-2"
            alt="Add Icon"
          />
          Add
        </button>
      </div>
    </div>
  );
}

export default SearchCard;
