import React from "react";
import "./index.css";
import { SourceTabs } from "../../utils/enums";

interface TabPanelProps {
  activeTab: string;
  handleTabChange: (tab: SourceTabs) => void;
}

const index: React.FC<TabPanelProps> = ({ activeTab, handleTabChange }) => (
  <div className="breadcrumb flat">
    <div
      onClick={() => handleTabChange(SourceTabs.File)}
      className={`tab ${activeTab === SourceTabs.File ? "active" : ""}`}
    >
      <span>Files</span>
    </div>
    <div
      onClick={() => handleTabChange(SourceTabs.Text)}
      className={`tab ${activeTab === SourceTabs.Text ? "active" : ""}`}
    >
      <span>Text</span>
    </div>
    <div
      onClick={() => handleTabChange(SourceTabs.Website)}
      className={`tab ${activeTab === SourceTabs.Website ? "active" : ""}`}
    >
      <span>Website</span>
    </div>
    <div
      onClick={() => handleTabChange(SourceTabs.QnA)}
      className={`tab ${activeTab === SourceTabs.QnA ? "active" : ""}`}
    >
      <span>Q&A</span>
    </div>
  </div>
);

export default index;
