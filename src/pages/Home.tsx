import React, { useState } from "react";
import { SecondNav, Search, Footer } from "../components";
import Calendar from "../components/calendar/Calendar";

const Home: React.FC = () => {
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [page, setPage] = useState("academics");
  const handleSearchBarClick = () => {
    setShowSearchBar(prev => !prev);
  }
  return (
    <div>
      <div className="relative">
        <div className="justify-between z-0">
          <SecondNav page={page} setPage={setPage}/>
        </div>
        <div className="flex justify-between z-10 mt-2">
          <div className={`${showSearchBar? 'w-2/5': 'w-1/12'}`}>
            <Search page={page} showSearchBar={showSearchBar} handleSearchBarClick={handleSearchBarClick}/>
          </div>

          <div className={`${showSearchBar? 'Calendar': 'CalendarFull'}`}>
            <Calendar showSearchBar={showSearchBar} />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export { Home };
