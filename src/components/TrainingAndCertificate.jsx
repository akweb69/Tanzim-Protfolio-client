// TrainingAndCertificate.jsx (updated with dynamic fetch)
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TrainingAndCertificate = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({}); // Optional: for description expansion

    const baseUrl = import.meta.env.VITE_BASE_URL;

    // Fetch trainings/certificates from the backend
    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await axios.get(`${baseUrl}/all_certificates`);
                setTrainings(response?.data ?? []);
                setLoading(false);
            } catch (err) {
                setError("Failed to load trainings & certifications. Please try again later.");
                setLoading(false);
                console.error(err);
            }
        };

        fetchTrainings();
    }, [baseUrl]);

    // Toggle description expansion (optional, for long descriptions)
    const toggleDescription = (id) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <section id="trainings" className="py-20 bg-gradient-to-br from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    Training & Certifications
                </h2>

                {loading && (
                    <p className="text-gray-400 text-lg">Loading trainings & certifications...</p>
                )}

                {!loading && !error && trainings?.length === 0 && (
                    <p className="text-gray-400 text-lg">No trainings & certifications found.</p>
                )}

                {!loading && !error && trainings?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                        {trainings?.map((training, index) => (
                            <motion.div
                                key={training?._id}
                                className="bg-[rgba(0,0,0,0.2)] p-6 rounded-xl shadow-lg border border-gray-700/50 hover:shadow-2xl transition-all"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src={training?.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                                    alt={training?.title}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-100 mb-2">{training?.title}</h3>
                                <h4 className="text-sm font-medium text-cyan-300 mb-2">
                                    {training?.subtitle || "No subtitle available"}
                                </h4>
                                <p
                                    className="text-gray-400 text-sm mb-4 whitespace-pre-wrap"
                                    style={{
                                        maxHeight: expandedDescriptions[training?._id] ? "none" : "4.5rem",
                                        overflow: expandedDescriptions[training?._id] ? "visible" : "hidden",
                                    }}
                                >
                                    {training?.description || "No description available"}
                                </p>
                                {training?.description && training.description.split("\n").length > 3 && (
                                    <button
                                        onClick={() => toggleDescription(training?._id)}
                                        className="text-cyan-400 text-sm hover:text-cyan-300 mb-4"
                                    >
                                        {expandedDescriptions[training?._id] ? "Show Less" : "Show More"}
                                    </button>
                                )}
                                <p className="text-gray-500 text-xs mb-2">Date: {training?.date}</p>
                                <p className="text-gray-500 text-xs mb-4">Duration: {training?.duration}</p>
                                {/* <Link
                                    to={`/view-trainings/${training?._id}`} // Dynamic route for individual training
                                    className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                                >
                                    View More <FaExternalLinkAlt className="text-sm" />
                                </Link> */}
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default TrainingAndCertificate;