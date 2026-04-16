import Image from "next/image";

const features = [
  {
    title: "Smart lead capture",
    description: "Turn website visitors and walk-ins into trackable leads with auto follow-up workflows.",
    image: "/rightside-hero.png",
    alt: "GMMX dashboard for lead and analytics tracking"
  },
  {
    title: "QR attendance in seconds",
    description: "Generate secure daily QR codes and simplify check-ins for members, trainers, and front desk teams.",
    image: "/mobile-app-preview.svg",
    alt: "GMMX QR attendance and mobile check-in preview"
  },
  {
    title: "WhatsApp fee reminders",
    description: "Automate reminder nudges that recover dues on time without staff manually chasing every member.",
    image: "/right-side.png",
    alt: "WhatsApp fee reminder automation preview"
  },
  {
    title: "Lead CRM for follow-ups",
    description: "Track walk-ins, trial leads, and conversion stages with owner-level visibility and performance insights.",
    image: "/rightside-hero.png",
    alt: "Lead CRM pipeline view"
  },
  {
    title: "Trainer workflows",
    description: "Daily checklists, assigned members, and progress logs to keep coaching quality consistent.",
    image: "/mobile-app-preview.svg",
    alt: "Trainer workflow and member tasking preview"
  },
  {
    title: "Owner dashboards",
    description: "Understand revenue trends, attendance consistency, and branch-level health from one dashboard.",
    image: "/right-side.png",
    alt: "Owner analytics dashboard"
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="mt-20 scroll-mt-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="section-kicker">Product Features</p>
          <h2 className="section-title">Everything your gym needs to grow reliably</h2>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className="feature-card overflow-hidden"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="relative -mx-5 -mt-5 mb-4">
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              <Image
                src={feature.image}
                width={480}
                height={280}
                alt={feature.alt}
                className="h-36 w-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
