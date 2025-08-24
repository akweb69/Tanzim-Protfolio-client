import { createBrowserRouter } from "react-router-dom";
import Homepage from "../Layout/Homepage";
import HeroSection from "../Components/HeroSection";
import About from "../Components/About";
import Gallery from "../Components/Gallery";
import Reviews from "../Components/Reviews";
import Publications from "../Components/Publications";
import ViewPublications from "../pages/ViewPublications";
import Activities from "../Components/Activities";
import Appointment from "../Components/Appointment";
import Contact from "../Components/Contact";
import VideoCV from "../Components/VideoCV";
import Mainlayout from './../Layout/Mainlayout';
import DashboardHome from "../admin/DashboardHome";
import ManageAppointments from "../admin/ManageAppointments";
import ManagePublications from "../admin/ManagePublications";
import ManageReviews from "../admin/ManageReviews";
import ManageGallery from "../admin/ManageGallery";
import ManageActivities from "../admin/ManageActivities";
import Settings from "../admin/Settings";
import AdminLayout from "../Layout/AdminLayout";
import PublicationDetail from "../components/PublicationDetail";
import ManageCertificatesAndTraining from "../admin/ManageCerticatesAndTraining";
import ManagementExperience from "../admin/ManagementExperience";
import ManageLeadership from "../admin/ManageLeadership";
import ManageSkills from "../admin/ManageSkills";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout></Mainlayout>,
        children: [
            { path: "/", element: <Homepage /> },
            { path: "/hero", element: <HeroSection /> },
            { path: "/about", element: <About /> },
            { path: "/gallery", element: <Gallery /> },
            { path: "/videocv", element: <VideoCV /> },
            { path: "/reviews", element: <Reviews /> },
            { path: "/publications", element: <Publications /> },
            { path: "/activities", element: <Activities /> },
            { path: "/appointment", element: <Appointment /> },
            { path: "/contact", element: <Contact /> },
            { path: "/view-publications/:id", element: <PublicationDetail /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { path: "", element: <DashboardHome /> },
            { path: "appointments", element: <ManageAppointments /> },
            { path: "publications", element: <ManagePublications /> },
            { path: "reviews", element: <ManageReviews /> },
            { path: "gallery", element: <ManageGallery /> },
            { path: "activities", element: <ManageActivities /> },
            { path: "settings", element: <Settings /> },
            { path: "certificates", element: <ManageCertificatesAndTraining /> },
            { path: "experience", element: <ManagementExperience /> },
            { path: "leadership", element: <ManageLeadership /> },
            { path: "skills", element: <ManageSkills /> },
        ],
    },
]);

export default router;
