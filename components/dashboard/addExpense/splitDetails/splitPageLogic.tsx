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
    if (person in prevOwed.amts) delete prevOwed.amts[person];
    else prevOwed.amts[person] = 0;
    const payers = Object.keys(prevOwed.amts);
    const numPayers = payers.length;

    const amts = {};
    const splitAmt = numPayers ? amtPaid / numPayers : 0;
    payers.forEach((payer) => {
      amts[payer] = splitAmt;
    });
    return {
      ...prevOwed,
      amts,
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
