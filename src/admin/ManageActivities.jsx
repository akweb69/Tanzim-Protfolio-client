import { motion } from "framer-motion";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const initialActivities = [
    { id: 1, title: "Robotics Competition", year: 2023 },
];

const ManageActivities = () => {
    const [activities, setActivities] = useState(initialActivities);

    const deleteActivity = (id) => setActivities(activities.filter(a => a.id !== id));

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1 className="text-3xl font-bold text-white mb-8">Manage Activities</motion.h1>
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
                        {activities.map(a => (
                            <tr key={a.id} className="text-gray-700 border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{a.title}</td>
                                <td className="px-4 py-2">{a.year}</td>
                                <td className="px-4 py-2 flex gap-4">
                                    <button className="text-blue-700"><FaEdit /></button>
                                    <button onClick={() => deleteActivity(a.id)} className="text-red-600"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageActivities;
