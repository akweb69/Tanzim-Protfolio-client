import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner with Text */}
                <motion.div
                    className="relative w-16 h-16 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-transparent rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-transparent border-r-transparent border-b-cyan-400 border-l-purple-500 rounded-full opacity-50" />
                    <motion.span
                        className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                        style={{
                            textShadow: "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(128, 0, 255, 0.5)",
                        }}
                        animate={{ rotate: -360 }} // Counter-rotate to keep text upright
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                        TK
                    </motion.span>
                </motion.div>
                {/* Text Below Spinner */}
                <motion.div
                    className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    style={{
                        textShadow: "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(128, 0, 255, 0.5)",
                    }}
                >
                    Loading...
                </motion.div>
            </div>
        </div>
    );
};

export default Loading;