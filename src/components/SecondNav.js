import React from "react";
import { NavLink } from "react-router-dom";

function SecondNavItem({ locationTo, title }) {
  return (
    <NavLink
      to={locationTo}
      className={({ isActive }) =>
        isActive
          ? "text-teal border-b-[3px] border-teal text-2xl font-serif font-source-serif-pro pb-1"
          : "text-grey text-2xl font-serif font-source-serif-pro"
      }
    >
      {title}
    </NavLink>
  );
}

function SecondNav() {
  return (
    <nav>
      <div className="shadow-md py-0">
        <ul className="p-2 mx-auto list-none flex items-center justify-around w-3/5 h-full">
          <li>
            <SecondNavItem locationTo="/search/academics" title="Academics" />
          </li>
          <li>
            <SecondNavItem locationTo="/search/clubs" title="Clubs" />
          </li>
          <li>
            <SecondNavItem locationTo="/search/career" title="Career" />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SecondNav;
