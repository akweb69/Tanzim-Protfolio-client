import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        level: "",
        description: "", // Added description field
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get(`${baseUrl}/skills`);
            setSkills(response.data);
        } catch (err) {
            setError("Failed to fetch skills.");
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
            const skillData = {
                ...formData,
                level: parseInt(formData.level) || 0,
            };

            if (editingId) {
                const response = await axios.patch(
                    `${baseUrl}/update_skill/${editingId}`,
                    skillData
                );
                if (response.data.modifiedCount > 0) {
                    setSkills(
                        skills.map((skill) =>
                            skill._id === editingId ? { ...skill, ...skillData } : skill
                        )
                    );
                }
            } else {
                const response = await axios.post(
                    `${baseUrl}/add_skill`,
                    skillData
                );
                const newSkill = {
                    _id: response.data.insertedId,
                    ...skillData,
                };
                setSkills([newSkill, ...skills]);
            }

            setFormData({
                name: "",
                level: "",
                description: "", // Reset description field
            });
            setEditingId(null);
        } catch (err) {
            setError("Failed to save skill.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (skill) => {
        setFormData({
            name: skill.name || "",
            level: skill.level.toString() || "",
            description: skill.description || "", // Include description
        });
        setEditingId(skill._id);
    };

    const deleteSkill = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_skill/${id}`);
            if (response.data.deletedCount > 0) {
                setSkills(skills.filter((skill) => skill._id !== id));
            }
        } catch (err) {
            setError("Failed to delete skill.");
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
                Manage Skills
            </motion.h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 bg-[rgba(0,0,0,0.2)] text-white p-4 sm:p-6 rounded-2xl shadow-xl mx-auto w-full"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-indigo-50 mb-4">
                    {editingId ? "Edit Skill" : "Add New Skill"}
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Skill Name (e.g., Power Systems)"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="number"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        placeholder="Skill Level (0-100)"
                        min="0"
                        max="100"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Short Description (e.g., Expertise in power distribution)"
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
                                ? "Update Skill"
                                : "Add Skill"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    name: "",
                                    level: "",
                                    description: "", // Reset description
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

            {/* Skills List */}
            <div className="w-full mx-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((skill) => (
                        <motion.div
                            key={skill._id}
                            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex items-center justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-indigo-700">{skill.name}</h3>
                                <p className="text-gray-700">Level: {skill.level}%</p>
                                <p className="text-gray-600 text-sm mt-1">{skill.description}</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteSkill(skill._id)}
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

export default ManageSkills;