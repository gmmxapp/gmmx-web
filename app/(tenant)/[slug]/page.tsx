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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight" style={{ color: data.themePrimary }}>
              {data.gymName}
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href={`/about`} className="text-sm font-medium hover:underline underline-offset-4">About</Link>
            <Link href={`/plans`} className="text-sm font-medium hover:underline underline-offset-4">Plans</Link>
            <Link href={`/join`}>
              <Button size="sm" style={{ backgroundColor: data.themePrimary }}>Join Now</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative py-24 px-6 text-center bg-zinc-900 text-white overflow-hidden"
          style={{ borderBottom: `4px solid ${data.themePrimary}` }}
        >
          <div className="container relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              WELCOME TO <span style={{ color: data.themePrimary }}>{data.gymName.toUpperCase()}</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              {data.about || "Transform your body and mind with our professional training and state-of-the-art equipment."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/join`}>
                <Button size="lg" className="px-10 h-14 text-lg font-bold" style={{ backgroundColor: data.themePrimary }}>
                  GET STARTED
                </Button>
              </Link>
              <Link href={`/contact`}>
                <Button variant="outline" size="lg" className="px-10 h-14 text-lg font-bold bg-transparent text-white border-white hover:bg-white hover:text-black">
                  CONTACT US
                </Button>
              </Link>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-transparent rotate-12 scale-150"></div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-zinc-50 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Expert Trainers</CardTitle>
                </CardHeader>
                <CardContent>
                  Personalized attention from certified professionals to help you reach your goals faster and safer.
                </CardContent>
              </Card>
              <Card className="bg-zinc-50 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Flexible Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  Monthly, quarterly, and annual memberships tailored to your fitness journey and budget.
                </CardContent>
              </Card>
              <Card className="bg-zinc-50 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">24/7 Access</CardTitle>
                </CardHeader>
                <CardContent>
                  Train whenever fits your schedule. Our facility is equipped for all levels of athletes.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location & CTA */}
        <section className="py-20 border-t">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">{data.location}</p>
            <div className="bg-zinc-100 p-8 rounded-2xl inline-block">
              <p className="font-bold mb-2">Questions? Call or WhatsApp</p>
              <a 
                href={`https://wa.me/${data.contactPhone}`} 
                className="text-2xl font-black hover:underline"
                style={{ color: data.themePrimary }}
              >
                {data.contactPhone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-zinc-950 text-zinc-500">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} {data.gymName}. Powered by GMMX.</p>
        </div>
      </footer>
    </div>
  );
}
