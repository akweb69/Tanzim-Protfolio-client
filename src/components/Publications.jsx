import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const publications = [
    {
        title: "Renewable Energy Optimization",
        subtitle: "Advancements in Solar and Wind Integration",
        description: "This paper explores innovative strategies for optimizing renewable energy systems, focusing on hybrid solar-wind setups for enhanced efficiency.",
        year: "2024-03-15",
        thumbnail: "https://via.placeholder.com/300x200?text=Renewable+Energy",
    },
    {
        title: "Smart Grid Simulation",
        subtitle: "Modeling for Future Energy Networks",
        description: "A comprehensive study on smart grid simulations using MATLAB and Simulink to improve energy distribution and reliability.",
        year: "2023-07-22",
        thumbnail: "https://via.placeholder.com/300x200?text=Smart+Grid",
    },
    {
        title: "IoT in Power Systems",
        subtitle: "Real-Time Monitoring and Control",
        description: "This research discusses the implementation of IoT technologies for real-time monitoring and management of power systems.",
        year: "2023-11-10",
        thumbnail: "https://via.placeholder.com/300x200?text=IoT+Power",
    },
];

const Publications = () => {
    return (
        <section id="publications" className="py-20 bg-gradient-to-br from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Publications</h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                    {publications.map((pub, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50 hover:shadow-2xl transition-all"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <img
                                src={pub.thumbnail}
                                alt={pub.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">{pub.title}</h3>
                            <h4 className="text-sm font-medium text-cyan-300 mb-2">{pub.subtitle}</h4>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{pub.description}</p>
                            <p className="text-gray-500 text-xs mb-4">{pub.year}</p>
                            <Link
                                to="/view-publications"
                                className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                            >
                                View More <FaExternalLinkAlt className="text-sm" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Publications;