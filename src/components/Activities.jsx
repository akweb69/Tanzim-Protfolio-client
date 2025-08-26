import { motion } from "framer-motion";
import useAuthContext from "../Auth/useAuthContext";
import { useEffect, useState } from "react";
import Loading from "../Common/Loading ";


const Activities = () => {
    // dynamic data-->
    const { mainData, loading } = useAuthContext();
    const { activities } = mainData || {};
    const [selectedActivity, setSelectActivity] = useState(activities && activities.length > 0 ? activities[0] : activities[0]);
    useEffect(() => {
        if (activities && activities.length > 0) {
            setSelectActivity(activities[0]);
        }
    }, [activities])
    if (loading) {
        return <Loading />;
    }

    return (
        <section
            id="activities"
            className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 via-indigo-900 to-black min-h-screen flex flex-col"
        >
            <motion.div
                className="w-11/12  mx-auto flex-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 py-4"
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    My Activities
                </motion.h2>

                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Left: List of Activities */}
                    <motion.div
                        className="lg:col-span-1 space-y-4"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {activities && activities.length > 0 ? (
                            activities.map((act, index) => (
                                <motion.div
                                    key={act._id || index}
                                    className="p-4 rounded-xl bg-[rgba(0,0,0,0.3)] backdrop-blur-md border  border-gray-700/30"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <button
                                        onClick={() => setSelectActivity(act)}
                                        className="flex cursor-pointer items-center gap-4 w-full text-left"
                                        aria-label={`Select activity: ${act?.title || "Untitled"}`}
                                    >
                                        <span className="text-cyan-400 font-semibold text-sm bg-cyan-400/10 px-2 py-1 rounded-full">
                                            #{index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-100">{act?.title || "Untitled"}</h3>
                                            <p className="text-gray-400 text-xs">{act?.date || "No date"}</p>
                                        </div>
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center">No activities available.</p>
                        )}
                    </motion.div>

                    {/* Right: Content Box */}
                    <motion.div
                        className="lg:col-span-2 mt-6 lg:mt-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-3 sm:p-5 rounded-2xl shadow-xl border border-gray-700/30"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {selectedActivity ? (
                            <>
                                {selectedActivity.thumbnail && (
                                    <motion.img
                                        src={selectedActivity.thumbnail}
                                        alt={selectedActivity.title || "Activity thumbnail"}
                                        className="w-full h-40 sm:h-56 object-cover rounded-lg mb-6 shadow-md"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                )}
                                <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                                    {selectedActivity.title || "Untitled"}
                                </h3>
                                {selectedActivity.subtitle && (
                                    <h4 className="text-sm font-medium text-cyan-300 mb-4 italic">
                                        {selectedActivity.subtitle}
                                    </h4>
                                )}
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                                    {selectedActivity.description || "No description available."}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedActivity.date && (
                                        <p className="text-gray-400 text-xs sm:text-sm">
                                            <span className="font-semibold text-cyan-400">Date:</span>{" "}
                                            {selectedActivity.date}
                                        </p>
                                    )}
                                    {selectedActivity.duration && (
                                        <p className="text-gray-400 text-xs sm:text-sm">
                                            <span className="font-semibold text-cyan-400">Duration:</span>{" "}
                                            {selectedActivity.duration}
                                        </p>
                                    )}
                                    {selectedActivity.role && (
                                        <p className="text-gray-400 text-xs sm:text-sm">
                                            <span className="font-semibold text-cyan-400">Role:</span>{" "}
                                            {selectedActivity.role}
                                        </p>
                                    )}
                                    {selectedActivity.achievement && (
                                        <p className="text-gray-400 text-xs sm:text-sm">
                                            <span className="font-semibold text-cyan-400">Achievement:</span>{" "}
                                            {selectedActivity.achievement}
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-400 text-center">Select an activity to view details.</p>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Activities;