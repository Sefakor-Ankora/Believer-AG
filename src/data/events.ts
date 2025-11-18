// src/data/events.ts
export type EventItem = {
  id: string;
  title: string;
  date?: string;    // human-readable date range
  time?: string;    // human-readable time range
  href?: string;    // deep link (fallback /events)
};

export const upcomingEvents: EventItem[] = [
  // ✅ New Revival event (comes first)
  {
    id: "revival-2025-11",
    title: "Revival",
    date: "Mon 10 Nov – Wed 12 Nov",
    time: "7:00pm – 8:30pm",
    href: "/events",
  },
  { id: "1", title: "Sunday Worship Service", date: "Every Sunday", time: "9:00am", href: "/events" },
  { id: "2", title: "Midweek Prayer & Teaching", date: "Wednesdays", time: "7:00pm", href: "/events" },
  { id: "3", title: "Youth Fellowship", date: "Mondays", time: "7:00pm", href: "/events" },
  { id: "4", title: "Community Outreach", date: "Next Month", href: "/events" },
];
