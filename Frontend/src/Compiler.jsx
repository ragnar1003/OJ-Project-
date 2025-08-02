import { useState,useEffect} from "react";
import { run, verdict as getVerdict } from "./api";
import Editor from "@monaco-editor/react";
import dark from "./assets/dark.svg";
import light from "./assets/light.svg";
export default function Compiler({
  sampleinput,
  sampleoutput,
  id,
  code,      
  setCode,     
  verdict,     
  setVerdict,
  showSubmitButton = true  
}) {
  // Internal state for UI that doesn't affect the parent
  const [output, setOutput] = useState("");
  const [input, setInput] = useState(sampleinput || "");
  const [lang, setLang] = useState("cpp");
  const [loading, setLoading] = useState(false);
  const [submitloading, setSubmitLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [theme, setTheme] = useState("vs-dark");

   useEffect(() => {

    if (lang === "cpp") {
      setCode(
        `#include <iostream>\nusing namespace std;\nint main() {\n  // Your code here\n}`
      );
    } else if (lang === "py") {
      setCode("# Your code here\nprint('Hello, World!')");
    } else if (lang === "java") {
      setCode(
        `public class Main {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}`
      );
    }
  }, [lang, setCode]);

  const runCode = async () => {
    setLoading(true);
    try {
      const result = await run(code, lang, input);
      setOutput(result.output || JSON.stringify(result));
      setActiveTab("output");
    } catch (error) {
      setOutput("Error running code: " + error.message);
      setActiveTab("output");
    }
    setLoading(false);
  };

  const submitCode = async () => {
    setSubmitLoading(true);
    setVerdict(""); // Use the function from props to update the parent
    try {
      const result = await getVerdict(code, lang,id);
      if (result && result.verdict) {
        setVerdict(result.verdict); // This now updates ProblemDetail's state
      } else {
        setVerdict(result.output || JSON.stringify(result));
      }
      setActiveTab("verdict");
    } catch (error)
    {
      setVerdict("Error submitting code: " + error.message);
      setActiveTab("verdict");
    }
    setSubmitLoading(false);
  };

  const getTabClasses = (tabName) =>
    `px-4 py-2 rounded-t-lg font-semibold ${
      activeTab === tabName
        ? "bg-indigo-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  const getVerdictClasses = () => {
    if (verdict.includes("Accepted")) {
      return "text-green-600 font-bold";
    }
    if (verdict.includes("Wrong Answer")) {
      return "text-red-600 font-bold";
    }
    return "text-gray-800";
  };

  return (

    <div className="relative z-10 w-full bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
     <div className="mb-6 flex flex-col items-center">
  <h2 className="text-2xl font-bold text-indigo-600 mb-2 text-center">
    Online Compiler
  </h2>

 
  <div className="flex items-center space-x-4 mt-2">
    
  
    <div className="flex space-x-2"> 
      <button
        onClick={() => setTheme("vs-light")}
        className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-100 transition-colors"
      >
        <img src={light} alt="Light Theme" className="max-h-5 max-w-5"/>
      </button>
      <button
        onClick={() => setTheme("vs-dark")}
        className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-100 transition-colors"
      >
        <img src={dark} alt="Dark Theme" className="max-h-5 max-w-5"/>
      </button>
    </div>

   
    <select
      className="w-28 p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      onChange={(e) => {
        const val = e.target.value;
        setLang(val);
      }}
      value={lang}
    >
      <option value="cpp">C++</option>
      <option value="py">Python</option>
      <option value="java">Java</option>
    </select>
  </div>
</div>
    
      <div className="w-full rounded-lg border border-gray-300 mb-4 overflow-hidden">
  <Editor
    height="20rem" 
    defaultLanguage={lang} 
    theme={theme}
    value={code} 
    onChange={setCode} 
    options={{
      minimap: { enabled: false }, 
      fontSize: 14, 
      wordWrap: "on", 
      scrollBeyondLastLine: true,
    }}
  />
</div>

      <div className="flex space-x-4 mb-4">
        <button
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-500 transition"
          onClick={runCode}
          disabled={loading}
        >
          {loading ? "Running..." : "Run"}
        </button>
        {showSubmitButton && (<button
          className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-teal-600 hover:to-green-500 transition"
          onClick={submitCode}
          disabled={submitloading}
        >
          {submitloading ? "Submitting..." : "Submit"}
        </button>)}
      </div>

      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={getTabClasses("input")}
          onClick={() => setActiveTab("input")}
        >
          Input
        </button>
        {sampleoutput && (
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
        {verdict && (
          <button
            className={getTabClasses("verdict")}
            onClick={() => setActiveTab("verdict")}
          >
            Verdict
          </button>
        )}
      </div>

      <div className="p-4 bg-gray-100 rounded-md min-h-[150px]">
        {activeTab === "input" && (
          <textarea
            rows={5}
            className="w-full font-mono text-sm p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Custom Input"
          />
        )}
        {activeTab === "sampleOutput" && (
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {sampleoutput}
          </pre>
        )}
        {activeTab === "output" && (
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {output}
          </pre>
        )}
        {activeTab === "verdict" && (
          <pre
            className={`text-lg whitespace-pre-wrap ${getVerdictClasses()}`}
          >
            {verdict}
          </pre>
        )}
      </div>
    </div>
  );
}