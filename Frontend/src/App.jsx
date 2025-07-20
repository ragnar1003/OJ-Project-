import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import "./App.css";
function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.firstName}!</h2>
        <p>Email: {user.email}</p>
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    );
  }
  if(showLogin) {
    
  }

  return (
    <div>
      <button className="toggle-btn" onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Go to Register" : "Go to Login"}
      </button>
      {showLogin ? (
        <Login onAuth={setUser} />
      ) : (
        <Register onAuth={setUser} />
      )}
    </div>
  );
}

export default App;