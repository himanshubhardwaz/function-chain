import { memo, forwardRef } from "react";
import Dot from "./Dot";

type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  variant?: "input" | "output";
};

const InputWithRadio = forwardRef<HTMLDivElement, InputProps>(
  ({ value, onChange, variant }, ref) => {
    return (
      <div
        className={`flex items-center w-40 h-12 px-4 rounded-full border-2 ${
          variant === "output"
            ? "flex-row-reverse border-green-400"
            : "border-orange-400"
        }`}
      >
        <input
          type="number"
          readOnly={variant === "output"}
          className="text-xl font-semibold w-24 text-center bg-transparent border-none focus:outline-none overflow-auto"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={variant === "output"}
        />
        <div
          className={`h-full mx-2 border-r-2 ${
            variant === "output"
              ? "flex-row-reverse border-green-400"
              : "border-orange-400"
          }`}
        ></div>
        <div className="flex items-center justify-center">
          <Dot ref={ref} />
        </div>
      </div>
    );
  }
);

export default memo(InputWithRadio);
