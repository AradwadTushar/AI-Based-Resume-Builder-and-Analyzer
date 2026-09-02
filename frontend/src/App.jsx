import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

import { setupInterceptors } from "./api/setupInterceptors";
import BackendStatusBanner from "./components/common/BackendStatusBanner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    setupInterceptors(getToken);
  }, [getToken]);

  return (
    <>
      <AppRoutes />
      <BackendStatusBanner />
    </>
  );
}

export default App;