const TabContent = ({ activeTab, content }) => {
  const activeContent = content.find(item => item.id === activeTab);
  return (
    <div>
      {activeContent && activeContent.component}
    </div>
  );
};

export default TabContent;