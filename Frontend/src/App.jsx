import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Compiler from "./Compiler";
import ProblemList from "./ProblemList";
import ProblemDetail from "./ProblemDetail";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">CodeAlgo</h1>
          <div className="space-x-4">
            <Link
              to="/compiler"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
            >
              Compiler
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Page content */}
        <div className="p-6">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/problems" /> : <Navigate to="/login" />}
            />
            <Route
              path="/compiler"
              element={<Compiler />}
            />
            <Route
              path="/login"
              element={!user ? <Login onAuth={setUser} /> : <Navigate to="/problems" />}
            />
            <Route
              path="/register"
              element={!user ? <Register onAuth={setUser} /> : <Navigate to="/problems" />}
            />
            <Route
              path="/problems"
              element={user ? <ProblemList /> : <Navigate to="/login" />}
            />
            <Route
              path="/problems/:id"
              element={user ? <ProblemDetail /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
