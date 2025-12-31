import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";

const MenuBar = ({ onToggleSidebar }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        clearUser();
        localStorage.clear();
        navigate("/login");
    };

    const handleBurgerClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
        if (onToggleSidebar) onToggleSidebar(!isSidebarOpen);
    };

    return (
        <header className="h-16 w-full flex items-center justify-between px-4 md:px-6
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">

            {/* Left: Burger + Logo */}
            <div className="flex items-center gap-3">
                <button onClick={handleBurgerClick} className="text-white">
                    {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <h1
                    onClick={() => navigate("/dashboard")}
                    className="text-xl font-bold cursor-pointer select-none"
                >
                    💰 FinTrack
                </h1>
            </div>

            {/* Right: User Profile */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2"
                >
                    <img
                        src={
                            user?.profileImageUrl ||
                            `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=6366f1&color=fff`
                        }
                        alt={user?.fullName || "User"}
                        className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg text-gray-700 overflow-hidden z-50">
                        <div className="px-4 py-3 border-b">
                            <p className="font-medium text-sm">{user?.fullName || "User"}</p>
                            <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default MenuBar;
