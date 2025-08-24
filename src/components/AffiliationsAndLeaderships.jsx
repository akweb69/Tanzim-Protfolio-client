import { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const affiliations = [
    {
        index: 1,
        title: "IEEE Student Branch",
        subtitle: "Chair of Technical Committee",
        description: "Led the technical committee of the IEEE Student Branch, organizing workshops and seminars on electrical engineering advancements.",
        date: "2023-01-15",
        duration: "1 Year",
        role: "Committee Chair",
        achievement: "Organized 5+ successful technical events",
        thumbnail: "https://via.placeholder.com/300x200?text=IEEE+Leadership",
    },
    {
        index: 2,
        title: "Engineering Society",
        subtitle: "Vice President",
        description: "Served as Vice President, coordinating interdisciplinary projects and fostering collaboration among engineering students.",
        date: "2022-06-10",
        duration: "2 Years",
        role: "Vice President",
        achievement: "Initiated 3 cross-departmental projects",
        thumbnail: "https://via.placeholder.com/300x200?text=Engineering+Society",
    },
    {
        index: 3,
        title: "Renewable Energy Club",
        subtitle: "Project Lead",
        description: "Led a team to design and implement a solar-powered charging station for campus use, promoting sustainable energy solutions.",
        date: "2021-09-20",
        duration: "9 Months",
        role: "Project Lead",
        achievement: "Successfully deployed campus charging station",
        thumbnail: "https://via.placeholder.com/300x200?text=Renewable+Energy+Club",
    },
];

const AffiliationsAndLeaderships = () => {
    const [selectedAffiliation, setSelectedAffiliation] = useState(affiliations[0]);

    return (
        <section id="affiliations" className="py-20 bg-gradient-to-tr from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
                    Affiliations & Leadership
                </h2>
                <div className="md:grid md:grid-cols-3 flex flex-col gap-6">
                    {/* Right Side: Content Box */}
                    <motion.div
                        className="md:col-span-2 bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src={selectedAffiliation.thumbnail}
                            alt={selectedAffiliation.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                            {selectedAffiliation.title}
                        </h3>
                        <h4 className="text-sm font-medium text-cyan-300 mb-3">
                            {selectedAffiliation.subtitle}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            {selectedAffiliation.description}
                        </p>
                        <p className="text-gray-500 text-xs mb-2">
                            Date: {selectedAffiliation.date}
                        </p>
                        <p className="text-gray-500 text-xs mb-2">
                            Duration: {selectedAffiliation.duration}
                        </p>
                        <p className="text-gray-500 text-xs mb-2">
                            Role: {selectedAffiliation.role}
                        </p>
                        <p className="text-gray-500 text-xs mb-4">
                            Achievement: {selectedAffiliation.achievement}
                        </p>

                    </motion.div>
                    {/* Left Side: List of Affiliations */}
                    <div className="md:col-span-1 max-h-[700px] overflow-y-scroll">
                        {affiliations.map((aff, index) => (
                            <motion.div
                                key={aff.index}
                                className={`p-4 rounded-lg cursor-pointer transition-all border border-gray-700/50 mb-4 ${selectedAffiliation.index === aff.index
                                    ? "bg-cyan-400/20 shadow-lg"
                                    : "bg-gray-800/70 hover:bg-gray-700/70"
                                    }`}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedAffiliation(aff)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-cyan-400 font-semibold text-sm">
                                        #{aff.index}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-100">
                                            {aff.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs">{aff.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </motion.div>
        </section>
    );
};

export default AffiliationsAndLeaderships;