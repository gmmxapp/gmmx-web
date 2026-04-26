"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  createMember,
  createTrainer,
  DashboardSummary,
  fetchDashboardSummary
} from "@/lib/api";

export default function DashboardPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchSummary = useCallback(async () => {
    try {
      setError("");
      const data = await fetchDashboardSummary(slug);
      setSummary(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load summary");
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchSummary();
    }
  }, [slug, fetchSummary]);

  async function addUser(event: FormEvent<HTMLFormElement>, endpoint: "member" | "trainer") {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      tenantSlug: slug,
      fullName: String(form.get("fullName") ?? ""),
      mobile: String(form.get("mobile") ?? ""),
      email: String(form.get("email") ?? "")
    };

    try {
      if (endpoint == "member") {
        await createMember(payload);
        setSuccessMessage("Member added successfully.");
      } else {
        await createTrainer(payload);
        setSuccessMessage("Trainer added successfully.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create failed");
      return;
    }

    (event.target as HTMLFormElement).reset();
    fetchSummary();
  }

  return (
    <main className="container space-y-6">
      <header className="page-head card">
        <span className="pill">Owner Dashboard</span>
        <h1 className="text-3xl font-black text-white mt-3">{slug} Dashboard</h1>
        <p>Track usage, manage team, and keep trial progress on one screen.</p>
      </header>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="pill">{successMessage}</p>}

      {summary && (
        <section className="grid grid-3">
          <div className="kpi">
            <p className="kpi-title">Members</p>
            <p className="kpi-value">{summary.activeMembers}/{summary.memberLimit}</p>
          </div>
          <div className="kpi">
            <p className="kpi-title">Trainers</p>
            <p className="kpi-value">{summary.activeTrainers}/{summary.trainerLimit}</p>
          </div>
          <div className="kpi">
            <p className="kpi-title">Today Attendance</p>
            <p className="kpi-value">{summary.todayAttendance}</p>
          </div>
          <div className="kpi">
            <p className="kpi-title">Trial Days Left</p>
            <p className="kpi-value">{summary.trialDaysLeft}</p>
          </div>
        </section>
      )}

      <section className="grid grid-3">
        <form className="card form-stack" onSubmit={(e) => addUser(e, "member")}>
          <h3>Add Member</h3>
          <input className="input" name="fullName" placeholder="Name" required />
          <input className="input" name="mobile" placeholder="Mobile" pattern="[0-9]{10}" required />
          <input className="input" name="email" placeholder="Email" type="email" />
          <button className="button" type="submit" style={{ marginTop: 12 }}>Add Member</button>
        </form>

        <form className="card form-stack" onSubmit={(e) => addUser(e, "trainer")}>
          <h3>Add Trainer</h3>
          <input className="input" name="fullName" placeholder="Name" required />
          <input className="input" name="mobile" placeholder="Mobile" pattern="[0-9]{10}" required />
          <input className="input" name="email" placeholder="Email" type="email" />
          <button className="button" type="submit" style={{ marginTop: 12 }}>Add Trainer</button>
        </form>
      </section>
    </main>
  );
}
