import Image from "next/image";

const AddExpense = () => {
  return (
    <div className="h-screen bg-white z-[1] relative flex flex-col">
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
          <label className="text-gray-500 text-sm font-semibold opacity-50">
            Save
          </label>
        </div>
        <div className="flex gap-1 font-lato text-base tracking-[-0.08px]">
          <label className="font-medium">
            With <span className="font-bold">you</span> and:
          </label>
          <input
            className="placeholder:opacity-70 grow"
            placeholder="Names / emails / phones"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center flex-1">
        <div className="flex gap-2 h-12">
          <button className="p-2 rounded border-[1px] border-gray-100 shadow-[0_2px_0_0_rgba(0,0,0,0.40)]">
            <Image
              src="/icons/expense/description.svg"
              width={30}
              height={30}
              alt="general description"
            />
          </button>
          <input
            className="outline-0 w-[222px] text-xl h-full border-b-[1px] border-b-black-200 placeholder:text-blue-gray"
            placeholder="Enter a description"
          />
        </div>
        <div className="flex gap-2 h-12">
          <button className="p-2 rounded border-[1px] border-gray-100 shadow-[0_2px_0_0_rgba(0,0,0,0.40)]">
            <Image
              src="/icons/expense/usd.svg"
              width={30}
              height={30}
              alt="amount paid"
            />
          </button>
          <input
            type="number"
            className="outline-0 w-[222px] text-[28px] font-semibold h-full border-b-[1px] border-b-black-200 placeholder:text-blue-gray"
            placeholder="0.00"
          />
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
