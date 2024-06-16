import React from "react";
import MyCalendar from "../MyCalendar.js";
import Search from "../Search.js";
import SecondNav from "../SecondNav.tsx";

const Careers: React.FC = () => {
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
};

export default Careers;
