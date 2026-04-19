export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071225] backdrop-blur-3xl">
      <div className="relative flex flex-col items-center">
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[50px] animate-pulse"></div>
        
        {/* Loading graphics */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-end space-x-1.5 h-8">
            <div className="w-1.5 bg-blue-400 rounded-full animate-[bounce_1s_infinite] h-4"></div>
            <div className="w-1.5 bg-indigo-400 rounded-full animate-[bounce_1s_0.2s_infinite] h-8"></div>
            <div className="w-1.5 bg-purple-400 rounded-full animate-[bounce_1s_0.4s_infinite] h-5"></div>
          </div>
        </div>
        
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white/70 animate-pulse">
          Loading Microsite
        </p>
      </div>
    </div>
  );
}
