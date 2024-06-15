import React from 'react'
import { Button } from '../Button'
import MyCalendar from '../MyCalendar';
import SecondNav from "../SecondNav";
import Search from "../Search";

function Home() {
  return (
    <>
    <div>
      <div className="relative">
      <SecondNav className="justify-between z-0"/>
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
    </>
  )
}

export default Home
