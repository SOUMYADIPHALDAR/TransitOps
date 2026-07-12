import { useState } from "react";
import { Link } from "react-router-dom";

const initialForm = {
  registrationNumber: "",
  vehicleName: "",
  vehicleType: "",
  maximumLoadCapacity: "",
  odometer: "",
  acquisitionCost: "",
  status: "Available",
};

const VehicleRegistry = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(`Vehicle ${form.registrationNumber.toUpperCase()} has been registered.`);
    setForm(initialForm);
  };

  const fieldClass = "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Vehicle Registry</h1>
            <p className="mt-1 text-sm text-slate-500">Add a vehicle to the fleet master list.</p>
          </div>
          <Link to="/dashboard" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">← Back to dashboard</Link>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {message && <div role="status" className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{message}</div>}
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Registration Number <span className="text-rose-600">*</span>
              <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} required placeholder="e.g. MH 12 AB 1234" className={fieldClass} />
              <span className="mt-1 block text-xs font-normal text-slate-500">Must be unique for every vehicle.</span>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Vehicle Name / Model <span className="text-rose-600">*</span>
              <input name="vehicleName" value={form.vehicleName} onChange={handleChange} required placeholder="e.g. Tata Starbus" className={fieldClass} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Vehicle Type <span className="text-rose-600">*</span>
              <select name="vehicleType" value={form.vehicleType} onChange={handleChange} required className={fieldClass}>
                <option value="" disabled>Select vehicle type</option>
                <option>Bus</option><option>Van</option><option>Truck</option><option>Car</option><option>Other</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Maximum Load Capacity (kg) <span className="text-rose-600">*</span>
              <input name="maximumLoadCapacity" value={form.maximumLoadCapacity} onChange={handleChange} required min="0" step="0.01" type="number" placeholder="e.g. 5000" className={fieldClass} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Odometer (km) <span className="text-rose-600">*</span>
              <input name="odometer" value={form.odometer} onChange={handleChange} required min="0" step="1" type="number" placeholder="e.g. 45000" className={fieldClass} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Acquisition Cost <span className="text-rose-600">*</span>
              <input name="acquisitionCost" value={form.acquisitionCost} onChange={handleChange} required min="0" step="0.01" type="number" placeholder="e.g. 1250000" className={fieldClass} />
            </label>
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              Status <span className="text-rose-600">*</span>
              <select name="status" value={form.status} onChange={handleChange} className={fieldClass}>
                <option>Available</option><option>On Trip</option><option>In Shop</option><option>Retired</option>
              </select>
            </label>
            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5 md:col-span-2">
              <button type="button" onClick={() => { setForm(initialForm); setMessage(""); }} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Clear</button>
              <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Register Vehicle</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default VehicleRegistry;
