import { Footer } from "@/components/footer";
import { getWhatsAppLink, siteConfig } from "@/lib/site";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | GMMX Support",
  description: "Get in touch with the GMMX team for sales, support, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <p className="text-[#FF5C73] font-bold tracking-widest text-sm uppercase mb-6">Get in touch</p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight italic">
              Let's build <br /> your <span className="text-[#FF5C73]">Empire.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium mb-12 max-w-md">
              Have questions about pricing, features, or migration? Our team is here to help you scale.
            </p>

            <div className="space-y-8">
              <a href={getWhatsAppLink("Hi GMMX team, I need some help.")} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5C73]/10 border border-[#FF5C73]/20 group-hover:bg-[#FF5C73] transition-all">
                  <MessageSquare className="text-[#FF5C73] group-hover:text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">WhatsApp Sales</p>
                  <p className="text-lg font-bold text-white">Click to chat</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  <Mail className="text-slate-400" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email Support</p>
                  <p className="text-lg font-bold text-white">support@gmmx.app</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="text-slate-400" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">HQ</p>
                  <p className="text-lg font-bold text-white italic">Bangalore, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5C73]/20 to-transparent blur-[100px] -z-10" />
             <div className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-8">Send a message</h3>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Name</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FF5C73] transition-colors outline-none" placeholder="Enter your name" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Gym Name</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FF5C73] transition-colors outline-none" placeholder="Your fitness center name" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                      <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FF5C73] transition-colors outline-none resize-none" placeholder="How can we help?" />
                   </div>
                   <button className="w-full bg-[#FF5C73] text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(255,92,115,0.3)] hover:opacity-90 transition-all uppercase tracking-widest text-sm">Send Inquiry</button>
                </div>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
