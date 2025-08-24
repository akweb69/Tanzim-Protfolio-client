import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBriefcase, FaGraduationCap, FaTrophy } from 'react-icons/fa';

const experiences = [
    {
        id: 1,
        title: 'Software Engineer at TechCorp',
        period: '2023 - Present',
        description: 'Led development of scalable web applications using React and Node.js.',
        icon: <FaCode />,
    },
    {
        id: 2,
        title: 'Senior Developer at InnovateX',
        period: '2020 - 2023',
        description: 'Designed and implemented microservices architecture for enterprise solutions.',
        icon: <FaBriefcase />,
    },
    {
        id: 3,
        title: 'Computer Science Degree',
        period: '2016 - 2020',
        description: 'Graduated with honors, specializing in algorithms and data structures.',
        icon: <FaGraduationCap />,
    },
    {
        id: 4,
        title: 'Hackathon Winner',
        period: '2019',
        description: 'Won first place in national coding competition for AI-driven app.',
        icon: <FaTrophy />,
    },
];

const Experience = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 to-indigo-900 ">
            <div className="w-11/12 mx-auto py-20">
                <motion.h1
                    className="text-4xl font-bold text-center text-white mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Experience Journey
                </motion.h1>
                <div className="relative max-w-6xl mx-auto">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-400 h-full"></div>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className={`mb-8 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center w-full`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="w-1/2"></div>
                            <div className="w-1/2 p-4">
                                <div className="bg-[rgba(0,0,0,0.3)] rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300">
                                    <div className={`absolute top-1/2 -mt-4 ${index % 2 === 0 ? '-left-12' : '-right-12'} bg-indigo-400 rounded-full p-3 text-white`}>
                                        {exp.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                                    <span className="block text-sm text-indigo-200 mb-2">{exp.period}</span>
                                    <p className="text-gray-300">{exp.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;