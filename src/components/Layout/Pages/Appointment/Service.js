import React from "react";

const Service = ({ service, setTreatment }) => {
    const { name, slots } = service;
    return (
        <div className="card min-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl text-secondary">{name}</h2>
                <p>
                    {slots.length ? (
                        slots[0]
                    ) : (
                        <span className="text-red-400">No Slot Available</span>
                    )}
                </p>
                <p>
                    {slots.length} {slots.length > 1 ? "spaces" : "space"} available
                </p>
                <div className="card-actions justify-center mt-2">
                    <label
                        htmlFor="booking-modal"
                        onClick={() => setTreatment(service)}
                        disabled={slots.length === 0}
                        className="btn btn-secondary text-white uppercase bg-gradient-to-r from-secondary to-primary"
                    >
                        Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Service;
