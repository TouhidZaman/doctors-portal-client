import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../Logo/Logo";

const SideDrawer = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="side-drawer" className="drawer-overlay"></label>

            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                <Logo className="text-2xl lg:text-3xl mb-4" />
                {/* <!-- Sidebar content here --> */}
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"about"}>About</NavLink>
                </li>
                <li>
                    <NavLink to={"appointment"}>Appointment</NavLink>
                </li>
                <li>
                    <NavLink to={"reviews"}>Reviews</NavLink>
                </li>
                <li>
                    <NavLink to={"contact"}>Contact Us</NavLink>
                </li>
                <li>
                    <NavLink to={"Login"}>Login</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SideDrawer;
