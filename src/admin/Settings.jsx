import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
    const [profile, setProfile] = useState({
        websiteTitle: "",
        myName: "",
        description: "",
        aboutMe: "",
        phone: "",
        email: "",
        address: "",
        facebookLink: "",
        githubLink: "",
        linkedinLink: "",
        photo: null, // This will now store the URL string after upload
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch settings on component mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all_settings`);
                const latestSettings = response?.data?.[0] ?? {}; // Optional chaining for safer access
                setProfile((prev) => ({
                    ...prev,
                    websiteTitle: latestSettings?.websiteTitle ?? "My Portfolio",
                    myName: latestSettings?.myName ?? "Tanzim Khan",
                    description: latestSettings?.description ?? "Welcome to my professional portfolio",
                    aboutMe: latestSettings?.aboutMe ?? "I am a passionate web developer with expertise in modern web technologies.",
                    phone: latestSettings?.phone ?? "+1234567890",
                    email: latestSettings?.email ?? "akwebdev69@gmail.com",
                    address: latestSettings?.address ?? "123 Main St, City, Country",
                    facebookLink: latestSettings?.facebookLink ?? "https://facebook.com/yourprofile",
                    githubLink: latestSettings?.githubLink ?? "https://github.com/yourprofile",
                    linkedinLink: latestSettings?.linkedinLink ?? "https://linkedin.com/in/yourprofile",
                    photo: latestSettings?.photo ?? null, // Store the image URL
                }));
            } catch (err) {
                setError("Failed to fetch settings. Please try again.");
                toast.error("Failed to fetch settings.");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const validateForm = () => {
        if (!profile.websiteTitle?.trim()) {
            toast.error("Website Title is required.");
            return false;
        }
        if (!profile.myName?.trim()) {
            toast.error("Name is required.");
            return false;
        }
        if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
            toast.error("Valid email is required.");
            return false;
        }
        return true;
    };

    // Function to upload image to ImgBB
    const uploadImageToImgBB = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            return response?.data?.data?.url ?? null; // Optional chaining for response
        } catch (err) {
            toast.error("Failed to upload image to ImgBB.");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            let imageUrl = profile.photo;
            // If a new image is selected, upload it to ImgBB
            if (profile.photo && profile.photo instanceof File) {
                imageUrl = await uploadImageToImgBB(profile.photo);
                if (!imageUrl) {
                    throw new Error("Image upload failed.");
                }
            }

            // Prepare data to send to the backend (excluding the file, including the URL)
            const settingsData = {
                ...profile,
                photo: imageUrl, // Store the URL instead of the file
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/add_settings`,
                settingsData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response?.data?.insertedId) {
                toast.success("Settings saved successfully!");
                // Refetch settings to update UI
                const updatedResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/all_settings`);
                const latestSettings = updatedResponse?.data?.[0] ?? {};
                setProfile((prev) => ({
                    ...prev,
                    ...latestSettings,
                    photo: latestSettings?.photo ?? null, // Update with the URL
                }));
            }
        } catch (err) {
            setError("Failed to save settings. Please try again.");
            toast.error("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-4 sm:p-6 md:p-8 bg-[rgba(0,0,0,0.1)] backdrop-blur-md rounded-lg overflow-y-auto max-h-screen">
            <motion.h1
                className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Settings
            </motion.h1>
            {error && <div className="text-red-400 mb-4">{error}</div>}
            <motion.form
                onSubmit={handleSubmit}
                className="bg-[rgba(0,0,0,0.15)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Website Title *</label>
                        <input
                            type="text"
                            name="websiteTitle"
                            value={profile.websiteTitle}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter website title"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Name *</label>
                        <input
                            type="text"
                            name="myName"
                            value={profile.myName}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter your name"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={profile.description}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter website description"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">About Me</label>
                        <textarea
                            name="aboutMe"
                            value={profile.aboutMe}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300 resize-y"
                            placeholder="Tell us about yourself"
                            rows="4"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Profile Photo</label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded file:bg-blue-600 file:text-white file:border-none file:rounded file:px-3 file:py-1"
                            accept="image/*"
                            disabled={loading}
                        />
                        {profile.photo && typeof profile.photo === "string" && (
                            <img
                                src={profile.photo}
                                alt="Profile Preview"
                                className="mt-2 w-24 h-24 object-cover rounded"
                            />
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter phone number"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter email address"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter your address"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Facebook Profile Link</label>
                        <input
                            type="url"
                            name="facebookLink"
                            value={profile.facebookLink}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter Facebook profile URL"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">GitHub Link</label>
                        <input
                            type="url"
                            name="githubLink"
                            value={profile.githubLink}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter GitHub profile URL"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">LinkedIn Link</label>
                        <input
                            type="url"
                            name="linkedinLink"
                            value={profile.linkedinLink}
                            onChange={handleChange}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.3)] p-2 rounded focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                            placeholder="Enter LinkedIn profile URL"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Submit Button (Full Width) */}
                <button
                    type="submit"
                    className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition focus:ring-2 focus:ring-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </motion.form>
        </section>
    );
};

export default Settings;