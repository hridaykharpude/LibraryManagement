import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const History = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const [currentBorrowedBooks, setCurrentBorrowedBooks] = useState([]);
    const [previouslyBorrowedBooks, setPreviouslyBorrowedBooks] = useState([]);
    const [groups, setGroups] = useState([]);

    const fetchBorrowHistory = async () => {
        try {
            const historyResponse = await axios.get("/api/borrow_history", {
                params: {
                    user_id: user_id,
                    group_id: 0,
                    is_group_history: 0
                }
            });
            const historyData = historyResponse.data;
            const borrowHistory = historyData.borrow_history || [];

            const bookInfoPromises = borrowHistory.map(item =>
                axios.get("/api/book_info", {
                    params: {
                        user_id: user_id,
                        book_id: item.book_id
                    }
                }).then(res => ({
                    ...item,
                    book_name: res.data.book_name
                }))
            );

            const borrowHistoryWithNames = await Promise.all(bookInfoPromises);

            const currentBooks = [];
            const previousBooks = [];

            borrowHistoryWithNames.forEach(item => {
                if (item.is_return === 0) {
                    currentBooks.push({ book_name: item.book_name, borrow_id: item.borrow_id });
                } else {
                    previousBooks.push(item.book_name);
                }
            });

            setCurrentBorrowedBooks(currentBooks);
            setPreviouslyBorrowedBooks(previousBooks);

        } catch (error) {
            console.error("Error fetching borrow history:", error);
        }
    };

    const fetchGroups = async () => {
        try {
            const groupResponse = await axios.get("/api/recommendation_first_page", {
                params: {
                    user_id: user_id
                }
            });
            const groupData = groupResponse.data;
            const groupRecs = groupData.group_recommendations || [];

            // For each group, fetch its borrow history
            const groupsWithHistory = await Promise.all(
                groupRecs.map(async (group) => {
                    const groupHistoryResponse = await axios.get("/api/borrow_history", {
                        params: {
                            user_id: user_id,
                            group_id: group.group_id,
                            is_group_history: 1
                        }
                    });

                    const borrowHistory = groupHistoryResponse.data.borrow_history || [];

                    const bookInfoPromises = borrowHistory.map(item =>
                        axios.get("/api/book_info", {
                            params: {
                                user_id: user_id,
                                book_id: item.book_id
                            }
                        }).then(res => ({
                            ...item,
                            book_name: res.data.book_name
                        }))
                    );

                    const borrowHistoryWithNames = await Promise.all(bookInfoPromises);

                    const currentBooks = [];
                    const previousBooks = [];

                    borrowHistoryWithNames.forEach(item => {
                        if (item.is_return === 0) {
                            currentBooks.push({ book_name: item.book_name, borrow_id: item.borrow_id });
                        } else {
                            previousBooks.push(item.book_name);
                        }
                    });

                    return {
                        id: group.group_id,
                        name: group.group_name,
                        currentBooks: currentBooks,
                        previousBooks: previousBooks
                    };
                })
            );

            setGroups(groupsWithHistory);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    useEffect(() => {
        fetchBorrowHistory();
        fetchGroups();
    }, [user_id]);

    const handleReturnBook = async (borrow_id) => {
        try {
            await axios.post("/api/return_book", {
                borrow_id: borrow_id,
                user_id: Number(user_id)
            });
            // After successful return, refresh everything
            alert("Book returned successfully!");
            fetchBorrowHistory();
            fetchGroups();
        } catch (error) {
            console.error("Error returning book:", error);
            alert("Failed to return book! Try again.");
        }
    };

    const panelStyle = {
        backgroundColor: "#ffffff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 5px 5px rgba(0,0,0,0.1)"
    };

    return (
        <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>User History</h2>
            <p style={{ fontSize: "18px", fontWeight: "500", marginBottom: "24px" }}>User ID: {user_id}</p>

            <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
                <div style={{ ...panelStyle, flex: 1 }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>Currently Borrowed Books</h3>
                    <ul style={{ listStyleType: "none", padding: "0" }}>
                        {currentBorrowedBooks.map((book, index) => (
                            <li key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                <span>{book.book_name}</span>
                                <button onClick={() => handleReturnBook(book.borrow_id)}>
                                    Return Book
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ ...panelStyle, flex: 1 }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>Previously Borrowed Books</h3>
                    <ul style={{ listStyleType: "none", padding: "0" }}>
                        {previouslyBorrowedBooks.map((bookName, index) => (
                            <li key={index} style={{ marginBottom: "8px" }}>
                                {bookName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>Groups</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
                {groups.map((group) => (
                    <div key={group.id} style={panelStyle}>
                        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>{group.name}</h3>
                        <p style={{ margin: "0 0 12px 0" }}>Group ID: {group.id}</p>

                        <div style={{ marginTop: "16px" }}>
                            <h5>Currently Borrowed Books</h5>
                            <ul style={{ listStyleType: "none", padding: "0" }}>
                                {group.currentBooks.map((book, index) => (
                                    <li key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                        <span>{book.book_name}</span>
                                        <button onClick={() => handleReturnBook(book.borrow_id)}>
                                            Return Book
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginTop: "16px" }}>
                            <h5>Previously Borrowed Books</h5>
                            <ul style={{ listStyleType: "none", padding: "0" }}>
                                {group.previousBooks.map((bookName, index) => (
                                    <li key={index} style={{ marginBottom: "8px" }}>
                                        {bookName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
