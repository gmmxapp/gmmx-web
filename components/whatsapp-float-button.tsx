import { getWhatsAppLink } from "@/lib/site";

export function WhatsAppFloatButton() {
  return (
    <a
      href={getWhatsAppLink("Hi GMMX team, I want a demo for my gym.")}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp us"
      className="fixed bottom-6 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-1"
    >
      <span className="text-lg">💬</span>
      WhatsApp us
    </a>
  );
}
