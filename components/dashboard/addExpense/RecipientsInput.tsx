import { type MutableRefObject, Dispatch, SetStateAction } from "react";
import { preventLosingInputFocus } from "@/lib/utils";
import RecipientTag from "@/components/dashboard/addExpense/RecipientTag";
import type { Recipients } from "@/components/dashboard/types";

const RecipientsInput = ({
  inputEl,
  inputVal,
  recipients,
  addRecipient,
  setInputVal,
  setRecipients,
}: {
  inputEl: MutableRefObject<HTMLInputElement>;
  inputVal: string;
  recipients: Recipients[];
  addRecipient: () => void;
  setInputVal: Dispatch<SetStateAction<string>>;
  setRecipients: Dispatch<SetStateAction<Recipients[]>>;
}) => {
  const rmRecipient = (ind: number) => {
    setRecipients((prev) => {
      if (prev.length === 1) inputEl.current.focus();
      if (ind === -1) return prev.slice(0, -1);
      return [...prev.slice(0, ind), ...prev.slice(ind + 1)];
    });
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" && e.key !== "Backspace") return;

    if (e.key === "Backspace" && !inputVal) {
      rmRecipient(-1); // TODO: don't immediately delete -- just focus on last tag
      return;
    }

    if (e.key === "Backspace") return;
    addRecipient();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 font-lato text-base tracking-[-0.08px]">
      <label className="font-medium">
        With <span className="font-bold">you</span> and:
      </label>

      {recipients.map((r, ind) => (
        <RecipientTag
          key={ind}
          ind={ind}
          label={r.label}
          rmRecipient={rmRecipient}
        />
      ))}
      <input
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        onBlur={preventLosingInputFocus}
        ref={inputEl}
        className="placeholder:opacity-70 grow"
        placeholder="Names / emails / phones"
        onKeyDown={handleKeydown}
      />
    </div>
  );
};

export default RecipientsInput;
