import { NavLink } from "react-router-dom";

function Sidebar() {
  const navStyle = ({ isActive }) => ({
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    backgroundColor: isActive ? "#e5e7eb" : "transparent",
    color: "#111",
    fontWeight: isActive ? "600" : "400",
  });

  return (
    <aside
      style={{
        width: "220px",
        height: "100vh",
        borderRight: "1px solid #ddd",
        padding: "1rem",
      }}
    >
      <h2>AI Resume</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "2rem",
        }}
      >
        <NavLink to="/dashboard" style={navStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/builder" style={navStyle}>
          Builder
        </NavLink>

        <NavLink to="/analyzer" style={navStyle}>
          Analyzer
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;