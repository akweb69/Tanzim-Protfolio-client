import { motion } from "framer-motion";
import { useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";

const initialGallery = [
    { id: 1, image: "https://via.placeholder.com/150" },
];

const ManageGallery = () => {
    const [gallery, setGallery] = useState(initialGallery);

    const deleteImage = (id) => setGallery(gallery.filter(img => img.id !== id));

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1 className="text-3xl font-bold text-white mb-8">Manage Gallery</motion.h1>
            <div className="flex gap-4 mb-6">
                <input type="file" />
                <button className="bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"><FaUpload /> Upload</button>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
                {gallery.map(img => (
                    <div key={img.id} className="relative">
                        <img src={img.image} alt="Gallery" className="rounded shadow-lg w-full h-32 object-cover" />
                        <button onClick={() => deleteImage(img.id)} className="absolute top-2 right-2 text-red-600 bg-white p-1 rounded-full"><FaTrash /></button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManageGallery;
