import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const email = user?.email;
    useEffect(() => {
        const verifyAdmin = async () => {
            await axiosInstance.get(`admin/${email}`).then((response) => {
                setAdmin(response.data.admin);
            });
            setLoading(false);
        };
        verifyAdmin();
    }, [email]);
    return [admin, loading];
};

export default useAdmin;
