import type { ReactElement } from "react";

const Header = ({
  left,
  center,
  right,
}: {
  left: ReactElement<any, any>;
  center: ReactElement<any, any>;
  right?: ReactElement<any, any>;
}) => {
  return (
    <div
      className="grid items-center py-3 px-4 font-montserrat border-b-[1px] border-b-gray-100 tracking-[0.6px]"
      style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
    >
      {left}
      {center}
      {right}
    </div>
  );
};

export default Header;
