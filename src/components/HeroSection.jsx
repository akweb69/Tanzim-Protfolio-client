import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaDownload, FaEnvelope } from "react-icons/fa";

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

    // Typing effect
    useEffect(() => {
        if (index >= texts.length) {
            setIndex(0);
            return;
        }

        const timeout = setTimeout(() => {
            setText(
                backward
                    ? texts[index].substring(0, subIndex - 1)
                    : texts[index].substring(0, subIndex + 1)
            );
            setSubIndex((prev) => prev + (backward ? -1 : 1));

            if (!backward && subIndex === texts[index].length) {
                setTimeout(() => setBackward(true), 1000); // Pause before deleting
            } else if (backward && subIndex === 0) {
                setBackward(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        }, backward ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, index, backward, texts]);

    // Parallax effect for background
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 50]);

    return (
        <section className="relative bg-hero-section text-white min-h-screen flex items-center overflow-hidden py-28">
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y }}
            />
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-20 gap-12 relative z-10">
                {/* Text Section */}
                <motion.div
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold py-3 ">
                        Hi, I'm <br /> <span className="bg-gradient-to-tr from-pink-500 to-purple-600 bg-clip-text text-transparent text-6xl md:text-7xl pt-2">Md Tanzim Khan</span>
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
                        Passionate about technology, projects, and innovations. I love turning
                        ideas into impactful solutions.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-8">
                        <motion.a
                            href="/TanzimKhan_CV.pdf"
                            className="flex items-center bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaDownload className="mr-2" /> Download CV
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
                        src="https://i.ibb.co.com/KxdJVxDJ/Whats-App-Image-2025-08-21-at-18-01-52-f91f71ff.jpg"
                        alt="Tanzim Khan"
                        className="rounded-full w-80 md:w-[400px] border-4 border-blue-400"
                        whileHover={{ scale: 1.07, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    />

                    {/* Neon Ring Animation */}
                    <motion.div
                        className="absolute rounded-full border-2 border-cyan-400 opacity-60"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;