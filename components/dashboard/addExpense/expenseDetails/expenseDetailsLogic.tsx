import { toTwoDecimalPts } from "@/lib/utils";
import type { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import type { OwedDetails, PaidDetails } from "@/components/dashboard/types";

// Helper function to handle amount paid change
export const handleAmtPaidChange = ({
  amtPaidFloat,
  setAmtPaid,
  setPaidDetails,
  setOwedDetails,
  session,
}: {
  amtPaidFloat: number;
  setAmtPaid: Dispatch<SetStateAction<number>>;
  setPaidDetails: Dispatch<SetStateAction<PaidDetails>>;
  setOwedDetails: Dispatch<SetStateAction<OwedDetails>>;
  session: Session;
}) => {
  if (!amtPaidFloat) {
    setAmtPaid(0);
    return;
  }

  const formattedAmt = toTwoDecimalPts(amtPaidFloat);
  setAmtPaid(formattedAmt);

  setPaidDetails((paidDetails) => {
    const payers = Object.keys(paidDetails);
    const numPayers = payers.length;
    const res = {};

    if (!numPayers) res[session.user.email] = formattedAmt;
    else if (numPayers === 1) res[payers[0]] = formattedAmt;
    else {
      /* TODO: multiple payers */
    }

    return res;
  });

  setOwedDetails((owedDetails) => {
    const amts = owedDetails.amts;
    const payers = Object.keys(amts);

    if (!(session.user.email in amts)) {
      payers.push(session.user.email);
    }

    // if split equally amongst everyone
    if (
      owedDetails.type === "equal" &&
      !Object.values(amts).some((amt) => amt == 0)
    ) {
      const splitAmt = formattedAmt / payers.length;
      payers.forEach((payer) => {
        amts[payer] = splitAmt;
      });

      return {
        ...owedDetails,
        amts,
      };
    }
    // TODO: handle when not split equally
    return owedDetails;
  });
};
