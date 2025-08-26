import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [visibleCount, setVisibleCount] = useState(4);

    // dynamic data--->
    const { mainData, loading } = useAuthContext();
    const { gallery } = mainData || {};

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-950 via-indigo-900 to-black flex flex-col">
            <motion.div
                className="w-11/12 max-w-7xl mx-auto text-center flex-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
                >
                    Stunning Gallery
                </motion.h2>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {gallery && gallery.length > 0 ? (
                        gallery.slice(0, visibleCount).map((img, index) => (
                            <motion.div
                                key={img._id || index}
                                className="overflow-hidden rounded-xl shadow-lg cursor-pointer bg-[rgba(0,0,0,0.3)] backdrop-blur-md border border-gray-700/30"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)" }}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img.image || "https://via.placeholder.com/400x200.png?text=Gallery+Image"}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-40 sm:h-64 object-cover transition-transform duration-300"
                                    aria-label={`Gallery image ${index + 1}`}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-full">No images available.</p>
                    )}
                </div>

                {/* Load More Button */}
                {gallery && gallery.length > visibleCount && (
                    <motion.button
                        onClick={handleLoadMore}
                        className="mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Load more images"
                    >
                        Load More
                    </motion.button>
                )}

                {/* Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 sm:p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                className="relative max-w-5xl max-h-[90vh] mx-auto"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedImage.image || "https://via.placeholder.com/400x200.png?text=Selected+Image"}
                                    alt="Selected image"
                                    className="rounded-lg shadow-2xl max-h-[90vh] w-full object-contain"
                                    aria-label="Selected gallery image"
                                />
                                <motion.button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Close image modal"
                                >
                                    ✕
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Gallery;