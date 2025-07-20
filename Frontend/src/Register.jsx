import { useState } from "react";
import { register } from "./api";

export default function Register({ onAuth }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await register(form);
    if (res.user) {
      setMsg("Registration successful!");
      onAuth(res.user);
    } else {
      setMsg(res.message || "Registration failed");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Register</button>
      <div>{msg}</div>
    </form>
  );
}