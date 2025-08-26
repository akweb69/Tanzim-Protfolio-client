import { motion } from "framer-motion";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";



const TrainingAndCertificate = () => {
    const { mainData, loading } = useAuthContext()
    const { certificates } = mainData;
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <section id="trainings" className="py-20 bg-gradient-to-br from-gray-950 to-indigo-900">
            <motion.div
                className="w-11/12 mx-auto text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-cyan-400 mb-12 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    Training & Certifications
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 text-left">
                    {certificates?.map((training, index) => (
                        <motion.div
                            key={training.id}
                            className="bg-[rgba(0,0,0,0.2)] p-6 rounded-xl shadow-lg border border-gray-700/50 hover:shadow-2xl transition-all"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <img
                                src={training?.thumbnail}
                                alt={training?.title}
                                className="w-full max-h-80 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">{training?.title}</h3>
                            <h4 className="text-sm font-medium text-cyan-300 mb-2">{training?.subtitle}</h4>
                            <p className="text-gray-400 text-sm mb-4 whitespace-pre-wrap">{training?.description}</p>
                            <p className="text-gray-500 text-xs mb-2">Date: {training?.date}</p>
                            <p className="text-gray-500 text-xs mb-4">Duration: {training?.duration}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default TrainingAndCertificate;
