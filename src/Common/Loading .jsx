import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <motion.div
                className="text-4xl font-bold text-cyan-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                style={{
                    textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #0ff",
                }}
            >
                Loading...
            </motion.div>
        </div>
    );
};

export default Loading;
