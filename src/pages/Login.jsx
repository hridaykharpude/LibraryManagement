import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [user_id, setuser_id] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (user_id.trim()) {
            onLogin(user_id);
        } else {
            alert("Please enter a User ID");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            {/* Login Box */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center mb-6">
                <h2 className="text-2xl font-semibold mb-4">Library Login</h2>
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={user_id}
                    onChange={(e) => setuser_id(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </div>

            {/* Admin Functions Box */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <h3 className="text-xl font-semibold mb-4">Admin Functions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                        onClick={() => navigate('/add-book')}
                        style={{ width: "100%", padding: "5px" }}
                    >
                        Add Book
                    </button>
                    <button
                        onClick={() => navigate('/delete-book')}
                        style={{ width: "100%", padding: "5px" }}
                    >
                        Delete Book
                    </button>
                    <button
                        onClick={() => navigate('/overdue-users')}
                        style={{ width: "100%", padding: "5px" }}
                    >
                        Overdue Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
