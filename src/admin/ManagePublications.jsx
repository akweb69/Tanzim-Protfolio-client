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
        publication_link: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

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

            const publicationData = {
                ...formData,
                thumbnail: thumbnailUrl || formData.thumbnail,
                year: formData.year || new Date().toISOString().split("T")[0],
                publication_link: formData.publication_link || "",
            };

            if (editingId) {
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
                const response = await axios.post(
                    `${baseUrl}/add_publication`,
                    publicationData
                );
                const newPublication = {
                    _id: response.data.insertedId,
                    ...publicationData,
                };
                setPublications([newPublication, ...publications]);
            }

            setFormData({
                title: "",
                subtitle: "",
                description: "",
                year: "",
                thumbnail: "",
                publication_link: "",
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

    const handleEdit = (pub) => {
        setFormData({
            title: pub.title,
            subtitle: pub.subtitle || "",
            description: pub.description || "",
            year: pub.year,
            thumbnail: pub.thumbnail || "",
            publication_link: pub.publication_link || "",
        });
        setEditingId(pub._id);
    };

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
        <section className="p-4 md:p-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-950 min-h-screen rounded-lg">
            <motion.h1
                className="text-3xl md:text-4xl font-bold text-indigo-100 mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Publications
            </motion.h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-8 bg-[rgba(0,0,0,0.2)] text-white p-6 md:p-8 rounded-2xl shadow-xl w-full mx-auto"
            >
                <h2 className="text-2xl font-semibold text-indigo-50 mb-4">
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
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        placeholder="Subtitle"
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="p-3 border border-indigo-300 rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-indigo-500"
                        rows="5"
                    />
                    <input
                        type="date"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="url"
                        name="publication_link"
                        value={formData.publication_link}
                        onChange={handleInputChange}
                        placeholder="Publication Link"
                        className="p-3 border col-span-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : editingId
                                ? "Update Publication"
                                : "Add Publication"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    title: "",
                                    subtitle: "",
                                    description: "",
                                    year: "",
                                    thumbnail: "",
                                    publication_link: "",
                                });
                                setImageFile(null);
                                setEditingId(null);
                            }}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Table */}
            <div className="overflow-x-auto bg-[rgba(0,0,0,0.2)] rounded-2xl shadow-xl max-w-6xl mx-auto">
                <table className="w-full table-auto">
                    <thead className="bg-[rgba(0,0,0,0.2)] text-white text-left">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Year</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publications.map((pub) => (
                            <tr
                                key={pub._id}
                                className="text-white border-b hover:bg-indigo-700 transition"
                            >
                                <td className="px-4 py-3">{pub.title}</td>
                                <td className="px-4 py-3">{pub.year}</td>
                                <td className="px-4 py-3 flex gap-4">
                                    <button
                                        onClick={() => handleEdit(pub)}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => deletePublication(pub._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
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