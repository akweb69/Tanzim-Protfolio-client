import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ManageEducation = () => {
    const [education, setEducation] = useState([]);
    const [formData, setFormData] = useState({
        level: "",
        name: "",
        location: "",
        year: "",
        gpa: "",
        description: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/education`);
            setEducation(response.data);
        } catch (err) {
            setError("Failed to fetch education records.");
            console.error(err);
        } finally {
            setLoading(false);
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
            const educationData = {
                ...formData
            };

            if (editingId) {
                const response = await axios.patch(
                    `${baseUrl}/update_education/${editingId}`,
                    educationData
                );
                if (response.data.modifiedCount > 0) {
                    setEducation(
                        education.map((edu) =>
                            edu._id === editingId ? { ...edu, ...educationData } : edu
                        )
                    );
                }
            } else {
                const response = await axios.post(
                    `${baseUrl}/add_education`,
                    educationData
                );
                const newEducation = {
                    _id: response.data.insertedId,
                    ...educationData,
                };
                setEducation([newEducation, ...education]);
            }

            setFormData({
                level: "",
                name: "",
                location: "",
                year: "",
                gpa: "", // Reset gpa field
                description: "",
            });
            setEditingId(null);
        } catch (err) {
            setError("Failed to save education record.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (edu) => {
        setFormData({
            level: edu.level || "",
            name: edu.name || "",
            location: edu.location || "",
            year: edu.year || "",
            gpa: edu.gpa?.toString() || "", // Convert gpa to string for input
            description: edu.description || "",
        });
        setEditingId(edu._id);
    };

    const deleteEducation = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_education/${id}`);
            if (response.data.deletedCount > 0) {
                setEducation(education.filter((edu) => edu._id !== id));
            }
        } catch (err) {
            setError("Failed to delete education record.");
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
                Manage Education
            </motion.h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-[rgba(0,0,0,0.2)] text-white p-4 sm:p-6 rounded-2xl shadow-xl mx-auto w-full"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-50 mb-4">
                    {editingId ? "Edit Education" : "Add New Education"}
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        placeholder="Level (e.g., University)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Institution Name"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Location (e.g., Gopalganj, Bangladesh)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        placeholder="Year (e.g., 2018 - 2022)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        placeholder="GPA (e.g., 3.5 out of 4.0)"
                        className="p-3 col-span-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Short Description (e.g., Bachelor in Electrical Engineering)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 col-span-1 sm:col-span-2"
                        rows="4"
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
                                ? "Update Education"
                                : "Add Education"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    level: "",
                                    name: "",
                                    location: "",
                                    year: "",
                                    gpa: "",
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

            {/* Education List */}
            <div className="w-full mx-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {education.map((edu) => (
                        <motion.div
                            key={edu._id}
                            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex items-center justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">{edu.level}</h3>
                                <p className="text-gray-700">{edu.name}</p>
                                <p className="text-gray-600 text-sm">{edu.location}</p>
                                <p className="text-gray-600 text-sm">{edu.year}</p>
                                {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                                {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEdit(edu)}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteEducation(edu._id)}
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

export default ManageEducation;