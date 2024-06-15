import React from "react";
import { Button } from "../Button";
import MyCalendar from "../MyCalendar";
import Search from "../Search";
import SecondNav from "../SecondNav";

function Academics() {
  return (
    <div>
      <div className="relative">
        <div className="flex justify-between z-10">
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

export default Academics;
