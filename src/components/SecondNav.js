import React from "react";
import { NavLink } from "react-router-dom";

function SecondNavItem({ locationTo, title }) {
  return (
    <NavLink
      to={locationTo}
      className="text-gray-600 text-2xl font-serif font-source-serif-pro active:text-red"
      // activeClassName="text-teal border-b-2 border-teal"
    >
      {title}
    </NavLink>
  );
}

function SecondNav() {
  return (
    <nav>
      <div className="shadow-md py-1">
        <ul className="p-2 mx-auto list-none flex items-center justify-around w-3/5">
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
