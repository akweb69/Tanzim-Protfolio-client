import { motion } from "framer-motion";
import { FaCode, FaBriefcase, FaGraduationCap, FaTrophy } from "react-icons/fa";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";

const Experience = () => {
    const { mainData, loading } = useAuthContext();
    const { experience } = mainData || {};

    // Map icons based on index or a type field (adjust as needed)
    const getIcon = (exp, index) => {
        const iconMap = [FaCode, FaBriefcase, FaGraduationCap, FaTrophy];
        // If experience has a 'type' field like 'coding', 'job', 'education', 'award', use it
        const typeMap = {
            coding: <FaCode size={20} />,
            job: <FaBriefcase size={20} />,
            education: <FaGraduationCap size={20} />,
            award: <FaTrophy size={20} />,
        };
        return exp.type && typeMap[exp.type] ? typeMap[exp.type] : iconMap[index % iconMap.length];
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 via-indigo-900 to-black min-h-screen flex flex-col">
            <div className="w-10/12 md:w-11/12 mx-auto py-8 sm:py-12 flex-1">
                {/* Title */}
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
                >
                    Experience Journey
                </motion.h1>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical timeline line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 to-purple-500 h-full"></div>

                    {experience && experience.length > 0 ? (
                        experience.map((exp, index) => (
                            <motion.div
                                key={exp._id || index}
                                className={`mb-10 flex flex-col md:flex-row items-center md:items-stretch w-full ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                {/* Empty space for alignment */}
                                <div className="hidden md:block w-1/2"></div>

                                {/* Card */}
                                <div className="w-full md:w-1/2 p-3 sm:p-4">
                                    <motion.div
                                        className="bg-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-2xl shadow-lg p-5 sm:p-6 relative border border-gray-700/30 transition-all duration-300"
                                        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)" }}
                                    >
                                        {/* Icon */}
                                        <div
                                            className={`absolute top-1/2 -mt-6 ${index % 2 === 0 ? "-left-10 md:-left-12" : "-right-10 md:-right-12"} bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full p-3 sm:p-4 text-white shadow-lg`}
                                            aria-label={exp.title || "Experience icon"}
                                        >
                                            {getIcon(exp, index)}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                            {exp.title || "Untitled"}
                                        </h3>
                                        {exp.period && (
                                            <span className="block text-sm sm:text-base text-cyan-300 mb-2 italic">
                                                {exp.period}
                                            </span>
                                        )}
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                            {exp.description || "No description available."}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">No experiences available.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;