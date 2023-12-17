import Select from "@/components/dashboard/addExpense/splitDetails/Select";
import { toTwoDecimalPts } from "@/lib/utils";
import { OwedDetails } from "../../types";
import type { Dispatch, SetStateAction } from "react";

const EqualBottom = ({
  amtPaid,
  owedDetails,
  setOwedDetails,
}: {
  amtPaid: number;
  owedDetails: OwedDetails;
  setOwedDetails: Dispatch<SetStateAction<OwedDetails>>;
}) => {
  const amtNumbers = Object.values(owedDetails.amts);
  const numPayers = amtNumbers.length;
  const amtSplitPerPerson = amtNumbers.find((amt) => amt);
  const msg = amtSplitPerPerson ? (
    <div className="flex flex-col text-center">
      <label className="font-bold text-base">
        ${toTwoDecimalPts(amtSplitPerPerson)}/person
      </label>
      <label className="text-xs">
        ({numPayers > 1 ? `${numPayers} people` : "1 person"})
      </label>
    </div>
  ) : (
    <div className="text-red text-xs flex items-center justify-center">
      You must select at least one person to split with.
    </div>
  );
  const isSplitEqually =
    amtNumbers.length > 0 && !amtNumbers.some((amt) => amt == 0);

  const split = () => {
    setOwedDetails((owedDetails) => {
      const amts = {};
      const payers = Object.keys(owedDetails.amts);
      const splitAmt = isSplitEqually ? 0 : amtPaid / payers.length;
      payers.forEach((p) => {
        amts[p] = splitAmt;
      });
      return {
        type: "equal",
        amts,
      };
    });
  };

  return (
    <div
      className="absolute bottom-0 grid w-full py-4 font-lato"
      style={{
        boxShadow: "0px -4px 5px 0px rgba(0, 0, 0, 0.08)",
        gridTemplateColumns: "1fr auto",
      }}
    >
      {msg}
      <div
        className="font-bold text-base flex gap-4 px-4 py-[11px] border-l-[1px] border-l-gray-100"
        onClick={() => split()}
      >
        All
        <Select alt="Everyone owes an equal amount" chosen={isSplitEqually} />
      </div>
    </div>
  );
};

export default EqualBottom;
