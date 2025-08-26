import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import useAuthContext from "../Auth/useAuthContext";
import Loading from "../Common/Loading ";

const HeroSection = () => {
    const texts = [
        "Electrical & Electronic Engineer ⚡",
        "Tech Enthusiast 💡",
        "Innovator 🚀",
        "Problem Solver 🔧",
    ];

    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [backward, setBackward] = useState(false);
    const { mainData } = useAuthContext();
    const { loading, settings } = mainData;

    // Log settings only when loading is false
    useEffect(() => {
        if (!loading) {
            console.log(settings);
        }
    }, [loading, settings]);

    // Typing effect
    useEffect(() => {
        const timeout = setInterval(() => {
            if (index >= texts.length) {
                setIndex(0);
                return;
            }

            setText(
                backward
                    ? texts[index].substring(0, subIndex - 1)
                    : texts[index].substring(0, subIndex + 1)
            );
            setSubIndex((prev) => prev + (backward ? -1 : 1));

            if (!backward && subIndex === texts[index].length) {
                setTimeout(() => setBackward(true), 1000);
            } else if (backward && subIndex === 0) {
                setBackward(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        }, backward ? 50 : 100);

        return () => clearInterval(timeout);
    }, [subIndex, index, backward]);

    // Replace static data with settings data from context
    const data = settings.length > 0 ? settings : [
        {
            myName: "Md Tanzim Khan",
            description:
                "Passionate about technology, projects, and innovations. I love turning ideas into impactful solutions.",
            photo: "/images/profile-placeholder.jpg",
        },
    ];
    if (loading) {
        return <Loading></Loading>;
    }
    return (
        <section className="relative text-white min-h-screen flex items-center overflow-hidden py-28">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-black animate-gradient-bg"></div>
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-20 gap-12 relative z-10">
                {/* Text Section */}
                <motion.div
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold py-3">
                        Hi, I'm <br />
                        <span className="bg-gradient-to-tr from-pink-500 to-purple-600 bg-clip-text text-transparent text-6xl md:text-7xl pt-2">
                            {data[0].myName}
                        </span>
                    </h1>

                    {/* Typing Effect */}
                    <p className="text-xl md:text-2xl font-medium text-gray-200 min-h-[40px]">
                        {text}
                        <motion.span
                            className="inline-block"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            |
                        </motion.span>
                    </p>

                    <p className="mt-6 text-gray-200 text-lg leading-relaxed">
                        {data[0].description}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-8">
                        <motion.a
                            href="#"
                            className="flex items-center bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaDownload className="mr-2" /> View CV
                        </motion.a>
                        <motion.a
                            href="#contact"
                            className="flex items-center bg-white text-blue-700 px-6 py-3 rounded-2xl shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaEnvelope className="mr-2" /> Contact
                        </motion.a>
                    </div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    className="md:w-1/2 flex justify-center relative"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.img
                        src={data[0].photo}
                        alt="Profile"
                        className="rounded-full w-80 md:w-[400px] md:h-[400px] border-4 border-blue-400"
                        whileHover={{ scale: 1.07, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;