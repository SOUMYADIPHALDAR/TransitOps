import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const roles = ["Driver", "Fleet Manager", "Safety Officer", "Financial Analyst"];

const SignupForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Driver");
  const [error, setError] = useState("");
  const submit = (event) => { event.preventDefault(); const values = new FormData(event.currentTarget); if (values.get("password") !== values.get("confirmPassword")) { setError("Passwords do not match."); return; } navigate("/login"); };
  const inputClass = "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8"><section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"><Link to="/" className="text-sm font-bold tracking-[0.18em] text-blue-600">TRANSITOPS</Link><h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Create your account</h1><p className="mt-2 text-sm text-slate-500">Choose the role that matches your work in the fleet.</p><form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-medium text-slate-700 sm:col-span-2">Full name<input required name="fullName" placeholder="Enter your full name" className={inputClass} /></label><label className="block text-sm font-medium text-slate-700 sm:col-span-2">Work email<input required type="email" name="email" placeholder="you@company.com" className={inputClass} /></label><label className="block text-sm font-medium text-slate-700 sm:col-span-2">Role<select value={role} onChange={(event) => setRole(event.target.value)} className={inputClass}>{roles.map((item) => <option key={item}>{item}</option>)}</select><span className="mt-1 block text-xs font-normal text-slate-500">You are registering as a {role}.</span></label><label className="block text-sm font-medium text-slate-700">Password<input required minLength="8" name="password" type="password" placeholder="At least 8 characters" className={inputClass} /></label><label className="block text-sm font-medium text-slate-700">Confirm password<input required name="confirmPassword" type="password" placeholder="Confirm password" className={inputClass} /></label><label className="flex items-start gap-2 text-sm text-slate-600 sm:col-span-2"><input required type="checkbox" className="mt-1 rounded border-slate-300" />I agree to the Terms & Conditions.</label>{error && <p role="alert" className="text-sm font-medium text-rose-600 sm:col-span-2">{error}</p>}<button type="submit" className="rounded-lg bg-blue-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 sm:col-span-2">Create {role} account</button></form><p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Log in</Link></p></section></main>;
};

export default SignupForm;
