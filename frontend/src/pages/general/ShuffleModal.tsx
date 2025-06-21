// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ShuffleModal() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       navigate("/dashboard/roles/shuffle");
//     }, 2000); // 2-second delay before redirect

//     return () => clearTimeout(timeout);
//   }, [navigate]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
//       <div className="text-center">
//         <div className="flex flex-col items-center space-y-2">
//           <div className="animate-bounce space-x-1 text-customPurple">
//             <div className="inline-block h-2 w-2 rounded-full bg-customPurple" />
//             <div className="inline-block h-2 w-2 rounded-full bg-customPurple" />
//             <div className="inline-block h-2 w-2 rounded-full bg-customPurple" />
//           </div>
//           <p className="text-lg font-medium text-customPurple">shuffling</p>
//           <p className="text-sm text-gray-600">stop</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/shuffle/ShufflingModal.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ShufflingModal() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/dashboard/roles/shuffle");
    }, 2000); // 2 seconds before redirect

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-xl bg-white p-8 text-center shadow-xl">
        <div className="mb-4 flex justify-center space-x-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-customPurple" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-customPurple delay-150" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-customPurple delay-300" />
        </div>
        <p className="text-lg font-semibold text-customPurple">shuffling</p>
        <p className="text-sm text-gray-600">stop</p>
      </div>
    </div>
  );
}
