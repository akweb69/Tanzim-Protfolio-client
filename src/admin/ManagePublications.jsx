import { motion } from "framer-motion";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const initialPublications = [
    { id: 1, title: "Renewable Energy Optimization", year: 2024 },
    { id: 2, title: "Smart Grid Simulation", year: 2023 },
];

const ManagePublications = () => {
    const [publications, setPublications] = useState(initialPublications);

    const deletePublication = (id) => setPublications(publications.filter(p => p.id !== id));

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1
                className="text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Manage Publications
            </motion.h1>

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
                        {publications.map(pub => (
                            <tr key={pub.id} className="text-gray-700 border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{pub.title}</td>
                                <td className="px-4 py-2">{pub.year}</td>
                                <td className="px-4 py-2 flex gap-4">
                                    <button className="text-blue-700"><FaEdit /></button>
                                    <button onClick={() => deletePublication(pub.id)} className="text-red-600"><FaTrash /></button>
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
