import React from 'react'
import MyCalendar from '../MyCalendar';
import Search from "../Search";
import SecondNav from "../SecondNav.tsx";

const Clubs: React.FC = () => {
  return (
    <div>
      <div className="relative">
      <div className="justify-between z-0">
          <SecondNav />
        </div>
        <div className="flex justify-between z-10 mt-2">
          <div className="w-2/5">
            <Search />
          </div>

          <div className="Calendar">
            <MyCalendar />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Clubs
