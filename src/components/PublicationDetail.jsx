import { useState } from "react";
import { motion } from "framer-motion";
import useAuthContext from "../Auth/useAuthContext";
import { useParams } from "react-router-dom";
import Loading from "../Common/Loading ";

const PublicationDetail = () => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    // load data-->
    const { mainData, loading } = useAuthContext()
    const { publications } = mainData;
    const params = useParams();
    const publicationId = params.id;

    // Find the publication by ID
    const publication = publications.find((pub) => pub._id === publicationId) || {};
    if (loading) {
        return <Loading></Loading>
    }


    const toggleDescription = () => setIsDescriptionExpanded((prev) => !prev);

    return (
        <section className="py-20 bg-gray-950 min-h-screen">
            <motion.div
                className="w-11/12 mx-auto border border-gray-700/50 rounded-xl p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <img
                    src={publication?.thumbnail}
                    alt={publication?.title}
                    className="w-full max-h-[450px] object-cover rounded-lg mb-4"
                />
                <div className="md:flex  justify-between gap-5  items-center">
                    <h2 className="text-2xl w-full flex-1  rounded-xl  font-bold text-cyan-50 mb-6">
                        {publication?.title}
                    </h2>
                    <p className="text-white  bg-orange-500 rounded-xl px-4 py-2 md:text-lg text-sm btn btn-xs btn-warning md:btn-md">Published: {publication?.year}</p>
                </div>
                <h4 className="text-lg text-cyan-300 mb-4">
                    {publication?.subtitle}
                </h4>

                <p
                    className="text-gray-400 mb-4 whitespace-pre-wrap"
                    style={{
                        maxHeight: isDescriptionExpanded ? "none" : "9rem",
                        overflow: isDescriptionExpanded ? "visible" : "hidden",
                    }}
                >
                    {publication?.description}
                </p>
                {publication?.description.split("\n").length > 6 && (
                    <button
                        onClick={toggleDescription}
                        className="text-cyan-400 text-sm hover:text-cyan-300 mb-4 transition-colors"
                    >
                        {isDescriptionExpanded ? "Show Less" : "Show More"}
                    </button>
                )}


                {/* Visit publication link */}
                <div className="mt-6">
                    <motion.a
                        href={publication?.publication_link}
                        target="_blank"
                        className="flex items-center w-fit bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Read Full Publication
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
};

export default PublicationDetail;
