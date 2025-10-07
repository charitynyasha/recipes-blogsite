// app/components/UserImpressionsList.tsx
import UserImpressionCard  from "./userImpression";

export default async function UserImpressionsList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/userImpressions`,
    { cache: "no-store" }
  );
  const items = await res.json();

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {items.map((item: any) => (
        <UserImpressionCard key={item._id} item={item} />
      ))}
    </div>
  );
}
