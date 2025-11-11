import { useState } from "react";

export default function ProductImageZoom({ src, className }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center");

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      className={`${className} overflow-hidden cursor-zoom-in relative`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <img
        src={src}
        alt="Zoom"
        className={`object-scale-down w-full h-full bg-gray-200 transition-transform duration-300 ease-out ${
          isZoomed ? "scale-150" : "scale-100"
        }`}
        style={{ transformOrigin }}
      />
    </div>
  );
}
