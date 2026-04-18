const testimonials = [
  {
    quote: "GMMX helped us move from manual register books to automated attendance in one week.",
    name: "Anand Kumar",
    role: "Owner, Iron Forge Fitness"
  },
  {
    quote: "The microsite alone boosted trial inquiries because members could find plans instantly.",
    name: "Mohana Priya",
    role: "Founder, Coreline Studio"
  },
  {
    quote: "Our trainers now track progress in one place and owner dashboards make decisions faster.",
    name: "Harish",
    role: "Operations Lead, Pulse Club"
  },
  {
    quote: "Automated WhatsApp reminders reduced our fee leakage by nearly 40% in two months.",
    name: "Vikram Seth",
    role: "Owner, Titan Gym"
  },
  {
    quote: "The QR check-in is so fast, we don't need a front desk person during rush hours.",
    name: "Sanya",
    role: "Manager, Zen Yoga"
  },
  {
    quote: "Member engagement improved significantly after we started sharing progress charts.",
    name: "Rajesh Chen",
    role: "Founder, Elite MMA"
  }
];

export function TestimonialSection() {
  return (
    <section id="clients" className="scroll-mt-24 bg-[#05050A]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-[#FF5C73] font-bold tracking-widest text-xs uppercase mb-1 underline underline-offset-4 decoration-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Built for real gym workflows</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div 
              key={`${item.name}-${idx}`} 
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-[#FF5C73]/30"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor" className="text-[#FF5C73]">
                  <path d="M11.4286 0L17.1429 11.25H11.4286C11.4286 11.25 14.2857 22.5 5.71429 30V22.5C5.71429 22.5 0 18.75 0 11.25V0H11.4286ZM34.2857 0L40 11.25H34.2857C34.2857 11.25 37.1429 22.5 28.5714 30V22.5C28.5714 22.5 22.8571 18.75 22.8571 11.25V0H34.2857Z" />
                </svg>
              </div>
              
              <p className="relative z-10 text-base font-medium leading-relaxed text-slate-300">“{item.quote}”</p>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-bold text-[#FF5C73] text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
