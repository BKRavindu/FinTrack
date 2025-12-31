import { Menu, X } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const MenuBar = ({ isSidebarOpen, onToggleSidebar }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 h-16 w-full z-50
            flex items-center justify-between px-4
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">

            <div className="flex items-center gap-3">
                <button onClick={onToggleSidebar}>
                    {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <h1
                    onClick={() => navigate("/dashboard")}
                    className="text-xl font-bold cursor-pointer"
                >
                    💰 FinTrack
                </h1>
            </div>

            <img
                src={
                    user?.profileImageUrl ||
                    `https://ui-avatars.com/api/?name=${user?.fullName || "User"}`
                }
                className="w-9 h-9 rounded-full border-2 border-white"
                alt="User"
            />
        </header>
    );
};

export default MenuBar;
