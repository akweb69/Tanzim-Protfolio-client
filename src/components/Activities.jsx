import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/all_activities`);
                setActivities(response.data);
                setSelectedActivity(response.data[0] || null);
            } catch (err) {
                setError("Failed to fetch activities.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    return (
        <section id="activities" className="py-12 sm:py-16 bg-gradient-to-tr from-gray-950 to-indigo-900 min-h-[100vh] flex flex-col">
            <motion.div
                className="w-11/12 mx-auto flex-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-8 md:mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
                    Activities
                </h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {loading ? (
                    <p className="text-white text-center flex-1 flex items-center justify-center">Loading activities...</p>
                ) : (
                    <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8">
                        {/* Left Side: List of Activities */}
                        <div className="md:col-span-1">
                            {activities.map((act, index) => (
                                <motion.div
                                    key={act._id}
                                    className={`p-4 rounded-lg cursor-pointer transition-all border border-gray-700/50 mb-4 ${selectedActivity?._id === act._id
                                        ? "bg-cyan-400/20 shadow-lg"
                                        : "bg-gray-800/70 hover:bg-gray-700/70"
                                        }`}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedActivity(act)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-cyan-400 font-semibold text-sm">
                                            #{index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-100">
                                                {act.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs">{act.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Side: Content Box */}
                        {selectedActivity && (
                            <motion.div
                                className="md:col-span-2 bg-gray-800/70 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={selectedActivity.thumbnail}
                                    alt={selectedActivity.title}
                                    className="w-full h-32 sm:h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg sm:text-2xl font-semibold text-gray-100 mb-2">
                                    {selectedActivity.title}
                                </h3>
                                <h4 className="text-sm font-medium text-cyan-300 mb-3">
                                    {selectedActivity.subtitle}
                                </h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    {selectedActivity.description}
                                </p>
                                <p className="text-gray-500 text-xs mb-2">
                                    Date: {selectedActivity.date}
                                </p>
                                <p className="text-gray-500 text-xs mb-2">
                                    Duration: {selectedActivity.duration}
                                </p>
                                <p className="text-gray-500 text-xs mb-2">
                                    Role: {selectedActivity.role}
                                </p>
                                <p className="text-gray-500 text-xs mb-4">
                                    Achievement: {selectedActivity.achievement}
                                </p>
                            </motion.div>
                        )}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Activities;