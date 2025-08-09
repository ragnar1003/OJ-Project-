import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const API_COMPILER = process.env.API_COMPILER;

export async function run(req, res) {
    try {
        const data = req.body;
        const url = `${API_COMPILER}/run`;
        //console.log("Calling compiler service at:", url);
        const response = await fetch(url, {
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

