import { useState } from "react";
import { Link } from "react-router-dom";

const availableVehicles = ["VH-102 · Van", "VH-105 · Van", "VH-109 · Bus"];
const availableDrivers = ["Arjun Sharma", "Meera Patel", "Ravi Kumar"];
const initialTrips = [
  { id: "TR-1042", source: "Mumbai", destination: "Pune", vehicle: "VH-102 · Van", driver: "Arjun Sharma", cargoWeight: 850, distance: 148, status: "Dispatched" },
  { id: "TR-1041", source: "Delhi", destination: "Jaipur", vehicle: "VH-105 · Van", driver: "Meera Patel", cargoWeight: 620, distance: 281, status: "Draft" },
  { id: "TR-1040", source: "Bengaluru", destination: "Chennai", vehicle: "VH-109 · Bus", driver: "Ravi Kumar", cargoWeight: 400, distance: 347, status: "Completed" },
];

const initialForm = { source: "", destination: "", vehicle: "", driver: "", cargoWeight: "", distance: "" };

const TripManagement = () => {
  const [trips, setTrips] = useState(initialTrips);
  const [form, setForm] = useState(initialForm);

  const handleCreate = (event) => {
    event.preventDefault();
    setTrips((currentTrips) => [{ id: `TR-${1043 + currentTrips.length}`, ...form, cargoWeight: Number(form.cargoWeight), distance: Number(form.distance), status: "Draft" }, ...currentTrips]);
    setForm(initialForm);
  };

  const updateStatus = (id, status) => setTrips((currentTrips) => currentTrips.map((trip) => trip.id === id ? { ...trip, status } : trip));
  const inputClass = "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const statusStyle = { Draft: "bg-slate-100 text-slate-700", Dispatched: "bg-blue-50 text-blue-700", Completed: "bg-emerald-50 text-emerald-700", Cancelled: "bg-rose-50 text-rose-700" };
  const inShopVehicles = JSON.parse(localStorage.getItem("inShopVehicles") || "[]");
  const assignableVehicles = availableVehicles.filter((vehicle) => !inShopVehicles.includes(vehicle.split(" ")[0]));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p><h1 className="text-3xl font-bold tracking-tight text-slate-900">Trip Management</h1><p className="mt-1 text-sm text-slate-500">Plan, dispatch, and track your fleet trips.</p></div>
          <Link to="/dashboard" className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">Back to dashboard</Link>
        </header>

        <form onSubmit={handleCreate} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div><h2 className="font-semibold text-slate-800">Create trip</h2><p className="mt-1 text-sm text-slate-500">New trips are saved with Draft status.</p></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">Source *<input required value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} placeholder="e.g. Mumbai" className={inputClass} /></label>
            <label className="text-sm font-medium text-slate-700">Destination *<input required value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value })} placeholder="e.g. Pune" className={inputClass} /></label>
            <label className="text-sm font-medium text-slate-700">Available vehicle *<select required value={form.vehicle} onChange={(event) => setForm({ ...form, vehicle: event.target.value })} className={inputClass}><option value="" disabled>Select vehicle</option>{assignableVehicles.map((vehicle) => <option key={vehicle}>{vehicle}</option>)}</select></label>
            <label className="text-sm font-medium text-slate-700">Available driver *<select required value={form.driver} onChange={(event) => setForm({ ...form, driver: event.target.value })} className={inputClass}><option value="" disabled>Select driver</option>{availableDrivers.map((driver) => <option key={driver}>{driver}</option>)}</select></label>
            <label className="text-sm font-medium text-slate-700">Cargo weight (kg) *<input required type="number" min="1" value={form.cargoWeight} onChange={(event) => setForm({ ...form, cargoWeight: event.target.value })} placeholder="e.g. 850" className={inputClass} /></label>
            <label className="text-sm font-medium text-slate-700">Planned distance (km) *<input required type="number" min="1" value={form.distance} onChange={(event) => setForm({ ...form, distance: event.target.value })} placeholder="e.g. 148" className={inputClass} /></label>
          </div>
          <button type="submit" className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">Create draft trip</button>
        </form>

        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-800">Trip lifecycle</h2><p className="mt-1 text-sm text-slate-500">Draft → Dispatched → Completed, or cancel a trip before completion.</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Trip</th><th className="px-5 py-3 font-semibold">Route</th><th className="px-5 py-3 font-semibold">Vehicle</th><th className="px-5 py-3 font-semibold">Driver</th><th className="px-5 py-3 font-semibold">Cargo</th><th className="px-5 py-3 font-semibold">Distance</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{trips.map((trip) => <tr key={trip.id} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-700">{trip.id}</td><td className="px-5 py-4 text-slate-600">{trip.source} → {trip.destination}</td><td className="px-5 py-4 text-slate-600">{trip.vehicle}</td><td className="px-5 py-4 text-slate-600">{trip.driver}</td><td className="px-5 py-4 text-slate-600">{trip.cargoWeight} kg</td><td className="px-5 py-4 text-slate-600">{trip.distance} km</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[trip.status]}`}>{trip.status}</span></td><td className="px-5 py-4">{trip.status === "Draft" && <div className="flex gap-2"><button type="button" onClick={() => updateStatus(trip.id, "Dispatched")} className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Dispatch</button><button type="button" onClick={() => updateStatus(trip.id, "Cancelled")} className="rounded-md px-2 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">Cancel</button></div>}{trip.status === "Dispatched" && <div className="flex gap-2"><button type="button" onClick={() => updateStatus(trip.id, "Completed")} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Complete</button><button type="button" onClick={() => updateStatus(trip.id, "Cancelled")} className="rounded-md px-2 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">Cancel</button></div>}{(trip.status === "Completed" || trip.status === "Cancelled") && <span className="text-xs text-slate-400">No actions available</span>}</td></tr>)}</tbody></table></div>
        </section>
      </div>
    </main>
  );
};

export default TripManagement;
