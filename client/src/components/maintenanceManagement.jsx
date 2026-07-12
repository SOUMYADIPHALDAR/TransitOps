import { useState } from "react";

const vehicles = ["VH-101", "VH-102", "VH-103", "VH-104", "VH-105", "VH-109"];
const maintenanceTypes = ["Preventive service", "Repair", "Inspection", "Tyre replacement", "Other"];
const initialRecords = [{ id: 1, vehicle: "VH-103", type: "Repair", date: "2026-07-07", notes: "Brake system inspection and repair", status: "In Shop" }];

const readInShopVehicles = () => JSON.parse(localStorage.getItem("inShopVehicles") || "[]");
const writeInShopVehicles = (ids) => localStorage.setItem("inShopVehicles", JSON.stringify(ids));

const MaintenanceManagement = () => {
  const [records, setRecords] = useState(initialRecords);
  const [inShopVehicles, setInShopVehicles] = useState(readInShopVehicles);
  const [form, setForm] = useState({ vehicle: "", type: "Preventive service", date: "", notes: "" });
  const inputClass = "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const addRecord = (event) => {
    event.preventDefault();
    setRecords((current) => [{ id: Date.now(), ...form, status: "In Shop" }, ...current]);
    const updated = [...new Set([...inShopVehicles, form.vehicle])];
    setInShopVehicles(updated);
    writeInShopVehicles(updated);
    setForm({ vehicle: "", type: "Preventive service", date: "", notes: "" });
  };

  const completeRecord = (record) => {
    setRecords((current) => current.map((item) => item.id === record.id ? { ...item, status: "Completed" } : item));
    const hasAnotherOpenRecord = records.some((item) => item.id !== record.id && item.vehicle === record.vehicle && item.status === "In Shop");
    if (!hasAnotherOpenRecord) {
      const updated = inShopVehicles.filter((vehicle) => vehicle !== record.vehicle);
      setInShopVehicles(updated);
      writeInShopVehicles(updated);
    }
  };

  return <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
    <header className="mb-7"><p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p><h1 className="text-3xl font-bold tracking-tight text-slate-900">Maintenance</h1><p className="mt-1 text-sm text-slate-500">Log service work and keep unavailable vehicles out of trip assignment.</p></header>
    <form onSubmit={addRecord} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="font-semibold text-slate-800">Add maintenance record</h2><p className="mt-1 text-sm text-slate-500">Saving a record marks the vehicle as In Shop and removes it from the available trip vehicle pool.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">Vehicle *<select required value={form.vehicle} onChange={(event) => setForm({ ...form, vehicle: event.target.value })} className={inputClass}><option value="" disabled>Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle} value={vehicle} disabled={inShopVehicles.includes(vehicle)}>{vehicle}{inShopVehicles.includes(vehicle) ? " (In Shop)" : ""}</option>)}</select></label><label className="text-sm font-medium text-slate-700">Maintenance type *<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className={inputClass}>{maintenanceTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label className="text-sm font-medium text-slate-700">Date *<input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className={inputClass} /></label><label className="text-sm font-medium text-slate-700">Notes *<input required value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Describe the required work" className={inputClass} /></label></div><button type="submit" className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">Add to maintenance log</button></form>
    <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-800">Maintenance log</h2><p className="mt-1 text-sm text-slate-500">Complete a record to release its vehicle back to trip assignment.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[750px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Vehicle</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Notes</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{records.map((record) => <tr key={record.id}><td className="px-5 py-4 font-semibold text-slate-700">{record.vehicle}</td><td className="px-5 py-4 text-slate-600">{record.type}</td><td className="px-5 py-4 text-slate-600">{record.date}</td><td className="px-5 py-4 text-slate-600">{record.notes}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${record.status === "In Shop" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{record.status}</span></td><td className="px-5 py-4">{record.status === "In Shop" ? <button type="button" onClick={() => completeRecord(record)} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Mark completed</button> : <span className="text-xs text-slate-400">Released</span>}</td></tr>)}</tbody></table></div></section>
  </div></main>;
};

export default MaintenanceManagement;
