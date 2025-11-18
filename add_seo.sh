# add_seo.sh — run from believers-temple-ag/
mkdir -p src/hooks public

# 1) SEO hook
mkdir -p src/hooks
cat > src/hooks/useSEO.ts <<'EOF'
type SEOOptions = {
  title: string;
  description?: string;
  image?: string;
  type?: string; // e.g. website, article
  url?: string;
};

function upsertMeta(property: string, content: string, attr: 'name'|'property' = 'name') {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({ title, description, image, type = 'website', url }: SEOOptions) {
  if (typeof document !== 'undefined') {
    document.title = title;
    upsertMeta('description', description || '');
    // Open Graph
    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description || '', 'property');
    upsertMeta('og:type', type, 'property');
    upsertMeta('og:url', url || window.location.href, 'property');
    if (image) upsertMeta('og:image', image, 'property');
  }
}
EOF

# 2) Favicon (simple blue shield with cross)
cat > public/favicon.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1d4ed8"/>
      <stop offset="1" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <path d="M32 4l22 8v16c0 12.7-9.1 24.7-22 28C19.1 52.7 10 40.7 10 28V12l22-8z" fill="url(#g)"/>
  <rect x="29" y="16" width="6" height="26" rx="1" fill="#fff"/>
  <rect x="19" y="26" width="26" height="6" rx="1" fill="#fff"/>
</svg>
EOF

# 3) Web manifest
cat > public/manifest.webmanifest <<'EOF'
{
  "name": "Believers Temple AG",
  "short_name": "BTAG",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1e3a8a",
  "theme_color": "#1d4ed8",
  "icons": [
    { "src": "/favicon.svg", "sizes": "64x64 128x128 256x256", "type": "image/svg+xml", "purpose": "any" }
  ]
}
EOF

# 4) Update index.html <head> (idempotent overwrite)
cat > index.html <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Believers Temple AG</title>
    <meta name="description" content="Believers Temple Assemblies of God – a Christ-centered community in Accra." />
    <meta property="og:site_name" content="Believers Temple AG" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/images/church_banner.jpg" />
    <meta name="theme-color" content="#1d4ed8" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="manifest" href="/manifest.webmanifest" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# 5) Update each page to use SEO (overwrite with SEO-enabled versions)
cat > src/pages/Home.tsx <<'EOF'
import React from "react";
import Hero from "../components/Hero";
import CardLeader from "../components/CardLeader";
import { leadershipData } from "../data/leadership";
import { useSEO } from "../hooks/useSEO";

const Home: React.FC = () => {
  useSEO({
    title: "Believers Temple AG | Home",
    description: "Welcome to Believers Temple Assemblies of God, Accra. Join us for worship, teaching, and community.",
    image: "/images/church_banner.jpg",
  });

  return (
    <>
      <Hero />
      <section className="py-16 text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-6">Our Mission</h3>
        <p className="max-w-3xl mx-auto text-gray-700">
          To reach the lost, disciple believers, and empower the church through the word of God and the Holy Spirit.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <img src="/images/church-building-placeholder.jpg" alt="Church building" className="w-80 h-56 object-cover rounded shadow" />
          <img src="/images/congregation-placeholder.jpg" alt="Congregation worship" className="w-80 h-56 object-cover rounded shadow" />
          <img src="/images/pastor-placeholder.jpg" alt="Pastor preaching" className="w-80 h-56 object-cover rounded shadow" />
        </div>
      </section>

      <section className="py-16 bg-blue-50 text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-6">Meet Our Leaders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center px-6">
          <CardLeader
            photo={leadershipData.seniorPastor.photo}
            name={leadershipData.seniorPastor.name}
            line1={leadershipData.seniorPastor.title}
          />
          <CardLeader
            photo={leadershipData.associatePastors[0].photo}
            name={leadershipData.associatePastors[0].name}
            line1={leadershipData.associatePastors[0].title}
          />
          <CardLeader
            photo={leadershipData.board[0].photo}
            name={leadershipData.board[0].name}
            line1={leadershipData.board[0].title}
          />
        </div>
        <div className="mt-8">
          <a href="/leadership" className="inline-block bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-600">
            View All Leaders
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
EOF

cat > src/pages/About.tsx <<'EOF'
import React from "react";
import { useSEO } from "../hooks/useSEO";

const About: React.FC = () => {
  useSEO({
    title: "About | Believers Temple AG",
    description: "Learn about our mission, vision, and what we believe at Believers Temple Assemblies of God.",
    image: "/images/about-placeholder.jpg",
  });

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-4">About Believers Temple AG</h3>
      <p className="max-w-3xl mx-auto text-gray-700">
        Believers Temple Assemblies of God is a community of believers devoted to worship, service, and spiritual growth.
        We exist to glorify God, strengthen families, and make disciples of all nations.
      </p>
      <img src="/images/about-placeholder.jpg" alt="About our church" className="mx-auto mt-6 w-96 h-64 object-cover rounded shadow" />
    </div>
  );
};

export default About;
EOF

cat > src/pages/Ministries.tsx <<'EOF'
import React from "react";
import { useSEO } from "../hooks/useSEO";

const Ministries: React.FC = () => {
  useSEO({
    title: "Ministries | Believers Temple AG",
    description: "Explore ministries at Believers Temple AG: Youth, Women’s Fellowship, Men’s Ministry, Choir & Worship, Outreach.",
    image: "/images/ministries-placeholder.jpg",
  });

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6">Our Ministries</h3>
      <ul className="space-y-3 text-gray-700">
        <li>Youth Ministry</li>
        <li>Women’s Fellowship</li>
        <li>Men’s Ministry</li>
        <li>Choir & Worship Team</li>
        <li>Outreach Ministry</li>
      </ul>
      <img src="/images/ministries-placeholder.jpg" alt="Ministries" className="mx-auto mt-8 w-96 h-64 object-cover rounded shadow" />
    </div>
  );
};

