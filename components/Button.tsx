import React from "react";

export type ButtonProps = {
  colorType: "teal" | "black-100";
  onClick: () => any;
};

const Button: React.FC<{ btn: ButtonProps }> = ({ btn, children }) => {
  return (
    <button
      style={{
        background: `var(--${btn.colorType})`,
        color: "white",
        padding: "12px 24px",
        borderRadius: "0.25rem",
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        fontWeight: 600,
      }}
      onClick={btn.onClick}
    >
      {children}
    </button>
  );
};

export default Button;
