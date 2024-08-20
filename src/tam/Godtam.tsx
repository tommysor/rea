export default function Godtam({
  addNewTam,
  clearTams,
}: {
  addNewTam: () => void;
  clearTams: () => void;
}) {
  return (
    <div className="w-64 h-44">
      <div className="bg-neutral-300 rounded-3xl my-4 mx-4 py-4 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="flex items-center justify-center">
                <button
                  onClick={addNewTam}
                  className="rounded-md bg-stone-500 mx-1 my-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Tam
                </button>
                <button
                  onClick={clearTams}
                  className="rounded-md bg-stone-500 mx-1 my-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
