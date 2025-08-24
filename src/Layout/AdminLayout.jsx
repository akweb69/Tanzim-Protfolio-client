import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Assuming you're using lucide-react for icons

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden p-4 bg-indigo-950 text-white fixed top-0 left-0 z-50"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 fixed lg:static top-0 left-0 h-full lg:h-auto w-64 lg:w-1/5 bg-indigo-950 text-white p-4 transition-transform duration-300 ease-in-out z-40 lg:flex lg:flex-col`}
            >
                {/* Sidebar Header */}
                <div className="mt-12 lg:mt-0">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Admin Panel</h1>
                    <p className="text-xs sm:text-sm mt-2">Manage your application settings and content.</p>
                </div>
                <div className="divider divider-success my-4"></div>
                {/* Sidebar Navigation */}
                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/admin/appointments"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Manage Appointments
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/certificates"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Manage Certificates
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/publications"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Manage Publications
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/experience"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Manage Experiences
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/reviews"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Manage Reviews
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/gallery"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Manage Gallery
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/activities"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Manage Activities
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/settings"
                                className="block py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-0 mt-16 lg:mt-0 bg-indigo-900">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;