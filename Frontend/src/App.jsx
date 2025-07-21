import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Compiler from "./Compiler";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("compiler"); // "compiler", "login", "register"

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.firstName}!</h2>
        <p>Email: {user.email}</p>
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <nav style={{ textAlign: "center", margin: "1em" }}>
        <button className="toggle-btn" onClick={() => setPage("compiler")}>Compiler</button>
        <button className="toggle-btn" onClick={() => setPage("login")}>Login</button>
        <button className="toggle-btn" onClick={() => setPage("register")}>Register</button>
      </nav>
      {page === "compiler" && <Compiler />}
      {page === "login" && <Login onAuth={setUser} />}
      {page === "register" && <Register onAuth={setUser} />}
    </div>
  );
}

export default App;