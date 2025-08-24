import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaPhone, FaEnvelope, FaUniversity } from "react-icons/fa";

const reviews = [
    {
        name: "Dr. A. Rahman",
        role: "Professor, EEE Department",
        image: "https://i.pravatar.cc/150?img=12", // Dummy profile
        phone: "+880 1711-123456",
        email: "arahman@university.edu",
        institute: "Bangladesh University of Engineering & Technology",
        message:
            "Tanzim is a highly dedicated and innovative EEE student. His projects demonstrate excellent technical skills and creativity.",
        rating: 5,
    },
    {
        name: "Md. Rashed",
        role: "Team Lead, Internship",
        image: "https://i.pravatar.cc/150?img=32", // Dummy profile
        phone: "+880 1911-987654",
        email: "rashed.teamlead@email.com",
        institute: "Tech Solutions Ltd.",
        message:
            "Working with Tanzim was a pleasure. He is detail-oriented, proactive, and always ready to take challenges with confidence.",
        rating: 4,
    },
];

const Reviews = () => {
    return (
        <section id="reviews" className=" py-20 bg-gradient-to-br from-gray-950 to-indigo-900 text-white">
            <motion.div
                className="w-11/12 mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    Refferences & Reviews
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-[rgba(0,0,0,0.3)] backdrop-blur-xs p-6 rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 transition-transform duration-300"
                            whileHover={{ scale: 1.03 }}
                        >
                            {/* Profile */}
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md mb-4"
                            />

                            {/* Reviewer Details */}
                            <div className="text-center mb-4 space-y-1">
                                <h3 className="font-semibold text-lg">{review.name}</h3>
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
                            <div className="relative bg-[rgba(0,0,0,0.3)] backdrop-blur-sm p-5 rounded-xl text-center">
                                <FaQuoteLeft className="absolute -top-4 -left-3 text-blue-400 text-2xl" />
                                <p className="text-gray-200 leading-relaxed">{review.message}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex mt-4 text-yellow-400">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Reviews;
