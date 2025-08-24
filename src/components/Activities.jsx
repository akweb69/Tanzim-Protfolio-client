import { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const activities = [
    {
        index: 1,
        title: "IEEE Student Branch Event",
        subtitle: "Technical Workshops and Presentations",
        description: "Participated in a series of technical workshops and delivered presentations on power system innovations at the IEEE Student Branch event.",
        date: "2024-05-20",
        duration: "2 Days",
        role: "Presenter and Organizer",
        achievement: "Received Best Presenter Award",
        thumbnail: "https://via.placeholder.com/300x200?text=IEEE+Event",
    },
    {
        index: 2,
        title: "Robotics Competition",
        subtitle: "University-Level Robotics Challenge",
        description: "Designed and developed an autonomous robot for a national university-level competition, focusing on navigation and task automation.",
        date: "2023-10-15",
        duration: "3 Months",
        role: "Lead Developer",
        achievement: "Secured 2nd Place in National Competition",
        thumbnail: "https://via.placeholder.com/300x200?text=Robotics+Competition",
    },
    {
        index: 3,
        title: "Internship at PowerGrid Ltd.",
        subtitle: "Substation Automation Project",
        description: "Worked on implementing and testing substation automation systems, improving monitoring and control efficiency.",
        date: "2023-06-01",
        duration: "6 Months",
        role: "Intern Engineer",
        achievement: "Contributed to 15% Efficiency Improvement",
        thumbnail: "https://via.placeholder.com/300x200?text=PowerGrid+Internship",
    },
];

const Activities = () => {
    const [selectedActivity, setSelectedActivity] = useState(activities[0]);

    return (
        <section id="activities" className="py-20 bg-gradient-to-br from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
                    Activities
                </h2>
                <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
                    {/* Left Side: List of Activities */}
                    <div className="md:col-span-1  max-h-[700px] overflow-y-scroll">
                        {activities.map((act, index) => (
                            <motion.div
                                key={act.index}
                                className={`p-4 rounded-lg cursor-pointer transition-all border border-gray-700/50 mb-4 ${selectedActivity.index === act.index
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
                                        #{act.index}
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
                    <motion.div
                        className="md:col-span-2 bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src={selectedActivity.thumbnail}
                            alt={selectedActivity.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-gray-100 mb-2">
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
                </div>
            </motion.div>
        </section>
    );
};

export default Activities;