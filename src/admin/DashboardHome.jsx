import { FaRegCalendarAlt, FaBook, FaUsers, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardHome = () => {
    const stats = [
        { title: "Appointments", value: 12, icon: <FaRegCalendarAlt /> },
        { title: "Publications", value: 8, icon: <FaBook /> },
        { title: "Reviews", value: 5, icon: <FaUsers /> },
        { title: "Gallery Items", value: 15, icon: <FaImage /> },
    ];

    return (
        <section className="p-4 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-xs rounded-lg overflow-y-scroll max-h-screen">
            <motion.h1
                className="text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Admin Dashboard
            </motion.h1>

            <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow flex flex-col items-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="text-blue-700 text-3xl mb-4">{stat.icon}</div>
                        <h2 className="text-2xl font-semibold">{stat.value}</h2>
                        <p className="text-gray-500">{stat.title}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DashboardHome;
