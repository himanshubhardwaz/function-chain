import HolderIcon from "../assets/holder-icon.svg";

export type FunctionCardProps = {
  name: string;
  inputValue: number;
  outputValue: number;
  equation: string;
  nextFunction: string | undefined;
};

const FunctionCard = ({
  name,
  // inputValue,
  // outputValue,
  equation,
  nextFunction,
}: FunctionCardProps) => {
  return (
    <div className="bg-white border border-gray-300 shadow-md rounded-[15px] w-72 p-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-gray-400">
          <img src={HolderIcon} alt="holder-icon" />
        </span>
        <h2 className="text-gray-800 font-semibold text-lg">{name}</h2>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Equation</label>
        <input
          type="text"
          placeholder="x-2"
          value={equation}
          defaultValue="x-2"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Next function
        </label>
        <select
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-200"
          disabled
        >
          <option value={nextFunction}>{nextFunction}</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-between items-center flex-col">
            <label className="block text-sm text-gray-600 mb-1">Input</label>
            <input type="radio" className="place-self-start" />
          </div>
          <div className="flex justify-between items-center flex-col">
            <label className="block text-sm text-gray-600 mb-1">Output</label>
            <input type="radio" className="place-self-end" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
