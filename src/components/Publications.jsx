import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    // Fetch publications from the backend
    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get(`${baseUrl}/all_publications`);
                setPublications(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load publications. Please try again later.");
                setLoading(false);
                console.error(err);
            }
        };

        fetchPublications();
    }, [baseUrl]);

    return (
        <section id="publications" className="py-20 bg-gradient-to-br from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    Publications
                </h2>

                {loading && (
                    <p className="text-gray-400 text-lg">Loading publications...</p>
                )}
                {error && <p className="text-red-400 text-lg">{error}</p>}
                {!loading && !error && publications.length === 0 && (
                    <p className="text-gray-400 text-lg">No publications found.</p>
                )}

                {!loading && !error && publications.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {publications.map((pub, index) => (
                            <motion.div
                                key={pub._id} // Use _id from MongoDB
                                className="bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50 hover:shadow-2xl transition-all"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src={pub.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                                    alt={pub.title}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-100 mb-2">{pub.title}</h3>
                                <h4 className="text-sm font-medium text-cyan-300 mb-2">
                                    {pub.subtitle || "No subtitle available"}
                                </h4>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {pub.description || "No description available"}
                                </p>
                                <p className="text-gray-500 text-xs mb-4">{pub.year}</p>
                                <Link
                                    to={`/view-publications/${pub._id}`} // Dynamic route for individual publication
                                    className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                                >
                                    View More <FaExternalLinkAlt className="text-sm" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Publications;