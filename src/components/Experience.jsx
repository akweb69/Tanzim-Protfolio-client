import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCode, FaBriefcase, FaGraduationCap, FaTrophy } from "react-icons/fa";
import axios from "axios";

const iconMap = [
    <FaCode />,
    <FaBriefcase />,
    <FaGraduationCap />,
    <FaTrophy />,
];

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchExperiences = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/all_experience`);
                // Assign icons to experiences based on index
                const experiencesWithIcons = response.data.map((exp, index) => ({
                    ...exp,
                    icon: iconMap[index % iconMap.length],
                }));
                setExperiences(experiencesWithIcons);
            } catch (err) {
                setError("Failed to fetch experiences.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    return (
        <section className="py-10 bg-gradient-to-br from-gray-950 to-indigo-900 flex flex-col">
            <div className="w-11/12 mx-auto py-12 sm:py-16 flex-1">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Experience Journey
                </motion.h1>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {loading ? (
                    <p className="text-white text-center flex-1 flex items-center justify-center">Loading experiences...</p>
                ) : (
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-400 h-full"></div>
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp._id}
                                className={`mb-6 sm:mb-8 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center w-full`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="hidden sm:block w-1/2"></div>
                                <div className="w-full sm:w-1/2 p-4">
                                    <div className="bg-[rgba(0,0,0,0.3)] rounded-lg shadow-lg p-4 sm:p-6 relative hover:shadow-xl transition-shadow duration-300">
                                        <div className={`absolute top-1/2 -mt-4 ${index % 2 === 0 ? '-left-10 sm:-left-12' : '-right-10 sm:-right-12'} bg-indigo-400 rounded-full p-2 sm:p-3 text-white`}>
                                            {exp.icon}
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-white">{exp.title}</h3>
                                        <span className="block text-sm text-indigo-200 mb-2">{exp.period}</span>
                                        <p className="text-gray-300 text-sm sm:text-base">{exp.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Experience;