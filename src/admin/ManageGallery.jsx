import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import axios from "axios";

const ManageGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await axios.get(`${baseUrl}/all_gallery`);
            setGallery(response.data);
        } catch (err) {
            setError("Failed to fetch gallery images.");
            console.error(err);
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!imageFile) {
            setError("Please select an image to upload.");
            return null;
        }
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            return response.data.data.url;
        } catch (err) {
            setError("Failed to upload image to ImgBB.");
            console.error(err);
            return null;
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const imageUrl = await uploadImage();
            if (!imageUrl) {
                setLoading(false);
                return;
            }

            const galleryData = {
                image: imageUrl,
            };

            const response = await axios.post(`${baseUrl}/add_gallery`, galleryData);
            const newImage = {
                _id: response.data.insertedId,
                ...galleryData,
            };
            setGallery([newImage, ...gallery]);
            setImageFile(null);
            document.querySelector('input[type="file"]').value = "";
        } catch (err) {
            setError("Failed to save gallery image.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_gallery/${id}`);
            if (response.data.deletedCount > 0) {
                setGallery(gallery.filter((img) => img._id !== id));
            }
        } catch (err) {
            setError("Failed to delete gallery image.");
            console.error(err);
        }
    };

    return (
        <section className="p-4 md:p-6 lg:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs max-h-screen overflow-y-scroll flex flex-col">
            <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Manage Gallery
            </motion.h1>
            <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-2xl mx-auto">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-800 transition"
                    disabled={loading}
                >
                    <FaUpload /> {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {gallery.map((img) => (
                    <motion.div
                        key={img._id}
                        className="relative aspect-square"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src={img.image}
                            alt="Gallery"
                            className="rounded shadow-lg w-full h-full object-cover"
                        />
                        <button
                            onClick={() => deleteImage(img._id)}
                            className="absolute top-2 right-2 text-red-600 bg-white p-1 rounded-full hover:bg-gray-200"
                        >
                            <FaTrash />
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ManageGallery;