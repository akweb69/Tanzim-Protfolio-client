import { motion } from "framer-motion";

const VideoCV = () => {
    return (
        <section id="video-cv" className="py-20 bg-gray-100 px-6 md:px-20">
            <motion.div
                className="max-w-6xl mx-auto text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-blue-700 mb-6">My Video CV</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    Here’s a quick introduction about me, my skills, and my journey as a
                    developer. Watch the video to know more.
                </p>

                <motion.div
                    className="mt-10 flex justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-full md:w-3/4 aspect-video relative rounded-xl shadow-2xl overflow-hidden">
                        <iframe
                            src="https://www.youtube.com/embed/VIDEO_ID" // Replace with your actual video link
                            title="Video CV"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default VideoCV;
