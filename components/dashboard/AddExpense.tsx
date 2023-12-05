import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import OutlineButton from "@/components/buttons/OutlineButton";

const AddExpense = () => {
  const recipientsInput = useRef<HTMLInputElement>();
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    if (recipientsInput.current) recipientsInput.current.focus();

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

  const preventLosingInputFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    if (!e.relatedTarget) {
      e.target.focus();
    }
  };
  return (
    <div
      className="w-full bg-white z-[1] relative flex items-center justify-center"
      style={{ height }}
    >
      <div className="absolute w-full top-0 p-3 pt-4 border-b-[1px] border-b-gray-100 flex flex-col gap-[26px]">
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
          <label className="text-gray-500 text-sm font-semibold opacity-50">
            Save
          </label>
        </div>
        <div className="flex gap-1 font-lato text-base tracking-[-0.08px]">
          <label className="font-medium">
            With <span className="font-bold">you</span> and:
          </label>
          <input
            onBlur={preventLosingInputFocus}
            ref={recipientsInput}
            className="placeholder:opacity-70 grow"
            placeholder="Names / emails / phones"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
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
              type="number"
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
      <div className="absolute bottom-0 w-full h-12 p-3 pl-2 border-t-[1px] border-t-gray-100 flex justify-between">
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
          width={28}
          height={26}
          alt="notes associated with this expense"
        />
      </div>
    </div>
  );
};

export default AddExpense;
