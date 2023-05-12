import { db } from "@/lib/db";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

export default async function EventsList() {
  const events = await db.event.findMany();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Left Option</TableHead>
          <TableHead>Right Option</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id} className="hover:cursor-pointer">
            <TableCell>
              <Link href={`/admin/events/${event.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-edit"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </Link>
            </TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell>{event.leftOption}</TableCell>
            <TableCell>{event.rightOption}</TableCell>
            <TableCell>{event.startTime.toLocaleString()}</TableCell>
            <TableCell>{event.endTime.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
