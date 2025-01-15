import React, { useEffect, useState } from "react";

const useConnectRefs = (refs: Array<React.RefObject<HTMLDivElement>>) => {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const calculatePaths = () => {
      const newPaths: string[] = [];

      for (let i = 0; i < refs.length; i += 2) {
        const ref1 = refs[i];
        const ref2 = refs[i + 1];

        if (ref1?.current && ref2?.current) {
          const rect1 = ref1.current.getBoundingClientRect();
          const rect2 = ref2.current.getBoundingClientRect();

          const center1 = {
            x: rect1.left + rect1.width / 2 + window.scrollX,
            y: rect1.top + rect1.height / 2 + window.scrollY,
          };
          const center2 = {
            x: rect2.left + rect2.width / 2 + window.scrollX,
            y: rect2.top + rect2.height / 2 + window.scrollY,
          };

          const controlPoint1 = {
            x: center1.x,
            y: (center1.y + center2.y) / 2,
          };
          const controlPoint2 = {
            x: center2.x,
            y: (center1.y + center2.y) / 2,
          };

          const pathData = `
            M ${center1.x},${center1.y}
            C ${controlPoint1.x},${controlPoint1.y}
              ${controlPoint2.x},${controlPoint2.y}
              ${center2.x},${center2.y}
          `;
          newPaths.push(pathData);
        }
      }

      setPaths(newPaths);
    };

    calculatePaths();

    // Recalculate paths on resize and scroll
    window.addEventListener("resize", calculatePaths);
    window.addEventListener("scroll", calculatePaths);

    return () => {
      window.removeEventListener("resize", calculatePaths);
      window.removeEventListener("scroll", calculatePaths);
    };
  }, [refs]);

  return paths;
};

export default useConnectRefs;
