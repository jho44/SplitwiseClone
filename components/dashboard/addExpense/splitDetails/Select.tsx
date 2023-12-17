import Image from "next/image";

const Select = ({ alt, chosen }: { alt: string; chosen: boolean }) => {
  return (
    <button
      className="w-[22px] h-[22px] rounded-full flex items-center justify-center"
      style={
        chosen
          ? {
              background: "var(--teal)",
            }
          : {
              border: "1px solid var(--gray-100)",
            }
      }
    >
      {chosen && (
        <Image
          src="/icons/check-white.svg"
          width={0}
          height={0}
          alt={alt}
          style={{ width: "11px", height: "auto" }}
        />
      )}
    </button>
  );
};

export default Select;
