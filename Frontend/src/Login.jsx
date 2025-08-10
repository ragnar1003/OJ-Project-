import { useState } from "react";
import { login } from "./api";
import { useNavigate } from "react-router-dom";

export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    setMsg("");
    setLoading(true);
    e.preventDefault();
    const res = await login(form);
    if (res.user) {
      setMsg("Login successful!");
      onAuth(res.user);
      navigate("/problem");
    } else {
      setMsg(res.message || "Login failed");
    }
    setLoading(false);        
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-500 transition"
          
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {msg && msg !== "Login successful!" && (
          <p className="text-red-500 text-center">{msg}</p>
        )}
      </form>
    </div>
  );
}
