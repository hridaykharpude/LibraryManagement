import { useState } from "react";
import axios from "axios";

const DeleteBook = () => {
    const [bookId, setBookId] = useState("");

    const handleChange = (e) => {
        setBookId(e.target.value);
    };

    const handleDeleteBook = async () => {
        try {
            const response = await axios.delete("/api/new_delete_book", {
                data: {
                    book_id: bookId
                }
            });

            alert("Book deleted successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to delete book.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center mb-6">
                <h2 className="text-2xl font-semibold mb-4 w-full">Delete Book</h2>

                <input
                    type="text"
                    placeholder="Book ID (ISBN - 10 chars)"
                    value={bookId}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '0.5rem', height: '1.5rem' }}
                />

                <button
                    onClick={handleDeleteBook}
                    style={{ width: '100%', marginTop: '1rem', height: '2.0rem' }}
                >
                    Delete Book
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;
