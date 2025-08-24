import { useEffect, useState } from "react";
import axios from "axios";

const useSettingData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/all_settings`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};

export default useSettingData;