export default Ministries;
EOF

cat > src/pages/Events.tsx <<'EOF'
import React from "react";
import { useSEO } from "../hooks/useSEO";

const Events: React.FC = () => {
  useSEO({
    title: "Events | Believers Temple AG",
    description: "See upcoming services and gatherings at Believers Temple AG.",
    image: "/images/events-placeholder.jpg",
  });

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6">Upcoming Events</h3>
      <div className="max-w-2xl mx-auto space-y-4 text-gray-700">
        <div className="p-4 border rounded shadow">
          <h4 className="text-xl font-semibold text-blue-600">Sunday Worship Service</h4>
          <p>Every Sunday at 9:00 AM | Main Auditorium</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h4 className="text-xl font-semibold text-blue-600">Midweek Prayer & Teaching</h4>
          <p>Wednesdays at 6:00 PM | Prayer Hall</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h4 className="text-xl font-semibold text-blue-600">Youth Fellowship</h4>
          <p>Saturdays at 4:00 PM | Youth Center</p>
        </div>
      </div>
      <img src="/images/events-placeholder.jpg" alt="Events" className="mx-auto mt-8 w-96 h-64 object-cover rounded shadow" />
    </div>
  );
};

export default Events;
EOF

cat > src/pages/Leadership.tsx <<'EOF'
import React from "react";
import { leadershipData } from "../data/leadership";
import CardLeader from "../components/CardLeader";
import { useSEO } from "../hooks/useSEO";

const Leadership: React.FC = () => {
  useSEO({
    title: "Leadership | Believers Temple AG",
    description: "Meet the Senior Pastor, Associate Pastors, Church Board, and Departmental Leaders of Believers Temple AG.",
    image: "/images/senior-pastor-placeholder.jpg",
  });

  const { seniorPastor, associatePastors, board, departmentalLeaders } = leadershipData;

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6">Our Leadership</h3>

      <section className="mb-12">
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Senior Pastor</h4>
        <div className="flex flex-col items-center">
          <CardLeader
            photo={seniorPastor.photo}
            name={seniorPastor.name}
            line1={seniorPastor.title}
            line2={seniorPastor.bio}
          />
        </div>
      </section>

      <section className="mb-12">
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Associate Pastors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {associatePastors.map((p, i) => (
            <CardLeader key={i} photo={p.photo} name={p.name} line1={p.title} line2={p.bio} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Church Board Members</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {board.map((b, i) => (
            <CardLeader key={i} photo={b.photo} name={b.name} line1={b.title} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-2xl font-semibold text-blue-600 mb-4">Departmental Leaders</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {departmentalLeaders.map((d, i) => (
            <CardLeader key={i} photo={d.photo} name={`${d.dept} Leader`} line1={d.name} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Leadership;
EOF

cat > src/pages/Give.tsx <<'EOF'
import React from "react";
import { useSEO } from "../hooks/useSEO";

const Give: React.FC = () => {
  useSEO({
    title: "Give | Believers Temple AG",
    description: "Support the ministry of Believers Temple AG. Give via Mobile Money or bank transfer.",
    image: "/images/give-placeholder.jpg",
  });

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6">Give & Support</h3>
      <p className="max-w-2xl mx-auto text-gray-700">
        Your giving helps us spread the gospel and support our community. You can give via Mobile Money, bank transfer, or in person during services.
      </p>
      <div className="mt-6 space-y-3 text-blue-800 font-medium">
        <p>MTN MoMo: 055 123 4567 - Believers Temple AG</p>
        <p>Bank: GCB Bank | Account: 123456789 | Branch: Accra Central</p>
      </div>
      <img src="/images/give-placeholder.jpg" alt="Giving" className="mx-auto mt-8 w-96 h-64 object-cover rounded shadow" />
    </div>
  );
};

export default Give;
EOF

cat > src/pages/Contact.tsx <<'EOF'
import React from "react";
import { useSEO } from "../hooks/useSEO";

const Contact: React.FC = () => {
  useSEO({
    title: "Contact | Believers Temple AG",
    description: "Get in touch with Believers Temple AG in Accra for inquiries and prayer requests.",
    image: "/images/contact-placeholder.jpg",
  });

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6">Contact Us</h3>
      <p className="max-w-2xl mx-auto text-gray-700 mb-4">
        Have questions or prayer requests? We’d love to hear from you.
      </p>
      <p>Email: believers.temple.ag@gmail.com</p>
      <p>Phone: +233 55 123 4567</p>
      <p>Address: Believers Temple AG, Accra, Ghana</p>
      <img src="/images/contact-placeholder.jpg" alt="Contact" className="mx-auto mt-8 w-96 h-64 object-cover rounded shadow" />
    </div>
  );
};

export default Contact;
EOF

echo "✅ SEO hook, page metadata, favicon, and head tags added."
echo "Now restart the dev server: npm run dev"

