import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import moment from "moment";

const Signup = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const createdAt = moment().format("MMMM Do YYYY");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullName || !email || !password) {
            setError("All fields are required");
            return;
        }

        setError("");
        console.log({ fullName, email, password, createdAt });

        // navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Tracking your money join us today ✨
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Created Date */}
                    <p className="text-xs text-gray-400 text-center">
                        Account will be created on {createdAt}
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
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
