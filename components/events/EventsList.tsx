import { db } from "@/lib/db";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default async function EventsList() {
  const events = await db.event.findMany();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Question</TableHead>
          <TableHead>Left Option</TableHead>
          <TableHead>Right Option</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
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
