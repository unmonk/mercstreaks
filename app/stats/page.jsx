"use client";
import { useSearchParams, useParams, usePathname } from "next/navigation";

export default function Stats() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  console.log(searchParams.get("timezone"));
  return <div></div>;
}
