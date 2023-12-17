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
import {
  addRecipient,
  saveExpense,
} from "@/components/dashboard/addExpense/header/headerLogic";

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
            onClick={() =>
              saveExpense({
                amtPaid,
                paidDetails,
                recipients,
                session,
              })
            }
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
          addRecipient={() =>
            addRecipient({
              amtPaid,
              recipients,
              recipientsInputEl,
              recipientsInputVal,
              setOwedDetails,
              setRecipients,
              setRecipientsInputVal,
            })
          }
        />
      </div>
      {recipientsInputVal && (
        <div
          className="flex py-5 px-[22px] gap-6"
          onClick={() =>
            addRecipient({
              amtPaid,
              recipients,
              recipientsInputEl,
              recipientsInputVal,
              setOwedDetails,
              setRecipients,
              setRecipientsInputVal,
            })
          }
        >
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
