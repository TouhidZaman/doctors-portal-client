import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase/firebase.init";
import { format } from "date-fns";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

const BookingModal = ({ date, treatment, setTreatment }) => {
    const { name, slots } = treatment;
    const [user] = useAuthState(auth);

    //Joi Validation Schema
    const schema = Joi.object({
        date: Joi.date().required(),
        slot: Joi.string().required(),
        name: Joi.string().min(6).max(20).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
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

    //Handling Form submit
    const handleBooking = (data) => {
        console.log(data);
        setTreatment(null);
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
                            {...register("date")}
                            defaultValue={format(date, "PP")}
                            readOnly
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
                                id="name"
                                {...register("name")}
                                defaultValue={user.displayName}
                                className="input input-bordered w-full max-w-xs"
                            />
                            <p className="text-red-400">{errors.name?.message}</p>
                        </div>
                        <input
                            type={"email"}
                            readOnly
                            {...register("email")}
                            defaultValue={user.email}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <div className="w-full max-w-xs">
                            <input
                                type={"number"}
                                {...register("phone")}
                                placeholder="Phone Number"
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
