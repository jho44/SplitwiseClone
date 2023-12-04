import { useEffect, useState } from "react";
import Footer from "@/components/dashboard/Footer";
import type { TabId } from "@/components/dashboard/types";
import AddExpense from "@/components/dashboard/AddExpense";

const Dashboard = () => {
  const [currTab, setCurrTab] = useState<TabId>("friends");
  const [addingExpense, setAddingExpense] = useState(false);

  const [height, setHeight] = useState("100vh");

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
    <div className="flex" style={{ height }}>
      <AddExpense />
      <Footer
        currTab={currTab}
        setCurrTab={setCurrTab}
        setAddingExpense={setAddingExpense}
      />
    </div>
  );
};

export default Dashboard;
