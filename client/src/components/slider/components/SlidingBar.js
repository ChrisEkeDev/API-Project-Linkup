import { forwardRef } from "react";
import { useApp } from "../../../context/AppContext";
import { BsGripVertical } from "react-icons/bs";

const SlidingBar = forwardRef((props, ref) => {
  const { theme } = useApp();
  const { layout } = props;

  return (
    <div
      draggable={true}
      ref={ref}
      className={`sliding_bar--${layout}`}
    >
      {/* <BsGripVertical className="sliding_grip" /> */}
      <div className={`sliding_line sliding_line-${theme}`} ></div>
    </div>
  );
});

export default SlidingBar;
