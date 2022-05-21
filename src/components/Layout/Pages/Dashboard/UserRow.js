import React from "react";
import axiosInstance from "../../../../api/axiosInstance";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import auth from "../../../../firebase/firebase.init";
import { Navigate } from "react-router-dom";

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;

    const makeAdmin = async () => {
        await axiosInstance.put(`users/admin/${email}`).then((response) => {
            refetch()
            Swal.fire({
                icon: "success",
                title: `${email} is promoted to admin successfully`,
                showConfirmButton: false,
                timer: 2500,
            });
        }).catch((error) => {
            
            if (error.response.status === 401 || error.response.status === 403) {
                Swal.fire({
                    icon: "error",
                    title: `${error.response.status} !`,
                    text: `${error.response.data.message}. Login again to continue`,
                    
                });
                // console.log("unauthorized user/access", error.response.status);
                signOut(auth);
                localStorage.removeItem("accessToken");
                Navigate("/login");
            }
        })
    };
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>
                {role!=="admin" && (
                    <button onClick={makeAdmin} className="btn btn-sm">
                        Make Admin
                    </button>
                )}
            </td>
            <td>
                <button className="btn btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default UserRow;
