import { RefObject } from "react";
import { FunctionCardRef } from "../components/FunctionCard";
import { functions as data } from "../data";

export function evaluateEquation(equation: string, value: number) {
  const fn = new Function("x", `return ${equation};`);
  return fn(value);
}

export function getOrderedFunctionRefs(
  functions: typeof data,
  functionRefs: FunctionCardRef[]
) {
  if (functions.length === 0 || functionRefs.length === 0) return [];

  const orderedFunctionRefs: Array<RefObject<HTMLDivElement>> = [
    functionRefs[0].getLeftDotRef()!,
    functionRefs[0].getRightDotRef()!,
  ];

  for (let i = 0; i < functions.length; i++) {
    const fn = functions[i];
    const nextFunctionId = fn.nextFunction;

    if (nextFunctionId !== "-") {
      const nextFunctionIndex = functions.findIndex(
        (fn) => fn.id === nextFunctionId
      );
      const nextFunctionRef = functionRefs[nextFunctionIndex];
      orderedFunctionRefs.push(nextFunctionRef.getLeftDotRef()!);
      orderedFunctionRefs.push(nextFunctionRef.getRightDotRef()!);
    }
  }
  return orderedFunctionRefs;
}
