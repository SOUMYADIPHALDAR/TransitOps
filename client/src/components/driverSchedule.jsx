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

const DriverSchedule = () => (
  <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12">
    <div className="mx-auto max-w-7xl">
      <header className="mb-7">
        <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">DRIVER PORTAL</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Schedule & License Alerts</h1>
        <p className="mt-1 text-sm text-slate-500">View upcoming shifts, trip assignments, and license renewal alerts.</p>
      </header>

      <section aria-labelledby="license-alerts" className="mb-7 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm">
        <div className="flex flex-col gap-2 border-b border-amber-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-amber-900"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M12 9v4m0 4h.01M10.3 3.9L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /></svg><h2 id="license-alerts" className="font-semibold">License expiry alerts</h2></div><p className="mt-1 text-sm text-amber-800">These drivers need license renewal attention within the next 30 days.</p></div><span className="w-fit rounded-full bg-amber-200 px-3 py-1 text-xs font-bold text-amber-900">{expiringLicenses.length} action needed</span></div>
        <div className="divide-y divide-amber-200">{expiringLicenses.map((driver) => <div key={driver.license} className="flex flex-col gap-2 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"><div><span className="font-semibold text-slate-800">{driver.name}</span><span className="ml-2 text-slate-600">{driver.license}</span></div><div className="flex items-center gap-3"><span className="text-slate-600">Expires {driver.expiresOn}</span><span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-amber-800">{driver.daysLeft} days left</span></div></div>)}</div>
      </section>

      <section aria-labelledby="driver-schedule" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 id="driver-schedule" className="font-semibold text-slate-800">Driver schedule</h2><p className="mt-1 text-sm text-slate-500">Upcoming assigned trips, shifts, and training.</p></div><span className="text-sm font-medium text-blue-600">This week</span></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Driver</th><th className="px-5 py-3 font-semibold">Date</th><th className="px-5 py-3 font-semibold">Shift</th><th className="px-5 py-3 font-semibold">Assignment</th><th className="px-5 py-3 font-semibold">Route / Activity</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{driverSchedule.map((shift) => <tr key={`${shift.driver}-${shift.date}-${shift.trip}`} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-700">{shift.driver}</td><td className="px-5 py-4 text-slate-600">{shift.date}</td><td className="px-5 py-4 text-slate-600">{shift.time}</td><td className="px-5 py-4 font-medium text-slate-700">{shift.trip}</td><td className="px-5 py-4 text-slate-600">{shift.route}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${shift.status === "On trip" ? "bg-blue-50 text-blue-700" : shift.status === "Training" ? "bg-violet-50 text-violet-700" : "bg-emerald-50 text-emerald-700"}`}>{shift.status}</span></td></tr>)}</tbody></table></div>
      </section>
    </div>
  </main>
);

export default DriverSchedule;
