import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Groups from "./pages/Groups";
import History from "./pages/History";
import Group from "./pages/Group";

function App() {
  const [user_id, setuser_id] = useState(null);
  const isLoggedIn = Boolean(user_id);

  return (
    <Router>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
          padding: isLoggedIn ? "20px" : "0px",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "white",
            width: isLoggedIn ? "100%" : "auto",
            maxWidth: isLoggedIn ? "1400px" : "400px",
            minHeight: isLoggedIn ? "90vh" : "auto",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >

          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <Login onLogin={setuser_id} />} />
            <Route path="/main" element={isLoggedIn ? <MainPage user_id={user_id} /> : <Navigate to="/" />} />
            <Route path="/groups/:user_id" element={isLoggedIn ? <Groups user_id={user_id} /> : <Navigate to="/" />} />
            <Route path="/history/:user_id" element={isLoggedIn ? <History /> : <Navigate to="/" />} />
            <Route path="/group/:group_id" element={isLoggedIn ? <Group /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


