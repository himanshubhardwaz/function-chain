import { forwardRef } from "react";

type DotProps = {
  className?: string;
};

const Dot = forwardRef<HTMLDivElement, DotProps>((props, ref) => {
  const { className } = props;
  return (
    <div
      className={`w-3.5 h-3.5 bg-blue-500 rounded-full ${className}`}
      ref={ref}
    />
  );
});

export default Dot;
