import { useEffect, useState } from "react";
import About from "../Components/About";
import Activities from "../Components/Activities";
import AffiliationsAndLeaderships from "../components/AffiliationsAndLeaderships";
import Appointment from "../Components/Appointment";
import Contact from "../Components/Contact";
import Experience from "../components/Experience";
import Gallery from "../Components/Gallery";
import HeroSection from "../Components/HeroSection";
import Publications from "../Components/Publications";
import Reviews from "../Components/Reviews";
import TrainingAndCertificate from "../components/TrainingAndCertificate";
import axios from "axios";
import ScrollToTop from "../components/ScrollToTop";

const Homepage = () => {



    return (
        <div className="w-full min-h-screen">
            <ScrollToTop></ScrollToTop>
            <HeroSection />
            <About />
            <Publications />
            <TrainingAndCertificate />
            <Activities />
            <AffiliationsAndLeaderships />
            <Experience />
            <Appointment />
            <Reviews />
            <Gallery />
            <Contact />
        </div>
    );
};

export default Homepage;