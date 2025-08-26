
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";

const Contact = () => {
    // dynamic data------------>
    const { mainData, loading } = useAuthContext();
    const { settings } = mainData || {};
    const { phone, email, address } = settings[0];

    // Define neon colors consistent with other components
    const neonColors = {
        phone: "#4f46e5", // Indigo
        email: "#a855f7", // Purple
        location: "#7c3aed", // Indigo-purple
    };

    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        hover: {
            scale: 1.03,
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
            transition: { duration: 0.3 },
        },
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <section
            id="contact"
            className="py-12 sm:py-16 bg-gradient-to-tr from-gray-950 via-indigo-900 to-black  flex flex-col"
        >
            <motion.div
                className="w-11/12 max-w-7xl mx-auto text-center flex-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
                >
                    Contact Me
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Phone Card */}
                    <motion.div
                        className="flex flex-col items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700/30"
                        variants={cardVariants}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover="hover"
                    >
                        <FaPhone
                            className="text-3xl mb-4"
                            style={{
                                color: neonColors.phone,
                                textShadow: `0 0 8px ${neonColors.phone}, 0 0 16px ${neonColors.phone}`,
                            }}
                            aria-label="Phone icon"
                        />
                        <p
                            className="font-semibold text-sm sm:text-base text-gray-200"
                            style={{ textShadow: `0 0 4px ${neonColors.phone}` }}
                        >
                            {phone ? `+880 ${phone}` : "Phone not provided"}
                        </p>
                    </motion.div>

                    {/* Email Card */}
                    <motion.div
                        className="flex flex-col items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700/30"
                        variants={cardVariants}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover="hover"
                    >
                        <FaEnvelope
                            className="text-3xl mb-4"
                            style={{
                                color: neonColors.email,
                                textShadow: `0 0 8px ${neonColors.email}, 0 0 16px ${neonColors.email}`,
                            }}
                            aria-label="Email icon"
                        />
                        <p
                            className="font-semibold text-sm sm:text-base text-gray-200"
                            style={{ textShadow: `0 0 4px ${neonColors.email}` }}
                        >
                            {email || "Email not provided"}
                        </p>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        className="flex flex-col items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700/30"
                        variants={cardVariants}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover="hover"
                    >
                        <FaMapMarkerAlt
                            className="text-3xl mb-4"
                            style={{
                                color: neonColors.location,
                                textShadow: `0 0 8px ${neonColors.location}, 0 0 16px ${neonColors.location}`,
                            }}
                            aria-label="Location icon"
                        />
                        <p
                            className="font-semibold text-sm sm:text-base text-gray-200"
                            style={{ textShadow: `0 0 4px ${neonColors.location}` }}
                        >
                            {address || "Address not provided"}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;