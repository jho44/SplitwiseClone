import type { Dispatch, SetStateAction } from "react";
import type { OwedDetails, Recipient } from "@/components/dashboard/types";
import { useSession } from "next-auth/react";
import Header from "@/components/dashboard/Header";
import MemberRow from "@/components/dashboard/addExpense/MemberRow";
import Select from "./splitDetails/Select";
import EqualBottom from "./splitDetails/EqualBottom";

const SplitPage = ({
  amtPaid,
  owedDetails,
  recipients,
  setOwedDetails,
  setSplitPageOpen,
}: {
  amtPaid: number;
  owedDetails: OwedDetails;
  recipients: Recipient[];
  setOwedDetails: Dispatch<SetStateAction<OwedDetails>>;
  setSplitPageOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const selectedBtnStyle = {
    background: "var(--green-100)",
    color: "white",
  };

  const { data: session } = useSession();

  const handleSplitTypeClick = (type: "equal" | "exact" | "percent") => {
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

  const toggleEqualSplitOnPerson = (person: string) => {
    setOwedDetails((prevOwed) => {
      if (person in prevOwed.amts) delete prevOwed.amts[person];
      else prevOwed.amts[person] = 0;
      const payers = Object.keys(prevOwed.amts);
      console.log(payers);
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
  return (
    <div className="fixed bg-white w-full h-full">
      <Header
        left={
          <button
            className="text-[13px] font-semibold text-green-200 text-left"
            onClick={() => setSplitPageOpen(false)}
          >
            Cancel
          </button>
        }
        center={
          <label className="text-[15px] font-medium text-center">
            Split options
          </label>
        }
        right={
          <button
            className="text-[13px] font-semibold text-green-200 text-right"
            onClick={() => setSplitPageOpen(false)}
          >
            Done
          </button>
        }
      />

      <div className="flex flex-col justify-center items-center font-montserrat text-sm tracking-[-0.07px]">
        <label className="font-semibold">Split equally</label>
        <label>Select which people owe an equal share.</label>
      </div>

      <div className="flex gap-2.5 w-full px-2.5 pt-[34px] pb-[11px] font-lato font-semibold leading-[0]">
        <button
          className="border-[1px] border-gray-100 flex-1	w-0 text-[37px] h-8"
          style={owedDetails.type === "equal" ? selectedBtnStyle : {}}
          onClick={() => handleSplitTypeClick("equal")}
        >
          =
        </button>
        <button
          className="border-[1px] border-gray-100 flex-1	w-0 text-[17px] h-8"
          style={owedDetails.type === "exact" ? selectedBtnStyle : {}}
          onClick={() => handleSplitTypeClick("exact")}
        >
          1.23
        </button>
        <button
          className="border-[1px] border-gray-100 flex-1	w-0 text-[17px] h-8"
          style={owedDetails.type === "percent" ? selectedBtnStyle : {}}
          onClick={() => handleSplitTypeClick("percent")}
        >
          %
        </button>
      </div>
      {[
        {
          label: session.user.name,
          email: session.user.email,
        },
        ...recipients,
      ].map((r, i) => (
        <MemberRow
          key={i}
          img={{
            icon: i ? "/icons/user.svg" : "/icons/profile.svg",
            alt: `${r.label} was supposed to pay`,
          }}
          text={{
            content: r.label,
            bold: !!owedDetails.amts[r.email],
          }}
          right={
            owedDetails.type === "equal" ? (
              <Select
                alt={`${r.label} is paying an equal share`}
                chosen={!!owedDetails.amts[r.email]}
              />
            ) : (
              <div>right</div>
            )
          }
          onClick={() => toggleEqualSplitOnPerson(r.email)}
        />
      ))}
      {owedDetails.type === "equal" ? (
        <EqualBottom
          amtPaid={amtPaid}
          owedDetails={owedDetails}
          setOwedDetails={setOwedDetails}
        />
      ) : (
        <div>bottom</div>
      )}
    </div>
  );
};

export default SplitPage;
