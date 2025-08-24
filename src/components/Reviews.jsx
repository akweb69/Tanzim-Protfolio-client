import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaQuoteLeft, FaStar, FaPhone, FaEnvelope, FaUniversity } from "react-icons/fa";
import axios from "axios";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/reviews`);
                setReviews(response.data);
            } catch (err) {
                setError("Failed to fetch reviews.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    return (
        <section id="reviews" className="py-12 sm:py-16 bg-gradient-to-tr from-gray-950 to-indigo-900 text-white  flex flex-col">
            <motion.div
                className="w-11/12 mx-auto flex-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 md:mb-12">
                    References & Reviews
                </h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {loading ? (
                    <p className="text-white text-center flex-1 flex items-center justify-center">Loading reviews...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review._id}
                                className="bg-[rgba(0,0,0,0.2)] backdrop-blur-xs p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                {/* Profile */}
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-blue-500 shadow-md mb-4"
                                />

                                {/* Reviewer Details */}
                                <div className="text-center mb-4 space-y-1">
                                    <h3 className="font-semibold text-base sm:text-lg">{review.name}</h3>
                                    <p className="text-gray-400 text-sm">{review.role}</p>
                                    <p className="flex items-center justify-center text-gray-400 text-sm gap-2">
                                        <FaPhone className="text-blue-400" /> {review.phone}
                                    </p>
                                    <p className="flex items-center justify-center text-gray-400 text-sm gap-2">
                                        <FaEnvelope className="text-blue-400" /> {review.email}
                                    </p>
                                    <p className="flex items-center justify-center text-gray-400 text-sm gap-2">
                                        <FaUniversity className="text-blue-400" /> {review.institute}
                                    </p>
                                </div>

                                {/* Comment */}
                                <div className="relative bg-[rgba(0,0,0,0.2)] backdrop-blur-sm p-4 sm:p-5 rounded-xl text-center">
                                    <FaQuoteLeft className="absolute -top-3 sm:-top-4 -left-2 sm:-left-3 text-blue-400 text-xl sm:text-2xl" />
                                    <p className="text-gray-200 text-sm leading-relaxed">{review.message}</p>
                                </div>

                                {/* Rating */}
                                <div className="flex mt-4 text-yellow-400">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-sm sm:text-base" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Reviews;