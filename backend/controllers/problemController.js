import Problem from '../model/Problem.js';

export const fetchProblemById = async (id) => {
    if (!id) return null;
    const problem = await Problem.findById(id);
    return problem;
};

export const getProblem = async (req, res) => {
    try {
        const { id } = req.body || req.query || {};
        if (id) {
            //console.log("Fetching problem with ID:", id);
            const problem = await fetchProblemById(id);
            if (!problem) {
                return res.status(404).json({ error: "Problem not found" });
            }
            return res.status(200).json(problem);
        } else {
            const problems = await Problem.find();
            if (problems.length === 0) {
                return res.status(404).json({ message: "No problems found" });
            }
            return res.status(200).json(problems);
        }
    } catch (error) {
        console.error("Error fetching problem(s):", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
