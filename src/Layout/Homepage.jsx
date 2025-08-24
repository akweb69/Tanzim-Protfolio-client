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
// import VideoCV from "../Components/VideoCV";


const Homepage = () => {
    return (
        <div className="w-full min-h-screen">
            <HeroSection />
            <About />
            <Publications />
            <TrainingAndCertificate></TrainingAndCertificate>
            <Activities />
            <AffiliationsAndLeaderships></AffiliationsAndLeaderships>
            <Experience></Experience>
            <Appointment />

            {/* <VideoCV /> */}
            <Reviews />
            <Gallery />



            <Contact />
        </div>
    );
};

export default Homepage;
