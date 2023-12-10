import { CSSProperties } from "react";

export type ButtonProps = {
  wrapperStyle: CSSProperties;
  onClick: () => any;
};

const OutlineButton: React.FC<{ btn: ButtonProps }> = ({ btn, children }) => {
  return (
    <button
      className="rounded border-[1px] border-gray-100 shadow-[0_2px_0_0_rgba(0,0,0,0.40)] flex items-center justify-center"
      style={btn.wrapperStyle}
      onClick={btn.onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
