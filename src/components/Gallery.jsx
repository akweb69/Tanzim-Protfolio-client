import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "https://i.ibb.co.com/hxs24Dbb/Whats-App-Image-2025-07.jpg",
        "https://i.ibb.co.com/YLxVRbn/gallery2.jpg",
        "https://i.ibb.co.com/Fxj7W2Z/gallery3.jpg",
        "https://i.ibb.co.com/7yC1nDw/gallery4.jpg",
        "https://i.ibb.co.com/G2YjVfj/gallery5.jpg",
        "https://i.ibb.co.com/D7zqFFh/gallery6.jpg",
        "https://i.ibb.co.com/jwVvRSP/gallery7.jpg",
        "https://i.ibb.co.com/WcTt9RQ/gallery8.jpg",

    ];

    return (
        <section id="gallery" className="py-20 bg-gradient-to-tr from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
                    Stunning Gallery
                </h2>

                {/* Grid layout like Pinterest */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="overflow-hidden rounded-xl shadow-lg cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img
                                src={img}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl max-h-[90vh] mx-auto"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()} // stop close on image click
                        >
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="rounded-lg shadow-2xl max-h-[90vh] object-contain"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-full shadow-lg hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
