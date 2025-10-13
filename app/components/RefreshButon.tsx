// components/RefreshButton.tsx
"use client";

const RefreshButton = () => {
  return (
    <button 
      onClick={() => window.location.reload()}
      className="mt-4 px-6 py-2 border-t-2 border-b-4 border-x-2 border-[#BCA067] text-[#BCA067] rounded-2xl shadow-md font-semibold hover:bg-[#BCA067] hover:text-white transition-all duration-300"
    >
      Refresh Page
    </button>
  );
};

export default RefreshButton;