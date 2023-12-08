import Image from "next/image";
import OutlineButton from "@/components/buttons/OutlineButton";
import type { Dispatch, SetStateAction } from "react";
import { toTwoDecimalPts } from "@/lib/utils";

const ExpenseDetails = ({
  recipientsInputVal,
  setAmtPaid,
}: {
  recipientsInputVal: string;
  setAmtPaid: Dispatch<SetStateAction<number>>;
}) => {
  const preventLosingInputFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    if (!e.relatedTarget) {
      e.target.focus();
    }
  };

  return (
    <div
      className={`flex flex-col gap-6 ${
        recipientsInputVal ? "hidden" : "block"
      }`}
    >
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-2 h-12">
          <OutlineButton
            btn={{
              wrapperStyle: {
                padding: "8px",
              },
              onClick: () => {},
            }}
          >
            <Image
              src="/icons/expense/description.svg"
              width={30}
              height={30}
              alt="general description"
            />
          </OutlineButton>
          <input
            onBlur={preventLosingInputFocus}
            className="outline-0 w-[222px] text-xl h-full border-b-[1px] border-b-black-200 placeholder:text-blue-gray"
            placeholder="Enter a description"
          />
        </div>
        <div className="flex gap-2 h-12">
          <OutlineButton
            btn={{
              wrapperStyle: {
                padding: "8px",
              },
              onClick: () => {},
            }}
          >
            <Image
              src="/icons/expense/usd.svg"
              width={30}
              height={30}
              alt="amount paid"
            />
          </OutlineButton>
          <input
            onBlur={preventLosingInputFocus}
            onChange={(e) => {
              const amtPaidFloat = parseFloat(e.target.value);
              if (!amtPaidFloat) {
                setAmtPaid(0);
                return;
              }
              const formattedAmt = toTwoDecimalPts(amtPaidFloat);
              setAmtPaid(formattedAmt);
            }}
            type="number"
            inputMode="decimal"
            className="outline-0 w-[222px] text-[28px] font-semibold h-full border-b-[1px] border-b-black-200 placeholder:text-blue-gray"
            placeholder="0.00"
          />
        </div>
      </div>
      <div className="flex justify-center items-center font-lato font-medium text-[15px] tracking-[0.3px]">
        Paid by
        <OutlineButton
          btn={{
            wrapperStyle: {
              padding: "6px 9px",
              margin: "0 8px",
            },
            onClick: () => {},
          }}
        >
          you
        </OutlineButton>
        and split
        <OutlineButton
          btn={{
            wrapperStyle: {
              padding: "6px 9px",
              margin: "0 8px",
            },
            onClick: () => {},
          }}
        >
          equally
        </OutlineButton>
      </div>
    </div>
  );
};

export default ExpenseDetails;
