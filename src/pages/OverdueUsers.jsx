import { useState, useEffect } from "react";
import axios from "axios";

const OverdueUsers = () => {
    const [userIds, setUserIds] = useState([]);

    useEffect(() => {
        const fetchOverdueUsers = async () => {
            try {
                const response = await axios.get("/api/new_get_overdue_users");
                setUserIds(response.data.overdue_user_ids);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch overdue users.");
            }
        };

        fetchOverdueUsers();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center mb-6">
                <h2 className="text-2xl font-semibold mb-4 w-full">List of Overdue Users (Ids)</h2>
                <ul>
                    {userIds.map((id) => (
                        <li key={id} className="mb-2">{id}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OverdueUsers;
