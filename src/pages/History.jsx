import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const History = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Replace with actual API call when backend is ready
        setBorrowedBooks([
            "The Great Gatsby",
            "To Kill a Mockingbird",
            "1984",
            "The Catcher in the Rye"
        ]);

        // Replace with actual API call when backend is ready
        setGroups([
            { id: 1, name: "Sci-Fi Readers", admin: "Alice" },
            { id: 2, name: "History Buffs", admin: "Bob" },
            { id: 3, name: "Fantasy Fans", admin: "Charlie" },
            { id: 4, name: "Mystery Lovers", admin: "Diana" },
          ]);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">User History</h2>
            <p className="text-lg font-medium mb-6">User ID: {user_id}</p>

            <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Borrowed Books</h3>
                <ul>
                    {borrowedBooks.map((book, index) => (
                        <li key={index} className="p-1">{book}</li>
                    ))}
                </ul>
            </div>

            <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>Groups</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {groups.map((group) => (
                    <div 
                        key={group.id} 
                        style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}
                    >
                        <h3 style={{ margin: "0 0 8px 0" }}>{group.name}</h3>
                        <p style={{ margin: "0 0 12px 0" }}>Admin: {group.admin}</p>
                        <button onClick={() => navigate(`/group/${group.id}`)}>More Info</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
