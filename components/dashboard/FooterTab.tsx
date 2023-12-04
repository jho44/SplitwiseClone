import Image from "next/image";
import { CSSProperties } from "react";

export type ImgProps = {
  src: string;
  style: CSSProperties;
  alt: string;
};

const FooterTab: React.FC<{
  active: boolean;
  img: ImgProps;
  label: string;
  onClick: () => void;
}> = ({ active, img, label, onClick }) => {
  return (
    <div className="w-1/5 relative pt-1.5" onClick={onClick}>
      {active && (
        <div className="absolute -top-[1.5px] w-12 h-[3px] bg-green left-1/2 -translate-x-1/2" />
      )}
      <div className="h-[51px] flex flex-col items-center justify-center gap-1.5">
        <Image
          src={img.src}
          width={0}
          height={0}
          alt={img.alt}
          style={img.style}
        />
        <label
          className={`text-xs font-lato ${
            active ? "text-green" : "text-gray-400"
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default FooterTab;
