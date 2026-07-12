import { useMemo } from "react";

const vehicleReport = [
  { vehicle: "VH-101", distance: 1840, fuel: 210, fuelCost: 19950, maintenance: 2800, revenue: 58500, acquisitionCost: 1800000, utilization: 88 },
  { vehicle: "VH-102", distance: 1460, fuel: 164, fuelCost: 15580, maintenance: 1200, revenue: 46600, acquisitionCost: 1350000, utilization: 76 },
  { vehicle: "VH-103", distance: 990, fuel: 185, fuelCost: 17575, maintenance: 6200, revenue: 39700, acquisitionCost: 2200000, utilization: 61 },
  { vehicle: "VH-104", distance: 1710, fuel: 195, fuelCost: 18525, maintenance: 2400, revenue: 53100, acquisitionCost: 1800000, utilization: 82 },
  { vehicle: "VH-105", distance: 1240, fuel: 145, fuelCost: 13775, maintenance: 1000, revenue: 38700, acquisitionCost: 1350000, utilization: 70 },
];

const currency = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const ReportsAnalytics = () => {
  const rows = useMemo(() => vehicleReport.map((vehicle) => ({
    ...vehicle,
    fuelEfficiency: vehicle.distance / vehicle.fuel,
    operationalCost: vehicle.fuelCost + vehicle.maintenance,
    roi: ((vehicle.revenue - (vehicle.maintenance + vehicle.fuelCost)) / vehicle.acquisitionCost) * 100,
  })), []);

  const summary = useMemo(() => {
    const total = (key) => rows.reduce((sum, row) => sum + row[key], 0);
    const totalDistance = total("distance");
    const totalFuel = total("fuel");
    const totalOperationalCost = rows.reduce((sum, row) => sum + row.operationalCost, 0);
    return {
      fuelEfficiency: totalDistance / totalFuel,
      utilization: total("utilization") / rows.length,
      operationalCost: totalOperationalCost,
      roi: ((total("revenue") - (total("maintenance") + total("fuelCost"))) / total("acquisitionCost")) * 100,
    };
  }, [rows]);

  const exportCsv = () => {
    const headers = ["Vehicle", "Distance (km)", "Fuel (L)", "Fuel Efficiency (km/L)", "Fleet Utilization (%)", "Fuel Cost", "Maintenance Cost", "Operational Cost", "Revenue", "Acquisition Cost", "Vehicle ROI (%)"];
    const values = rows.map((row) => [row.vehicle, row.distance, row.fuel, row.fuelEfficiency.toFixed(2), row.utilization, row.fuelCost, row.maintenance, row.operationalCost, row.revenue, row.acquisitionCost, row.roi.toFixed(2)]);
    const csv = [headers, ...values].map((line) => line.join(",")).join("\n");
    const file = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fleet-analytics-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const cards = [
    { label: "Fuel Efficiency", value: `${summary.fuelEfficiency.toFixed(1)} km/L`, note: "Distance travelled / fuel consumed", tone: "bg-blue-50 text-blue-700" },
    { label: "Fleet Utilization", value: `${summary.utilization.toFixed(0)}%`, note: "Average active vehicle time", tone: "bg-emerald-50 text-emerald-700" },
    { label: "Operational Cost", value: currency(summary.operationalCost), note: "Fuel + maintenance", tone: "bg-amber-50 text-amber-700" },
    { label: "Vehicle ROI", value: `${summary.roi.toFixed(2)}%`, note: "Revenue less fuel & maintenance", tone: "bg-violet-50 text-violet-700" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">FLEET OPERATIONS</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reports & Analytics</h1>
            <p className="mt-1 text-sm text-slate-500">Performance and cost insights across your fleet.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={exportCsv} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">Export CSV</button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${card.tone}`}>{card.label}</span><p className="mt-4 text-3xl font-bold text-slate-900">{card.value}</p><p className="mt-2 text-sm text-slate-500">{card.note}</p></article>)}
        </section>

        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-800">Vehicle performance report</h2><p className="mt-1 text-sm text-slate-500">ROI = (Revenue − (Maintenance + Fuel)) / Acquisition Cost</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[1100px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Vehicle</th><th className="px-5 py-3 font-semibold">Fuel efficiency</th><th className="px-5 py-3 font-semibold">Utilization</th><th className="px-5 py-3 font-semibold">Fuel cost</th><th className="px-5 py-3 font-semibold">Maintenance</th><th className="px-5 py-3 font-semibold">Operational cost</th><th className="px-5 py-3 font-semibold">Revenue</th><th className="px-5 py-3 font-semibold">ROI</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row.vehicle} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-700">{row.vehicle}</td><td className="px-5 py-4 text-slate-600">{row.fuelEfficiency.toFixed(1)} km/L</td><td className="px-5 py-4 text-slate-600">{row.utilization}%</td><td className="px-5 py-4 text-slate-600">{currency(row.fuelCost)}</td><td className="px-5 py-4 text-slate-600">{currency(row.maintenance)}</td><td className="px-5 py-4 font-semibold text-slate-800">{currency(row.operationalCost)}</td><td className="px-5 py-4 text-slate-600">{currency(row.revenue)}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.roi >= 2 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{row.roi.toFixed(2)}%</span></td></tr>)}</tbody></table></div>
        </section>
      </div>
    </main>
  );
};

export default ReportsAnalytics;
