import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Groups = ({ user_id }) => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  // useEffect(() => {
  //   // Placeholder datas

  //   setGroups([
  //     { id: 1, name: "Sci-Fi Readers", admin: `${user_id}` },
  //     { id: 2, name: "History Buffs", admin: "Bob" },
  //     { id: 3, name: "Fantasy Fans", admin: "Charlie" },
  //     { id: 4, name: "Mystery Lovers", admin: "Diana" },
  //   ]);
  // }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`/api/group_list?user_id=${user_id}`);
        const data = await response.json();

        if (data.group_list) {
          const formattedGroups = data.group_list.map(group => ({
            id: group.group_id,
            name: group.group_name,
            admin: group.administrator_id,
          }));
          setGroups(formattedGroups);
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, [user_id]);
  
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Groups</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {groups.map((group) => (
          <div key={group.id} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
            <h3 style={{ margin: "0 0 8px 0" }}>{group.name}</h3>
            <p style={{ margin: "0 0 12px 0" }}>Admin: {group.admin}</p>
            <button onClick={() => navigate(`/group/${group.id}`)}>More Info</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
