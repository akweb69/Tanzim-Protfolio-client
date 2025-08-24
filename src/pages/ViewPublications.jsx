import { motion } from "framer-motion";

const allPublications = [
    { title: "Renewable Energy Optimization", year: 2024, description: "Optimizing renewable energy sources for efficiency." },
    { title: "Smart Grid Simulation", year: 2023, description: "Simulation of smart grid systems using MATLAB." },
    { title: "IoT in Power Systems", year: 2023, description: "Integration of IoT devices in power management." },
    { title: "Advanced Circuit Analysis", year: 2022, description: "Research on advanced techniques in circuit analysis." },
];

const ViewPublications = () => {
    return (
        <section className="py-20 bg-white px-6 md:px-20">
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center">All Publications</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {allPublications.map((pub, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg"
                            whileHover={{ scale: 1.03 }}
                        >
                            <h3 className="font-semibold text-xl mb-2">{pub.title}</h3>
                            <p className="text-gray-500 mb-2">{pub.year}</p>
                            <p className="text-gray-700">{pub.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default ViewPublications;
