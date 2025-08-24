import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    // Define indigo-purple neon colors
    const neonColors = {
        phone: "#4f46e5", // Indigo
        email: "#a855f7", // Purple
        location: "#7c3aed", // Blend of indigo and purple
    };

    // Framer Motion variants for card animation
    const cardVariants = {
        initial: { scale: 1, boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" },
        hover: {
            scale: 1.05,
            boxShadow: "0 0 20px 5px rgba(79, 70, 229, 0.5)", // Indigo neon glow
            transition: { duration: 0.3 },
        },
    };

    return (
        <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 md:px-20">
            <motion.div
                className="max-w-6xl mx-auto text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-10">Contact Me</h2>
                <div className="grid md:grid-cols-3 gap-8 text-gray-700 dark:text-gray-200">
                    {/* Phone Card */}
                    <motion.div
                        className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                        variants={cardVariants}
                        initial="initial"
                        whileHover="hover"
                        style={{
                            border: `2px solid ${neonColors.phone}`,
                            boxShadow: `0 0 10px ${neonColors.phone}`,
                            willChange: "transform, box-shadow",
                        }}
                    >
                        <FaPhone
                            className="text-3xl mb-2"
                            style={{
                                color: neonColors.phone,
                                textShadow: `0 0 8px ${neonColors.phone}, 0 0 16px ${neonColors.phone}`,
                            }}
                        />
                        <p
                            className="font-semibold"
                            style={{
                                textShadow: `0 0 4px ${neonColors.phone}`,
                            }}
                        >
                            +880 1768037870
                        </p>
                    </motion.div>

                    {/* Email Card */}
                    <motion.div
                        className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                        variants={cardVariants}
                        initial="initial"
                        whileHover="hover"
                        style={{
                            border: `2px solid ${neonColors.email}`,
                            boxShadow: `0 0 10px ${neonColors.email}`,
                            willChange: "transform, box-shadow",
                        }}
                    >
                        <FaEnvelope
                            className="text-3xl mb-2"
                            style={{
                                color: neonColors.email,
                                textShadow: `0 0 8px ${neonColors.email}, 0 0 16px ${neonColors.email}`,
                            }}
                        />
                        <p
                            className="font-semibold"
                            style={{
                                textShadow: `0 0 4px ${neonColors.email}`,
                            }}
                        >
                            akwebdev69@gmail.com
                        </p>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                        variants={cardVariants}
                        initial="initial"
                        whileHover="hover"
                        style={{
                            border: `2px solid ${neonColors.location}`,
                            boxShadow: `0 0 10px ${neonColors.location}`,
                            willChange: "transform, box-shadow",
                        }}
                    >
                        <FaMapMarkerAlt
                            className="text-3xl mb-2"
                            style={{
                                color: neonColors.location,
                                textShadow: `0 0 8px ${neonColors.location}, 0 0 16px ${neonColors.location}`,
                            }}
                        />
                        <p
                            className="font-semibold"
                            style={{
                                textShadow: `0 0 4px ${neonColors.location}`,
                            }}
                        >
                            Dhaka, Bangladesh
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;