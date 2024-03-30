import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function SecondNav() {
	return (
		<>
			<nav className="secondNavContainer">
				<div className="secondNav">
					<ul>
						<li>
							<NavLink
								to="/search/academics"
								className={({ isActive }) =>
									isActive ? "active nav-links" : "nav-links"
								}
							>
								Academics
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/search/clubs"
								className={({ isActive }) =>
									isActive ? "active nav-links" : "nav-links"
								}
							>
								Clubs
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/search/career"
								className={({ isActive }) =>
									isActive ? "active nav-links" : "nav-links"
								}
							>
								Career
							</NavLink>
						</li>
					</ul>
                    <hr />
				</div>
			</nav>
		</>
	);
}

export default SecondNav;
