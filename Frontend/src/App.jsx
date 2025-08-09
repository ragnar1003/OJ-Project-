import { useState,useEffect,useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Compiler from "./Compiler";
import ProblemList from "./ProblemList";
import SimpleCompiler from "./SimpleCompiler";
import ProblemDetail from "./ProblemDetail";
import Home from "./Home";
import Profile from "./Profile";
import "./App.css";
import { logout,checkSession } from "./api";


function App() {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

   useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  const handleLogout = () => {
       logout();
    setUser(null);
     setIsDropdownOpen(false);

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
                <Link to= "/problem" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition">
                  Problems
                  </Link>
              )
            }
            {!user ? (
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
            ) : (
              // 3. The new dropdown menu logic
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition"
                >
                  {/* Display the user's email or name */}
                  {user.email}
                </button>
                {/* Conditionally render the dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-white hover:bg-indigo-500 rounded-t-lg"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                     Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
              path="/problem"
              element={user ? <ProblemList /> : <Navigate to="/login" />}
            />
            <Route
              path="/problem/:id"
              element={user ? <ProblemDetail /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
