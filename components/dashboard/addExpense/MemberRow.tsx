import Image from "next/image";
import type { ReactElement } from "react";

const MemberRow = ({
  img,
  text,
  right,
  onClick,
}: {
  img: {
    icon: string;
    alt: string;
  };
  text: {
    content: string;
    bold: boolean;
  };
  right?: ReactElement<any, any>;
  onClick: () => void;
}) => {
  return (
    <div
      className="grid items-center gap-4 px-4 h-[60px] border-b-[1px] border-b-gray-100"
      style={{ gridTemplateColumns: "auto 1fr auto" }}
      onClick={onClick}
    >
      <Image
        src={img.icon}
        height={0}
        width={0}
        alt={img.alt}
        style={{ width: "44px", height: "auto" }}
      />
      <label
        className="font-lato text-[15px] tracking-[0.3px]"
        style={text.bold ? { fontWeight: 600 } : {}}
      >
        {text.content}
      </label>
      {right}
    </div>
  );
};

export default MemberRow;
