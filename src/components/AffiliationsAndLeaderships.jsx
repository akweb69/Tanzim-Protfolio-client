import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AffiliationsAndLeaderships = () => {
    const [leaderships, setLeaderships] = useState([]);
    const [selectedLeadership, setSelectedLeadership] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchLeaderships = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/leadership`);
                setLeaderships(response.data);
                setSelectedLeadership(response.data[0] || null);
            } catch (err) {
                setError("Failed to fetch leadership entries.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderships();
    }, []);

    return (
        <section id="affiliations" className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 to-indigo-900  flex flex-col">
            <motion.div
                className="w-11/12 mx-auto flex-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-8 md:mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
                    Affiliations & Leadership
                </h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {loading ? (
                    <p className="text-white text-center flex-1 flex items-center justify-center">Loading leadership entries...</p>
                ) : (
                    <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8">
                        {/* Right Side: Content Box */}
                        {selectedLeadership && (
                            <motion.div
                                className="md:col-span-2 bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50 order-1 md:order-2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={selectedLeadership.thumbnail}
                                    alt={selectedLeadership.title}
                                    className="w-full h-32 sm:h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg sm:text-2xl font-semibold text-gray-100 mb-2">
                                    {selectedLeadership.title}
                                </h3>
                                <h4 className="text-sm font-medium text-cyan-300 mb-3">
                                    {selectedLeadership.subtitle}
                                </h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    {selectedLeadership.description}
                                </p>
                                <p className="text-gray-500 text-xs mb-2">
                                    Date: {selectedLeadership.date}
                                </p>
                                <p className="text-gray-500 text-xs mb-2">
                                    Duration: {selectedLeadership.duration}
                                </p>
                                <p className="text-gray-500 text-xs mb-2">
                                    Role: {selectedLeadership.role}
                                </p>
                                <p className="text-gray-500 text-xs mb-4">
                                    Achievement: {selectedLeadership.achievement}
                                </p>
                            </motion.div>
                        )}
                        {/* Left Side: List of Leaderships */}
                        <div className="md:col-span-1 order-2 md:order-1">
                            {leaderships.map((lead, index) => (
                                <motion.div
                                    key={lead._id}
                                    className={`p-4 rounded-lg cursor-pointer transition-all border border-gray-700/50 mb-4 ${selectedLeadership?._id === lead._id
                                        ? "bg-indigo-900/90 shadow-lg"
                                        : "bg-[rgba(0,0,0,0.2)] hover:bg-indigo-700"
                                        }`}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedLeadership(lead)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-cyan-400 font-semibold text-sm">
                                            #{index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-100">
                                                {lead.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs">{lead.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default AffiliationsAndLeaderships;