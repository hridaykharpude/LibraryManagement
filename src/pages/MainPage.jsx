import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = ({ user_id }) => {
    const navigate = useNavigate();
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [groups, setGroups] = useState([]);

    // useEffect(() => {
    //     // replace with actual API call when backend is ready
        

    //     setRecommendedBooks([
    //         "Book 1",
    //         "Book 2",
    //         "Book 3",
    //         "Book 4",
    //     ]);

    //     // replace with actual API call when backend is ready
        
        

    //     setGroups([
    //         { name: "Science Fiction", books: ["Dune", "Neuromancer"] },
    //         { name: "Fantasy", books: ["Lord of the Rings", "Harry Potter"] },
    //         { name: "Mystery", books: ["Sherlock Holmes", "Gone Girl"] },
    //         { name: "History", books: ["Sapiens", "Guns, Germs, and Steel"] },
    //         { name: "History", books: ["Sapiens", "Guns, Germs, and Steel"] },
    //         { name: "History", books: ["Sapiens", "Guns, Germs, and Steel"] },
    //         { name: "History", books: ["Sapiens", "Guns, Germs, and Steel"] },
    //     ]);
    // }, []);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await fetch(`/api/recommendation_first_page?user_id=${user_id}`);
                const data = await res.json();

                const personalBooks = data.personal_recommendations.map(book => book.book_name);
                setRecommendedBooks(personalBooks);

                const groupData = data.group_recommendations.map(group => ({
                    name: group.group_name,
                    books: group.group_books.map(book => book.book_name),
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
                    <ul>
                        {recommendedBooks.map((book, index) => (
                            <li key={index} className="p-1">{book}</li>
                        ))}
                    </ul>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                    <button
                        style={{
                            flex: 1,
                            fontSize: "16px",
                            padding: "10px",
                        }}
                        onClick={() => navigate(`/groups/${user_id}`)}
                    >
                        Groups
                    </button>
                    <button
                        style={{
                            flex: 1,
                            fontSize: "16px",
                            padding: "10px",
                        }}
                        onClick={() => navigate(`/history/${user_id}`)}
                    >
                        History
                    </button>
                </div>

            </div>


            <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
            <div style={{
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
                        <ul style={{ marginTop: "8px" }}>
                            {group.books.map((book, idx) => (
                                <li key={idx} style={{ fontSize: "14px" }}>{book}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default MainPage;
