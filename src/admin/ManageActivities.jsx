import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ManageActivities = () => {
    const [activities, setActivities] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        date: "",
        duration: "",
        role: "",
        achievement: "",
        thumbnail: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get(`${baseUrl}/all_activities`);
            setActivities(response.data);
        } catch (err) {
            setError("Failed to fetch activities.");
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
            let thumbnailUrl = formData.thumbnail;
            if (imageFile) {
                thumbnailUrl = await uploadImage();
                if (!thumbnailUrl) {
                    setLoading(false);
                    return;
                }
            }

            const activityData = {
                ...formData,
                thumbnail: thumbnailUrl || formData.thumbnail,
            };

            if (editingId) {
                const response = await axios.patch(
                    `${baseUrl}/update_activity/${editingId}`,
                    activityData
                );
                if (response.data.modifiedCount > 0) {
                    setActivities(
                        activities.map((act) =>
                            act._id === editingId ? { ...act, ...activityData } : act
                        )
                    );
                }
            } else {
                const response = await axios.post(
                    `${baseUrl}/add_activity`,
                    activityData
                );
                const newActivity = {
                    _id: response.data.insertedId,
                    ...activityData,
                };
                setActivities([newActivity, ...activities]);
            }

            setFormData({
                title: "",
                subtitle: "",
                description: "",
                date: "",
                duration: "",
                role: "",
                achievement: "",
                thumbnail: "",
            });
            setImageFile(null);
            setEditingId(null);
            document.querySelector('input[type="file"]').value = "";
        } catch (err) {
            setError("Failed to save activity.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (act) => {
        setFormData({
            title: act.title || "",
            subtitle: act.subtitle || "",
            description: act.description || "",
            date: act.date || "",
            duration: act.duration || "",
            role: act.role || "",
            achievement: act.achievement || "",
            thumbnail: act.thumbnail || "",
        });
        setEditingId(act._id);
    };

    const deleteActivity = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_activity/${id}`);
            if (response.data.deletedCount > 0) {
                setActivities(activities.filter((act) => act._id !== id));
            }
        } catch (err) {
            setError("Failed to delete activity.");
            console.error(err);
        }
    };

    return (
        <section className="p-4 sm:p-6 lg:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs max-h-screen overflow-y-scroll flex flex-col">
            <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Manage Activities
            </motion.h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-[rgba(0,0,0,0.3)] text-white p-4 sm:p-6 rounded-2xl shadow-xl mx-auto w-full"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-50 mb-4">
                    {editingId ? "Edit Activity" : "Add New Activity"}
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white input input-primary w-full bg-transparent"
                        required
                    />
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        placeholder="Subtitle"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white input input-primary w-full bg-transparent"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="p-3 border border-indigo-300 rounded-lg sm:col-span-2 focus:ring-2 focus:ring-indigo-500 text-white "
                        rows="5"
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white input input-primary w-full bg-transparent"
                    />
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="Duration (e.g., 2 Days)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white input input-primary w-full bg-transparent"
                    />
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="Role (e.g., Presenter)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white input input-primary w-full bg-transparent"
                    />
                    <input
                        type="text"
                        name="achievement"
                        value={formData.achievement}
                        onChange={handleInputChange}
                        placeholder="Achievement (e.g., Best Presenter)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white input input-primary w-full bg-transparent"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-3 border border-indigo-300 rounded-lg sm:col-span-2 focus:ring-2 focus:ring-indigo-500 text-white input input-primary w-full bg-transparent"
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
                                ? "Update Activity"
                                : "Add Activity"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    title: "",
                                    subtitle: "",
                                    description: "",
                                    date: "",
                                    duration: "",
                                    role: "",
                                    achievement: "",
                                    thumbnail: "",
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

            {/* Activities List */}
            <div className="w-full mx-auto flex-1">
                <div className="grid grid-cols-1 gap-4">
                    {activities.map((act) => (
                        <motion.div
                            key={act._id}
                            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">{act.title}</h3>
                                <span className="block text-sm text-gray-600">{act.date}</span>
                                <p className="text-gray-700 mt-2">{act.description}</p>
                            </div>
                            <div className="flex gap-4 mt-4 sm:mt-0">
                                <button
                                    onClick={() => handleEdit(act)}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteActivity(act._id)}
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

export default ManageActivities;