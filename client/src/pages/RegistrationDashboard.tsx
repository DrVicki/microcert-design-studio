import { useMemo, useState } from "react";
import { BriefcaseBusiness, CalendarClock, Download, Mail, RefreshCw, Search, ShieldCheck, UserRound, Users } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function downloadRoster(rows: Array<{ name: string; email: string; roleUnit: string; registeredAt: Date; updatedAt: Date }>) {
  const header = ["Name", "Email", "Role / unit / affiliation", "Registered", "Last updated"];
  const body = rows.map(row => [
    row.name,
    row.email,
    row.roleUnit,
    new Date(row.registeredAt).toISOString(),
    new Date(row.updatedAt).toISOString(),
  ]);
  const csv = [header, ...body].map(row => row.map(csvCell).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `fieldbook-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function RegistrationDashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [query, setQuery] = useState("");
  const registrationsQuery = trpc.registrations.list.useQuery(undefined, { enabled: isAdmin, retry: false });
  const statsQuery = trpc.registrations.stats.useQuery(undefined, { enabled: isAdmin, retry: false });
  const registrations = registrationsQuery.data ?? [];

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return registrations;
    return registrations.filter(item => `${item.name} ${item.email} ${item.roleUnit}`.toLowerCase().includes(needle));
  }, [query, registrations]);

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newThisWeek = registrations.filter(item => new Date(item.registeredAt).getTime() >= sevenDaysAgo).length;
  const updatedRecords = registrations.filter(item => new Date(item.updatedAt).getTime() - new Date(item.registeredAt).getTime() > 2_000).length;
  const latest = registrations[0];

  return (
    <DashboardLayout>
      <div className="registration-dashboard">
        <header className="dashboard-masthead">
          <div>
            <span className="dashboard-kicker"><ShieldCheck /> Administrator workspace</span>
            <h1>Participant registrations</h1>
            <p>Review the names, email addresses, and affiliations submitted before participants enter Dr. Bealman’s Fieldbook.</p>
          </div>
          <div className="dashboard-actions">
            <Button variant="outline" onClick={() => registrationsQuery.refetch()} disabled={registrationsQuery.isFetching}><RefreshCw className={registrationsQuery.isFetching ? "spin" : ""} /> Refresh</Button>
            <Button onClick={() => downloadRoster(filtered)} disabled={!filtered.length}><Download /> Download CSV</Button>
          </div>
        </header>

        <section className="dashboard-stats" aria-label="Registration summary">
          <article><Users /><div><strong>{statsQuery.data?.total ?? registrations.length}</strong><span>Total registrations</span></div></article>
          <article><CalendarClock /><div><strong>{newThisWeek}</strong><span>New in the last 7 days</span></div></article>
          <article><RefreshCw /><div><strong>{updatedRecords}</strong><span>Updated records</span></div></article>
          <article><UserRound /><div><strong>{latest?.name || "—"}</strong><span>Most recent participant</span></div></article>
        </section>

        <section className="dashboard-roster">
          <div className="roster-toolbar">
            <div>
              <span className="dashboard-kicker">Registration roster</span>
              <h2>{filtered.length} {filtered.length === 1 ? "participant" : "participants"}</h2>
            </div>
            <label className="dashboard-search">
              <Search />
              <span className="sr-only">Search registrations</span>
              <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search name, email, or affiliation" />
            </label>
          </div>

          {registrationsQuery.isLoading ? (
            <div className="dashboard-state"><RefreshCw className="spin" /><strong>Loading registrations…</strong></div>
          ) : registrationsQuery.error ? (
            <div className="dashboard-state error"><ShieldCheck /><strong>Registrations could not be loaded.</strong><p>{registrationsQuery.error.message}</p></div>
          ) : !filtered.length ? (
            <div className="dashboard-state"><Users /><strong>{registrations.length ? "No records match this search." : "No participants have registered yet."}</strong><p>New registrations will appear here after a participant submits the required form.</p></div>
          ) : (
            <div className="roster-table-wrap">
              <table className="roster-table">
                <thead><tr><th>Participant</th><th>Contact</th><th>Role / affiliation</th><th>Registered</th><th>Updated</th></tr></thead>
                <tbody>
                  {filtered.map(item => (
                    <tr key={item.id}>
                      <td><span className="participant-avatar" aria-hidden="true">{item.name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase()}</span><strong>{item.name}</strong></td>
                      <td><a href={`mailto:${item.email}`}><Mail />{item.email}</a></td>
                      <td><span className="role-cell"><BriefcaseBusiness />{item.roleUnit}</span></td>
                      <td>{new Date(item.registeredAt).toLocaleString()}</td>
                      <td>{new Date(item.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="dashboard-privacy"><ShieldCheck /><p><strong>Handle participant information responsibly.</strong> This dashboard contains personally identifiable contact information. Export the roster only when necessary, store downloads in approved systems, and do not include participant emails in public reports or proposal artifacts.</p></aside>
      </div>
    </DashboardLayout>
  );
}
