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
    <main className="container">
      <section className="card" style={{ borderTop: `8px solid ${data.themePrimary}` }}>
        <h1>{data.gymName}</h1>
        <p>{data.location}</p>
        <p>{data.about}</p>
      </section>
    </main>
  );
}
