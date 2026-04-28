"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchEquipment,
  createEquipment,
  deleteEquipment
} from "@/lib/api";
import Link from "next/link";

export default function EquipmentPage() {
  const params = useParams<{ slug: string }>();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const data = await fetchEquipment();
      setItems(data);
    } catch (e) {
      setError("Failed to load equipment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const handleAddEquipment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      quantity: parseInt(form.get("quantity") as string),
      condition: form.get("condition"),
      lastMaintenanceDate: new Date().toISOString().split('T')[0]
    };

    try {
      await createEquipment(payload);
      loadEquipment();
      (e.target as HTMLFormElement).reset();
    } catch (e) {
      setError("Failed to add equipment");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteEquipment(id);
      loadEquipment();
    } catch (e) {
      setError("Failed to delete equipment");
    }
  };

  return (
    <main className="container space-y-6">
      <header className="page-head card">
        <Link href={`/${params.slug}/dashboard`} className="pill" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to Dashboard</Link>
        <h1 className="text-3xl font-black text-white mt-3">Gym Equipment</h1>
        <p>Track your gym's inventory, machines, and their condition.</p>
      </header>

      {error && <p className="error">{error}</p>}

      <section className="grid grid-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Inventory List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-400">No equipment added yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="pill text-[10px] py-0 px-2" style={{ background: '#222' }}>Qty: {item.quantity}</span>
                    <span className={`pill text-[10px] py-0 px-2 ${
                      item.condition === 'NEW' || item.condition === 'GOOD' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                    }`}>
                      {item.condition}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="button button-secondary" 
                  style={{ background: '#331111', color: '#ff5555' }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <form className="card form-stack" onSubmit={handleAddEquipment}>
          <h2 className="text-xl font-bold text-white">Add Equipment</h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Equipment Name</label>
              <input className="input" name="name" placeholder="e.g. Treadmill X1" required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Quantity</label>
              <input className="input" name="quantity" type="number" placeholder="1" required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Condition</label>
              <select className="input" name="condition" required>
                <option value="NEW">New</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="POOR">Poor</option>
                <option value="BROKEN">Broken</option>
              </select>
            </div>
            <button className="button w-full" type="submit">Add to Inventory</button>
          </div>
        </form>
      </section>
    </main>
  );
}
