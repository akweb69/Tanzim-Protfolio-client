import { motion } from "framer-motion";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const initialReviews = [
    { id: 1, name: "Dr. Rahman", role: "Professor", message: "Excellent EEE student." },
];

const ManageReviews = () => {
    const [reviews, setReviews] = useState(initialReviews);

    const deleteReview = (id) => setReviews(reviews.filter(r => r.id !== id));

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1 className="text-3xl font-bold text-white mb-8">Manage Reviews</motion.h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Message</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(r => (
                            <tr key={r.id} className="text-gray-700 border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{r.name}</td>
                                <td className="px-4 py-2">{r.role}</td>
                                <td className="px-4 py-2">{r.message}</td>
                                <td className="px-4 py-2 flex gap-4">
                                    <button className="text-blue-700"><FaEdit /></button>
                                    <button onClick={() => deleteReview(r.id)} className="text-red-600"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageReviews;
