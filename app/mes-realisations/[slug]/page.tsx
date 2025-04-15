export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  //if (slug === "test") {
  //  notFound();
  //}

  return <div>My Post: {slug}</div>;
}
