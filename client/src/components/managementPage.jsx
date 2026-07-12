import { Link } from "react-router-dom";

const ManagementPage = ({ title }) => (
  <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-slate-800">
    <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
      <p className="mt-3 text-sm text-slate-500">This section is ready for its management tools.</p>
      <Link to="/dashboard" className="mt-7 inline-block rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Back to dashboard</Link>
    </section>
  </main>
);

export default ManagementPage;
