import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile  max-w-7xl mx-auto px-2">
            {/* max-w-7xl mx-auto px-8 */}
            <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                {/* <!-- Page content here --> */}
                <h3 className="text-3xl text-primary text-center mt-4 mb-3">
                    Welcome to your Dashboard
                </h3>
                <Outlet />
            </div>
            <div class="drawer-side">
                <label for="dashboard-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 lg:pt-16 overflow-y-auto w-60 bg-base-100 text-base-content">
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
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
