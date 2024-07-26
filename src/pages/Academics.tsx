import React from "react";
import { SecondNav, Search, Footer } from "../components";
import Calendar from "../components/calendar/Calendar";

const Academics: React.FC = () => {
  return (
    <div>
      <div className="relative">
        <div className="justify-between z-0">
          <SecondNav />
        </div>
        <div className="flex justify-between z-10 mt-2">
          <div className="w-2/5">
            <Search page={"academics"}/>
          </div>

          <div className="Calendar">
            <Calendar />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export { Academics };
