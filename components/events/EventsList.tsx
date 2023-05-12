import { db } from "@/lib/db";

export default async function EventsList() {
  const events = await db.event.findMany();

  return (
    <>
      <h1> Events List </h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.description}</h2>
          <p>{event.leftOption}</p>
          <p>{event.rightOption}</p>
        </div>
      ))}
    </>
  );
}
