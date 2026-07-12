import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const destinations = { Driver: "/driver-management", "Fleet Manager": "/dashboard", "Safety Officer": "/maintenance", "Financial Analyst": "/reports-analytics" };
const roles = Object.keys(destinations);

const LoginForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Fleet Manager");

  const submit = (event) => { event.preventDefault(); sessionStorage.setItem("transitopsActiveSession", "true"); navigate(destinations[role]); };
  const inputClass = "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"><Link to="/" className="text-sm font-bold tracking-[0.18em] text-blue-600">TRANSITOPS</Link><h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Select your role to open the right workspace.</p><form onSubmit={submit} className="mt-7 space-y-5"><label className="block text-sm font-medium text-slate-700">Role<select value={role} onChange={(event) => setRole(event.target.value)} className={inputClass}>{roles.map((item) => <option key={item}>{item}</option>)}</select></label><label className="block text-sm font-medium text-slate-700">Email<input required type="email" placeholder="you@company.com" className={inputClass} /></label><label className="block text-sm font-medium text-slate-700">Password<input required type="password" placeholder="Enter your password" className={inputClass} /></label><label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300" /> Remember me</label><button type="submit" className="w-full rounded-lg bg-blue-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">Log in as {role}</button></form><p className="mt-6 text-center text-sm text-slate-500">New to TransitOps? <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">Create an account</Link></p></section></main>;
};

export default LoginForm;
