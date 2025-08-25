import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../Common/Loading ";

const PublicationDetail = () => {
    const { id } = useParams();
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Track description expansion

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await axios.get(`${baseUrl}/all_publications`);
                const pub = response.data.find((p) => p._id === id);
                if (pub) {
                    setPublication(pub);
                } else {
                    setError("Publication not found.");
                }
                setLoading(false);
            } catch (err) {
                setError("Failed to load publication.");
                setLoading(false);
                console.error(err);
            }
        };

        fetchPublication();
    }, [id, baseUrl]);

    // Toggle description expansion
    const toggleDescription = () => {
        setIsDescriptionExpanded((prev) => !prev);
    };

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-gray-950">
                <div className="w-11/12 mx-auto">
                    <p className="text-red-400">{error}</p>
                </div>
            </section>
        );
    }

    if (!publication) return null;

    return (
        <section className="py-20 bg-gray-950">
            <motion.div
                className="w-11/12 mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-3xl font-bold text-cyan-400 mb-6">{publication.title}</h2>
                <h4 className="text-lg text-cyan-300 mb-4">
                    {publication.subtitle || "No subtitle available"}
                </h4>
                <img
                    src={publication.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={publication.title}
                    className="w-full max-w-md h-60 object-cover rounded-lg mb-4"
                />
                <p
                    className="text-gray-400 mb-4 whitespace-pre-wrap"
                    style={{
                        maxHeight: isDescriptionExpanded ? "none" : "9rem", // Approx 6 lines
                        overflow: isDescriptionExpanded ? "visible" : "hidden",
                    }}
                >
                    {publication.description || "No description available"}
                </p>
                {publication.description && publication.description.split("\n").length > 6 && (
                    <button
                        onClick={toggleDescription}
                        className="text-cyan-400 text-sm hover:text-cyan-300 mb-4"
                    >
                        {isDescriptionExpanded ? "Show Less" : "Show More"}
                    </button>
                )}
                <p className="text-gray-500 text-sm">Published: {publication.year}</p>
            </motion.div>
            {/* visit publication link */}
            <div className="w-11/12 mx-auto mt-6">
                <motion.a
                    href={publication?.publication_link}
                    target="_blank"
                    className="flex items-center w-fit bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Read Full Publication
                </motion.a>
            </div>
        </section>
    );
};

export default PublicationDetail;