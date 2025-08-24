import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicationDetail = () => {
    const { id } = useParams();
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await axios.get(`${baseUrl}/all_publications`);
                const pub = response.data.find((p) => p._id === id);
                if (pub) {
                    setPublication(pub);
                } else {
                    setError("Publication not found.");
                }
                setLoading(false);
            } catch (err) {
                setError("Failed to load publication.");
                setLoading(false);
                console.error(err);
            }
        };

        fetchPublication();
    }, [id, baseUrl]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-400">{error}</p>;
    if (!publication) return null;

    return (
        <section className="py-20 bg-gray-950">
            <div className="w-11/12 mx-auto">
                <h2 className="text-3xl font-bold text-cyan-400 mb-6">{publication.title}</h2>
                <h4 className="text-lg text-cyan-300 mb-4">{publication.subtitle}</h4>
                <img
                    src={publication.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={publication.title}
                    className="w-full max-w-md h-60 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-400 mb-4">{publication.description}</p>
                <p className="text-gray-500 text-sm">Published: {publication.year}</p>
            </div>
        </section>
    );
};

export default PublicationDetail;