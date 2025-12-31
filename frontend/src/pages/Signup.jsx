import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";

import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import uploadProfileImage from "../util/uploadProfileImage.js";

const Signup = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    const createdAt = moment().format("MMMM Do YYYY");

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");
        setFormError("");

        if (!fullName || !email || !password) {
            setFormError("All fields are required");
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError("Invalid email address");
            return;
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            let profileImageUrl = "";

            // Upload profile image if selected
            if (profileImage) {
                profileImageUrl = await uploadProfileImage(profileImage);
            }

            const response = await axiosConfig.post(
                API_ENDPOINTS.REGISTER_URL,
                {
                    fullName,
                    email,
                    password,
                    profileImageUrl
                }
            );

            if (response.status === 201) {
                toast.success("Profile created successfully!");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            toast.error("Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Track your money — join us today ✨
                    </p>
                </div>

                {/* Form Error */}
                {formError && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center gap-2">
                        <label className="relative cursor-pointer">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center overflow-hidden">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={32} className="text-indigo-400" />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setProfileImage(file);
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </label>
                        <p className="text-xs text-gray-500">
                            Upload profile photo (optional)
                        </p>
                    </div>

                    {/* Full Name */}
                    <div className="relative">
                        <User
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                                    emailError ? "border-red-500" : ""
                                }`}
                            />
                        </div>
                        {emailError && (
                            <p className="text-xs text-red-500 mt-1">
                                {emailError}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                                    passwordError ? "border-red-500" : ""
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-xs text-red-500 mt-1">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <p className="text-xs text-gray-400 text-center">
                        Account will be created on {createdAt}
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2 rounded-lg font-medium transition"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-indigo-600 hover:underline cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
