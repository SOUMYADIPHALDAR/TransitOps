import { useState } from "react";

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

const expiringLicenses = [
  { name: "Arjun Sharma", license: "DL-0420110012345", expiresOn: "18 Jul 2026", daysLeft: 6 },
  { name: "Meera Patel", license: "GJ-0520140098765", expiresOn: "02 Aug 2026", daysLeft: 21 },
];

const driverSchedule = [
  { driver: "Arjun Sharma", date: "12 Jul 2026", time: "08:00 – 17:00", trip: "TR-1042", route: "Mumbai → Pune", status: "On trip" },
  { driver: "Meera Patel", date: "12 Jul 2026", time: "09:30 – 18:30", trip: "TR-1043", route: "Delhi → Jaipur", status: "Scheduled" },
  { driver: "Ravi Kumar", date: "13 Jul 2026", time: "07:00 – 16:00", trip: "TR-1044", route: "Bengaluru → Chennai", status: "Scheduled" },
  { driver: "Arjun Sharma", date: "14 Jul 2026", time: "10:00 – 14:00", trip: "—", route: "Safety training", status: "Training" },
];

const DriverManagementForm = () => {
  const [driver, setDriver] = useState(initialDriver);
  const [submitted, setSubmitted] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);

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
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => { setShowDriverForm(true); setSubmitted(false); }} className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">+ Add driver</button>
          </div>
        </header>

        <section aria-labelledby="license-alerts" className="mb-7 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm">
          <div className="flex flex-col gap-2 border-b border-amber-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-900">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M12 9v4m0 4h.01M10.3 3.9L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /></svg>
                <h2 id="license-alerts" className="font-semibold">License expiry alerts</h2>
              </div>
              <p className="mt-1 text-sm text-amber-800">These drivers need license renewal attention within the next 30 days.</p>
            </div>
            <span className="w-fit rounded-full bg-amber-200 px-3 py-1 text-xs font-bold text-amber-900">{expiringLicenses.length} action needed</span>
          </div>
          <div className="divide-y divide-amber-200">
            {expiringLicenses.map((driver) => (
              <div key={driver.license} className="flex flex-col gap-2 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <div><span className="font-semibold text-slate-800">{driver.name}</span><span className="ml-2 text-slate-600">{driver.license}</span></div>
                <div className="flex items-center gap-3"><span className="text-slate-600">Expires {driver.expiresOn}</span><span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-amber-800">{driver.daysLeft} days left</span></div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="driver-schedule" className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 id="driver-schedule" className="font-semibold text-slate-800">Driver schedule</h2><p className="mt-1 text-sm text-slate-500">Upcoming assigned trips, shifts, and training.</p></div>
            <span className="text-sm font-medium text-blue-600">This week</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Driver</th><th className="px-5 py-3 font-semibold">Date</th><th className="px-5 py-3 font-semibold">Shift</th><th className="px-5 py-3 font-semibold">Assignment</th><th className="px-5 py-3 font-semibold">Route / Activity</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {driverSchedule.map((shift) => <tr key={`${shift.driver}-${shift.date}-${shift.trip}`} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-700">{shift.driver}</td><td className="px-5 py-4 text-slate-600">{shift.date}</td><td className="px-5 py-4 text-slate-600">{shift.time}</td><td className="px-5 py-4 font-medium text-slate-700">{shift.trip}</td><td className="px-5 py-4 text-slate-600">{shift.route}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${shift.status === "On trip" ? "bg-blue-50 text-blue-700" : shift.status === "Training" ? "bg-violet-50 text-violet-700" : "bg-emerald-50 text-emerald-700"}`}>{shift.status}</span></td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        {showDriverForm && <div role="dialog" aria-modal="true" aria-labelledby="add-driver-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 flex items-start justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
              <div><h2 id="add-driver-title" className="font-semibold text-slate-800">Add driver details</h2><p className="mt-1 text-sm text-slate-500">Fields marked with * are required.</p></div>
              <button type="button" aria-label="Close add driver form" onClick={() => { setShowDriverForm(false); setSubmitted(false); }} className="rounded-lg px-3 py-1 text-xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">×</button>
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
              <button type="button" onClick={() => { setShowDriverForm(false); setSubmitted(false); }} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">Cancel</button>
              <button type="button" onClick={() => { setDriver(initialDriver); setSubmitted(false); }} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">Clear</button>
              <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save driver</button>
            </div>
          </div>
          </form>
        </div>}
      </div>
    </main>
  );
};

export default DriverManagementForm;
