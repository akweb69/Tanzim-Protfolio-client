import { motion } from "framer-motion";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const initialAppointments = [
    { id: 1, name: "Md. Rashed", phone: "01712345678", email: "rashed@example.com", description: "Project discussion" },
    { id: 2, name: "Sara Khan", phone: "01887654321", email: "sara@example.com", description: "Consultation" },
];

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState(initialAppointments);

    const deleteAppointment = (id) => setAppointments(appointments.filter(a => a.id !== id));

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1
                className="text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Appointments
            </motion.h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((app) => (
                            <tr key={app.id} className="text-gray-700 border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{app.name}</td>
                                <td className="px-4 py-2">{app.phone}</td>
                                <td className="px-4 py-2">{app.email}</td>
                                <td className="px-4 py-2">{app.description}</td>
                                <td className="px-4 py-2 flex gap-4">
                                    <button className="text-blue-700"><FaEdit /></button>
                                    <button onClick={() => deleteAppointment(app.id)} className="text-red-600"><FaTrash /></button>
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
