import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { X } from "lucide-react";

const CategoryModal = ({ open, onClose, onSubmit, initialData }) => {
    const [icon, setIcon] = useState(initialData?.icon || "📦");
    const [name, setName] = useState(initialData?.name || "");
    const [type, setType] = useState(initialData?.type || "expense");
    const [showEmoji, setShowEmoji] = useState(false);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ icon, name, type });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? "Update Category" : "Add Category"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Icon */}
                    <div>
                        <label className="text-sm text-gray-600">Icon</label>
                        <div className="flex items-center gap-3 mt-1">
                            <button
                                type="button"
                                onClick={() => setShowEmoji(!showEmoji)}
                                className="text-3xl border rounded-lg px-3 py-2"
                            >
                                {icon}
                            </button>
                        </div>

                        {showEmoji && (
                            <div className="mt-2">
                                <EmojiPicker
                                    onEmojiClick={(e) => {
                                        setIcon(e.emoji);
                                        setShowEmoji(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="text-sm text-gray-600">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
                    >
                        {initialData ? "Update Category" : "Add Category"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
