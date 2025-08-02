// src/StandaloneCompilerPage.jsx

import { useState } from "react";
import Compiler from "./Compiler";

export default function StandaloneCompilerPage() {
  // This component will manage the state for the standalone compiler
  const [code, setCode] = useState("");
  const [verdict, setVerdict] = useState("");

  return (
    <div className="flex justify-center">
        <div className="w-full lg:w-3/4 xl:w-2/3">
             <Compiler
                // Now we pass all the required props
                code={code}
                setCode={setCode}
                verdict={verdict}
                setVerdict={setVerdict}
                // These props from ProblemDetail aren't needed here, so we can pass defaults
                sampleinput=""
                sampleoutput=""
                id={null}
                showSubmitButton = {false}
            />
        </div>
    </div>
  );
}