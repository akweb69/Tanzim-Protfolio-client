import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [settings, setSettings] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [publications, setPublications] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [experience, setExperience] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [activities, setActivities] = useState([]);
    const [leadership, setLeadership] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [skills, setSkills] = useState([]);
    const [education, setEducation] = useState([]);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const [
                    settingsResponse,
                    appointmentsResponse,
                    publicationsResponse,
                    certificatesResponse,
                    experienceResponse,
                    galleryResponse,
                    activitiesResponse,
                    leadershipResponse,
                    reviewsResponse,
                    skillsResponse,
                    educationResponse,
                    sectionsResponse,
                ] = await Promise.all([
                    axios.get(`${BASE_URL}/all_settings`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/all_appointments`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/all_publications`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/all_certificates`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/all_experience`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/all_gallery`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/all_activities`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/leadership`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/reviews`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/skills`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/education`, { signal: controller.signal }),
                    axios.get(`${BASE_URL}/sections`, { signal: controller.signal }),
                ]);

                // Update state with fetched data
                setSettings(settingsResponse.data);
                setAppointments(appointmentsResponse.data);
                setPublications(publicationsResponse.data);
                setCertificates(certificatesResponse.data);
                setExperience(experienceResponse.data);
                setGallery(galleryResponse.data);
                setActivities(activitiesResponse.data);
                setLeadership(leadershipResponse.data);
                setReviews(reviewsResponse.data);
                setSkills(skillsResponse.data);
                setEducation(educationResponse.data);
                setSections(sectionsResponse.data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching data:", error);
                    setError("Failed to fetch data. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup on unmount
        return () => controller.abort();
    }, []);

    // Combine all data into mainData object for context
    const mainData = {
        loading,
        error,
        settings,
        appointments,
        publications,
        certificates,
        experience,
        gallery,
        activities,
        leadership,
        reviews,
        skills,
        education,
        sections,
    };


    return (
        <AuthContext.Provider value={{ mainData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;