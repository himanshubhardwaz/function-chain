import { useState, useMemo, useCallback, useRef } from "react";
import FunctionCard, { FunctionCardRef } from "./components/FunctionCard";
import Input from "./components/Input";
import { evaluateEquation, getOrderedFunctionRefs } from "./util";
import useConnectRefs from "./hooks/useConnectRefs";

import { functions as data } from "./data";
import { SvgLines } from "./components/SvgLines";

function App() {
  const [initialValue, setInitialValue] = useState("2");
  const [functions, setFunctions] = useState(() => data);

  const inputDotRef = useRef<HTMLDivElement>(null);
  const outputDotRef = useRef<HTMLDivElement>(null);
  const functionCardDotRefs = useRef<Array<FunctionCardRef>>([]);

  const outputValueRef = useRef(0);

  const outputValue = useMemo(() => {
    try {
      const output = functions.reduce((acc, fn) => {
        // NOTE: eval is not safe
        // const result = eval(fn.equation.replace(/x/g, String(acc)));
        const result = evaluateEquation(fn.equation, acc);
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

  const addTofunctionCardDotRefs = useCallback(
    (ref: FunctionCardRef | null, index: number) => {
      if (ref) {
        functionCardDotRefs.current[index] = ref;
      }
    },
    []
  );

  const orderedConnectableRefs = useMemo(
    () => {
      if (functionCardDotRefs.current.length > 0) {
        return [
          inputDotRef,
          ...getOrderedFunctionRefs(functions, functionCardDotRefs.current),
          outputDotRef,
        ];
      }
      return [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [functions, functionCardDotRefs.current.length]
  );

  const paths = useConnectRefs(orderedConnectableRefs);

  return (
    <main className="h-screen w-screen justify-center items-center flex overflow-y-scroll flex-wrap gap-10 py-10 relative">
      <Input
        value={initialValue}
        onChange={(value) => setInitialValue(value)}
        variant="input"
        ref={inputDotRef}
      />
      <div className="flex flex-wrap justify-center items-center max-w-5xl gap-8">
        {functions.map((fn, index) => (
          <FunctionCard
            key={fn.id}
            {...fn}
            editEquation={editEquation}
            functions={functions}
            ref={(ref) => addTofunctionCardDotRefs(ref, index)}
          />
        ))}
      </div>
      <Input value={String(outputValue)} variant="output" ref={outputDotRef} />
      <SvgLines paths={paths} />
    </main>
  );
}

export default App;
