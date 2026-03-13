// Scoped loading UI — only the page content area shows this skeleton.
// The Navbar (rendered in root layout) remains visible during load.
export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="rounded-xl border bg-card p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="skeleton h-24 w-24 rounded-full shrink-0" />
                <div className="flex-1 space-y-3 pt-1">
                  <div className="skeleton h-7 w-48 rounded-lg" />
                  <div className="skeleton h-5 w-36 rounded-lg" />
                  <div className="flex gap-4">
                    <div className="skeleton h-4 w-24 rounded-lg" />
                    <div className="skeleton h-4 w-24 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            {/* Bio */}
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <div className="skeleton h-5 w-20 rounded-lg" />
              <div className="skeleton h-4 w-full rounded-lg" />
              <div className="skeleton h-4 w-5/6 rounded-lg" />
              <div className="skeleton h-4 w-4/6 rounded-lg" />
            </div>
            {/* Skills */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="skeleton h-5 w-36 rounded-lg" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="skeleton h-5 w-32 rounded-lg" />
              <div className="skeleton h-10 w-full rounded-lg" />
              <div className="skeleton h-10 w-full rounded-lg" />
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <div className="skeleton h-5 w-28 rounded-lg" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="skeleton h-4 w-24 rounded-lg" />
                  <div className="skeleton h-4 w-20 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
