import { useState, useMemo, useCallback, useRef } from "react";
import FunctionCard from "./components/FunctionCard";
import Input from "./components/Input";

import { functions as data } from "./data";

function App() {
  const [functions, setFunctions] = useState(() => data);
  const outputValueRef = useRef(0);

  const [initialValue, setInitialValue] = useState("2");

  const outputValue = useMemo(() => {
    try {
      const output = functions.reduce((acc, fn) => {
        const result = eval(fn.equation.replace(/x/g, String(acc)));
        return result;
      }, Number(initialValue));

      outputValueRef.current = output;
      return output;
    } catch (error) {
      console.log(error);
      return outputValueRef.current;
    }
  }, [functions, initialValue]);

  const editEquation = useCallback((functionId: string, equation: string) => {
    setFunctions((prevFunctions) => {
      const updatedFunctions = prevFunctions.map((fn) => {
        if (fn.id === functionId) {
          return {
            ...fn,
            equation,
          };
        }
        return fn;
      });
      return updatedFunctions;
    });
  }, []);

  return (
    <main className="h-screen w-screen justify-center items-center flex overflow-y-scroll flex-wrap gap-10 pt-10">
      <Input
        value={initialValue}
        onChange={(value) => setInitialValue(value)}
        variant="input"
      />
      <div className="flex flex-wrap justify-center items-center w-2/3 gap-8">
        {functions.map((fn) => (
          <FunctionCard key={fn.id} {...fn} editEquation={editEquation} />
        ))}
      </div>
      <Input value={String(outputValue)} variant="output" />
    </main>
  );
}

export default App;
