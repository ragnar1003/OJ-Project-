import { useState, useEffect } from "react";
import { allProblem } from "./api";
import { useNavigate } from "react-router-dom";

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProblems() {
      const data = await allProblem();
      setProblems(data);
    }
    fetchProblems();
  }, []);

  const handleProblemClick = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Problems</h1>
      <ul className="space-y-4">
        {problems.map((prob) => (
          <li
            key={prob._id}
            className="p-4 bg-black rounded-lg shadow cursor-pointer hover:bg-gray-800 transition"
            onClick={() => handleProblemClick(prob._id)}
          >
            <h2 className="text-xl font-semibold">{prob.title}</h2>
            <p>{prob.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
