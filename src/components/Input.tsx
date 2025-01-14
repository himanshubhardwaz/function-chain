import { memo } from "react";

type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  variant?: "input" | "output";
};

const InputWithRadio = ({ value, onChange, variant }: InputProps) => {
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
        <input
          type="radio"
          className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-blue-500 "
        />
      </div>
    </div>
  );
};

export default memo(InputWithRadio);
