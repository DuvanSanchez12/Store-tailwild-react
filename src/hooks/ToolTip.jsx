import { useState } from "react";

export default function Tooltip({ children, text }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                     bg-black text-white text-xs p-3 rounded-lg w-56 shadow-xl z-20"
        >
          {text}

          {/* Flecha */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 
                       w-0 h-0 border-l-6 border-r-6
                       border-b-[6px] border-transparent border-b-black"
          ></div>
        </div>
      )}
    </div>
  );
}
