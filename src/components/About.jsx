import { motion } from "framer-motion";
import { FaGraduationCap, FaTools } from "react-icons/fa";

const skills = [
    { name: "Power Systems", level: 85 },
    { name: "Circuit Design", level: 90 },
    { name: "MATLAB", level: 80 },
    { name: "Simulink", level: 75 },
    { name: "Renewable Energy", level: 70 },
    { name: "Project Management", level: 88 },
];

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
    return (
        <section
            id="about"
            className="py-16 bg-hero-section1 min-h-screen"
        >
            <motion.div
                className="w-11/12 mx-auto "
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Title */}
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    About Me
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    I'm <span className="font-semibold text-cyan-400">Tanzim Khan</span>, an{" "}
                    <span className="font-semibold text-cyan-400">Electrical & Electronic Engineer</span>{" "}
                    driven by a passion for innovation and technology. I specialize in power systems, electronics, and project management, delivering impactful solutions to real-world engineering challenges.
                </motion.p>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Education Section */}
                    <motion.div
                        className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700/50"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <FaGraduationCap className="text-cyan-400 text-3xl" />
                            <h3 className="text-2xl font-semibold text-gray-100">Education</h3>
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
                                    <h4 className="text-lg font-semibold text-cyan-300">{edu.level}</h4>
                                    <p className="text-gray-200">{edu.name}</p>
                                    <p className="text-gray-400 text-sm">{edu.location}</p>
                                    <p className="text-gray-500 text-sm">{edu.year}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div
                        className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700/50"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <FaTools className="text-cyan-400 text-3xl" />
                            <h3 className="text-2xl font-semibold text-gray-100">Skills</h3>
                        </div>
                        <div className="space-y-6">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, width: 0 }}
                                    whileInView={{ opacity: 1, width: "100%" }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                >
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-200 font-medium">{skill.name}</span>
                                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                                    </div>
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
            </motion.div>
        </section>
    );
};

export default About;