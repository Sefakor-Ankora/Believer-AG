export type EventItem = {
id: string;
title: string;
startDate: string; // ISO: YYYY-MM-DD
endDate?: string; // ISO (inclusive)
time?: string; // human-readable time range
href?: string; // deep link
};
// --- Utility: format helpers
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;


export function formatDateShort(d: Date) {
return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}


export function formatRange(startISO: string, endISO?: string) {
const s = new Date(startISO);
if (!endISO) return formatDateShort(s);
const e = new Date(endISO);
// Same month → compact end
if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
return `${formatDateShort(s)} – ${e.getDate()} ${MONTHS[e.getMonth()]}`;
}
return `${formatDateShort(s)} – ${formatDateShort(e)}`;
}


export function isUpcoming(ev: EventItem, now = new Date()): boolean {
const s = new Date(ev.startDate);
const e = new Date(ev.endDate ?? ev.startDate);
// keep today and future (inclusive of endDate)
const endAtMidnight = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
return endAtMidnight.getTime() >= now.getTime();
}


export function sortByStart(a: EventItem, b: EventItem) {
return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
}
const TODAY = new Date();
// If you want to lock to a specific calendar, set TODAY = new Date("2025-11-24");


// Revival: Mon 24 → Fri (same week)
function thisWeekRevival(base = TODAY): EventItem {
// force to Monday of current week if today is Monday; else use today as start
const start = new Date(base);
// Ensure start is today (as requested: from today Monday 24)
const end = new Date(start);
end.setDate(start.getDate() + (5 - 1)); // Mon→Fri = +4; if start is Monday (24), Fri is 28
const iso = (d: Date) => d.toISOString().slice(0, 10);
return {
id: `revival-${iso(start)}`,
title: "Revival",
startDate: iso(start),
endDate: iso(end),
time: "7:00pm – 8:30pm",
href: "/events",
};
}


// Annual Harvest & Thanksgiving: coming Sunday of the same week
function upcomingSundayHarvest(base = TODAY): EventItem {
const d = new Date(base);
const day = d.getDay();
const delta = (7 - day) % 7; // days until Sunday (0..6)
const sunday = new Date(d);
sunday.setDate(d.getDate() + delta);
const iso = sunday.toISOString().slice(0, 10);
return {
id: `harvest-${iso}`,
title: "Annual Harvest & Thanksgiving",
startDate: iso,
time: "",
href: "/events",
};
}


// Add any standing/recurring items here (use real ISO dates)
const STATIC_EVENTS: EventItem[] = [
// Example recurring placeholders (ensure dates are future or current week)
// { id: 'sunday-service-2025-12-07', title: 'Sunday Worship Service', startDate: '2025-12-07', time: '9:00am', href: '/events' },
];


// Compose list: dynamic (revival + harvest) + static
const BASE_EVENTS: EventItem[] = [thisWeekRevival(), upcomingSundayHarvest(), ...STATIC_EVENTS];


export function getUpcomingEvents(now = new Date()): EventItem[] {
return BASE_EVENTS.filter((e) => isUpcoming(e, now)).sort(sortByStart);
}


export function getAllEvents(): EventItem[] {
return [...BASE_EVENTS].sort(sortByStart);
}


export function findEventById(id: string): EventItem | undefined {
return BASE_EVENTS.find((e) => e.id === id);
}

