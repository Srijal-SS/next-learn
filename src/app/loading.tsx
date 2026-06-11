export default function Loading() {
  return (
    <div className="flex flex-col gap-6 w-full h-full pb-20 md:pb-0">
      <header className="mb-2">
        <div className="w-48 h-8 bg-neutral-800 rounded animate-pulse" />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-neutral-900 border border-neutral-800/50 min-h-[200px] flex flex-col justify-between animate-pulse">
          <div>
            <div className="w-3/4 h-8 bg-neutral-800 rounded mb-4" />
            <div className="w-1/2 h-4 bg-neutral-800 rounded" />
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800" />
            <div>
              <div className="w-20 h-6 bg-neutral-800 rounded mb-2" />
              <div className="w-32 h-4 bg-neutral-800 rounded" />
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 p-6 rounded-3xl bg-neutral-900 border border-neutral-800/50 animate-pulse">
          <div className="w-24 h-6 bg-neutral-800 rounded mb-6" />
          <div className="grid grid-cols-7 gap-2 pb-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="w-full aspect-square rounded-sm bg-neutral-800" />
            ))}
          </div>
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800/50 min-h-[180px] flex flex-col justify-between animate-pulse">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 mb-4" />
              <div className="w-2/3 h-6 bg-neutral-800 rounded mb-1" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="w-16 h-3 bg-neutral-800 rounded" />
                <div className="w-8 h-3 bg-neutral-800 rounded" />
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
