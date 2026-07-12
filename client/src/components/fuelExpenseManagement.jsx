import { useMemo, useState } from "react";

const vehicles = ["VH-101", "VH-102", "VH-103", "VH-104", "VH-105"];
const expenseTypes = ["Toll", "Maintenance", "Parking", "Other"];

const initialFuelLogs = [
  { id: 1, vehicle: "VH-101", liters: 58, cost: 5520, date: "2026-07-10" },
  { id: 2, vehicle: "VH-102", liters: 42, cost: 3990, date: "2026-07-10" },
  { id: 3, vehicle: "VH-101", liters: 35, cost: 3325, date: "2026-07-08" },
];

const initialExpenses = [
  { id: 1, vehicle: "VH-101", type: "Maintenance", cost: 2800, date: "2026-07-09" },
  { id: 2, vehicle: "VH-102", type: "Toll", cost: 450, date: "2026-07-10" },
  { id: 3, vehicle: "VH-103", type: "Maintenance", cost: 6200, date: "2026-07-07" },
];

const formatCurrency = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const FuelExpenseManagement = () => {
  const [fuelLogs, setFuelLogs] = useState(initialFuelLogs);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [fuelForm, setFuelForm] = useState({ vehicle: "", liters: "", cost: "", date: "" });
  const [expenseForm, setExpenseForm] = useState({ vehicle: "", type: "Toll", cost: "", date: "" });

  const operationalCosts = useMemo(() => vehicles.map((vehicle) => {
    const fuel = fuelLogs.filter((log) => log.vehicle === vehicle).reduce((total, log) => total + log.cost, 0);
    const maintenance = expenses.filter((expense) => expense.vehicle === vehicle && expense.type === "Maintenance").reduce((total, expense) => total + expense.cost, 0);
    return { vehicle, fuel, maintenance, total: fuel + maintenance };
  }), [fuelLogs, expenses]);

  const handleFuelSubmit = (event) => {
    event.preventDefault();
    setFuelLogs((logs) => [{ id: Date.now(), vehicle: fuelForm.vehicle, liters: Number(fuelForm.liters), cost: Number(fuelForm.cost), date: fuelForm.date }, ...logs]);
    setFuelForm({ vehicle: "", liters: "", cost: "", date: "" });
  };

  const handleExpenseSubmit = (event) => {
    event.preventDefault();
    setExpenses((currentExpenses) => [{ id: Date.now(), vehicle: expenseForm.vehicle, type: expenseForm.type, cost: Number(expenseForm.cost), date: expenseForm.date }, ...currentExpenses]);
    setExpenseForm({ vehicle: "", type: "Toll", cost: "", date: "" });
  };

  const inputClass = "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fuel & Expense Management</h1>
            <p className="mt-1 text-sm text-slate-500">Record vehicle costs and monitor operational spending.</p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={handleFuelSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-slate-800">Add fuel log</h2>
            <p className="mt-1 text-sm text-slate-500">Record fuel quantity, cost, and date.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">Vehicle *<select required value={fuelForm.vehicle} onChange={(event) => setFuelForm({ ...fuelForm, vehicle: event.target.value })} className={inputClass}><option value="" disabled>Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle}>{vehicle}</option>)}</select></label>
              <label className="text-sm font-medium text-slate-700">Date *<input required type="date" value={fuelForm.date} onChange={(event) => setFuelForm({ ...fuelForm, date: event.target.value })} className={inputClass} /></label>
              <label className="text-sm font-medium text-slate-700">Fuel quantity (liters) *<input required min="0.01" step="0.01" type="number" value={fuelForm.liters} onChange={(event) => setFuelForm({ ...fuelForm, liters: event.target.value })} placeholder="e.g. 50" className={inputClass} /></label>
              <label className="text-sm font-medium text-slate-700">Fuel cost (₹) *<input required min="0" step="0.01" type="number" value={fuelForm.cost} onChange={(event) => setFuelForm({ ...fuelForm, cost: event.target.value })} placeholder="e.g. 4750" className={inputClass} /></label>
            </div>
            <button type="submit" className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">Save fuel log</button>
          </form>

          <form onSubmit={handleExpenseSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-slate-800">Add other expense</h2>
            <p className="mt-1 text-sm text-slate-500">Record toll, maintenance, parking, or other costs.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">Vehicle *<select required value={expenseForm.vehicle} onChange={(event) => setExpenseForm({ ...expenseForm, vehicle: event.target.value })} className={inputClass}><option value="" disabled>Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle}>{vehicle}</option>)}</select></label>
              <label className="text-sm font-medium text-slate-700">Date *<input required type="date" value={expenseForm.date} onChange={(event) => setExpenseForm({ ...expenseForm, date: event.target.value })} className={inputClass} /></label>
              <label className="text-sm font-medium text-slate-700">Expense type *<select value={expenseForm.type} onChange={(event) => setExpenseForm({ ...expenseForm, type: event.target.value })} className={inputClass}>{expenseTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
              <label className="text-sm font-medium text-slate-700">Cost (₹) *<input required min="0" step="0.01" type="number" value={expenseForm.cost} onChange={(event) => setExpenseForm({ ...expenseForm, cost: event.target.value })} placeholder="e.g. 500" className={inputClass} /></label>
            </div>
            <button type="submit" className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">Save expense</button>
          </form>
        </section>

        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-800">Operational cost by vehicle</h2><p className="mt-1 text-sm text-slate-500">Total operational cost is calculated as Fuel + Maintenance.</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Vehicle</th><th className="px-5 py-3 font-semibold">Fuel</th><th className="px-5 py-3 font-semibold">Maintenance</th><th className="px-5 py-3 font-semibold">Operational cost</th></tr></thead><tbody className="divide-y divide-slate-100">{operationalCosts.map((cost) => <tr key={cost.vehicle} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-700">{cost.vehicle}</td><td className="px-5 py-4 text-slate-600">{formatCurrency(cost.fuel)}</td><td className="px-5 py-4 text-slate-600">{formatCurrency(cost.maintenance)}</td><td className="px-5 py-4 font-semibold text-slate-900">{formatCurrency(cost.total)}</td></tr>)}</tbody></table></div>
        </section>
      </div>
    </main>
  );
};

export default FuelExpenseManagement;
