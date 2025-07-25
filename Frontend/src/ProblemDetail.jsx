import { useState, useEffect } from "react";
import { problemById } from "./api";
import { useParams } from "react-router-dom";
import Compiler from "./Compiler";

export default function ProblemDetail() {
  const [problem, setProblem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProblem() {
      const data = await problemById(id);
      setProblem(data);
    }
    if (id) {
      fetchProblem();
    }
  }, [id]);

  if (!problem) {
    return <div className="p-6">Loading problem details...</div>;
  }

  return (
    <div className="p-6 flex space-x-6">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <p>{problem.description}</p>
      </div>
      <div className="w-1/2">
        <Compiler />
      </div>
    </div>
  );
}
