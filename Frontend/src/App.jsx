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
  <div className="min-h-screen bg-gray-900 text-white">
    {/* Navbar */}
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">CodeAlgo</h1>
      <div className="space-x-4">
        <button
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
          onClick={() => setPage("compiler")}
        >
          Compiler
        </button>
        <button
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
          onClick={() => setPage("login")}
        >
          Login
        </button>
        <button
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
          onClick={() => setPage("register")}
        >
          Register
        </button>
      </div>
    </nav>

    {/* Page content */}
    <div>
      {page === "compiler" && <Compiler />}
      {page === "login" && <Login onAuth={setUser} />}
      {page === "register" && <Register onAuth={setUser} />}
    </div>
  </div>
);

}

export default App;