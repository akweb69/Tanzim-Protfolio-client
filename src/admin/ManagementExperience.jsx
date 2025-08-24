import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ManagementExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        period: "",
        description: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await axios.get(`${baseUrl}/all_experience`);
            setExperiences(response.data);
        } catch (err) {
            setError("Failed to fetch experiences.");
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const experienceData = {
                ...formData,
                createdAt: new Date(),
            };

            if (editingId) {
                const response = await axios.patch(
                    `${baseUrl}/update_experience/${editingId}`,
                    experienceData
                );
                if (response.data.modifiedCount > 0) {
                    setExperiences(
                        experiences.map((exp) =>
                            exp._id === editingId ? { ...exp, ...experienceData } : exp
                        )
                    );
                }
            } else {
                const response = await axios.post(
                    `${baseUrl}/add_experience`,
                    experienceData
                );
                const newExperience = {
                    _id: response.data.insertedId,
                    ...experienceData,
                };
                setExperiences([newExperience, ...experiences]);
            }

            setFormData({
                title: "",
                period: "",
                description: "",
            });
            setEditingId(null);
        } catch (err) {
            setError("Failed to save experience.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (exp) => {
        setFormData({
            title: exp.title,
            period: exp.period || "",
            description: exp.description || "",
        });
        setEditingId(exp._id);
    };

    const deleteExperience = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_experience/${id}`);
            if (response.data.deletedCount > 0) {
                setExperiences(experiences.filter((exp) => exp._id !== id));
            }
        } catch (err) {
            setError("Failed to delete experience.");
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
                Manage Experiences
            </motion.h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-[rgba(0,0,0,0.2)] p-4 sm:p-6 rounded-2xl shadow-xl text-white
                 mx-auto w-full"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-50 mb-4">
                    {editingId ? "Edit Experience" : "Add New Experience"}
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        name="period"
                        value={formData.period}
                        onChange={handleInputChange}
                        placeholder="Period (e.g., 2023 - Present)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        rows="5"
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
                                ? "Update Experience"
                                : "Add Experience"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    title: "",
                                    period: "",
                                    description: "",
                                });
                                setEditingId(null);
                            }}
                            className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Experience List */}
            <div className="w-full mx-auto flex-1">
                <div className="grid grid-cols-1 gap-4">
                    {experiences.map((exp) => (
                        <motion.div
                            key={exp._id}
                            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">{exp.title}</h3>
                                <span className="block text-sm text-gray-600">{exp.period}</span>
                                <p className="text-gray-700 mt-2">{exp.description}</p>
                            </div>
                            <div className="flex gap-4 mt-4 sm:mt-0">
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteExperience(exp._id)}
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

export default ManagementExperience;