import { useState } from "react";
import Footer from "@/components/dashboard/Footer";
import type { TabId } from "@/components/dashboard/types";
import AddExpense from "@/components/dashboard/addExpense/AddExpense";

const Dashboard = () => {
  const [currTab, setCurrTab] = useState<TabId>("friends");
  const [addingExpense, setAddingExpense] = useState(false);

  return (
    <div className="flex">
      {addingExpense ? (
        <AddExpense />
      ) : (
        <Footer
          currTab={currTab}
          setCurrTab={setCurrTab}
          setAddingExpense={setAddingExpense}
        />
      )}
    </div>
  );
};

export default Dashboard;
