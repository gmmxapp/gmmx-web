export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071225] backdrop-blur-3xl">
      <div className="relative flex flex-col items-center">
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5C73]/40 blur-[40px] animate-pulse"></div>
        {/* Loading text/logo */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
          <span className="text-2xl font-black text-white animate-pulse">Gx</span>
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50 animate-pulse">Loading Workspace</p>
      </div>
    </div>
  );
}
