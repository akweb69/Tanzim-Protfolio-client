import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const ManageSectionShow = () => {
    const [sections, setSections] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        isEnabled: false,
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/sections`);
            setSections(response.data);
        } catch (err) {
            setError("Failed to fetch sections.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editingId) return; // Prevent submission if not editing

        setLoading(true);
        setError(null);

        try {
            const sectionData = { ...formData };
            const response = await axios.patch(
                `${baseUrl}/update_section/${editingId}`,
                sectionData
            );
            if (response.data.modifiedCount > 0) {
                setSections(
                    sections.map((section) =>
                        section._id === editingId ? { ...section, ...sectionData } : section
                    )
                );
            }
            setFormData({
                name: "",
                isEnabled: false,
            });
            setEditingId(null);
        } catch (err) {
            setError("Failed to update section.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (section) => {
        setFormData({
            name: section.name || "",
            isEnabled: section.isEnabled || false,
        });
        setEditingId(section._id);
    };

    return (
        <section className="p-4 sm:p-6 lg:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs max-h-screen overflow-x-scroll flex flex-col text-white">
            <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Manage Sections
            </motion.h1>

            {/* Form (for editing only) */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-[rgba(0,0,0,0.2)] p-4 sm:p-6 rounded-2xl shadow-xl mx-auto w-full"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-50 mb-4">
                    {editingId ? "Edit Section" : "Select a Section to Edit"}
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Section Name (e.g., Hero Section)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        disabled={!editingId} // Disable unless editing
                        required
                    />
                    <label className="flex items-center gap-2 p-3">
                        <input
                            type="checkbox"
                            name="isEnabled"
                            checked={formData.isEnabled}
                            onChange={handleInputChange}
                            className="checkbox checkbox-warning"
                            disabled={!editingId} // Disable unless editing
                        />
                        <span>Enable Section</span>
                    </label>
                </div>
                {editingId && (
                    <div className="mt-6 flex flex-wrap gap-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Section"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    name: "",
                                    isEnabled: false,
                                });
                                setEditingId(null);
                            }}
                            className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>

            {/* Sections List */}
            <div className="w-full mx-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sections.map((section) => (
                        <motion.div
                            key={section._id}
                            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex items-center justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">{section.name}</h3>
                                <p className="text-gray-600 text-sm">
                                    Status: {section.isEnabled ? "Enabled" : "Disabled"}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEdit(section)}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    <FaEdit />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ManageSectionShow;