# create_files.sh — run from project root
mkdir -p src/components src/pages src/data

# ---------------- src/data/leadership.ts ----------------
cat > src/data/leadership.ts <<'EOF'
export const leadershipData = {
  seniorPastor: {
    name: "Rev. [Senior Pastor’s Name]",
    title: "Senior Pastor",
    photo: "/images/senior-pastor-placeholder.jpg",
    bio: "Our Senior Pastor provides spiritual oversight and vision for Believers Temple AG, guiding the congregation in prayer, teaching, and leadership.",
  },
  associatePastors: [
    { name: "Rev. [Associate Pastor 1]", title: "Associate Pastor", photo: "/images/associate-pastor-1-placeholder.jpg", bio: "Departmental coordination and pastoral care." },
    { name: "Rev. [Associate Pastor 2]", title: "Associate Pastor", photo: "/images/associate-pastor-2-placeholder.jpg", bio: "Teaching and discipleship." },
    { name: "Rev. [Associate Pastor 3]", title: "Associate Pastor", photo: "/images/associate-pastor-3-placeholder.jpg", bio: "Outreach and evangelism." }
  ],
  board: [
    { name: "[Board Member 1]", title: "Elder / Trustee", photo: "/images/board-member-1-placeholder.jpg" },
    { name: "[Board Member 2]", title: "Elder / Trustee", photo: "/images/board-member-2-placeholder.jpg" },
    { name: "[Board Member 3]", title: "Elder / Trustee", photo: "/images/board-member-3-placeholder.jpg" }
  ],
  departmentalLeaders: [
    { dept: "Youth Ministry", name: "[Leader Name]", photo: "/images/leader-1-placeholder.jpg" },
    { dept: "Women’s Fellowship", name: "[Leader Name]", photo: "/images/leader-2-placeholder.jpg" },
    { dept: "Men’s Ministry", name: "[Leader Name]", photo: "/images/leader-3-placeholder.jpg" },
    { dept: "Choir & Worship", name: "[Leader Name]", photo: "/images/leader-4-placeholder.jpg" },
    { dept: "Outreach", name: "[Leader Name]", photo: "/images/leader-5-placeholder.jpg" },
    { dept: "Media Team", name: "[Leader Name]", photo: "/images/leader-6-placeholder.jpg" }
  ]
} as const;

export type Associate = typeof leadershipData.associatePastors[number];
export type Board = typeof leadershipData.board[number];
export type DeptLeader = typeof leadershipData.departmentalLeaders[number];
EOF

# ---------------- src/components/Navbar.tsx ----------------
cat > src/components/Navbar.tsx <<'EOF'
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded hover:text-blue-200";
const active = "text-white";
const inactive = "text-blue-100";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-blue-700/95 backdrop-blur text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold">Believers Temple AG</Link>

        <ul className="hidden md:flex items-center space-x-2">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/ministries", label: "Ministries" },
            { to: "/events", label: "Events" },
            { to: "/leadership", label: "Leadership" },
            { to: "/give", label: "Give" },
            { to: "/contact", label: "Contact" },
          ].map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded p-2 hover:bg-blue-600"
          onClick={() => setOpen(!open)}
        >
          <span>☰</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-blue-600">
          <ul className="flex flex-col p-2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/ministries", label: "Ministries" },
              { to: "/events", label: "Events" },
              { to: "/leadership", label: "Leadership" },
              { to: "/give", label: "Give" },
              { to: "/contact", label: "Contact" },
            ].map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block ${linkBase} ${isActive ? active : inactive}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
EOF

# ---------------- src/components/Footer.tsx ----------------
cat > src/components/Footer.tsx <<'EOF'
import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-blue-900 text-white text-center py-6">
    <p>© {new Date().getFullYear()} Believers Temple Assemblies of God. All rights reserved.</p>
    <p className="text-sm mt-2">Follow us on Facebook | YouTube | WhatsApp | TikTok</p>
  </footer>
);

export default Footer;
EOF

