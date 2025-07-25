const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function register(data) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return { message: errorData.message || "Login failed" };
  }
  return res.json();
}

export async function run(code, lang, input) {
  const res = await fetch(`${API_BASE}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, lang, input }),
  });
  return res.json();
}

export async function allProblem(){
  const res = await fetch(`${API_BASE}/problem`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function problemById(id) {
  const res = await fetch(`${API_BASE}/problem?id=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
