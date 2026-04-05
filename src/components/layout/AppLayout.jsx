import { useState } from "react";
import Sidebar from "./Sidebar";
import "../../styles/AppLayout.css";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? "expanded" : "collapsed"}`}>
        
        {/* Topbar */}
        <div className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* Page Content */}
        <div className="page-container">
          {children}
        </div>

      </main>
    </div>
  );
}