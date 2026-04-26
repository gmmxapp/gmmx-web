import { fetchPublicGymProfile } from "@/lib/api";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function TenantHome({ params }: Props) {
  const { slug } = await params;
  const data = await fetchPublicGymProfile(slug);

  if (!data.hasMicrosite) {
    // If they disabled the microsite feature, simply redirect to their login page
    redirect("/login");
  }

  return (
    <main className="container space-y-6">
      <section className="card" style={{ borderTop: `8px solid ${data.themePrimary}` }}>
        <h1 className="text-3xl font-black">{data.gymName}</h1>
        <p>{data.location}</p>
        <p>{data.about}</p>
      </section>
      <section className="grid grid-3">
        <a href={`/${slug}/dashboard`} className="card">Dashboard</a>
        <a href={`/${slug}/plans`} className="card">Plans</a>
        <a href={`/${slug}/trainers`} className="card">Trainers</a>
        <a href={`/${slug}/join`} className="card">Join</a>
        <a href={`/${slug}/about`} className="card">About</a>
        <a href={`/${slug}/contact`} className="card">Contact</a>
      </section>
    </main>
  );
}
