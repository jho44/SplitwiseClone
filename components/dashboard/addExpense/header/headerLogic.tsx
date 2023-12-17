import { Dispatch, MutableRefObject, SetStateAction } from "react";
import type {
  OwedDetails,
  PaidDetails,
  Recipient,
} from "@/components/dashboard/types";
import { toTwoDecimalPts } from "@/lib/utils";
import { Session } from "next-auth";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const addRecipient = ({
  recipients,
  recipientsInputEl,
  recipientsInputVal,
  setOwedDetails,
  setRecipients,
  setRecipientsInputVal,
}: {
  recipients: Recipient[];
  recipientsInputEl: MutableRefObject<HTMLInputElement>;
  recipientsInputVal: string;
  setOwedDetails: Dispatch<SetStateAction<OwedDetails>>;
  setRecipients: Dispatch<SetStateAction<Recipient[]>>;
  setRecipientsInputVal: Dispatch<SetStateAction<string>>;
}) => {
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

export const saveExpense = async ({
  amtPaid,
  paidDetails,
  recipients,
  session,
}: {
  amtPaid: number;
  paidDetails: PaidDetails;
  recipients: Recipient[];
  session: Session;
}) => {
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
