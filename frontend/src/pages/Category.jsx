import { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import CategoryModal from "../components/CategoryModal";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    /* =======================
       GET ALL CATEGORIES
    ======================== */
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axiosConfig.get(
                API_ENDPOINTS.GET_ALL_CATEGORIES_URL
            );
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    /* =======================
       ADD CATEGORY
    ======================== */
    const handleAdd = async (data) => {
        try {
            await axiosConfig.post(
                API_ENDPOINTS.ADD_CATEGORIES_URL,
                data
            );
            setOpenModal(false);
            fetchCategories();
        } catch (error) {
            console.error("Failed to add category", error);
        }
    };

    /* =======================
       UPDATE CATEGORY
    ======================== */
    const handleUpdate = async (data) => {
        try {
            await axiosConfig.put(
                API_ENDPOINTS.UPDATE_CATEGORIES_URL(editCategory.id),
                data
            );
            setEditCategory(null);
            fetchCategories();
        } catch (error) {
            console.error("Failed to update category", error);
        }
    };

    return (
        <div className="bg-white min-h-screen p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-gray-500 text-center">
                    Loading categories...
                </p>
            )}

            {/* Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {!loading &&
                    categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="border rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{cat.icon}</span>
                                <div>
                                    <p className="font-semibold">{cat.name}</p>
                                    <p className="text-sm text-gray-500 capitalize">
                                        {cat.type}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setEditCategory(cat)}
                                className="text-gray-400 hover:text-indigo-600 transition"
                            >
                                <Pencil size={18} />
                            </button>
                        </div>
                    ))}
            </div>

            {/* Add Modal */}
            <CategoryModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleAdd}
            />

            {/* Edit Modal */}
            <CategoryModal
                open={!!editCategory}
                initialData={editCategory}
                onClose={() => setEditCategory(null)}
                onSubmit={handleUpdate}
            />
        </div>
    );
};

export default Category;
