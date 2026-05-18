import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

function Dashboard() {
  const { getToken } = useAuth();

  const callProtectedRoute = async () => {
    const token = await getToken();

    const response = await fetch(
      "http://localhost:8000/auth/protected",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <UserButton />

      <button onClick={callProtectedRoute}>
        Call Protected Route
      </button>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}

export default App;