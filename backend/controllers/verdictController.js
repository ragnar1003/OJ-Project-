import { fetchProblemById } from "./problemController.js";
import { run } from "./codeController.js";


export const getVerdict = async (req, res) => {
    try {
        const { code, lang, id } = req.body;

        if (!code || !lang || !id) {
            return res.status(400).json({ error: "Code, language, and Problem ID are required" });
        }

        const problem = await fetchProblemById(id);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        const { sampleTestCases, judgeTestCases } = problem;
        let verdict = "Accepted";

        
        const isErrorOutput = (output) => {
            if (!output) return false;
            const errorKeywords = ['error', 'exception', 'failed', 'time limit exceeded', 'segmentation fault', 'invalid'];
            const lowercasedOutput = output.toLowerCase();
           
            return errorKeywords.some(keyword => lowercasedOutput.includes(keyword));
        };

        async function runCode(code, lang, input) {
            return new Promise((resolve, reject) => {
                const reqMock = { body: { code, lang, input } };
                const resMock = {
                    status: (statusCode) => ({
                        json: (data) => {
                            
                            if (statusCode >= 200 && statusCode < 300) {
                                resolve(data.output || "");
                            } else {
                                
                                reject(new Error(data.error || "Error running code"));
                            }
                        }
                    })
                };
                run(reqMock, resMock).catch(err => reject(err));
            });
        }
        
      
        const allTestCases = [...sampleTestCases, ...judgeTestCases];

        for (const testCase of allTestCases) {
            try {
                const userOutput = (await runCode(code, lang, testCase.input)).trim();

               
                if (isErrorOutput(userOutput)) {
                    verdict = "Compilation or Runtime Error";
                   
                    break;
                }

               
                if (userOutput !== testCase.output.trim()) {
                    verdict = "Wrong Answer";
                    break;
                }
            } catch (err) {
                
                verdict = "Internal Server Error";
                break;
            }
        }
        
        res.status(200).json({ verdict });

    } catch (error) {
        console.error("Error in getVerdict:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};