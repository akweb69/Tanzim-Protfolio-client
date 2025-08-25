import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCode, FaBriefcase, FaGraduationCap, FaTrophy } from "react-icons/fa";
import axios from "axios";

const iconMap = [<FaCode />, <FaBriefcase />, <FaGraduationCap />, <FaTrophy />];

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
        <section className="py-10 bg-gradient-to-tr from-gray-950 to-indigo-900 flex flex-col">
            <div className="w-10/12 md:w-11/12 mx-auto py-8 sm:py-12 flex-1">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Experience Journey
                </motion.h1>

                {loading ? (
                    <p className="text-white text-center flex-1 flex items-center justify-center">
                        Loading experiences...
                    </p>
                ) : error ? (
                    <p className="text-red-400 text-center">{error}</p>
                ) : (
                    <div className="relative max-w-5xl mx-auto">
                        {/* Vertical line only for medium+ screens */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-400 h-full"></div>

                        {experiences?.map((exp, index) => (
                            <motion.div
                                key={exp._id}
                                className={`mb-8 flex flex-col md:flex-row items-center md:items-stretch w-full ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                {/* Empty space for alignment */}
                                <div className="hidden md:block w-1/2"></div>

                                {/* Card */}
                                <div className="w-full md:w-1/2 p-3 sm:p-4">
                                    <div className="bg-[rgba(0,0,0,0.35)] rounded-2xl shadow-lg p-5 sm:p-6 relative hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                                        {/* Icon */}
                                        <div
                                            className={`absolute top-1/2 -mt-5 ${index % 2 === 0
                                                ? "-left-10 md:-left-12"
                                                : "-right-10 md:-right-12"
                                                } bg-indigo-500 rounded-full p-3 sm:p-4 text-white shadow-lg`}
                                        >
                                            {exp.icon}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                                            {exp.title}
                                        </h3>
                                        <span className="block text-sm sm:text-base text-indigo-200 mb-2">
                                            {exp.period}
                                        </span>
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                            {exp.description}
                                        </p>
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
