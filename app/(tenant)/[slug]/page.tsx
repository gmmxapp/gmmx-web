import { fetchPublicGymProfile } from "@/lib/api";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export default async function TenantHome({ params }: Props) {
  const { slug } = await params;
  let data;
  
  try {
    data = await fetchPublicGymProfile(slug);
  } catch (error) {
    notFound();
  }

  if (!data || !data.hasMicrosite) {
    // If they disabled the microsite feature, simply redirect to their login page
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Premium Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl" style={{ backgroundColor: data.themePrimary, color: '#000' }}>
              {data.gymName.charAt(0).toUpperCase()}
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">
              {data.gymName}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-bold tracking-widest text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
            <Link href="#plans" className="text-sm font-bold tracking-widest text-zinc-400 hover:text-white transition-colors">PLANS</Link>
            <Link href={`/join`}>
              <Button className="h-12 px-8 font-black tracking-widest rounded-full transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: data.themePrimary, color: '#000' }}>
                JOIN NOW
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Dynamic Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: data.themePrimary }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: data.themePrimary }}></div>
          </div>

          <div className="container relative z-10 mx-auto px-6 text-center">
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400">Premium Fitness Experience</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
              PUSH YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">LIMITS</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              {data.about || "Transform your body and mind with our elite training programs and state-of-the-art facility."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href={`/join`}>
                <Button className="h-16 px-12 text-lg font-black tracking-widest rounded-full transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]" style={{ backgroundColor: data.themePrimary, color: '#000' }}>
                  START TRAINING
                </Button>
              </Link>
              <Link href={`/plans`} className="text-lg font-bold tracking-widest hover:text-zinc-300 transition-colors border-b-2 border-white/20 pb-1">
                VIEW MEMBERSHIPS
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <div className="w-px h-20 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* Feature Grid - Dark Cards */}
        <section className="py-32 bg-[#080808]" id="about">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Expert Coaching", desc: "Certified professionals dedicated to your growth and form.", icon: "🎯" },
                { title: "Elite Equipment", desc: "Modern, well-maintained gear for maximum performance.", icon: "⚡" },
                { title: "Dynamic Community", desc: "A supportive environment of like-minded fitness enthusiasts.", icon: "🤝" }
              ].map((feature, i) => (
                <div key={i} className="group p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500">
                  <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{feature.icon}</div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase italic">{feature.title}</h3>
                  <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Section */}
        <section className="py-40 relative overflow-hidden" id="plans">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-white/5 rounded-full blur-[100px] -z-10"></div>
          
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic">
              Ready to join the <br />
              <span style={{ color: data.themePrimary }}>{data.gymName}</span> squad?
            </h2>
            
            <div className="inline-grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-[40px] bg-white/5 backdrop-blur-2xl border border-white/10">
              <div className="p-10 text-left">
                <p className="text-zinc-400 text-sm font-bold tracking-widest mb-2 uppercase">Contact Us</p>
                <a href={`https://wa.me/${data.contactPhone}`} className="text-3xl font-black hover:opacity-80 transition-opacity">
                  {data.contactPhone}
                </a>
              </div>
              <div className="p-10 text-left border-t sm:border-t-0 sm:border-l border-white/10">
                <p className="text-zinc-400 text-sm font-bold tracking-widest mb-2 uppercase">Location</p>
                <p className="text-xl font-bold leading-tight">{data.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-500 text-sm font-medium">
            © {new Date().getFullYear()} {data.gymName}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-zinc-500 text-sm font-bold tracking-widest">
            <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link href="/terms" className="hover:text-white transition-colors">TERMS</Link>
          </div>
          <div className="font-black text-xl italic tracking-tighter" style={{ color: data.themePrimary }}>
            GMMX.
          </div>
        </div>
      </footer>
    </div>
  );
}
