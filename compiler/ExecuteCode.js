import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirOutput = path.join(__dirname, 'outputs');

if (!fs.existsSync(dirOutput)) {
    fs.mkdirSync(dirOutput, { recursive: true });
}

const ExecuteCode = async (filePath, inputFilePath, language) => {
    const jobid = path.basename(filePath).split('.')[0];
    
    let command = "";
    if (language === 'cpp') {
        command = `g++ "${filePath}" -o "${path.join(dirOutput, jobid)}" && "${path.join(dirOutput, jobid)}" < "${inputFilePath}"`;
    } else if (language === 'py') {
        command = `"D:\\AlgoClasses\\python.exe" "${filePath}" < "${inputFilePath}"`;
    } else if (language === 'java') {
        command = `java "${filePath}" < "${inputFilePath}"`;
    } else {
        throw new Error('Unsupported language');
    }

    try {
        const output = await new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error("Execution error:", error);
                    reject(`Error executing code: ${stderr}`);
                } else {
                    resolve(stdout.trim());
                }
            });
        });
        return output;
    } catch (err) {
        
         return err;
        
    }
};

export default ExecuteCode;
