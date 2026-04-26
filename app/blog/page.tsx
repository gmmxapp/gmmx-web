import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog | GMMX Insights",
  description: "Expert advice on gym growth, member retention, and fitness business automation.",
};

const blogPosts = [
  {
    title: "5 Ways to Increase Member Retention in 2026",
    excerpt: "Retention is the secret sauce for gym growth. Learn how automated reminders can keep your members coming back.",
    date: "April 15, 2026",
    category: "Retention"
  },
  {
    title: "The Power of WhatsApp CRM for Gym Owners",
    excerpt: "Stop losing leads in your WhatsApp chats. Discover how an integrated CRM can double your conversion rate.",
    date: "March 28, 2026",
    category: "Growth"
  },
  {
    title: "Transitioning to Biometric Attendance",
    excerpt: "Everything you need to know about setting up fingerprint and face-id check-ins for your facility.",
    date: "March 10, 2026",
    category: "Operations"
  }
];

export default function BlogPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight italic">GMMX <span className="text-[#FF5C73]">Insights</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Expert advice to help you build a more profitable and automated fitness business.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:border-[#FF5C73]/50 transition-all rounded-[2rem] overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-[#FF5C73]/20 to-transparent flex items-center justify-center">
                 <span className="text-4xl font-black text-white/20 group-hover:text-white/40 transition-colors italic">BLOG</span>
              </div>
              <CardHeader className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF5C73] bg-[#FF5C73]/10 px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-slate-500 font-medium">{post.date}</span>
                </div>
                <CardTitle className="text-2xl font-bold text-white group-hover:text-[#FF5C73] transition-colors leading-tight">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-slate-400 font-medium leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link href="/contact" className="flex items-center gap-2 text-sm font-black text-white group-hover:gap-4 transition-all">
                  Read Article <ArrowRight size={16} className="text-[#FF5C73]" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
