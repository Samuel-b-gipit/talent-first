export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 glass">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="skeleton h-8 w-32 rounded-lg" />
          <div className="flex gap-2">
            <div className="skeleton h-8 w-20 rounded-lg" />
            <div className="skeleton h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-10">
        <div className="mb-10">
          <div className="skeleton h-3 w-20 rounded mb-3" />
          <div className="skeleton h-10 w-64 rounded-lg mb-4" />
          <div className="skeleton h-5 w-80 rounded-lg" />
        </div>
        <div className="rounded-2xl border border-border/60 p-6 mb-6 space-y-4">
          <div className="skeleton h-10 w-full rounded-xl" />
          <div className="flex justify-between">
            <div className="skeleton h-9 w-44 rounded-xl" />
            <div className="skeleton h-9 w-48 rounded-xl" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="skeleton h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-4 w-28 rounded" />
                  <div className="skeleton h-3 w-36 rounded" />
                </div>
              </div>
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-2/3 rounded" />
              <div className="flex gap-2">
                <div className="skeleton h-6 w-16 rounded-lg" />
                <div className="skeleton h-6 w-16 rounded-lg" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="skeleton h-9 flex-1 rounded-xl" />
                <div className="skeleton h-9 flex-1 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
