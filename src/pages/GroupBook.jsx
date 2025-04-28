// GroupBook.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GroupBook = ({ user_id }) => {
    const { group_id, book_id } = useParams(); 
    const [bookDetails, setBookDetails] = useState(null);
    const [yourBookRating, setYourBookRating] = useState(0);
    const [yourAuthorRating, setYourAuthorRating] = useState(0);

    useEffect(() => {
        const fetchBookInfo = async () => {
            try {
                const res = await fetch(`/api/book_info?user_id=${user_id}&book_id=${book_id}`);
                const data = await res.json();

                setBookDetails({
                    name: data.book_name,
                    author: data.author,
                    publisher: data.publisher,
                    publishedYear: data.publish_year,
                    bookRating: data.book_rating,
                    authorRating: data.author_rating,
                    authorId: data.author_id,
                });

                setYourBookRating(data.your_book_rating);
                setYourAuthorRating(data.your_author_rating);
            } catch (error) {
                console.error("Failed to fetch book info:", error);
            }
        };

        fetchBookInfo();
    }, [user_id, group_id, book_id]);

    if (!bookDetails) return <div>Loading book info...</div>;

    const handleBorrow = async () => {
        try {
            const res = await fetch("/api/borrow_book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user_id,
                    is_group_borrowing: 1,
                    group_id: group_id,
                    book_id: book_id,
                }),
            });

            if (!res.ok) throw new Error("Failed to borrow book");

            const result = await res.json();
            console.log("Borrow success:", result);
            alert("Book borrowed successfully! Thank you!");
        } catch (err) {
            alert("Failed to borrow book! Please try again later");
        }
    };

    const handleRate = async () => {
        try {
            const res = await fetch("/api/rate_book_author", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user_id,
                    group_id: group_id,
                    is_group_rating: 1,
                    author_rating: yourAuthorRating,
                    book_rating: yourBookRating,
                    author_id: bookDetails.authorId,
                    book_id: book_id,
                }),
            });

            if (!res.ok) throw new Error("Failed to rate book/author");

            const result = await res.json();
            console.log("Rating success:", result);

            alert("Rating submitted successfully! Thank you!");

        } catch (err) {
            alert("Failed to submit rating! Please try again");
        }
    };

    return (
        <div className="mt-6 p-6 bg-white rounded shadow max-w-xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">{bookDetails.name}</h2>
            <ul className="space-y-2 mb-6">
                <li><strong>Author:</strong> {bookDetails.author}</li>
                <li><strong>Publisher:</strong> {bookDetails.publisher}</li>
                <li><strong>Published Year:</strong> {bookDetails.publishedYear}</li>
                <li><strong>Book Rating:</strong> {bookDetails.bookRating}</li>
                <li><strong>Author Rating:</strong> {bookDetails.authorRating}</li>
            </ul>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Rate this Book and Author</h3>
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
                    <div className="flex flex-col flex-1">
                        <label className="mb-1 font-medium">Your Book Rating</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={yourBookRating ?? ""}
                            onChange={(e) => setYourBookRating(parseFloat(e.target.value))}
                            className="border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="mb-1 font-medium">Your Author Rating</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={yourAuthorRating ?? ""}
                            onChange={(e) => setYourAuthorRating(parseFloat(e.target.value))}
                            className="border px-3 py-2 rounded"
                        />
                    </div>
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <button
                        style={{ width: "27%", height: "40px", fontSize: "18px" }}
                        onClick={handleRate}
                    >
                        Rate
                    </button>
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <button
                        style={{ width: "100%", height: "40px", fontSize: "18px" }}
                        onClick={handleBorrow}
                    >
                        Borrow
                    </button>
                </div>

            </div>
        </div>
    );
};

export default GroupBook;
