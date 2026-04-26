type Props = { params: Promise<{ slug: string }> };

export default async function AboutPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="container">
      <h1>About</h1>
      <p>India-first fitness operations powered by GMMX.</p>
      <p><a href={`/${slug}/plans`}>See plans and benefits.</a></p>
    </main>
  );
}
