import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import useAuthContext from "../Auth/useAuthContext";
import Loading from './../Common/Loading ';


const Mainlayout = () => {
    const { loading } = useAuthContext()
    return (
        <div className=" min-h-screen w-full overflow-x-hidden ">
            <Navbar />

            {loading && <div className=""> <Loading></Loading> </div>}
            {!loading && <Outlet />}

            <Footer />
        </div>
    );
};

export default Mainlayout;
