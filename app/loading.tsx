export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050A]">
      <div className="relative flex flex-col items-center">
        {/* Glowing background effect */}
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5C73]/10 blur-[80px]"></div>
        
        {/* Circular Spinner */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#FF5C73] animate-spin"></div>
          
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-black text-white">Gx</span>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-white">GMMX</p>
          <div className="flex gap-1">
            <div className="h-1 w-1 rounded-full bg-[#FF5C73] animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1 w-1 rounded-full bg-[#FF5C73] animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1 w-1 rounded-full bg-[#FF5C73] animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
