import React, { useMemo } from 'react';
import { getUpcomingEvents, formatRange } from '../data/events';


const Events: React.FC = () => {
const upcoming = useMemo(() => getUpcomingEvents(), []);
const featured = upcoming.find(e => e.title.toLowerCase().includes('revival')) || upcoming[0];
const others = upcoming.filter(e => e !== featured);


return (
<div className="py-12 px-6 max-w-5xl mx-auto">
<h3 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Upcoming Events</h3>


{featured && (
<section className="mb-10">
<div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow">
<span className="inline-block rounded bg-blue-700 px-2 py-1 text-xs font-semibold text-white mb-3">Featured</span>
<h4 className="text-2xl font-bold text-blue-800">{featured.title}</h4>
<p className="text-blue-900/90 mt-1">{formatRange(featured.startDate, featured.endDate)}{featured.time ? ` • ${featured.time}` : ''}</p>
<div className="mt-4">
<a href={featured.href || '/events'} className="inline-block rounded bg-blue-700 px-4 py-2 text-white font-semibold hover:bg-blue-600">More Details</a>
</div>
</div>
</section>
)}


<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
{others.map(e => (
<div key={e.id} className="rounded-lg border p-5 shadow-sm hover:shadow">
<h5 className="text-xl font-semibold text-blue-700">{e.title}</h5>
<p className="text-gray-700 mt-1">{formatRange(e.startDate, e.endDate)}{e.time ? ` • ${e.time}` : ''}</p>
<div className="mt-4">
<a href={e.href || '/events'} className="inline-block rounded border border-blue-200 bg-white px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50">Details</a>
</div>
</div>
))}
</section>


{upcoming.length === 0 && (
<p className="text-center text-gray-600 mt-8">No upcoming events yet. Please check back soon.</p>
)}
</div>
);
};


export default Events;