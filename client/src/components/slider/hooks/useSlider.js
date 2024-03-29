import { useRef, useState, useEffect } from "react";

const useSlider = () => {
  const [position, setPosition] = useState(40);
  const ref = useRef(null);
  const width = window.innerWidth;

  const handleSlider = (e) => {
    if (ref?.current && ref?.current.contains(e.target)) {
      let percentage = (e.clientX / width) * 100;
      if (percentage <= 40) {
        setPosition(40);
      } else {
        setPosition(percentage);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("drag", handleSlider);
    window.addEventListener("dragend", handleSlider);
    return () => {
      window.removeEventListener("drag", handleSlider);
      window.addEventListener("dragend", handleSlider);
    };
  }, [width]);

  return { ref, position };
};

export default useSlider;
