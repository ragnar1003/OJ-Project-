import { useState } from "react";

export default function Compiler() {
  const [code, setCode] = useState("// Write your code here\n");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // For demo: Only supports JS code using eval (for real use, connect to backend)
  const runCode = () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(String(result));
    } catch (err) {
      setOutput(String(err));
    }
    setLoading(false);
  };

  return (
    <div className="form-container" style={{ maxWidth: 600 }}>
      <h2>Online Compiler</h2>
      <textarea
        rows={10}
        style={{ fontFamily: "monospace", fontSize: "1rem", width: "100%" }}
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button onClick={runCode} disabled={loading}>
        {loading ? "Running..." : "Run"}
      </button>
      <div>
        <strong>Output:</strong>
        <pre style={{ background: "#f4f4f4", padding: "1em", borderRadius: "0.5em" }}>{output}</pre>
      </div>
    </div>
  );
}