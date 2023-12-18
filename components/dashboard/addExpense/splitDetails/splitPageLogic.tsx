import type { OwedDetails, Recipient } from "@/components/dashboard/types";
import { Dispatch, SetStateAction } from "react";

export const handleSplitTypeClick = (
  type: "equal" | "exact" | "percent",
  {
    amtPaid,
    recipients,
    setOwedDetails,
  }: {
    amtPaid: number;
    recipients: Recipient[];
    setOwedDetails: Dispatch<SetStateAction<OwedDetails>>;
  }
) => {
  const amts = {};
  const numRecipients = recipients.length;
  recipients.forEach((r) => {
    amts[r.email] = type === "equal" ? amtPaid / numRecipients : 0;
  });
  setOwedDetails({
    type,
    amts,
  });
};

export const toggleEqualSplitOnPerson = (
  person: string,
  {
    amtPaid,
    setOwedDetails,
  }: {
    amtPaid: number;
    setOwedDetails: Dispatch<SetStateAction<OwedDetails>>;
  }
) => {
  setOwedDetails((prevOwed) => {
    if (prevOwed.amts[person]) {
      // this person should no longer be a payer
      prevOwed.amts[person] = 0;
    } else prevOwed.amts[person] = 1;
    const payers = Object.keys(prevOwed.amts).filter(
      (payer) => prevOwed.amts[payer] > 0
    );
    const splitAmt = amtPaid / payers.length;
    payers.forEach((payer) => {
      prevOwed.amts[payer] = splitAmt;
    });

    return {
      ...prevOwed,
    };
  });
};

export const splitEqually = (
  equally: boolean,
  {
    amtPaid,
    owedDetails,
  }: {
    amtPaid: number;
    owedDetails: OwedDetails;
  }
): OwedDetails => {
  const amts = {};
  const payers = Object.keys(owedDetails.amts);
  const splitAmt = equally ? amtPaid / payers.length : 0;
  payers.forEach((p) => {
    amts[p] = splitAmt;
  });
  return {
    type: "equal",
    amts,
  };
};
