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
    const [sectionVisibility, setSectionVisibility] = useState({
        "Hero Section": true,
        "About": true,
        "Activities": true,
        "Affiliations & Leadership": true,
        "Experience Journey": true,
        "Book an Appointment": true,
        "Training & Certifications": true,
        "References & Reviews": true,
        "Stunning Gallery": true,
        "Contact Me": true,
        "Publications": true,
    });

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/sections`);
                const sections = response.data;
                const updatedVisibility = {};
                sections.forEach((section) => {
                    updatedVisibility[section.name] = section.isEnabled;
                });
                setSectionVisibility((prev) => ({
                    ...prev,
                    ...updatedVisibility,
                }));
            } catch (error) {
                console.error("Error fetching section visibility:", error);
            }
        };
        fetchSections();
    }, []);

    return (
        <div className="w-full min-h-screen">
            <ScrollToTop></ScrollToTop>
            {sectionVisibility["Hero Section"] && <HeroSection />}
            {sectionVisibility["About"] && <About />}
            {sectionVisibility["Publications"] && <Publications />}
            {sectionVisibility["Training & Certifications"] && <TrainingAndCertificate />}
            {sectionVisibility["Activities"] && <Activities />}
            {sectionVisibility["Affiliations & Leadership"] && <AffiliationsAndLeaderships />}
            {sectionVisibility["Experience Journey"] && <Experience />}
            {sectionVisibility["Book an Appointment"] && <Appointment />}
            {sectionVisibility["References & Reviews"] && <Reviews />}
            {sectionVisibility["Stunning Gallery"] && <Gallery />}
            {sectionVisibility["Contact Me"] && <Contact />}
        </div>
    );
};

export default Homepage;