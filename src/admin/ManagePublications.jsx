import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ManagePublications = () => {
    const [publications, setPublications] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        year: "",
        thumbnail: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    // Fetch all publications on component mount
    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
            const response = await axios.get(`${baseUrl}/all_publications`);
            setPublications(response.data);
        } catch (err) {
            setError("Failed to fetch publications.");
            console.error(err);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Upload image to ImgBB
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

    // Handle form submission (add or update publication)
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

            const publicationData = {
                ...formData,
                thumbnail: thumbnailUrl || formData.thumbnail,
                year: formData.year || new Date().toISOString().split("T")[0], // Default to today if year is empty
            };

            if (editingId) {
                // Update publication
                const response = await axios.patch(
                    `${baseUrl}/update_publication/${editingId}`,
                    publicationData
                );
                if (response.data.modifiedCount > 0) {
                    setPublications(
                        publications.map((pub) =>
                            pub._id === editingId ? { ...pub, ...publicationData } : pub
                        )
                    );
                }
            } else {
                // Add new publication
                const response = await axios.post(
                    `${baseUrl}/add_publication`,
                    publicationData
                );
                // Use the insertedId and publicationData to update the frontend state
                const newPublication = {
                    _id: response.data.insertedId, // Use insertedId from response
                    ...publicationData,
                };
                setPublications([newPublication, ...publications]);
            }

            // Reset form
            setFormData({
                title: "",
                subtitle: "",
                description: "",
                year: "",
                thumbnail: "",
            });
            setImageFile(null);
            setEditingId(null);
        } catch (err) {
            setError("Failed to save publication.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit button click
    const handleEdit = (pub) => {
        setFormData({
            title: pub.title,
            subtitle: pub.subtitle || "",
            description: pub.description || "",
            year: pub.year,
            thumbnail: pub.thumbnail || "",
        });
        setEditingId(pub._id);
    };

    // Handle delete publication
    const deletePublication = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_publication/${id}`);
            if (response.data.deletedCount > 0) {
                setPublications(publications.filter((pub) => pub._id !== id));
            }
        } catch (err) {
            setError("Failed to delete publication.");
            console.error(err);
        }
    };

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1
                className="text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Publications
            </motion.h1>

            {/* Form for adding/editing publications */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">
                    {editingId ? "Edit Publication" : "Add New Publication"}
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        placeholder="Subtitle"
                        className="p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="p-2 border rounded col-span-2"
                        rows="4"
                    />
                    <input
                        type="date"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                    disabled={loading}
                >
                    {loading ? "Saving..." : editingId ? "Update Publication" : "Add Publication"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setFormData({ title: "", subtitle: "", description: "", year: "", thumbnail: "" });
                            setEditingId(null);
                            setImageFile(null);
                        }}
                        className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Publications Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Year</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publications.map((pub) => (
                            <tr key={pub._id} className="text-gray-700 border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{pub.title}</td>
                                <td className="px-4 py-2">{pub.year}</td>
                                <td className="px-4 py-2 flex gap-4">
                                    <button onClick={() => handleEdit(pub)} className="text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => deletePublication(pub._id)} className="text-red-600">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManagePublications;