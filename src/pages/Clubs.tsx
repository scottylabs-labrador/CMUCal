import React from 'react'
import { SecondNav, MyCalendar, Search, Footer } from "../components";
import Calendar from '../components/calendar/Calendar';

const Clubs: React.FC = () => {
  return (
    <div>
      <div className="relative">
        <div className="justify-between z-0">
          <SecondNav />
        </div>
        <div className="flex justify-between z-10 mt-2">
          <div className="w-2/5">
            <Search page={"clubs"} />
          </div>

          <div className="Calendar">
            {/* <MyCalendar /> */}
            <Calendar />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export { Clubs };
