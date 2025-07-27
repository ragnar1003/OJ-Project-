import { GoogleGenerativeAI } from "@google/generative-ai"; 
import { fetchProblemById } from "./problemController.js";
import dotenv from 'dotenv'; 

dotenv.config(); 


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (req, res) => {
   const { code, id } = req.body || req.query || {};
    const problem = await fetchProblemById(id);

    if (!code) {
        return res.status(400).json({ error: "Input code is required" });
    }

    try {
       
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

       
        const result = await model.generateContent(
            `Question is ${problem}, Here's this code: \n\n\`\`\`\n${code}\n\`\`\`\n\nCould you provide any improvements or suggestions? Please keep your response concise, in a few lines.`
        );

        
        const responseText = result.response.text();

        res.status(200).json({
            suggestion: responseText
        });

    } catch (error) {
        console.error("Error generating AI response:", error);
        
        res.status(500).json({ error: "Failed to get AI response. Please try again later." });
    }
};