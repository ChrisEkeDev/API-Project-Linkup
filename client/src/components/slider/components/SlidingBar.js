import { forwardRef } from "react";
import { BsGripVertical } from "react-icons/bs";

const SlidingBar = forwardRef((props, ref) => {
  const { layout } = props;
  return (
    <div
      draggable={true}
      ref={ref}
      className={`sliding_bar--${layout}`}
    >
      {/* <BsGripVertical className="sliding_grip" /> */}
      <div className="sliding_line" ></div>
    </div>
  );
});

export default SlidingBar;
