import React, { useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../../../../api/axiosInstance";
import Service from "./Service";
import BookingModal from "./BookingModal";
import { useQuery } from "react-query";

const AvailableAppointments = ({ date }) => {
    const [treatment, setTreatment] = useState(null);
    const formattedDate = format(date, "PP");

    const {
        isLoading,
        error,
        data: services,
        refetch,
    } = useQuery(["available", formattedDate], () =>
        axiosInstance
            .get(`available?date=${formattedDate}`)
            .then((response) => response.data)
    );

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="max-w-7xl mx-auto px-8">
            <h4 className="text-secondary text-center text-2xl my-10">
                You picked {formattedDate}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Service
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    />
                ))}
            </div>
            {treatment && (
                <BookingModal
                    refetch={refetch}
                    date={date}
                    treatment={treatment}
                    setTreatment={setTreatment}
                />
            )}
        </div>
    );
};

export default AvailableAppointments;
