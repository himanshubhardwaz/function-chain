export const SvgLines = ({ paths }: { paths: string[] }) => {
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none", // So it doesn’t interfere with clicks or interactions
        overflow: "visible", // So that the svg is scrollable
      }}
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="#0066FF4F"
          strokeWidth="8"
          fill="none"
        />
      ))}
    </svg>
  );
};
