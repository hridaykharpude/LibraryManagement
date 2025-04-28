import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = ({ user_id }) => {
    const navigate = useNavigate();
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await fetch(`/api/recommendation_first_page?user_id=${user_id}`);
                const data = await res.json();

                console.log(data);

                const personalBooks = data.personal_recommendations.map(book => ({
                    book_id: book.book_id,
                    name: book.book_name
                }));
                setRecommendedBooks(personalBooks);

                const groupData = data.group_recommendations.map(group => ({
                    group_id: group.group_id,
                    name: group.group_name,
                    books: group.group_books.map(book => ({
                        book_id: book.book_id,
                        name: book.book_name
                    })),
                }));
                setGroups(groupData);

            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [user_id]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-start mb-6">
                <div className="w-2/3 bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Recommended Books</h2>
                    <ul className="list-disc list-inside">
                        {recommendedBooks.map((book, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => navigate(`/book/${book.book_id}`)}
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    {book.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                    <button
                        style={{ flex: 1, fontSize: "16px", padding: "10px" }}
                        onClick={() => navigate(`/groups/${user_id}`)}
                    >
                        Groups
                    </button>
                    <button
                        style={{ flex: 1, fontSize: "16px", padding: "10px" }}
                        onClick={() => navigate(`/search-book/${user_id}`)}
                    >
                        Search Books
                    </button>
                    <button
                        style={{ flex: 1, fontSize: "16px", padding: "10px" }}
                        onClick={() => navigate(`/history/${user_id}`)}
                    >
                        History
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                }}
            >
                {groups.map((group, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "white",
                            padding: "16px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h3 style={{ fontWeight: "600" }}>{group.name}</h3>
                        <ul style={{ marginTop: "8px" }} className="list-disc list-inside">
                            {group.books.map((book, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() =>
                                            navigate(`/group-book/${user_id}/${group.group_id}/${book.book_id}`)
                                        }
                                        className="text-blue-600 underline hover:text-blue-800 text-sm"
                                    >
                                        {book.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default MainPage;
