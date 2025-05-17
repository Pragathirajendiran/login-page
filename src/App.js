// App.js
import React, { useState } from "react";
import Login from "./Login";
<<<<<<< HEAD
import Dashboard from "./Dashboard";
=======
import DashboardUser from "./DashboardUser";
>>>>>>> e5bc838 (Your commit message here)
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
<<<<<<< HEAD
        <Dashboard />
=======
        <DashboardUser />
>>>>>>> e5bc838 (Your commit message here)
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
