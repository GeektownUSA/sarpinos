'use client';
import { useState } from 'react';
import TabList from "@/app/components/TabList";
import TabContent from "@/app/components/TabContent";

const ItemTabs = ({ bkgVariant, tab1, tab2, content }) => {

  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  const tabs = [
    { id: 'tab1', label: tab1, handler: handleTab1 },
    { id: 'tab2', label: tab2, handler: handleTab2 },
    // Add more tabs as needed
  ];

  return (
    <div className="tab-container">
      <TabList
        bkgVariant={bkgVariant}
        activeTab={activeTab}
        tabs={tabs} />
      <TabContent
        activeTab={activeTab}
        content={content} />
    </div>
  );
}

export default ItemTabs;