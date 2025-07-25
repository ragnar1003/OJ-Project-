import { useState } from "react";
import { run } from "./api";

export default function Compiler(object) {
  const { sampleinput, sampleoutput } = object;

  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState(sampleinput || "");
  const [lang, setLang] = useState("cpp");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input"); // 'input', 'sampleOutput', 'output'

  const runCode = async () => {
    setLoading(true);
    try {
      const result = await run(code, lang, input);
      setOutput(result.output || JSON.stringify(result));
      setActiveTab("output"); // Switch to output tab after running
    } catch (error) {
      setOutput("Error running code: " + error.message);
      setActiveTab("output"); // Switch to output tab even on error
    }
    setLoading(false);
  };

  const getTabClasses = (tabName) =>
    `px-4 py-2 rounded-t-lg font-semibold ${
      activeTab === tabName
        ? "bg-indigo-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image ... (unchanged) */}
      <div className="absolute inset-0">
        <img
          src="https://www.codingal.com/resources/wp-content/uploads/2022/10/1.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-white/20 backdrop-blur-sm"></div>
      </div>

      {/* Compiler Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2 text-center">Online Compiler</h2>
          <select
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
            onChange={(e) => {
              const val = e.target.value;
              setLang(val);
              if (val === "cpp") {
                setCode(`#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`);
              } else if (val === "py") {
                setCode("print('Hello, World!')");
              } else if (val === "java") {
                setCode(`public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`);
              }
            }}
            value={lang}
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <textarea
          rows={10}
          className="w-full font-mono text-sm p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* Buttons next to each other */}
        <div className="flex space-x-4 mb-4">
          <button
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-500 transition"
            onClick={runCode}
            disabled={loading}
          >
            {loading ? "Running..." : "Run"}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-4">
          <button
            className={getTabClasses("input")}
            onClick={() => setActiveTab("input")}
          >
            Input
          </button>
          {sampleoutput && ( // Only show Sample Output tab if prop exists
            <button
              className={getTabClasses("sampleOutput")}
              onClick={() => setActiveTab("sampleOutput")}
            >
              Sample Output
            </button>
          )}
          <button
            className={getTabClasses("output")}
            onClick={() => setActiveTab("output")}
          >
            Output
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 bg-gray-100 rounded-md">
          {activeTab === "input" && (
            <textarea
              rows={5}
              className="w-full font-mono text-sm p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Custom Input"
            />
          )}

          {activeTab === "sampleOutput" && sampleoutput && (
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {sampleoutput}
            </pre>
          )}

          {activeTab === "output" && (
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}