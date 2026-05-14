// "use client";

// import { useEffect, useState } from "react";

// export function CustomCursor() {
//   const [position, setPosition] = useState({ x: -100, y: -100 });
//   const [isHovering, setIsHovering] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       // Usiamo requestAnimationFrame per sincronizzarci con il refresh del monitor
//       window.requestAnimationFrame(() => {
//         setPosition({ x: e.clientX, y: e.clientY });
//       });
//       if (!isVisible) setIsVisible(true);
//     };

//     const handleOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       setIsHovering(!!target.closest("a, button, [data-cursor]"));
//     };

//     window.addEventListener("mousemove", moveCursor);
//     window.addEventListener("mouseover", handleOver);
//     document.addEventListener("mouseenter", () => setIsVisible(true));
//     document.addEventListener("mouseleave", () => setIsVisible(false));

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//       window.removeEventListener("mouseover", handleOver);
//     };
//   }, [isVisible]);

//   if (!isVisible) return null;

//   return (
//     <div
//       className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
//       style={{
//         transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
//         // Usiamo translate3d per forzare l'accelerazione hardware della GPU
//       }}
//     >
//       <div
//         className={`rounded-full transition-all duration-150 ease-out ${
//           isHovering 
//             ? "h-10 w-10 bg-[#C9A84C] opacity-50" 
//             : "h-3 w-3 bg-[#F5F0E8] opacity-100"
//         }`}
//         style={{
//           transform: "translate(-50%, -50%)",
//         }}
//       />
//     </div>
//   );
// }