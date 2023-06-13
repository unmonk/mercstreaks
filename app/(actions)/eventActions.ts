async function fetchEvents(date: string, useParam: boolean = false) {
  const fetchUrl = useParam ? `/api/events/${date}` : "/api/events"
  const res = await fetch(fetchUrl)
  if (!res.ok) {
    throw new Error("Failed to fetch events")
  }
  return res.json()
}

export { fetchEvents }
