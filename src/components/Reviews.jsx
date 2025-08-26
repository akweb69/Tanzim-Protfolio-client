import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaPhone, FaEnvelope, FaUniversity } from "react-icons/fa";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";

const Reviews = () => {
    const { mainData, loading } = useAuthContext();
    const { reviews } = mainData || {};

    if (loading) {
        return <Loading />;
    }

    return (
        <section
            id="reviews"
            className="py-12 sm:py-16 bg-gradient-to-tr from-gray-950 via-indigo-900 to-black  flex flex-col"
        >
            <motion.div
                className="w-11/12 mx-auto flex-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
                >
                    References & Reviews
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 md:gap-8">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <motion.div
                                key={review._id}
                                className="bg-[rgba(0,0,0,0.3)] backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center border border-gray-700/30"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)" }}
                            >
                                {/* Profile */}
                                <motion.img
                                    src={review.image || "https://via.placeholder.com/80.png?text=Profile"}
                                    alt={review.name || "Reviewer"}
                                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-cyan-400/50 shadow-md mb-4"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    aria-label={`Profile image of ${review.name || "reviewer"}`}
                                />

                                {/* Reviewer Details */}
                                <div className="text-center mb-4 space-y-2">
                                    <h3 className="font-semibold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                        {review.name || "Anonymous"}
                                    </h3>
                                    <p className="text-gray-300 text-sm italic">{review.role || "No role specified"}</p>
                                    <p className="flex items-center justify-center text-gray-400 text-xs sm:text-sm gap-2">
                                        <FaPhone className="text-cyan-400" aria-label="Phone icon" /> {review.phone || "No phone provided"}
                                    </p>
                                    <p className="flex items-center justify-center text-gray-400 text-xs sm:text-sm gap-2">
                                        <FaEnvelope className="text-cyan-400" aria-label="Email icon" /> {review.email || "No email provided"}
                                    </p>
                                    <p className="flex items-center justify-center text-gray-400 text-xs sm:text-sm gap-2">
                                        <FaUniversity className="text-cyan-400" aria-label="Institute icon" /> {review.institute || "No institute provided"}
                                    </p>
                                </div>

                                {/* Comment */}
                                <div className="relative bg-[rgba(0,0,0,0.4)] backdrop-blur-md p-4 sm:p-5 rounded-xl text-center border border-gray-700/50">
                                    <FaQuoteLeft className="absolute -top-3 sm:-top-4 -left-2 sm:-left-3 text-cyan-400 text-xl sm:text-2xl" aria-label="Quote icon" />
                                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{review.message || "No review message provided"}</p>
                                </div>

                                {/* Rating */}
                                <div className="flex mt-4 text-yellow-400">
                                    {[...Array(review.rating || 0)].map((_, i) => (
                                        <FaStar key={i} className="text-sm sm:text-base" aria-label="Star rating" />
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-full">No reviews available.</p>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default Reviews;