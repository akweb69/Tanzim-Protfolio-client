import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch appointments on component mount
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all_appointments`);
                setAppointments(response?.data ?? []);
            } catch (err) {
                setError("Failed to fetch appointments. Please try again.");
                toast.error("Failed to fetch appointments.");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    // Delete appointment
    const deleteAppointment = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete_appointment/${id}`);
            if (response?.data?.deletedCount === 1) {
                setAppointments(appointments.filter((app) => app._id !== id));
                toast.success("Appointment deleted successfully!");
            } else {
                throw new Error("Failed to delete appointment.");
            }
        } catch (err) {
            toast.error("Failed to delete appointment.");
        } finally {
            setLoading(false);
        }
    };

    // Checkout (disable) appointment
    const checkoutAppointment = async (id) => {
        try {
            setLoading(true);
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/update_appointment/${id}`, {
                disabled: true,
            });
            if (response?.data?.modifiedCount === 1) {
                setAppointments(
                    appointments.map((app) =>
                        app._id === id ? { ...app, disabled: true } : app
                    )
                );
                toast.success("Appointment checked out successfully!");
            } else {
                throw new Error("Failed to checkout appointment.");
            }
        } catch (err) {
            toast.error("Failed to checkout appointment.");
        } finally {
            setLoading(false);
        }
    };

    // Format date and time
    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1
                className="text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Appointments
            </motion.h1>

            {error && <div className="text-red-400 mb-4">{error}</div>}
            {loading && <div className="text-white mb-4">Loading...</div>}
            {!loading && appointments.length === 0 && (
                <div className="text-white mb-4">No appointments found.</div>
            )}

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Date & Time</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((app) => (
                            <tr
                                key={app._id}
                                className={`text-gray-700 border-b hover:bg-gray-50 ${app.disabled ? "opacity-50" : ""
                                    }`}
                            >
                                <td className="px-4 py-2">{app.name}</td>
                                <td className="px-4 py-2">{app.phone}</td>
                                <td className="px-4 py-2">{app.email}</td>
                                <td className="px-4 py-2">{app.description}</td>
                                <td className="px-4 py-2">{formatDateTime(app.createdAt)}</td>
                                <td className="px-4 py-2">
                                    {app.disabled ? "Checked Out" : "Active"}
                                </td>
                                <td className="px-4 py-2 flex gap-4">
                                    <button
                                        onClick={() => checkoutAppointment(app._id)}
                                        className={`text-green-600 ${app.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={app.disabled || loading}
                                        title="Checkout Appointment"
                                    >
                                        <FaCheckCircle />
                                    </button>
                                    <button
                                        onClick={() => deleteAppointment(app._id)}
                                        className="text-red-600"
                                        disabled={loading}
                                        title="Delete Appointment"
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

export default ManageAppointments;