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
      <div className="container mx-auto px-6 py-20 text-center max-w-3xl">
        <div className="skeleton h-12 w-80 rounded-lg mx-auto mb-6" />
        <div className="skeleton h-5 w-full max-w-lg rounded-lg mx-auto mb-4" />
        <div className="skeleton h-5 w-3/4 rounded-lg mx-auto" />
      </div>
      <div className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 p-6 space-y-4"
            >
              <div className="skeleton h-12 w-12 rounded-2xl mx-auto" />
              <div className="skeleton h-5 w-40 rounded mx-auto" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-3/4 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
