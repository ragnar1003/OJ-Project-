import express from "express";
import GenerateFile from "./GenerateFile.js";
import GenerateInputFile from "./GenerateInputFile.js";
import ExecuteCode from "./ExecuteCode.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.get("/",(req,res) =>{
    res.status(200).send("Hello");
});

app.post("/run",async (req,res)=>{
    const {code,lang = 'cpp', input = ''} = req.body;
    if(!code || !lang){
        return res.status(400).json({error: "Code and language are required"});
    }
    try{
        const filePath = await GenerateFile(code,lang);
        const inputfilePath = await GenerateInputFile(input);
        const output = await ExecuteCode(filePath, inputfilePath, lang);
        //res.status(200).json({message: "File generated successfully", filePath});
        if(output instanceof Error) {
            throw output;
        }
        res.json({output});

    }catch(err){
        console.error("Error generating file:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});