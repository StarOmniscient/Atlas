export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>Idk what to put here for now</h1>
    </div>
  );
}
