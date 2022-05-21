import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";
import auth from "../../../../firebase/firebase.init";
import Swal from "sweetalert2";

const MyAppointments = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const {
        isLoading,
        error,
        data: myBookings,
    } = useQuery(["myBookings", user?.email], () =>
        axiosInstance(`bookings?patient=${user.email}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log("error res", error);
                
                if (error.response.status === 401 || error.response.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: `${error.response.status} !`,
                        text: `${error.response.data.message}. Login again to continue`,
                        // showConfirmButton: false,
                        // timer: 2500,
                    });
                    console.log("unauthorized user/access", error.response.status);
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                }
            })
    );

    if (isLoading) return "Loading...";

    if (error) {
        return `Error: ${error.message}`;
    }

    return (
        <div className="overflow-x-auto px-4">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Treatment</th>
                    </tr>
                </thead>
                <tbody>
                    {myBookings?.map((booking, index) => (
                        <tr key={booking._id}>
                            <th>{index + 1}</th>
                            <td>{booking.patientName}</td>
                            <td>{booking.date}</td>
                            <td>{booking.slot}</td>
                            <td>{booking.treatment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyAppointments;
