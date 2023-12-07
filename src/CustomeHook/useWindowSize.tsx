import React, { useState, useEffect } from "react";

// Define a type for window size
interface WindowSize {
  width: number;
  height: number;
}

// Custom hook to track window size
export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that effect runs only on mount and unmount

  return windowSize;
}
