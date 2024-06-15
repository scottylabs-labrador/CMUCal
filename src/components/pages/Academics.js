import React from "react";
import { Button } from "../Button";
import MyCalendar from "../MyCalendar";
import Search from "../Search";

function Academics() {
  return (
    <div>
      <div class="flex justify-between">
        <div className="w-2/5">
          <Search />
        </div>

        <div className="Calendar">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
}

export default Academics;
