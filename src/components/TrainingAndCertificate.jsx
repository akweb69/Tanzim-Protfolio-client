import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const trainings = [
    {
        title: "Advanced Power Systems Analysis",
        subtitle: "Specialized Training in Grid Optimization",
        description: "Completed an intensive course on advanced power systems analysis, focusing on grid stability and optimization techniques using MATLAB.",
        date: "2024-06-10",
        duration: "3 Months",
        thumbnail: "https://via.placeholder.com/300x200?text=Power+Systems",
    },
    {
        title: "IoT for Smart Grids",
        subtitle: "Certification in IoT Applications",
        description: "Earned a certification in implementing IoT solutions for smart grid monitoring and control, with hands-on projects.",
        date: "2023-09-15",
        duration: "6 Weeks",
        thumbnail: "https://via.placeholder.com/300x200?text=IoT+Smart+Grids",
    },
    {
        title: "Project Management Professional",
        subtitle: "PMP Certification",
        description: "Achieved PMP certification, mastering project management methodologies for engineering and technology projects.",
        date: "2023-02-20",
        duration: "4 Months",
        thumbnail: "https://via.placeholder.com/300x200?text=Project+Management",
    },
];

const TrainingAndCertificate = () => {
    return (
        <section id="trainings" className="py-20 bg-gradient-to-tr from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Training & Certifications</h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                    {trainings.map((training, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50 hover:shadow-2xl transition-all"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <img
                                src={training.thumbnail}
                                alt={training.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">{training.title}</h3>
                            <h4 className="text-sm font-medium text-cyan-300 mb-2">{training.subtitle}</h4>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{training.description}</p>
                            <p className="text-gray-500 text-xs mb-2">Date: {training.date}</p>
                            <p className="text-gray-500 text-xs mb-4">Duration: {training.duration}</p>
                            <Link
                                to="/view-trainings"
                                className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                            >
                                View More <FaExternalLinkAlt className="text-sm" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default TrainingAndCertificate;