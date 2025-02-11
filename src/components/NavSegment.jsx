import React, { useState } from "react";

const SegmentedNav = ({ defaultValue = "usuarios", onValueChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };
 
  const getButtonClass = (tabName) => {
    const baseClass = "rounded-full px-6 py-2 text-sm font-medium transition-colors text-[12px]";
    const activeClass = "bg-blue-500 text-white text-sm text-sm ";
    const inactiveClass = "text-gray-500 hover:text-gray-900 text-[12px]";
    
    return `${baseClass} ${activeTab === tabName ? activeClass : inactiveClass}`;
  };

  return (
    <div className="inline-flex items-center rounded-full h-12 border bg-white p-1 text-[5px] shadow-sm">
      <button
        onClick={() => handleTabChange("coordinador")}
        className={getButtonClass("coordinador")}
      >
     Coordinadores
      </button>
      <button
        onClick={() => handleTabChange("registro")}
        className={getButtonClass("registro")}
      >
      operadores
      </button>
      <button
        onClick={() => handleTabChange("usuarios")}
        className={getButtonClass("usuarios")}
      >
    Usuarios   
      </button>
    </div>
  );
};

export default SegmentedNav;