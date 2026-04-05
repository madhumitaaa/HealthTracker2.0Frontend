import React, { useState } from "react";

export default function AIChatSidebar({ userLoggedIn }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`fixed right-0 top-0 h-full bg-[#1b1b2b] w-80 shadow-lg transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="font-bold text-white">AI Chat</h2>
        <button className="text-gray-400 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? "✖" : "💬"}
        </button>
      </div>
      {open && (
        <div className="flex flex-col p-4 h-[calc(100%-56px)] overflow-y-auto">
          {!userLoggedIn && <p className="text-gray-400 mb-4">Login to start chatting with AI.</p>}
          {userLoggedIn && (
            <>
              <div className="flex-1">
                {/* Chat messages will go here */}
                <div className="text-gray-300 mb-2">AI: Welcome! How can I help you track your health today?</div>
              </div>
              <input
                type="text"
                placeholder="Type your question..."
                className="w-full p-2 rounded-lg bg-[#2c2c3e] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}