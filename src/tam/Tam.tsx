import { TamUnit } from "./tam";

export default function Tam({ tam }: { tam: TamUnit }) {
  return (
    <div className="bg-neutral-300 rounded-3xl my-4 mx-4 py-4 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div key={tam.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="order-first text-xs leading-1 text-gray-600">
              Id: {tam.id}, Age: {tam.age}
            </dt>
            <dd className="order-3 font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Food: {tam.foodLevel}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
