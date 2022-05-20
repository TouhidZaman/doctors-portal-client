import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../../../../api/axiosInstance";
import Service from "./Service";
import BookingModal from "./BookingModal";

const AvailableAppointments = ({ date }) => {
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);
    useEffect(() => {
        axiosInstance.get("services").then((response) => {
            setServices(response.data);
        });
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-8">
            <h4 className="text-secondary text-center text-2xl my-10">
                You picked {format(date, "PP")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Service key={service._id} service={service} setTreatment={setTreatment}/>
                ))}
            </div>
            {treatment && <BookingModal date={date} treatment={treatment} setTreatment={setTreatment}/>}
        </div>
    );
};

export default AvailableAppointments;
