import { useEffect, useState } from "react";

export function useScaler(): (value: number) => number {
  const [scaleFactor, setScaleFactor] = useState(
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--scale-factor"
      )
    )
  );

  useEffect(() => {
    const updateScaleFactor = () => {
      const newScaleFactor = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--scale-factor"
        )
      );
      setScaleFactor(newScaleFactor);
    };

    updateScaleFactor();
    window.addEventListener("resize", updateScaleFactor);

    return () => {
      window.removeEventListener("resize", updateScaleFactor);
    };
  }, []);

  return (value: number) => value * scaleFactor;
}
