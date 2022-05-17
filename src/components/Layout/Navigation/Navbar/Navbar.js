import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../../../firebase/firebase.init";
import Logo from "../../../Logo/Logo";

const Navbar = () => {
    const [user] = useAuthState(auth);

    return (
        <nav className="w-full lg:px-8 navbar bg-base-200">
            <div className="flex-1 px-2 mx-2">
                <Logo className='text-2xl lg:text-3xl' />
            </div>
            <div className="flex-none lg:hidden">
                <label htmlFor="side-drawer" className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>
            <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal p-0">
                    {/* <!-- Navbar menu content here --> */}
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
                    {user ? (
                <li>
                    <Link className="ml-3" onClick={() => signOut(auth)} to={"/login"}>Sign-Out</Link>
                </li>
            ) : (
                <>
                    <li>
                        <NavLink to={"/login"}>Login</NavLink>
                    </li>
                </>
            )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
