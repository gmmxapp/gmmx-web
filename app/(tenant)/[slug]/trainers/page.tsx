type Props = { params: Promise<{ slug: string }> };

export default async function TrainersPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="container">
      <h1>Trainers</h1>
      <p>Our certified trainers are ready to help.</p>
      <p><a href={`/${slug}/contact`}>Contact front desk for trainer slots.</a></p>
    </main>
  );
}
