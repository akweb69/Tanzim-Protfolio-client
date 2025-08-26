import { motion } from "framer-motion";
import { FaGraduationCap, FaTools } from "react-icons/fa";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";

const About = () => {
    const { mainData, loading } = useAuthContext()
    const { settings, skills, education } = mainData;


    if (loading) {
        return <Loading></Loading>
    }
    return (
        <section
            id="about"
            className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 to-indigo-900 flex flex-col text-white"
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
                    About
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-12 md:mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    I'm{" "}
                    <span className="font-semibold text-cyan-400">{settings[0]?.myName || "Md Tanzim Khan"}</span>, an{" "}
                    <span className="font-semibold text-cyan-400">
                        Electrical & Electronic Engineer
                    </span>{" "}
                    {settings[0]?.description || "Passionate about technology, projects, and innovations. I love turning ideas into impactful solutions."}
                </motion.p>

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
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">
                                Education
                            </h3>
                        </div>
                        <div className="relative pl-6">
                            <div className="absolute left-2 top-0 h-full w-1 bg-cyan-400/30"></div>

                            {/* Static Example */}
                            {education?.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    className="mb-8 last:mb-0 relative"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="absolute left-[-10px] top-1  w-6 h-6 bg-cyan-400 border-4 border-gray-900 rounded-full"></div>
                                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-100 ml-4 ">
                                        {edu?.level}
                                    </h4>
                                    <p className="text-gray-200 font-semibold text-md sm:text-xl">
                                        <span className="font-semibold"> Institute:</span> {edu?.name}
                                    </p>
                                    <p className="text-gray-400 text-sm sm:text-base">
                                        <span className="font-semibold"> Location:</span> {edu?.location}
                                    </p>
                                    <p className="text-gray-400 text-sm sm:text-base">
                                        <span className="font-semibold"> Description:</span> {edu?.description}
                                    </p>
                                    <span className="text-cyan-300 text-xs sm:text-sm italic">
                                        <span className="font-semibold">Passing Year: </span> {edu?.year}
                                    </span>
                                    <p>
                                        <span className="text-cyan-300 text-xs sm:text-sm italic">
                                            <span className="font-semibold">GPA/CGPA: </span> {edu?.gpa}
                                        </span>
                                    </p>
                                    <p className="text-gray-400 text-sm sm:text-base">
                                        <span className="font-semibold"> Description:</span> {edu?.description}
                                    </p>

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
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">
                                Skills
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {/* Static Example */}
                            {skills?.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="border p-4 rounded-lg bg-[rgba(0,0,0,0.1)] border-[rgba(255,255,255,0.1)]"
                                    initial={{ opacity: 0, width: 0 }}
                                    whileInView={{ opacity: 1, width: "100%" }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-200 font-medium text-sm sm:text-base">
                                            {skill?.name}
                                        </span>
                                        <span className="text-gray-400 text-xs sm:text-sm">{skill?.level}%</span>
                                    </div>
                                    <p className="text-gray-600 text-xs pb-2">
                                        {skill?.description}
                                    </p>
                                    <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill?.level}%` }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
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
