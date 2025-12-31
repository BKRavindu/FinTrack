import { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar.jsx";
import Sidebar from "./Sidebar.jsx";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col">
                <MenuBar
                    isSidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 p-6 bg-gray-50 overflow-auto mt-18">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
