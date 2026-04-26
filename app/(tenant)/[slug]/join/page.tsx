type Props = { params: Promise<{ slug: string }> };

export default async function JoinPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="container">
      <h1>Join</h1>
      <p>Walk in today and start training.</p>
      <p><a href={`/${slug}/contact`}>Need help? Talk to our team.</a></p>
    </main>
  );
}
