export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse-soft">
        <div className="w-6 h-6 rounded-full bg-primary/30" />
      </div>
      <div className="skeleton h-4 w-48 rounded-lg" />
    </div>
  );
}
