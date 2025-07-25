import Problem from "../model/Problem.js";
import { run } from "./codeController.js";

export const getVerdict = async (req, res) => {
    try {
        const { code, lang, id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Problem not found" });
        }
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        const { sampleTestCases, judgeTestCases } = problem;
        let verdict = "Accepted";

        async function runCode(code, lang, input) {
            // Mock req and res objects for calling run controller function
            return new Promise((resolve, reject) => {
                const reqMock = {
                    body: { code, lang, input }
                };
                const resMock = {
                    status: (statusCode) => {
                        return {
                            json: (data) => {
                                if (statusCode >= 200 && statusCode < 300) {
                                    resolve(data.output || "");
                                } else {
                                    reject(new Error(data.error || "Error running code"));
                                }
                            }
                        };
                    }
                };
                run(reqMock, resMock).catch(err => reject(err));
            });
        }

        for (let i = 0; i < sampleTestCases.length; i++) {
            const sampleInput = sampleTestCases[i].input;
            const sampleOutput = sampleTestCases[i].output.trim();
            const userOutput = (await runCode(code, lang, sampleInput)).trim();
            if (userOutput !== sampleOutput) {
                verdict = "Wrong Answer";
                break;
            }
        }

        if (verdict === "Accepted") {
            for (let i = 0; i < judgeTestCases.length; i++) {
                const judgeInput = judgeTestCases[i].input;
                const judgeOutput = judgeTestCases[i].output.trim();
                const userOutput = (await runCode(code, lang, judgeInput)).trim();
                if (userOutput !== judgeOutput) {
                    verdict = "Wrong Answer";
                    break;
                }
            }
        }
        res.status(200).json({ verdict });
    } catch (error) {
        console.error("Error in getVerdict:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
