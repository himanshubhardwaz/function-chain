import { useEffect, useState } from "react";

export const SvgLines = ({ paths }: { paths: string[] }) => {
  const [svgDimensions, setSvgDimensions] = useState({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  });

  useEffect(() => {
    const updateSvgDimensions = () => {
      setSvgDimensions({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      });
    };

    const handleScroll = () => {
      console.log("scroll triggered");
      requestAnimationFrame(updateSvgDimensions);
    };

    const handleResize = () => {
      console.log("resize triggered");
      updateSvgDimensions();
    };

    window.addEventListener("resize", handleResize);

    // TODO: fix: could be an issue with react version, event not getting triggered
    window.addEventListener("scroll", handleScroll);

    updateSvgDimensions();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${svgDimensions.width}px`, // Full document width
        height: `${svgDimensions.height}px`, // Full document height
        pointerEvents: "none", // So it doesn’t interfere with clicks or interactions
        overflow: "visible", // So that the svg is scrollable
      }}
      // viewBox="0 0 100 100"
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="#0066FF4F"
          strokeWidth="4"
          fill="none"
        />
      ))}
    </svg>
  );
};
