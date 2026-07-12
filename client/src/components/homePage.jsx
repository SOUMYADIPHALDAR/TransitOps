import { Link } from "react-router-dom";

const roles = [
  ["Driver", "View assigned trips, schedules, and license notices."],
  ["Fleet Manager", "Coordinate vehicles, drivers, trips, and maintenance."],
  ["Safety Officer", "Monitor compliance, safety records, and maintenance."],
  ["Financial Analyst", "Track fuel costs, expenses, and fleet performance."],
];

const HomePage = () => {
  const hasActiveSession = sessionStorage.getItem("transitopsActiveSession") === "true";

  return <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
    <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12">
      <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <header className="relative"><p className="text-xs font-bold tracking-[0.2em] text-sky-400">FLEET OPERATIONS</p><p className="mt-1 text-xl font-bold">Transit<span className="text-sky-400">Ops</span></p></header>

      <section className="relative grid min-h-[calc(100vh-100px)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
        <div><p className="mb-4 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">ONE PLATFORM. COMPLETE FLEET VISIBILITY.</p><h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Run every part of your fleet with confidence.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">TransitOps connects your people, vehicles, trips, safety, and costs in one responsive workspace.</p><div className="mt-8 flex flex-wrap gap-3">{hasActiveSession ? <Link to="/dashboard" className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400">Get started</Link> : <><Link to="/signup" className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400">Create an account</Link><Link to="/login" className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">Log in to TransitOps</Link></>}</div></div>
        <div className="grid gap-3 sm:grid-cols-2">{roles.map(([role, description], index) => <article key={role} className={`rounded-2xl border p-5 backdrop-blur ${index === 0 ? "border-sky-400/40 bg-sky-400/10" : "border-slate-800 bg-slate-900/70"}`}><div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-lg font-bold text-sky-300">{index + 1}</div><h2 className="font-semibold text-white">{role}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></article>)}</div>
      </section>
    </div>
  </main>;
};

export default HomePage;
