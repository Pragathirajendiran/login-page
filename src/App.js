import React, { useState } from "react";
import Login from "./Login";
import DashboardUser from "./DashboardUser"; // ✅ Keep this
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <DashboardUser /> // ✅ Keep this
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
