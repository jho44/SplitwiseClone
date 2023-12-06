import Image from "next/image";
import {
  type MutableRefObject,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import RecipientsInput from "@/components/dashboard/addExpense/RecipientsInput";
import type { Recipients } from "@/components/dashboard/types";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Header = ({
  recipientsInputEl,
  recipientsInputVal,
  setRecipientsInputVal,
}: {
  recipientsInputEl: MutableRefObject<HTMLInputElement>;
  recipientsInputVal: string;
  setRecipientsInputVal: Dispatch<SetStateAction<string>>;
}) => {
  const [recipients, setRecipients] = useState<Recipients[]>([]);

  const addRecipient = () => {
    const trimmedInputVal = recipientsInputVal.trim();
    if (!trimmedInputVal) return;

    if (!EMAIL_PATTERN.test(trimmedInputVal)) {
      // TODO: compare to friends list for name
    }
    if (recipients.some(({ label }) => label === trimmedInputVal)) return;

    recipientsInputEl.current.value = "";
    setRecipientsInputVal("");
    setRecipients((prev) => [...prev, { label: trimmedInputVal }]);
  };

  return (
    <div className="w-full">
      <div className="p-3 pt-4 border-b-[1px] border-b-gray-100 flex flex-col gap-[26px]">
        <div className="flex items-center justify-between font-montserrat">
          <Image
            src="/icons/close.svg"
            width={0}
            height={0}
            alt="Cancel expense creation"
            style={{ width: "18px", height: "auto", marginLeft: "9px" }}
          />
          <label className="text-gray-500 text-base font-medium">
            Add Expense
          </label>
          <label className="text-gray-500 text-sm font-semibold opacity-50">
            Save
          </label>
        </div>
        <RecipientsInput
          recipients={recipients}
          setRecipients={setRecipients}
          inputEl={recipientsInputEl}
          inputVal={recipientsInputVal}
          setInputVal={setRecipientsInputVal}
          addRecipient={addRecipient}
        />
      </div>
      {recipientsInputVal && (
        <div className="flex py-5 px-[22px] gap-6" onClick={addRecipient}>
          <Image
            src="/icons/add-user.svg"
            width={0}
            height={0}
            style={{ width: "30px", height: "auto" }}
            alt="add user"
          />
          <label className="font-lato text-[15px] tracking-[0.375px]">
            Add "{recipientsInputVal}" to SplitwiseClone
          </label>
        </div>
      )}
    </div>
  );
};

export default Header;
