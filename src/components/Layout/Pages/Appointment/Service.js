import React from "react";

const Service = ({ service }) => {
    const { name, slots } = service;
    return (
        <div class="card min-w-lg bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title text-secondary">{name}</h2>
                <p>{slots.length ? slots[0] : <span className="text-red-400">No Slot Available</span>}</p>
                <p>
                    {slots.length} {slots.length > 1 ? "spaces" : "space"} available
                </p>
                <div class="card-actions justify-center mt-2">
                    <button disabled={slots.length===0} class="btn btn-secondary text-white">Book Appointment</button>
                </div>
            </div>
        </div>
    );
};

export default Service;
