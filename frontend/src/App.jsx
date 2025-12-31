import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Expense from "./pages/Expense.jsx";
import Income from "./pages/Income.jsx";
import Category from "./pages/Category.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Filter from "./pages/Filter.jsx";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./components/Dashboard.jsx";

const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    {/* Root redirect based on login */}
                    <Route path="/" element={<Root />} />

                    {/* Public pages */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected dashboard layout */}

                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expense" element={<Expense />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/filter" element={<Filter />} />

                </Routes>
            </BrowserRouter>
        </>
    );
};

// Root redirect logic
const Root = () => {
    const token = localStorage.getItem("token");
    const isAuthenticated = !token;

    return isAuthenticated ? (
        <Navigate to="/dashboard" replace />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default App;
