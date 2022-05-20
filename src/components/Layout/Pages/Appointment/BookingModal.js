import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase/firebase.init";
import { format } from "date-fns";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axiosInstance from "../../../../api/axiosInstance";
import Swal from "sweetalert2";

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
    const { _id, name, slots } = treatment;
    const [user] = useAuthState(auth);

    //Joi Validation Schema
    const schema = Joi.object({
        slot: Joi.string().required(),
        patientName: Joi.string().min(6).max(20).required(),
        phone: Joi.number().integer().required(),
    });

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    //Handling Add Booking Appointment
    const handleBooking = async (data) => {
        const { slot, patientName, phone } = data;
        const formattedDate = format(date, "PP");
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: patientName,
            phone,
        };
        // console.log(booking);

        await axiosInstance.post("bookings", booking).then((response) => {
            const { data } = response;
            console.log(data);
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: `Appointment is set, ${formattedDate} at ${slot}`,
                    showConfirmButton: false,
                    timer: 2500,
                });
                refetch()
            } else {
                Swal.fire({
                    icon: "warning",
                    title: `Already have an appointment on, ${data.booking?.date} at ${data.booking?.slot}`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
            setTreatment(null);
        });
    };

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label
                        htmlFor="booking-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold text-lg text-secondary mb-4">
                        Booking for: {name}
                    </h3>
                    <form
                        onSubmit={handleSubmit(handleBooking)}
                        className="grid grid-cols-1 gap-3 justify-items-center"
                    >
                        <input
                            defaultValue={format(date, "PP")}
                            disabled
                            className="input input-bordered w-full max-w-xs"
                        />
                        <select
                            {...register("slot")}
                            className="select select-bordered w-full max-w-xs"
                        >
                            {slots.map((slot, index) => (
                                <option key={index} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                        <div className="w-full max-w-xs">
                            <input
                                id="patientName"
                                {...register("patientName")}
                                defaultValue={user.displayName}
                                className="input input-bordered w-full max-w-xs"
                            />
                            <p className="text-red-400">{errors.patientName?.message}</p>
                        </div>
                        <input
                            type={"email"}
                            disabled
                            defaultValue={user.email}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <div className="w-full max-w-xs">
                            <input
                                type={"number"}
                                {...register("phone")}
                                placeholder="Phone number"
                                className="input input-bordered w-full"
                            />
                            <p className="text-red-400">{errors.phone?.message}</p>
                        </div>
                        <input
                            type="submit"
                            value="submit"
                            className="btn btn-secondary w-full max-w-xs text-white"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
