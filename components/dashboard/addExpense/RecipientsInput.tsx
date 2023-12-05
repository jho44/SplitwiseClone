import { type MutableRefObject, useState } from "react";
import { preventLosingInputFocus } from "@/lib/utils";
import RecipientTag from "@/components/dashboard/addExpense/RecipientTag";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RecipientsInput = ({
  inputEl,
}: {
  inputEl: MutableRefObject<HTMLInputElement>;
}) => {
  const [recipients, setRecipients] = useState<{ label: string }[]>([]);

  const addRecipient = () => {
    const inputVal = inputEl.current.value.trim();
    if (!inputVal) return;

    if (!EMAIL_PATTERN.test(inputVal)) {
      // TODO: compare to friends list for name
    }
    if (recipients.some(({ label }) => label === inputVal)) return;

    inputEl.current.value = "";
    setRecipients((prev) => [...prev, { label: inputVal }]);
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

    const inputVal = inputEl.current.value.trim();
    if (e.key === "Backspace" && !inputVal) {
      rmRecipient(-1);
      return;
    }

    if (e.key === "Backspace") return;
    addRecipient();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 font-lato text-base tracking-[-0.08px]">
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
