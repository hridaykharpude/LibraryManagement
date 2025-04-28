import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Groups = ({ user_id }) => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

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

  const handleJoinOrLeave = async (groupId, join) => {
    try {
      const response = await fetch('/api/join_or_leave_group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          group_id: groupId,
          join_or_leave: join ? 1 : 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update group membership');
      }

      const result = await response.json();
      console.log(result.message || 'Action successful');

      join ? alert("Group joined successfully!") : alert("Group left successfully!");

    } catch (error) {
      // console.error('Error:', error);
      join ? alert("Failed to join Group! Try again") : alert("Failed to leave Group! Try again");
    }
  };

  const panelStyle = {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 5px 5px rgba(0,0,0,0.1)"
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Groups</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {groups.map((group) => (
          <div
            key={group.id}
            style={panelStyle} //{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }
          >
            <h3 style={{ margin: "0 0 8px 0" }}>{group.name}</h3>
            <p style={{ margin: "0 0 12px 0" }}>Admin: {group.admin}</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleJoinOrLeave(group.id, true)}
                style={{ flex: 1 }}
              >
                Join
              </button>
              <button
                onClick={() => handleJoinOrLeave(group.id, false)}
                style={{ flex: 1 }}
              >
                Leave
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;