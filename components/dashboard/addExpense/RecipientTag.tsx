import { preventLosingInputFocus } from "@/lib/utils";
import Image from "next/image";

type Props = {
  ind: number;
  label: string;
  rmRecipient: (ind: number) => void;
};

const RecipientTag = ({ ind, label, rmRecipient }: Props) => {
  return (
    <div
      onBlur={preventLosingInputFocus}
      tabIndex={0}
      className="flex items-center whitespace-nowrap gap-2 pr-3 rounded-2xl border-[1px] border-gray-100 focus:bg-gray-100 focus:border-gray-100 focus:outline-none"
      onKeyDown={(e) => {
        if (e.key === "Backspace") rmRecipient(ind);
      }}
    >
      <Image src="/icons/user.svg" width={29} height={29} alt="recipient tag" />
      <label className="font-lato text-[15px] tracking-[0.3px]">{label}</label>
    </div>
  );
};

export default RecipientTag;
