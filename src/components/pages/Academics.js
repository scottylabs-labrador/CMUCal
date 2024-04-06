import React from 'react'
import { Button } from '../Button'
import SearchCard from '../SearchCard';

function Academics() {
  let eventName1 = "Committee Work Session";
  let orgName1 = "Scotty Labs";
  let date1 = "Sat, Apr 6";
  let time1 = "3PM - 5PM";
  let location1 = "POS 146";
  return (
    <div>
      <h1>Academics</h1>
      <SearchCard eventName={eventName1} orgName={orgName1} date={date1} time={time1} location={location1} />
    </div>
  )
}

export default Academics;