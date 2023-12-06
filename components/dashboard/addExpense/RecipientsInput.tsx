import {
  type MutableRefObject,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { preventLosingInputFocus } from "@/lib/utils";
import RecipientTag from "@/components/dashboard/addExpense/RecipientTag";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RecipientsInput = ({
  inputEl,
  inputVal,
  setInputVal,
}: {
  inputEl: MutableRefObject<HTMLInputElement>;
  inputVal: string;
  setInputVal: Dispatch<SetStateAction<string>>;
}) => {
  const [recipients, setRecipients] = useState<{ label: string }[]>([]);

  const addRecipient = () => {
    const trimmedInputVal = inputVal.trim();
    if (!trimmedInputVal) return;

    if (!EMAIL_PATTERN.test(trimmedInputVal)) {
      // TODO: compare to friends list for name
    }
    if (recipients.some(({ label }) => label === trimmedInputVal)) return;

    inputEl.current.value = "";
    setInputVal("");
    setRecipients((prev) => [...prev, { label: trimmedInputVal }]);
  };

  const rmRecipient = (ind: number) => {
    setRecipients((prev) => {
      if (prev.length === 1) inputEl.current.focus();
      if (ind === -1) return prev.slice(0, -1);
      return [...prev.slice(0, ind), ...prev.slice(ind + 1)];
    });
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" && e.key !== "Backspace") return;

    const trimmedInputVal = inputVal.trim();
    if (e.key === "Backspace" && !trimmedInputVal) {
      rmRecipient(-1);
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
