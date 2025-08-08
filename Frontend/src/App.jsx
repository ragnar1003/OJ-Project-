import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Compiler from "./Compiler";
import ProblemList from "./ProblemList";
import SimpleCompiler from "./SimpleCompiler";
import ProblemDetail from "./ProblemDetail";
import Home from "./Home";
import "./App.css";
import { logout,checkSession } from "./api";


function App() {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const verifySession = async()=>{
          try{const userData = await checkSession();
          setUser(userData);}catch(err){
            setUser(null);
          }
          setLoading(false);
    };
    verifySession();
  },[]);
  const handleLogout = () => {
       logout();
    setUser(null);

  };
    if(loading){
       return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
    }
    
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 shadow-md flex justify-between items-center">
           <Link to="/" className="text-xl font-bold text-white">Algobaazi</Link>
          <div className="space-x-4">
            <Link
              to="/compiler"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
            >
              Compiler
            </Link>
            {
              user && (
                <Link to= "/problems" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition">
                  Problems
                  </Link>
              )
            }
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
              element={<Home/>}
            />
            <Route
              path="/compiler"
              element={<SimpleCompiler />}
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
