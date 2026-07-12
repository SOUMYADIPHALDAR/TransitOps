import { NavLink } from "react-router-dom";

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    {children}
  </svg>
);

const navigationItems = [
  { label: "Dashboard", to: "/dashboard", icon: <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" /> },
  { label: "Vehicle Registry", to: "/vehicle-registry", icon: <path d="M3 13l2-5h14l2 5m-18 0v6h18v-6m-14 6v-3h4v3" /> },
  { label: "Driver Management", to: "/driver-management", icon: <path d="M16 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1m6-9a4 4 0 100-8 4 4 0 000 8zm9 1v6m3-3h-6" /> },
  { label: "Trip Management", to: "/trip-management", icon: <path d="M4 18h16M6 18V9l6-4 6 4v9" /> },
  { label: "Maintenance", to: "/maintenance", icon: <path d="M14.7 6.3a4 4 0 01-5 5L4 17l3 3 5.7-5.7a4 4 0 005-5l-2.3 2.3-2.8-2.8 2.1-2.5z" /> },
  { label: "Fuel & Expenses", to: "/fuel-expenses", icon: <path d="M6 3h8v18H6V3zm8 4h2a2 2 0 012 2v12m-9-9h2" /> },
  { label: "Reports & Analytics", to: "/reports-analytics", icon: <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" /> },
];

const MenuLinks = ({ compact = false }) => (
  <nav aria-label="Main navigation" className={compact ? "flex min-w-max gap-1" : "space-y-1"}>
    {navigationItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-950/20" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
      >
        <Icon>{item.icon}</Icon>
        <span className={compact ? "whitespace-nowrap" : ""}>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

export const SideMenu = () => (
  <>
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-800 bg-slate-950 px-4 py-7 text-slate-100 lg:flex">
      <div className="mb-10 px-3">
        <p className="text-xs font-bold tracking-[0.2em] text-sky-400">FLEET OPERATIONS</p>
        <p className="mt-2 text-xl font-bold text-white">Transit<span className="text-sky-400">Ops</span></p>
      </div>
      <MenuLinks />
      <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3 text-xs text-slate-400">Fleet management platform</div>
    </aside>
    <div className="sticky top-0 z-20 overflow-x-auto border-b border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur lg:hidden">
      <MenuLinks compact />
    </div>
  </>
);
