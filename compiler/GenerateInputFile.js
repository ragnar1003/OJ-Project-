import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import {v4 as uuid} from "uuid";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirInput = path.dirname(__filename);

const dirInput = path.join(__dirInput,'inputs');

if(!fs.existsSync(dirInput)){
    fs.mkdirSync(dirInput,{recursive:true});
}


const GenerateInputFile = async (input) =>{
    const jobid = uuid();
    const input_fileName = `${jobid}.txt`;
    const input_filepath = path.join(dirInput,input_fileName);
    await writeFile(input_filepath, input);
    //console.log(`Input file generated at: ${input_filepath}`);
    return input_filepath;
}

export default GenerateInputFile;

