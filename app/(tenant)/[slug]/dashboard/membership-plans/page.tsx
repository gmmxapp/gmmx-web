"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchMembershipPlans,
  createMembershipPlan,
  deleteMembershipPlan
} from "@/lib/api";
import Link from "next/link";

export default function MembershipPlansPage() {
  const params = useParams<{ slug: string }>();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await fetchMembershipPlans();
      setPlans(data);
    } catch (e) {
      setError("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleAddPlan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      durationDays: parseInt(form.get("durationDays") as string),
      price: parseFloat(form.get("price") as string),
      description: form.get("description")
    };

    try {
      await createMembershipPlan(payload);
      loadPlans();
      (e.target as HTMLFormElement).reset();
    } catch (e) {
      setError("Failed to create plan");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteMembershipPlan(id);
      loadPlans();
    } catch (e) {
      setError("Failed to delete plan");
    }
  };

  return (
    <main className="container space-y-6">
      <header className="page-head card">
        <Link href={`/${params.slug}/dashboard`} className="pill" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to Dashboard</Link>
        <h1 className="text-3xl font-black text-white mt-3">Membership Plans</h1>
        <p>Define your gym's membership tiers and pricing.</p>
      </header>

      {error && <p className="error">{error}</p>}

      <section className="grid grid-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Current Plans</h2>
          {loading ? (
            <p>Loading...</p>
          ) : plans.length === 0 ? (
            <p className="text-gray-400">No plans created yet.</p>
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">{plan.name}</h3>
                  <p className="text-sm">₹{plan.price} • {plan.durationDays} Days</p>
                  {plan.description && <p className="text-xs text-gray-400 mt-1">{plan.description}</p>}
                </div>
                <button 
                  onClick={() => handleDelete(plan.id)}
                  className="button button-secondary" 
                  style={{ background: '#331111', color: '#ff5555' }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <form className="card form-stack" onSubmit={handleAddPlan}>
          <h2 className="text-xl font-bold text-white">Add New Plan</h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Plan Name</label>
              <input className="input" name="name" placeholder="e.g. Monthly Platinum" required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Duration (Days)</label>
              <input className="input" name="durationDays" type="number" placeholder="30" required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Price (₹)</label>
              <input className="input" name="price" type="number" placeholder="2000" required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</label>
              <textarea className="input" name="description" placeholder="Optional details..." rows={3}></textarea>
            </div>
            <button className="button w-full" type="submit">Create Plan</button>
          </div>
        </form>
      </section>
    </main>
  );
}
