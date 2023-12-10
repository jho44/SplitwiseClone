import { type MutableRefObject, Dispatch, SetStateAction } from "react";
import { preventLosingInputFocus } from "@/lib/utils";
import RecipientTag from "@/components/dashboard/addExpense/RecipientTag";
import type { PaidDetails, Recipient } from "@/components/dashboard/types";
import { useSession } from "next-auth/react";

const RecipientsInput = ({
  amtPaid,
  inputEl,
  inputVal,
  recipients,
  addRecipient,
  setInputVal,
  setPaidDetails,
  setRecipients,
}: {
  amtPaid: number;
  inputEl: MutableRefObject<HTMLInputElement>;
  inputVal: string;
  recipients: Recipient[];
  addRecipient: () => void;
  setInputVal: Dispatch<SetStateAction<string>>;
  setPaidDetails: Dispatch<SetStateAction<PaidDetails>>;
  setRecipients: Dispatch<SetStateAction<Recipient[]>>;
}) => {
  const { data } = useSession();
  const rmRecipient = (ind: number) => {
    setPaidDetails((prev) => {
      const payers = Object.keys(prev);
      const numPayers = payers.length;
      if (!numPayers) return prev;
      if (numPayers === 1) {
        if (payers[0] === recipients[ind].email)
          return { [data.user.email]: amtPaid };
      } else if (recipients[ind].email in prev) {
        // TODO: handle when multiple ppl paying and this email is one of them
        // prob just rm this email from paidDetails and tell user that not enough paid when hit "Save"
      }
    });

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
        placeholder="Names / emails"
        onKeyDown={handleKeydown}
      />
    </div>
  );
};

export default RecipientsInput;
