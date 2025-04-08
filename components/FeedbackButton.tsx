"use client";

import React, { memo } from "react";

const FeedbackButton: React.FC = memo(() => {
  return (
    <a
      href="https://forms.gle/9cfy2nmMic2QyNZTA"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-4 py-2 text-white dark:text-white bg-[#0000FF] text-black shadow-lg transition-all duration-500 dark:bg-gradient-to-r from-[#134E5E] to-[#4DB495] hover:bg-right-center rounded-full"
      style={{
        backgroundSize: "200% auto",
      }}
      aria-label="Provide feedback"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Feedback?</span>
    </a>
  );
});

FeedbackButton.displayName = "FeedbackButton";

export default FeedbackButton;
