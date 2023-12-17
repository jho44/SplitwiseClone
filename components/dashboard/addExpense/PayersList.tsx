import type { Dispatch, SetStateAction } from "react";
import type { PaidDetails, Recipient } from "@/components/dashboard/types";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Header from "@/components/dashboard/Header";

const isPayerStyle = { fontWeight: 600 };

const PayersList = ({
  amtPaid,
  paidDetails,
  recipients,
  setPaidDetails,
  setPayersListOpen,
}: {
  amtPaid: number;
  paidDetails: PaidDetails;
  recipients: Recipient[];
  setPaidDetails: Dispatch<SetStateAction<PaidDetails>>;
  setPayersListOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();

  const assignFullPayAmt = (email: string) => {
    setPaidDetails((prev) => {
      const payers = Object.keys(prev);
      if (payers.length === 1 && email === payers[0]) return prev;
      return { [email]: amtPaid };
    });
    setPayersListOpen(false);
  };

  const isPayer = (email: string) => email in paidDetails;
  return (
    <div className="fixed bg-white w-full h-full">
      <Header
        left={
          <button
            className="text-[13px] font-semibold text-green-200 text-left"
            onClick={() => setPayersListOpen(false)}
          >
            Cancel
          </button>
        }
        center={
          <label className="text-[15px] font-medium text-center">
            Choose payer
          </label>
        }
      />
      <div
        className="grid items-center gap-4 px-4 h-[60px] border-b-[1px] border-b-gray-100"
        style={{ gridTemplateColumns: "auto 1fr auto" }}
        onClick={() => assignFullPayAmt(session.user.email)}
      >
        <Image
          src="/icons/profile.svg"
          height={0}
          width={0}
          alt="add expense icon"
          style={{ width: "44px", height: "auto" }}
        />
        <label
          className="font-lato text-[15px] tracking-[0.3px]"
          style={isPayer(session.user.email) ? isPayerStyle : {}}
        >
          {session.user.name}
        </label>
        {isPayer(session.user.email) && (
          <Image
            src="/icons/check.svg"
            width={0}
            height={0}
            style={{ width: "13px", height: "auto" }}
            alt="you're paying the full amount"
          />
        )}
      </div>
      {recipients.map((r, i) => (
        <div
          className="grid items-center gap-4 px-4 h-[60px] border-b-[1px] border-b-gray-100"
          style={{ gridTemplateColumns: "auto 1fr auto" }}
          onClick={() => assignFullPayAmt(r.email)}
          key={i}
        >
          <Image
            src="/icons/user.svg"
            height={0}
            width={0}
            alt={`other payer ${r.label}`}
            style={{ width: "44px", height: "auto" }}
          />
          <label
            className="font-lato text-[15px] tracking-[0.3px]"
            style={isPayer(r.email) ? isPayerStyle : {}}
          >
            {r.label}
          </label>
          {isPayer(r.email) && (
            <Image
              src="/icons/check.svg"
              width={0}
              height={0}
              style={{ width: "13px", height: "auto" }}
              alt={`${r.label} is paying the full amount`}
            />
          )}
        </div>
      ))}
      <div
        className="grid items-center gap-4 px-4 h-[60px] border-b-[1px] border-b-gray-100"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        <label className="font-lato text-base tracking-[-0.16px]">
          Multiple people
        </label>
        <Image
          src="/icons/next-arrow.svg"
          height={0}
          width={0}
          alt="set specific amounts paid by multiple people"
          style={{ width: "8px", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default PayersList;
