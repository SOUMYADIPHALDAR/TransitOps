import { useState } from "react";
import { Link } from "react-router-dom";

const initialDriver = {
  name: "",
  licenseNumber: "",
  licenseCategory: "",
  licenseExpiryDate: "",
  contactNumber: "",
  safetyScore: "",
  status: "Available",
};

const licenseCategories = ["LMV", "HMV", "Commercial", "Passenger Transport"];
const statuses = ["Available", "On Trip", "Off Duty", "Suspended"];

const DriverManagementForm = () => {
  const [driver, setDriver] = useState(initialDriver);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setDriver((currentDriver) => ({ ...currentDriver, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const fieldClass = "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Driver Management</h1>
            <p className="mt-1 text-sm text-slate-500">Add and maintain driver profile information.</p>
          </div>
          <Link to="/dashboard" className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            ← Back to dashboard
          </Link>
        </header>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
            <h2 className="font-semibold text-slate-800">Driver profile</h2>
            <p className="mt-1 text-sm text-slate-500">Fields marked with * are required.</p>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Driver name *
              <input name="name" value={driver.name} onChange={updateField} required placeholder="e.g. Arjun Sharma" className={fieldClass} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              License number *
              <input name="licenseNumber" value={driver.licenseNumber} onChange={updateField} required placeholder="e.g. DL-0420110012345" className={fieldClass} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              License category *
              <select name="licenseCategory" value={driver.licenseCategory} onChange={updateField} required className={fieldClass}>
                <option value="" disabled>Select a category</option>
                {licenseCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              License expiry date *
              <input type="date" name="licenseExpiryDate" value={driver.licenseExpiryDate} onChange={updateField} required className={fieldClass} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Contact number *
              <input type="tel" name="contactNumber" value={driver.contactNumber} onChange={updateField} required placeholder="e.g. +91 98765 43210" className={fieldClass} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Safety score <span className="font-normal text-slate-400">(0–100)</span>
              <input type="number" name="safetyScore" value={driver.safetyScore} onChange={updateField} min="0" max="100" placeholder="e.g. 92" className={fieldClass} />
            </label>

            <fieldset className="text-sm font-medium text-slate-700">
              <legend className="mb-2">Status *</legend>
              <div className="grid grid-cols-2 gap-2">
                {statuses.map((status) => (
                  <label key={status} className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-xs font-semibold transition ${driver.status === status ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    <input type="radio" name="status" value={status} checked={driver.status === status} onChange={updateField} className="sr-only" />
                    {status}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div aria-live="polite" className="text-sm text-emerald-600">
              {submitted && "Driver profile saved successfully."}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setDriver(initialDriver); setSubmitted(false); }} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">Clear</button>
              <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save driver</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default DriverManagementForm;
