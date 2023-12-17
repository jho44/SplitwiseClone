import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/dashboard/addExpense/Header";
import ExpenseDetails from "@/components/dashboard/addExpense/ExpenseDetails";
import type {
  Recipient,
  PaidDetails,
  OwedDetails,
} from "@/components/dashboard/types";
import PayersList from "@/components/dashboard/addExpense/PayersList";
import SplitPage from "@/components/dashboard/addExpense/SplitPage";

const AddExpense = () => {
  const recipientsInputEl = useRef<HTMLInputElement>();
  const [height, setHeight] = useState("100vh");
  const [recipientsInputVal, setRecipientsInputVal] = useState(""); // need state for input val so we can rerender the "Add ___ to Splitwise" bit
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [amtPaid, setAmtPaid] = useState<number>(0);
  const [paidDetails, setPaidDetails] = useState<PaidDetails>({});
  const [owedDetails, setOwedDetails] = useState<OwedDetails>({
    type: "equal",
    amts: {},
  });
  const [payersListOpen, setPayersListOpen] = useState(false);
  const [splitPageOpen, setSplitPageOpen] = useState(false);

  useEffect(() => {
    if (recipientsInputEl.current) recipientsInputEl.current.focus();

    const handleScroll = (e: Event) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    if (!window?.visualViewport) return;

    function handleResize() {
      // Set window width/height to state
      setHeight(`${window.visualViewport.height}px`);
    }

    // Add event listener
    window.visualViewport.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () =>
      window.visualViewport.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full bg-white z-[1] relative flex flex-col items-center justify-between"
      style={{ height }}
    >
      <Header
        amtPaid={amtPaid}
        paidDetails={paidDetails}
        recipients={recipients}
        setOwedDetails={setOwedDetails}
        setPaidDetails={setPaidDetails}
        setRecipients={setRecipients}
        recipientsInputEl={recipientsInputEl}
        recipientsInputVal={recipientsInputVal}
        setRecipientsInputVal={setRecipientsInputVal}
      />
      <ExpenseDetails
        amtPaid={amtPaid}
        paidDetails={paidDetails}
        recipientsInputVal={recipientsInputVal}
        setAmtPaid={setAmtPaid}
        setOwedDetails={setOwedDetails}
        setPaidDetails={setPaidDetails}
        setPayersListOpen={setPayersListOpen}
        setSplitPageOpen={setSplitPageOpen}
      />
      <div className="w-full h-12 p-3 pl-2 border-t-[1px] border-t-gray-100 flex justify-between">
        <div className="flex gap-1.5 items-center">
          <Image
            src="/icons/expense/calendar.svg"
            width={26}
            height={26}
            alt="date on which expense was paid"
          />
          <label className="font-lato text-base">Today</label>
        </div>
        <div className="flex gap-1.5 items-center">
          <Image
            src="/icons/expense/group.svg"
            width={34}
            height={26}
            alt="group with which expense should be split amongst"
          />
          <label className="font-lato text-base">No group</label>
        </div>
        <Image
          src="/icons/expense/notes.svg"
          width={0}
          height={0}
          alt="notes associated with this expense"
          style={{ height: "26px", width: "auto" }}
        />
      </div>
      {payersListOpen && (
        <PayersList
          amtPaid={amtPaid}
          paidDetails={paidDetails}
          recipients={recipients}
          setPaidDetails={setPaidDetails}
          setPayersListOpen={setPayersListOpen}
        />
      )}
      {splitPageOpen && (
        <SplitPage
          amtPaid={amtPaid}
          owedDetails={owedDetails}
          recipients={recipients}
          setOwedDetails={setOwedDetails}
          setSplitPageOpen={setSplitPageOpen}
        />
      )}
    </div>
  );
};

export default AddExpense;
