export function evaluateEquation(equation: string, value: number) {
  const fn = new Function("x", `return ${equation};`);
  return fn(value);
}
