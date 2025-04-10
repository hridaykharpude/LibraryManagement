import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Group = () => {
  const { group_id } = useParams();
  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    // Placeholder for backend fetch
    setGroupInfo({
      name: "Sci-Fi Readers",
      admin: "Alice",
      recommendedBooks: ["Dune", "Ender’s Game", "Neuromancer"],
      borrowedBooks: ["Dune", "Foundation", "Snow Crash"],
    });
  }, [group_id]);

  if (!groupInfo) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>{groupInfo.name}</h2>
      <p style={{ marginBottom: "24px" }}>Admin: {groupInfo.admin}</p>

      <div style={{ display: "flex", gap: "24px" }}>
        <div style={{ flex: 1 }}>
          <h3>Recommended Books</h3>
          <ul>
            {groupInfo.recommendedBooks.map((book, idx) => (
              <li key={idx}>{book}</li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Borrowed Books</h3>
          <ul>
            {groupInfo.borrowedBooks.map((book, idx) => (
              <li key={idx}>{book}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Group;
