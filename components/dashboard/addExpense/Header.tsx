import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  type MutableRefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import RecipientsInput from "@/components/dashboard/addExpense/RecipientsInput";
import type {
  OwedDetails,
  PaidDetails,
  Recipient,
} from "@/components/dashboard/types";
import { toTwoDecimalPts } from "@/lib/utils";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Header = ({
  amtPaid,
  paidDetails,
  recipients,
  recipientsInputEl,
  recipientsInputVal,
  setOwedDetails,
  setPaidDetails,
  setRecipients,
  setRecipientsInputVal,
}: {
  amtPaid: number;
  paidDetails: PaidDetails;
  recipients: Recipient[];
  recipientsInputEl: MutableRefObject<HTMLInputElement>;
  recipientsInputVal: string;
  setOwedDetails: Dispatch<SetStateAction<OwedDetails>>;
  setPaidDetails: Dispatch<SetStateAction<PaidDetails>>;
  setRecipients: Dispatch<SetStateAction<Recipient[]>>;
  setRecipientsInputVal: Dispatch<SetStateAction<string>>;
}) => {
  const { data: session, status } = useSession();
  const canSave = !!recipients.length && !!amtPaid;

  const addRecipient = () => {
    const trimmedInputVal = recipientsInputVal.trim();
    if (!trimmedInputVal) return;

    if (!EMAIL_PATTERN.test(trimmedInputVal)) {
      // TODO: compare to friends list for name
    }
    if (recipients.some(({ label }) => label === trimmedInputVal)) return;

    recipientsInputEl.current.value = "";
    setRecipientsInputVal("");
    setRecipients((prev) => [
      ...prev,
      { label: trimmedInputVal, email: trimmedInputVal },
    ]); // TODO: have this optionally set label to recipient's name

    setOwedDetails((prev) => {
      // TODO: handle when not splitting equally
      return {
        ...prev,
        amts: {
          ...prev.amts,
          [trimmedInputVal]: null,
        },
      };
    });
  };

  const saveExpense = async () => {
    if (status === "loading") return; // TODO: handle better
    if (status === "unauthenticated") return; // TODO: redirect to homepage?
    // email to number (amt they paid)
    // default split amt (evenly amongst all parties)
    const splitDetails = {};
    const numRecipients = recipients.length + 1; // recipients plus yourself
    const equalSplit = toTwoDecimalPts(amtPaid / numRecipients);
    recipients.forEach((r) => {
      splitDetails[r.email] = equalSplit;
    });
    splitDetails[session.user.email] = equalSplit;

    await fetch("/api/expense", {
      method: "POST",
      body: JSON.stringify({
        splitDetails,
        paidDetails,
        recipients: recipients.map(({ email }) => email),
        // expenseDate, // TODO
        // notes       // TODO
        creatorEmail: session.user.email,
        description: "Some description",
        groupId: undefined,
      }),
    });
    // TODO: error handling on the ui side
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
          <button
            onClick={saveExpense}
            className={`text-sm font-semibold ${
              canSave ? "text-green-200" : "text-gray-500 opacity-50"
            }`}
            disabled={!canSave}
          >
            Save
          </button>
        </div>
        <RecipientsInput
          amtPaid={amtPaid}
          recipients={recipients}
          setRecipients={setRecipients}
          inputEl={recipientsInputEl}
          inputVal={recipientsInputVal}
          setInputVal={setRecipientsInputVal}
          setPaidDetails={setPaidDetails}
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
