import fetch from "node-fetch";

const API_COMPILER = "http://localhost:5000";

export async function run(req, res) {
    try {
        const data = req.body;
        const response = await fetch(`${API_COMPILER}/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error in run controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

