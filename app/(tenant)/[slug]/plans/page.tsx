type Props = { params: Promise<{ slug: string }> };

export default async function PlansPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="container">
      <h1>Gym Plans</h1>
      <p>Choose a package for your team and member growth.</p>
      <p><a href={`/${slug}/join`}>Ready to enroll? Start here.</a></p>
    </main>
  );
}
