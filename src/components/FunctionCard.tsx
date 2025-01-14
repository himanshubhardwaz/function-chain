import { memo, forwardRef, useRef, useImperativeHandle } from "react";
import HolderIcon from "../assets/holder-icon.svg";
import { functions as data } from "../data";
import Dot from "./Dot";

export type FunctionCardProps = {
  id: string;
  name: string;
  equation: string;
  nextFunction?: string;
  editEquation: (functionId: string, equation: string) => void;
  functions: typeof data;
};

export type FunctionCardRef = {
  getLeftDotRef: () => React.RefObject<HTMLDivElement> | null;
  getRightDotRef: () => React.RefObject<HTMLDivElement> | null;
};

const FunctionCard = forwardRef<FunctionCardRef, FunctionCardProps>(
  (props, ref) => {
    const { name, nextFunction, equation, editEquation, id, functions } = props;

    const leftDotRef = useRef<HTMLDivElement>(null);
    const rightDotRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      getLeftDotRef: () => leftDotRef,
      getRightDotRef: () => rightDotRef,
    }));

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
            onChange={(e) => editEquation(id, e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Next function
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-200"
            value={nextFunction}
            disabled
          >
            <option value="-">None</option>
            {functions.map((fn) => (
              <option key={fn.id} value={fn.id}>
                {fn.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-between items-center flex-col">
              <label className="block text-sm text-gray-600 mb-1">Input</label>
              <Dot className="place-self-start" ref={leftDotRef} />
            </div>
            <div className="flex justify-between items-center flex-col">
              <label className="block text-sm text-gray-600 mb-1">Output</label>
              <Dot className="place-self-end" ref={rightDotRef} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(FunctionCard);
