import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGraduationCap, FaTools } from "react-icons/fa";
import axios from "axios";

const education = [
    {
        level: "University",
        name: "Bangabandhu Sheikh Mujibur Rahman Science & Technology University",
        location: "Gopalganj, Bangladesh",
        year: "2018 - 2022",
    },
    {
        level: "College",
        name: "Ansar VDP School And College",
        location: "Gazipur, Bangladesh",
        year: "2016 - 2018",
    },
    {
        level: "School",
        name: "Ansar VDP School",
        location: "Gazipur, Bangladesh",
        year: "2010 - 2016",
    },
];

const About = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/skills`);
                setSkills(response.data);
            } catch (err) {
                setError("Failed to fetch skills.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section
            id="about"
            className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 to-indigo-900 min-h-[100vh] flex flex-col text-white"
        >
            <motion.div
                className="w-11/12 mx-auto flex-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    About Me
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-12 md:mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    I'm <span className="font-semibold text-cyan-400">Tanzim Khan</span>, an{" "}
                    <span className="font-semibold text-cyan-400">Electrical & Electronic Engineer</span>{" "}
                    driven by a passion for innovation and technology. I specialize in power systems, electronics, and project management, delivering impactful solutions to real-world engineering challenges.
                </motion.p>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {loading ? (
                    <p className="text-white text-center flex-1 flex items-center justify-center">Loading skills...</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Education Section */}
                        <motion.div
                            className="bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700/50"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                <FaGraduationCap className="text-cyan-400 text-2xl sm:text-3xl" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">Education</h3>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-2 top-0 h-full w-1 bg-cyan-400/30"></div>
                                {education.map((edu, i) => (
                                    <motion.div
                                        key={i}
                                        className="mb-6 relative"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.2 }}
                                    >
                                        <div className="absolute left-[-14px] top-2 w-3 h-3 bg-cyan-400 rounded-full"></div>
                                        <h4 className="text-base sm:text-lg font-semibold text-cyan-300">{edu.level}</h4>
                                        <p className="text-gray-200 text-sm sm:text-base">{edu.name}</p>
                                        <p className="text-gray-400 text-xs sm:text-sm">{edu.location}</p>
                                        <p className="text-gray-500 text-xs sm:text-sm">{edu.year}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Skills Section */}
                        <motion.div
                            className="bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700/50"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                <FaTools className="text-cyan-400 text-2xl sm:text-3xl" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">Skills</h3>
                            </div>
                            <div className="space-y-6">
                                {skills.map((skill, i) => (
                                    <motion.div
                                        className="border p-4 rounded-lg bg-[rgba(0,0,0,0.1)] border-[rgba(255,255,255,0.1)]"
                                        key={skill._id}
                                        initial={{ opacity: 0, width: 0 }}
                                        whileInView={{ opacity: 1, width: "100%" }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                    >
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-200 font-medium text-sm sm:text-base">{skill.name}</span>
                                            <span className="text-gray-400 text-xs sm:text-sm">{skill.level}%</span>

                                        </div>
                                        <p className="text-xs pb-2">{skill?.description}</p>

                                        <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                            />
                                        </div>

                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default About;