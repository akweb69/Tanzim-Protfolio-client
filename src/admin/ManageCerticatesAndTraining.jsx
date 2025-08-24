import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const ManageCertificatesAndTraining = () => {
    const [certificates, setCertificates] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        date: "",
        duration: "",
        thumbnail: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

    // Fetch all certificates on component mount
    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await axios.get(`${baseUrl}/all_certificates`);
            setCertificates(response?.data ?? []);
        } catch (err) {
            setError("Failed to fetch certificates.");
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
            return response?.data?.data?.url ?? null;
        } catch (err) {
            setError("Failed to upload image.");
            console.error(err);
            return null;
        }
    };

    // Handle form submission (add or update certificate)
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

            const certificateData = {
                ...formData,
                thumbnail: thumbnailUrl || formData.thumbnail,
                date: formData.date || new Date().toISOString().split("T")[0], // Default to today if date is empty
            };

            if (editingId) {
                // Update certificate
                const response = await axios.patch(
                    `${baseUrl}/update_certificate/${editingId}`,
                    certificateData
                );
                if (response?.data?.modifiedCount > 0) {
                    setCertificates(
                        certificates.map((cert) =>
                            cert._id === editingId ? { ...cert, ...certificateData } : cert
                        )
                    );
                }
            } else {
                // Add new certificate
                const response = await axios.post(
                    `${baseUrl}/add_certificate`,
                    certificateData
                );
                const newCertificate = {
                    _id: response?.data?.insertedId,
                    ...certificateData,
                };
                setCertificates([newCertificate, ...certificates]);
            }

            // Reset form
            setFormData({
                title: "",
                subtitle: "",
                description: "",
                date: "",
                duration: "",
                thumbnail: "",
            });
            setImageFile(null);
            setEditingId(null);
        } catch (err) {
            setError("Failed to save certificate.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit button click
    const handleEdit = (cert) => {
        setFormData({
            title: cert?.title ?? "",
            subtitle: cert?.subtitle ?? "",
            description: cert?.description ?? "",
            date: cert?.date ?? "",
            duration: cert?.duration ?? "",
            thumbnail: cert?.thumbnail ?? "",
        });
        setEditingId(cert?._id ?? null);
    };

    // Handle delete certificate
    const deleteCertificate = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/delete_certificate/${id}`);
            if (response?.data?.deletedCount > 0) {
                setCertificates(certificates.filter((cert) => cert._id !== id));
            }
        } catch (err) {
            setError("Failed to delete certificate.");
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
                Manage Certificates & Training
            </motion.h1>

            {/* Form for adding/editing certificates */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">
                    {editingId ? "Edit Certificate" : "Add New Certificate"}
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
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="Duration (e.g., 3 Months)"
                        className="p-2 border rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 border rounded col-span-2 md:col-span-1"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                    disabled={loading}
                >
                    {loading ? "Saving..." : editingId ? "Update Certificate" : "Add Certificate"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setFormData({ title: "", subtitle: "", description: "", date: "", duration: "", thumbnail: "" });
                            setEditingId(null);
                            setImageFile(null);
                        }}
                        className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Certificates Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Duration</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certificates?.map((cert) => (
                            <tr key={cert?._id} className="text-gray-700 border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{cert?.title}</td>
                                <td className="px-4 py-2">{cert?.date}</td>
                                <td className="px-4 py-2">{cert?.duration}</td>
                                <td className="px-4 py-2 flex gap-4">
                                    <button onClick={() => handleEdit(cert)} className="text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => deleteCertificate(cert?._id)} className="text-red-600">
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

export default ManageCertificatesAndTraining;