const testimonials = [
  {
    quote:
      "GMMX helped us move from manual register books to automated attendance and reminders in one week.",
    name: "Anand Kumar",
    role: "Owner, Iron Forge Fitness"
  },
  {
    quote:
      "The microsite alone boosted trial inquiries because members could find plans and WhatsApp us instantly.",
    name: "Mohana Priya",
    role: "Founder, Coreline Studio"
  },
  {
    quote:
      "Our trainers now track progress in one place and owner dashboards make decisions faster.",
    name: "Harish",
    role: "Operations Lead, Pulse Club"
  }
];

export function TestimonialSection() {
  return (
    <section id="clients" className="mt-20 scroll-mt-24">
      <p className="section-kicker">Testimonials</p>
      <h2 className="section-title">Built for real gym workflows</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">“{item.quote}”</p>
            <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{item.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
