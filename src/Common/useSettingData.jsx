import { useEffect, useState } from "react";
import axios from "axios";

const useSettingData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/all_settings`
                );
                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { data, loading, error };
};

export default useSettingData;
