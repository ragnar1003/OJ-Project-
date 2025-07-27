import { useState, useEffect } from "react";
import { problemById, aisuggestion } from "./api"; // Make sure to import aisuggestion
import { useParams } from "react-router-dom";
import Compiler from "./Compiler";

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  
  // --- LIFTED STATE ---
  // State from the Compiler is now managed here
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n  // Your code here\n}`);
  const [verdict, setVerdict] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  // --- END LIFTED STATE ---

  useEffect(() => {
    async function fetchProblem() {
      const data = await problemById(id);
      setProblem(data);
      // We no longer set input/output here, the Compiler will use the default props
    }
    if (id) {
      fetchProblem();
    }
  }, [id]);

  // --- LIFTED LOGIC ---
  // This function now lives in the parent component
  const handleAiImprovement = async () => {
    setIsAiLoading(true);
    setAiSuggestion("");
    try {
      const aiResponse = await aisuggestion(code, id);
      if (aiResponse && aiResponse.suggestion) {
        setAiSuggestion(aiResponse.suggestion);
      } else {
        setAiSuggestion("No new suggestions available at this time.");
      }
    } catch (error) {
      setAiSuggestion("Error fetching AI suggestion: " + error.message);
    }
    setIsAiLoading(false);
  };
  // --- END LIFTED LOGIC ---

  if (!problem) {
    return <div className="p-6">Loading problem details...</div>;
  }

  return (
    <div className="p-6 flex space-x-6 bg-[#1e293b] text-white min-h-screen">
      {/* Left side for problem description and AI button */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <p className="mb-8">{problem.description}</p>
        
        {/* FIX: Conditionally render AI button and suggestion box here */}
        {verdict === "Accepted" && (
          <div className="mt-6 p-4 bg-slate-700 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Code Improvement</h3>
            {!aiSuggestion && (
               <button
                  onClick={handleAiImprovement}
                  disabled={isAiLoading}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
                >
                  {isAiLoading ? "Analyzing..." : "✨ Get AI Suggestion"}
                </button>
            )}

            {aiSuggestion && (
                <p className="text-sm whitespace-pre-wrap">{aiSuggestion}</p>
            )}
          </div>
        )}
      </div>

      {/* Right side for Compiler */}
      <div className="w-1/2">
        {/* Pass the state and handlers down to the Compiler */}
        <Compiler
          sampleinput={problem.sampleTestCases[0]?.input}
          sampleoutput={problem.sampleTestCases[0]?.output}
          id={id}
          code={code}
          setCode={setCode}
          verdict={verdict}
          setVerdict={setVerdict}
        />
      </div>
    </div>
  );
}