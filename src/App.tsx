import FunctionCard from "./components/FunctionCard";
import { functions as data } from "./data";
import { useState } from "react";

function App() {
  // have added state in case we need to add features later, otherwise we can use the data directly
  const [functions] = useState(() => data);

  return (
    <main className="h-screen w-screen justify-center items-center flex overflow-y-scroll">
      <div className="flex flex-wrap justify-center items-center w-2/3 gap-10">
        {functions.map((fn) => (
          <FunctionCard key={fn.id} {...fn} />
        ))}
      </div>
    </main>
  );
}

export default App;
