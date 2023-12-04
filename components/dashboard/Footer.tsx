import Image from "next/image";
import FooterTab from "./FooterTab";
import type { TabId } from "./types";
import { Dispatch, SetStateAction } from "react";

const Footer: React.FC<{
  currTab: TabId;
  setCurrTab: Dispatch<SetStateAction<TabId>>;
  setAddingExpense: Dispatch<SetStateAction<boolean>>;
}> = ({ currTab, setCurrTab, setAddingExpense }) => {
  return (
    <div className="fixed bottom-0 w-screen h-[82px] border-t-[0.5px] border-t-gray-200 flex">
      <FooterTab
        active={currTab === "friends"}
        img={{
          src: `/icons/friend-${
            currTab === "friends" ? "active" : "inactive"
          }.svg`,
          style: {
            width: "auto",
            minHeight: "23px",
            height: "23px",
          },
          alt: "friend icon",
        }}
        label="Friends"
        onClick={() => setCurrTab("friends")}
      />
      <FooterTab
        active={currTab === "groups"}
        img={{
          src: `/icons/group-${
            currTab === "groups" ? "active" : "inactive"
          }.svg`,
          style: {
            width: "auto",
            minHeight: "23px",
            height: "23px",
          },
          alt: "group icon",
        }}
        label="Groups"
        onClick={() => setCurrTab("groups")}
      />
      <div className="w-1/5 mt-1.5 flex items-start justify-center">
        <Image
          src="/icons/add-expense.svg"
          height={0}
          width={0}
          alt="add expense icon"
          style={{ width: "50px", height: "auto" }}
          onClick={() => setAddingExpense(true)}
        />
      </div>
      <FooterTab
        active={currTab === "activity"}
        img={{
          src: `/icons/activity-${
            currTab === "activity" ? "active" : "inactive"
          }.svg`,
          style: {
            width: "auto",
            minHeight: "23px",
            height: "23px",
          },
          alt: "activity icon",
        }}
        label="Activity"
        onClick={() => setCurrTab("activity")}
      />
      <FooterTab
        active={currTab === "account"}
        img={{
          src: "/icons/profile.svg",
          style:
            currTab === "account"
              ? {
                  borderRadius: "50%",
                  width: "auto",
                  minHeight: "23px",
                  height: "23px",
                  padding: "1px",
                  border: "1px solid black",
                  objectFit: "cover",
                }
              : {
                  width: "auto",
                  minHeight: "23px",
                  height: "23px",
                },
          alt: "profile icon",
        }}
        label="Account"
        onClick={() => setCurrTab("account")}
      />
    </div>
  );
};

export default Footer;
