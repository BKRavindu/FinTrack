import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    List,
    TrendingUp,
    TrendingDown,
    Filter,
    LogOut
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Sidebar = ({ isOpen }) => {
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        localStorage.clear();
        navigate("/login");
    };

    const menuItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
         backdrop-blur-md
         ${
            isActive
                ? "bg-white/25 text-white shadow-md"
                : "text-white/80 hover:bg-white/15 hover:text-white"
        }`;

    return (
        <aside
            className={`fixed top-16 left-0 bottom-0 w-64 z-40
            bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
            <div className="flex flex-col h-full">

                {/* ===== User Profile ===== */}
                <div className="p-4 border-b border-white/20 flex items-center gap-3">
                    <img
                        src={
                            user?.profileImageUrl ||
                            `https://ui-avatars.com/api/?name=${user?.fullName || "User"}&background=ffffff&color=6366f1`
                        }
                        className="w-12 h-12 rounded-full border-2 border-white shadow"
                        alt="User"
                    />
                    <div className="overflow-hidden">
                        <p className="font-semibold text-white truncate">
                            {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-white/70 truncate">
                            {user?.email || "user@email.com"}
                        </p>
                    </div>
                </div>

                <nav className="p-4 space-y-2 flex-1">
                    <NavLink to="/dashboard" className={menuItemClass}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/category" className={menuItemClass}>
                        <List size={18} />
                        Category
                    </NavLink>

                    <NavLink to="/income" className={menuItemClass}>
                        <TrendingUp size={18} />
                        Income
                    </NavLink>

                    <NavLink to="/expense" className={menuItemClass}>
                        <TrendingDown size={18} />
                        Expense
                    </NavLink>

                    <NavLink to="/filter" className={menuItemClass}>
                        <Filter size={18} />
                        Filter
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-white/20">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-xl
                        text-white/90 hover:text-white
                        hover:bg-white/20 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;
