import { useState } from "react";
import axios from "axios";

const AddBook = () => {
    const [formData, setFormData] = useState({
        book_id: "",
        book_name: "",
        author: "",
        publisher: "",
        publish_date: "",
        stock_number: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddBook = async () => {
        try {
            const response = await axios.post("/api/new_add_book", formData);
            alert("Book added successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to add book.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center mb-6">
                <h2 className="text-2xl font-semibold mb-4 w-full">Add New Book</h2>

                <input
                    type="text"
                    name="book_id"
                    placeholder="Book ID (ISBN - 10 chars)"
                    value={formData.book_id}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '0.5rem', height: '1.5rem' }}
                />
                <input
                    type="text"
                    name="book_name"
                    placeholder="Book Name"
                    value={formData.book_name}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '0.5rem', height: '1.5rem' }}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '0.5rem', height: '1.5rem' }}
                />
                <input
                    type="text"
                    name="publisher"
                    placeholder="Publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '0.5rem', height: '1.5rem' }}
                />
                <input
                    type="text"
                    name="publish_date"
                    placeholder="Publish Date (e.g., 2019-1-1)"
                    value={formData.publish_date}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '0.5rem', height: '1.5rem' }}
                />
                <input
                    type="text"
                    name="stock_number"
                    placeholder="Stock Number"
                    value={formData.stock_number}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '0.5rem', height: '1.5rem' }}
                />

                <button
                    onClick={handleAddBook}
                    style={{ width: '100%', marginTop: '1rem', height: '2.0rem' }}
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default AddBook;
