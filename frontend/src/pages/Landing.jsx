import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>Landing Page</h1>

      <Link to="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default Landing;