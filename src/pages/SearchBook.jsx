import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBook = ({ user_id }) => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        try {
            const response = await axios.get("/api/new_search_book", {
                params: { book_name: value }
            });
            setBooks(response.data.books || []);
        } catch (error) {
            console.error(error);
            setBooks([]);
        }
    };

    const goToBook = (book_id) => {
        navigate(`/book/${book_id}`);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-center mb-6">

                <h2>Search Book</h2>

                <input
                    type="text"
                    placeholder="Search by book name..."
                    value={query}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '1rem', height: '2.5rem' }}
                />

                {books.map((book, index) => (
                    <div key={index} style={{ marginBottom: '1rem', textAlign: 'left' }}>
                        <div><strong>Book Name:</strong> {book.book_name}</div>
                        <div><strong>Author:</strong> {book.author_id}</div>
                        <div><strong>Publisher:</strong> {book.publisher}</div>
                        <div><strong>Avg Rating:</strong> {book.avg_rating}</div>

                        <button
                            onClick={() => goToBook(book.book_id)}
                            // style={{ marginTop: '8px', padding: '8px 16px', backgroundColor: '#4F46E5', color: 'white', borderRadius: '4px' }}
                            style={{ width: "15%", padding: "5px", marginTop: '8px', marginBottom: '8px' }}
                        >
                            Go to Book
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBook;
