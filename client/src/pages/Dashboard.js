import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  return (
    <div className="dashboard">
      <h1>Website Builder Dashboard</h1>
        
      <button onClick={() => navigate("/templates")}>
        Create New Website
      </button>

      <br />

      <br />

      <button onClick={logout}>Logout</button>
      
    </div>

  );
}

export default Dashboard;