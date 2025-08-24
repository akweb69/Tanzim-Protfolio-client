import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        image: "",
        phone: "",
        email: "",
        institute: "",
        message: "",
        rating: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${baseUrl}/reviews`);
            setReviews(response.data);
        } catch (err) {
            setError("Failed to fetch reviews.");
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!imageFile) return null;
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            return response.data.data.url;
        } catch (err) {
            setError("Failed to upload image.");
            console.error(err);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let imageUrl = formData.image;
            if (imageFile) {
                imageUrl = await uploadImage();
                if (!imageUrl) {
                    setLoading(false);
                    return;
                }
            }

            const reviewData = {
                ...formData,
                image: imageUrl || formData.image,
                rating: parseInt(formData.rating) || 0,
            };

            if (editingId) {
                const response = await axios.patch(
                    `${baseUrl}/update_review/${editingId}`,
                    reviewData
                );
                if (response.data.modifiedCount > 0) {
                    setReviews(
                        reviews.map((rev) =>
                            rev._id === editingId ? { ...rev, ...reviewData } : rev
                        )
                    );
                }
            } else {
                const response = await axios.post(
                    `${baseUrl}/add_review`,
                    reviewData
                );
                const newReview = {
                    _id: response.data.insertedId,
                    ...reviewData,
                };
                setReviews([newReview, ...reviews]);
            }

            setFormData({
                name: "",
                role: "",
                image: "",
                phone: "",
                email: "",
                institute: "",
                message: "",
                rating: "",
            });
            setImageFile(null);
            setEditingId(null);
            document.querySelector('input[type="file"]').value = "";
        } catch (err) {
            setError("Failed to save review.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (rev) => {
        setFormData({
            name: rev.name || "",
            role: rev.role || "",
            image: rev.image || "",
            phone: rev.phone || "",
            email: rev.email || "",
            institute: rev.institute || "",
            message: rev.message || "",
            rating: rev.rating.toString() || "",
        });
        setEditingId(rev._id);
    };

    const deleteReview = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_review/${id}`);
            if (response.data.deletedCount > 0) {
                setReviews(reviews.filter((rev) => rev._id !== id));
            }
        } catch (err) {
            setError("Failed to delete review.");
            console.error(err);
        }
    };

    return (
        <section className="p-4 sm:p-6 lg:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs min-h-[100vh] flex flex-col">
            <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Manage Reviews
            </motion.h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-[rgba(0,0,0,0.2)] text-white p-4 sm:p-6 rounded-2xl shadow-xl  mx-auto w-full"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-50 mb-4">
                    {editingId ? "Edit Review" : "Add New Review"}
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="Role (e.g., Professor)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone (e.g., +880 1711-123456)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        name="institute"
                        value={formData.institute}
                        onChange={handleInputChange}
                        placeholder="Institute"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        placeholder="Rating (1-5)"
                        min="1"
                        max="5"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message"
                        className="p-3 border border-indigo-300 rounded-lg sm:col-span-2 focus:ring-2 focus:ring-indigo-500"
                        rows="5"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-3 border border-indigo-300 rounded-lg sm:col-span-2 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : editingId
                                ? "Update Review"
                                : "Add Review"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    name: "",
                                    role: "",
                                    image: "",
                                    phone: "",
                                    email: "",
                                    institute: "",
                                    message: "",
                                    rating: "",
                                });
                                setImageFile(null);
                                setEditingId(null);
                            }}
                            className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Reviews List */}
            <div className="w-full mx-auto flex-1">
                <div className="grid grid-cols-1 gap-4">
                    {reviews.map((rev) => (
                        <motion.div
                            key={rev._id}
                            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex-1 flex items-center gap-4">
                                {rev.image && (
                                    <img
                                        src={rev.image}
                                        alt={rev.name}
                                        className="w-12 h-12 rounded-full border-2 border-indigo-500"
                                    />
                                )}
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">{rev.name}</h3>
                                    <span className="block text-sm text-gray-600">{rev.role}</span>
                                    <p className="text-gray-700 mt-2">{rev.message}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4 sm:mt-0">
                                <button
                                    onClick={() => handleEdit(rev)}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteReview(rev._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ManageReviews;