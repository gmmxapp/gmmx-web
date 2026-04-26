type Props = { params: Promise<{ slug: string }> };

export default async function ContactPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="container">
      <h1>Contact</h1>
      <p>Phone support available 7AM to 9PM.</p>
      <p><a href={`/${slug}/dashboard`}>Back to dashboard</a></p>
    </main>
  );
}
