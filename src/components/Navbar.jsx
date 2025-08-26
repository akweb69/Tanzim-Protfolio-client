import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const menuItems = [
        { name: "About", link: "#about" },
        { name: "Gallery", link: "#gallery" },
        { name: "Reviews", link: "#reviews" },
        { name: "Publications", link: "#publications" },
        { name: "Activities", link: "#activities" },
        { name: "Contact", link: "#contact" },
    ];

    return (
        <motion.nav
            className="fixed w-full overflow-x-hidden z-50 bg-[rgba(0,0,0,0.25)] backdrop-blur-md text-white"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
                {/* Logo */}
                <motion.h1
                    className="text-2xl font-extrabold tracking-wide cursor-pointer hover:scale-110 transition-transform bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                >
                    Tanzim{" "}
                    <span className="from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent bg-gradient-to-r">
                        Khan
                    </span>
                </motion.h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 font-medium items-center">
                    {menuItems.map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.link}
                            className="relative text-white group"
                            whileHover={{ scale: 1.05 }}
                        >
                            {item.name}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-white cursor-pointer" onClick={() => setOpen(!open)}>
                    {open ? <FaTimes size={26} /> : <FaBars size={26} />}
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden md:hidden bg-[rgba(0,0,0,0.3)] backdrop-blur-sm shadow-md"
            >
                <div className="flex flex-col items-center py-4 space-y-4 font-medium">
                    {menuItems.map((item, i) => (
                        <a
                            key={i}
                            href={item.link}
                            className="text-white hover:text-blue-600 transition"
                            onClick={() => setOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
