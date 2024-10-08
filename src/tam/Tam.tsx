import { TamUnit } from "./tam";
import {
  FaceSmileIcon,
  FaceFrownIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function Tam({ tam }: { tam: TamUnit }) {
  function getFaceIcon(foodLevel: number) {
    if (foodLevel > 70) {
      return <FaceSmileIcon className="size-14 align-middle inline-block" />;
    } else if (foodLevel <= 0) {
      return <XCircleIcon className="size-14 align-middle inline-block" />;
    } else if (foodLevel < 30) {
      return <FaceFrownIcon className="size-14 align-middle inline-block" />;
    } else {
      return (
        // return "meh" face (modified FaceSmileIcon)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-14 align-middle inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 0 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
      );
    }
  }
  return (
    <div className="bg-neutral-300 rounded-3xl my-4 mx-4 py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-center lg:grid-cols-3">
          <div key={tam.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
            <div className="order-first text-xs leading-1 text-gray-600">
              Id: {tam.id}, Age: {tam.age}
            </div>
            <div className="order-3 font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {getFaceIcon(tam.foodLevel)}
              <div className="text-xs font-normal inline-block w-0">
                {tam.foodLevel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
