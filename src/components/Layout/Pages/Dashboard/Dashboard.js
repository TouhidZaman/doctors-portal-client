import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../../firebase/firebase.init";
import useAdmin from "../../../../hooks/useAdmin";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    return (
        <div className="drawer drawer-mobile  max-w-7xl mx-auto px-2">
            {/* max-w-7xl mx-auto px-8 */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <!-- Page content here --> */}
                <h3 className="text-3xl text-primary text-center mt-4 mb-3">
                    Welcome to your Dashboard
                </h3>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 lg:pt-16 overflow-y-auto w-60 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li className="border-b">
                        <Link to={"/dashboard"}>My Appointments</Link>
                    </li>
                    <li className="border-b">
                        <Link to={"/dashboard/my-reviews"}>My Reviews</Link>
                    </li>
                    <li className="border-b">
                        <Link to={"/dashboard/my-history"}>My History</Link>
                    </li>
                    {admin && (
                        <li className="border-b">
                            <Link to={"/dashboard/users"}>All Users</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
