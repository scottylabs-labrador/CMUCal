import React from 'react'
import { Button } from '../Button'
import SearchCard from '../SearchCard';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, width: 800 }}
      />
    </div>
  );
};


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
      <MyCalendar />
    </div>
  )
}

export default Academics;