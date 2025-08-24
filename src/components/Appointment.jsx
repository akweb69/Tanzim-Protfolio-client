import { motion } from "framer-motion";
import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaComment, FaCalendarCheck, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name?.trim()) {
            toast.error("Name is required.");
            return false;
        }
        if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Valid email is required.");
            return false;
        }
        if (!formData.phone?.trim()) {
            toast.error("Phone number is required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/add_appointment`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response?.data?.insertedId) {
                toast.success("Appointment booked successfully!");
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    description: "",
                }); // Clear form
            } else {
                throw new Error("Failed to book appointment.");
            }
        } catch (err) {
            setError("Failed to book appointment. Please try again.");
            toast.error("Failed to book appointment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="appointment" className="min-h-screen bg-gradient-to-tr from-gray-950 to-indigo-900 py-20">
            <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-10">
                {/* Left Side */}
                <motion.div
                    className="flex flex-col justify-center text-white"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text flex items-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <FaCalendarCheck className="mr-3 text-indigo-400" /> Book an Appointment
                    </motion.h2>
                    <p className="text-lg text-indigo-200 mb-6">
                        Connect with Tanzim Khan for consultations or project collaborations. Fill out the form to get started!
                    </p>
                    <div className="space-y-4">
                        <p className="flex items-center text-indigo-200">
                            <FaPhone className="mr-2 text-indigo-400" /> +123-456-7890
                        </p>
                        <p className="flex items-center text-indigo-200">
                            <FaEnvelope className="mr-2 text-indigo-400" /> tanzim@khantech.com
                        </p>
                        <p className="flex items-center text-indigo-200">
                            <FaMapMarkerAlt className="mr-2 text-indigo-400" /> 123 Tech Street, Dhaka
                        </p>
                        <p className="flex items-center text-indigo-200">
                            <FaClock className="mr-2 text-indigo-400" /> Mon-Fri: 9 AM - 5 PM
                        </p>
                    </div>
                </motion.div>

                {/* Right Form */}
                <motion.form
                    className="bg-gray-800 p-8 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.7)] flex flex-col gap-6 relative"
                    onSubmit={handleSubmit}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    {error && <div className="text-red-400 mb-4">{error}</div>}
                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-indigo-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white placeholder-indigo-300 border border-gray-600 focus:border-indigo-400 focus:outline-none focus:shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all duration-300"
                            disabled={loading}
                        />
                    </div>
                    <div className="relative">
                        <FaPhone className="absolute top-3 left-3 text-indigo-400" />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white placeholder-indigo-300 border border-gray-600 focus:border-indigo-400 focus:outline-none focus:shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all duration-300"
                            disabled={loading}
                        />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-indigo-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white placeholder-indigo-300 border border-gray-600 focus:border-indigo-400 focus:outline-none focus:shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all duration-300"
                            disabled={loading}
                        />
                    </div>
                    <div className="relative">
                        <FaComment className="absolute top-3 left-3 text-indigo-400" />
                        <textarea
                            name="description"
                            placeholder="Project Description or Message"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white placeholder-indigo-300 border border-gray-600 focus:border-indigo-400 focus:outline-none focus:shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all duration-300 h-32 resize-none"
                            disabled={loading}
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 hover:shadow-[0_0_15px_rgba(79,70,229,0.7)] transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                    >
                        <FaCalendarCheck /> {loading ? "Submitting..." : "Get Appointment"}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default Appointment;