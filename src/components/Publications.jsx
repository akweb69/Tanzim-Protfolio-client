import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";

const Publications = () => {
    // dynamic data ---->
    const { mainData, loading } = useAuthContext();
    const { publications } = mainData;

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="py-20 bg-gradient-to-tr from-gray-950 to-indigo-900 min-h-screen">
            <motion.div
                className="w-11/12 mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    Publications
                </h2>

                <div className="grid md:grid-cols-2 gap-6 text-left">
                    {publications && publications.length > 0 ? (
                        publications.map((pub, index) => (
                            <motion.div
                                key={pub._id}
                                className="bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50 hover:shadow-2xl transition-all"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src={pub.thumbnail || "/default-thumbnail.jpg"}
                                    alt={pub.title || "Publication thumbnail"}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-100 mb-2">{pub.title || "Untitled"}</h3>
                                <h4 className="text-sm font-medium text-cyan-300 mb-2">{pub.subtitle || "No subtitle"}</h4>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{pub.description || "No description available."}</p>
                                <p className="text-gray-500 text-xs mb-4">{pub.year || "Unknown year"}</p>
                                <Link
                                    to={`/view-publications/${pub._id}`}
                                    aria-label={`View details for ${pub.title || "publication"}`}
                                    className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                                >
                                    View More <FaExternalLinkAlt className="text-sm" />
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">No publications available.</p>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default Publications;
