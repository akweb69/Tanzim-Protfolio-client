import React, { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";

const useAuthContext = () => {
    const data = useContext(AuthContext);
    useEffect(() => {
        console.log(data);
    }, [data])
    if (!data) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return data;
};

export default useAuthContext;