import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const fleet = [
  { id: "VH-101", type: "Bus", status: "Active", region: "North" },
  { id: "VH-102", type: "Van", status: "Available", region: "West" },
  { id: "VH-103", type: "Truck", status: "Maintenance", region: "South" },
  { id: "VH-104", type: "Bus", status: "Active", region: "East" },
  { id: "VH-105", type: "Van", status: "Available", region: "North" },
  { id: "VH-106", type: "Truck", status: "Active", region: "West" },
  { id: "VH-107", type: "Bus", status: "Maintenance", region: "South" },
  { id: "VH-108", type: "Van", status: "Active", region: "East" },
  { id: "VH-109", type: "Bus", status: "Available", region: "North" },
  { id: "VH-110", type: "Truck", status: "Active", region: "West" },
  { id: "VH-111", type: "Van", status: "Maintenance", region: "East" },
  { id: "VH-112", type: "Bus", status: "Active", region: "South" },
];

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    {children}
  </svg>
);

const Dashboard = () => {
  const [filters, setFilters] = useState({ type: "All types", status: "All statuses", region: "All regions" });

  const visibleFleet = useMemo(
    () => fleet.filter((vehicle) =>
      (filters.type === "All types" || vehicle.type === filters.type) &&
      (filters.status === "All statuses" || vehicle.status === filters.status) &&
      (filters.region === "All regions" || vehicle.region === filters.region)
    ),
    [filters]
  );

  const count = (status) => visibleFleet.filter((vehicle) => vehicle.status === status).length;
  const active = count("Active");
  const available = count("Available");
  const maintenance = count("Maintenance");
  const utilization = visibleFleet.length ? Math.round((active / visibleFleet.length) * 100) : 0;

  const kpis = [
    { label: "Active Vehicles", value: active, tone: "bg-blue-50 text-blue-600", icon: <path d="M3 13l2-5h14l2 5m-18 0v6h18v-6m-14 6v-3h4v3m5-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-12 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" /> },
    { label: "Available Vehicles", value: available, tone: "bg-emerald-50 text-emerald-600", icon: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zm-4-9l2.5 2.5L16 9" /> },
    { label: "In Maintenance", value: maintenance, tone: "bg-amber-50 text-amber-600", icon: <path d="M14.7 6.3a4 4 0 01-5 5L4 17l3 3 5.7-5.7a4 4 0 005-5l-2.3 2.3-2.8-2.8 2.1-2.5z" /> },
    { label: "Active Trips", value: Math.max(0, active - 1), tone: "bg-violet-50 text-violet-600", icon: <path d="M4 18h16M6 18V9l6-4 6 4v9M9 18v-4h6v4" /> },
    { label: "Pending Trips", value: Math.max(0, available + 2), tone: "bg-rose-50 text-rose-600", icon: <path d="M12 8v5l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Drivers On Duty", value: active + 3, tone: "bg-cyan-50 text-cyan-600", icon: <path d="M16 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1m6-9a4 4 0 100-8 4 4 0 000 8zm9 1v6m3-3h-6" /> },
  ];

  const selectOptions = [
    { key: "type", label: "Vehicle type", options: ["All types", "Bus", "Van", "Truck"] },
    { key: "status", label: "Status", options: ["All statuses", "Active", "Available", "Maintenance"] },
    { key: "region", label: "Region", options: ["All regions", "North", "South", "East", "West"] },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Monitor your fleet performance at a glance.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Live fleet status</span>
            <span className="ml-2 text-slate-400">Updated just now</span>
          </div>
          <Link to="/drivers" className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Manage drivers
          </Link>
          <Link to="/expenses" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100">
            Fuel & expenses
          </Link>
          <Link to="/reports" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            Reports & analytics
          </Link>
        </header>

        <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Icon><path d="M4 4h16M7 12h10m-7 8h4" /></Icon>
            Filter dashboard
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {selectOptions.map(({ key, label, options }) => (
              <label key={key} className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {label}
                <select
                  value={filters[key]}
                  onChange={(event) => setFilters({ ...filters, [key]: event.target.value })}
                  className="mt-2 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {options.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kpis.map((kpi) => (
            <article key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{kpi.value}</p>
                  <p className="mt-2 text-xs text-slate-400">Based on current filters</p>
                </div>
                <div className={`rounded-xl p-3 ${kpi.tone}`}><Icon>{kpi.icon}</Icon></div>
              </div>
            </article>
          ))}
          <article className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Fleet Utilization</p>
                <p className="mt-2 text-3xl font-bold">{utilization}%</p>
                <p className="mt-2 text-xs text-slate-400">Active vehicles in selected fleet</p>
              </div>
              <div className="relative grid h-12 w-12 place-items-center rounded-full" style={{ background: `conic-gradient(#38bdf8 ${utilization * 3.6}deg, #334155 0deg)` }}>
                <div className="h-8 w-8 rounded-full bg-slate-900" />
              </div>
            </div>
          </article>
        </section>

        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div><h2 className="font-semibold text-slate-800">Fleet overview</h2><p className="text-sm text-slate-500">{visibleFleet.length} vehicles matching your filters</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Vehicle</th><th className="px-5 py-3 font-semibold">Type</th><th className="px-5 py-3 font-semibold">Region</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {visibleFleet.map((vehicle) => <tr key={vehicle.id} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-700">{vehicle.id}</td><td className="px-5 py-4 text-slate-600">{vehicle.type}</td><td className="px-5 py-4 text-slate-600">{vehicle.region}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${vehicle.status === "Active" ? "bg-blue-50 text-blue-700" : vehicle.status === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{vehicle.status}</span></td></tr>)}
                {!visibleFleet.length && <tr><td colSpan="4" className="px-5 py-10 text-center text-slate-500">No vehicles match the selected filters.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