# ---------------- src/components/Hero.tsx ----------------
cat > src/components/Hero.tsx <<'EOF'
import React from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  image?: string;
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
  image = "/images/church_banner.jpg",
  title = "Welcome to Believers Temple AG",
  subtitle = "A place where faith grows, hearts are healed, and lives are transformed by the power of Christ."
}) => (
  <section
    className="relative bg-cover bg-center text-white text-center py-24 px-4 min-h-[320px] md:min-h-[420px]"
    style={{ backgroundImage: `url('${image}')` }}
  >
    <div className="absolute inset-0 bg-blue-900/60" />
    <div className="relative z-10 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
      <p className="text-base md:text-lg">{subtitle}</p>
      <div className="mt-6 space-x-4">
        <Link to="/events" className="bg-white text-blue-700 font-semibold px-4 py-2 rounded shadow hover:bg-blue-100">Join an Event</Link>
        <Link to="/give" className="bg-blue-800 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700">Give Online</Link>
      </div>
    </div>
  </section>
);

export default Hero;
EOF

# ---------------- src/components/CardLeader.tsx ----------------
cat > src/components/CardLeader.tsx <<'EOF'
import React from "react";

type Props = {
  photo: string;
  name: string;
  line1?: string;
  line2?: string;
};

const CardLeader: React.FC<Props> = ({ photo, name, line1, line2 }) => (
  <div className="bg-white p-4 rounded shadow text-center w-full max-w-xs">
    <img src={photo} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover mb-3" />
    <h5 className="text-xl font-semibold text-blue-800">{name}</h5>
    {line1 && <p className="text-gray-600 mt-1">{line1}</p>}
    {line2 && <p className="text-gray-600 text-sm mt-1">{line2}</p>}
  </div>
);

export default CardLeader;
EOF

# ---------------- src/pages/Home.tsx ----------------
cat > src/pages/Home.tsx <<'EOF'
import React from "react";
import Hero from "../components/Hero";
import CardLeader from "../components/CardLeader";
import { leadershipData } from "../data/leadership";

const Home: React.FC = () => (
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

export default Home;
EOF

# ---------------- src/pages/About.tsx ----------------
cat > src/pages/About.tsx <<'EOF'
import React from "react";

const About: React.FC = () => (
  <div className="py-12 px-8 text-center">
    <h3 className="text-3xl font-semibold text-blue-700 mb-4">About Believers Temple AG</h3>
    <p className="max-w-3xl mx-auto text-gray-700">
      Believers Temple Assemblies of God is a community of believers devoted to worship, service, and spiritual growth.
      We exist to glorify God, strengthen families, and make disciples of all nations.
    </p>
    <img src="/images/about-placeholder.jpg" alt="About our church" className="mx-auto mt-6 w-96 h-64 object-cover rounded shadow" />
  </div>
);

export default About;
EOF

# ---------------- src/pages/Ministries.tsx ----------------
cat > src/pages/Ministries.tsx <<'EOF'
import React from "react";

const Ministries: React.FC = () => (
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

export default Ministries;
EOF

# ---------------- src/pages/Events.tsx ----------------
cat > src/pages/Events.tsx <<'EOF'
import React from "react";

const Events: React.FC = () => (
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

export default Events;
EOF

# ---------------- src/pages/Leadership.tsx ----------------
cat > src/pages/Leadership.tsx <<'EOF'
import React from "react";
import { leadershipData } from "../data/leadership";
import CardLeader from "../components/CardLeader";

const Leadership: React.FC = () => {
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

# ---------------- src/pages/Give.tsx ----------------
cat > src/pages/Give.tsx <<'EOF'
import React from "react";

const Give: React.FC = () => (
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

export default Give;
EOF

# ---------------- src/pages/Contact.tsx ----------------
cat > src/pages/Contact.tsx <<'EOF'
import React from "react";

const Contact: React.FC = () => (
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

export default Contact;
EOF

# ---------------- src/App.tsx ----------------
cat > src/App.tsx <<'EOF'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Ministries from "./pages/Ministries";
import Events from "./pages/Events";
import Leadership from "./pages/Leadership";
import Give from "./pages/Give";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/events" element={<Events />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/give" element={<Give />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
EOF

# ---------------- src/main.tsx ----------------
cat > src/main.tsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

echo "✅ Components & pages created. Now run: npm run dev"

