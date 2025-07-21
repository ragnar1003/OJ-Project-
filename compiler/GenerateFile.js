import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import {v4 as uuid} from "uuid";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCode = path.join(__dirname,'codes');

if(!fs.existsSync(dirCode)){
    fs.mkdirSync(dirCode,{recursive:true});
}


const generateFile = async (code, language) =>{
    const jobid = uuid();
    const fileName = `${jobid}.${language}`;
    const filePath = path.join(dirCode,fileName);
    await writeFile(filePath, code);
    return filePath;
}

export default generateFile;

