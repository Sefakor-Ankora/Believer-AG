import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ministries } from "../data/ministries";

const linkBase = "px-3 py-2 rounded hover:text-blue-200";
const active = "text-white";
const inactive = "text-blue-100";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const deptItems = useMemo(() => ministries, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-blue-700/95 backdrop-blur text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand: logo + stacked text */}
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img src="/images/logo.png" alt="Assemblies of God Logo" className="h-10 w-10 rounded-full select-none" />
          <div className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight">Believers Temple AG</span>
            <span className="text-xs md:text-sm text-blue-100 -mt-0.5 self-center">Amasaman</span>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-2">
          <li>
            <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>About</NavLink>
          </li>

          {/* Departments dropdown */}
          <li className="relative">
            <button
              type="button"
              className={`${linkBase} ${inactive} inline-flex items-center gap-1`}
              aria-haspopup="true"
              aria-expanded={deptOpen}
              onClick={() => setDeptOpen((v) => !v)}
            >
              Departments <span className="text-sm">▾</span>
            </button>
            {deptOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-md bg-white text-blue-800 shadow-lg ring-1 ring-black/5" onMouseLeave={() => setDeptOpen(false)}>
                <ul className="py-2 max-h-[60vh] overflow-auto">
                  {deptItems.map((m) => (
                    <li key={m.id}>
                      <NavLink
                        to={`/departments/${m.id}`}
                        className={({ isActive }) => `block px-3 py-2 hover:bg-blue-50 ${isActive ? "font-semibold" : ""}`}
                        onClick={() => setDeptOpen(false)}
                      >
                        {m.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          <li>
            <NavLink to="/events" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Events</NavLink>
          </li>
          <li>
            <NavLink to="/leadership" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Leadership</NavLink>
          </li>
          
          <li>
            <NavLink to="/contact" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Contact</NavLink>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button aria-label="Toggle menu" className="md:hidden inline-flex items-center justify-center rounded p-2 hover:bg-blue-600" onClick={() => setOpen(!open)}>
          <span>☰</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blue-600">
          <ul className="flex flex-col p-2">
            <li><NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkBase} ${isActive ? active : inactive}`}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkBase} ${isActive ? active : inactive}`}>About</NavLink></li>

            {/* Mobile: Departments collapsible */}
            <li className="mt-1">
              <button type="button" className={`w-full text-left ${linkBase} ${inactive}`} onClick={() => setDeptOpen((v) => !v)} aria-expanded={deptOpen}>
                Departments {deptOpen ? "▴" : "▾"}
              </button>
              {deptOpen && (
                <ul className="mt-1 ml-3 border-l border-blue-600/40">
                  {deptItems.map((m) => (
                    <li key={m.id}>
                      <NavLink to={`/departments/${m.id}`} onClick={() => { setOpen(false); setDeptOpen(false); }} className={({ isActive }) => `block ${linkBase} ${isActive ? active : inactive}`}>
                        {m.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li><NavLink to="/events" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkBase} ${isActive ? active : inactive}`}>Events</NavLink></li>
            <li><NavLink to="/leadership" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkBase} ${isActive ? active : inactive}`}>Leadership</NavLink></li>
            
            <li><NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkBase} ${isActive ? active : inactive}`}>Contact</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;