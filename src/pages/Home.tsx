import React from 'react'
import { SecondNav, MyCalendar, Search } from "../components";

const Home: React.FC = () => {
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

export {Home};
