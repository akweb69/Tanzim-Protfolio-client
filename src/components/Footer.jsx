import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
    const neonColor = "#4f46e5"; // Indigo-purple neon glow

    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold text-white">About</h3>
                    <p className="text-sm leading-relaxed">
                        Tanzim Khan, a passionate developer creating innovative web solutions.
                    </p>
                    <p className="text-sm">&copy; 2025 Tanzim Khan. All rights reserved.</p>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {["Portfolio", "Blog", "Contact", "About"].map((link) => (
                            <motion.li
                                key={link}
                                whileHover={{ scale: 1.05, textShadow: `0 0 8px ${neonColor}, 0 0 16px ${neonColor}` }}
                                className="cursor-pointer transition-all duration-200"
                            >
                                <a href={`/${link.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                                    {link}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Social Media & Newsletter Section */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold text-white">Connect with Me</h3>
                    <div className="flex gap-4">
                        {[
                            { icon: <FaFacebook size={24} />, url: "https://www.facebook.com" },
                            { icon: <FaLinkedin size={24} />, url: "https://www.linkedin.com/in/abukalam1" },
                            { icon: <FaGithub size={24} />, url: "https://github.com/akweb69" },
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.2, textShadow: `0 0 8px ${neonColor}, 0 0 16px ${neonColor}` }}
                                className="transition-all duration-200"
                            >
                                {item.icon}
                            </motion.a>
                        ))}
                    </div>

                    {/* <div className="mt-4">
                        <h4 className="text-sm font-semibold text-white">Subscribe to Newsletter</h4>
                        <div className="mt-2 flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 bg-gray-800 text-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                                onClick={() => alert("Newsletter subscription not implemented yet.")}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
                <p style={{ textShadow: `0 0 4px ${neonColor}` }}>
                    Built with ❤️ by Tanzim Khan using React & Tailwind CSS
                </p>
            </div>
        </footer>
    );
};

export default Footer;
