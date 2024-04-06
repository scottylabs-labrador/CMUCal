import React from 'react';
import "./SearchCard.css";

function SearchCard({eventName, orgName, date, time, location}) {
  return (
    <div className="searchCardContainer">
      <p className="eventName">{eventName}</p>
      <p className="orgName">By {orgName}</p>
      <div>
        <p className="orgName">{date}</p>
        <p className="time">{time}</p>
      </div>
      <p>{location}</p>
      
    </div>
  )
}

export default SearchCard
