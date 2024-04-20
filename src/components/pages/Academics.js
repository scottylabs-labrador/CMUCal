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
  
  return (
    <div>
      <h1>Academics</h1>
      <SearchCard eventName={eventName1} orgName={orgName1} date={date1} time={time1} location={location1} />
    </div>
  )
}

export default Academics;