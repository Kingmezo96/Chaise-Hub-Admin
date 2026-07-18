'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  Eye,
  EyeOff,
  FileCheck2,
  FileText,
  Filter,
  Landmark,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Network,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  Users,
  WalletCards,
  X,
} from 'lucide-react';

const initialHubs = [
  { id: 'HUB-001', name: 'Cafe One · Abuja', city: 'Abuja', region: 'North Central', address: 'Sterling Bank Plaza, CBD, Abuja', manager: 'Ada Okafor', email: 'ada@cafeone.ng', phone: '+234 803 551 2204', capacity: 31, occupied: 23, activeTalent: 28, today: 18, week: 86, month: 324, projectValue: 6480000, payout: 324000, status: 'Active', lastPaid: '30 Jun 2026', joined: '12 Jan 2025' },
  { id: 'HUB-002', name: 'The Nest · Yaba', city: 'Lagos', region: 'South West', address: '9 Hughes Avenue, Yaba, Lagos', manager: 'Tunde Balogun', email: 'tunde@thenest.ng', phone: '+234 806 410 9831', capacity: 64, occupied: 51, activeTalent: 47, today: 39, week: 194, month: 782, projectValue: 11240000, payout: 562000, status: 'Active', lastPaid: '30 Jun 2026', joined: '18 Mar 2025' },
  { id: 'HUB-003', name: 'CoLab · Kaduna', city: 'Kaduna', region: 'North West', address: '4 Barnawa Close, Kaduna', manager: 'Aisha Mohammed', email: 'aisha@colab.com.ng', phone: '+234 809 228 7410', capacity: 42, occupied: 26, activeTalent: 31, today: 21, week: 105, month: 419, projectValue: 4760000, payout: 238000, status: 'Active', lastPaid: '30 Jun 2026', joined: '08 May 2025' },
  { id: 'HUB-004', name: 'Ventures Park · Abuja', city: 'Abuja', region: 'North Central', address: '29 Mambilla Street, Maitama, Abuja', manager: 'Kene Nwosu', email: 'kene@venturespark.com', phone: '+234 812 395 1032', capacity: 78, occupied: 44, activeTalent: 52, today: 33, week: 171, month: 691, projectValue: 9850000, payout: 492500, status: 'Active', lastPaid: '30 Jun 2026', joined: '21 Feb 2025' },
  { id: 'HUB-005', name: 'nHub · Jos', city: 'Jos', region: 'North Central', address: 'Yakubu Gowon Way, Jos, Plateau', manager: 'Pam Monday', email: 'pam@nhubnigeria.com', phone: '+234 705 116 2048', capacity: 38, occupied: 19, activeTalent: 24, today: 14, week: 72, month: 288, projectValue: 3940000, payout: 197000, status: 'Active', lastPaid: '30 Jun 2026', joined: '04 Apr 2025' },
  { id: 'HUB-006', name: 'Roar Nigeria · Enugu', city: 'Enugu', region: 'South East', address: 'University of Nigeria, Nsukka Road, Enugu', manager: 'Ifeoma Anene', email: 'ifeoma@roarnigeria.org', phone: '+234 807 628 4491', capacity: 50, occupied: 21, activeTalent: 27, today: 16, week: 81, month: 306, projectValue: 4230000, payout: 211500, status: 'Active', lastPaid: '30 Jun 2026', joined: '17 Jun 2025' },
  { id: 'HUB-007', name: 'Wennovation · Ibadan', city: 'Ibadan', region: 'South West', address: '3 Adebowale Akande Avenue, Ibadan', manager: 'Femi Olatunji', email: 'femi@wennovationhub.org', phone: '+234 802 971 3608', capacity: 44, occupied: 16, activeTalent: 19, today: 9, week: 48, month: 183, projectValue: 2710000, payout: 135500, status: 'Paused', lastPaid: '31 May 2026', joined: '28 Aug 2025' },
  { id: 'HUB-008', name: 'TechQuest · Lekki', city: 'Lagos', region: 'South West', address: '12 Admiralty Way, Lekki Phase 1, Lagos', manager: 'Sola Adeyemi', email: 'sola@techquest.ng', phone: '+234 810 443 7712', capacity: 56, occupied: 0, activeTalent: 0, today: 0, week: 0, month: 0, projectValue: 0, payout: 0, status: 'Onboarding', lastPaid: 'Not yet paid', joined: '14 Jul 2026' },
];

const talent = [
  { id: 'TL-1098', initials: 'CO', name: 'Chibuzo Ogbonnaya', role: 'Brand & product designer', hub: 'Cafe One · Abuja', project: 'NovaPay brand rollout', status: 'In hub', visits: 11, hours: '64h 36m', value: 450000 },
  { id: 'TL-1084', initials: 'AE', name: 'Amaka Eze', role: 'Accounting consultant', hub: 'The Nest · Yaba', project: 'Ledger reconciliation sprint', status: 'Checked out', visits: 9, hours: '48h 12m', value: 280000 },
  { id: 'TL-1071', initials: 'FB', name: 'Farouk Bello', role: 'Customer success specialist', hub: 'CoLab · Kaduna', project: 'Support knowledge base', status: 'In hub', visits: 13, hours: '72h 08m', value: 320000 },
  { id: 'TL-1056', initials: 'NJ', name: 'Nneka James', role: 'Legal consultant', hub: 'Ventures Park · Abuja', project: 'Commercial agreement review', status: 'Checked out', visits: 6, hours: '31h 44m', value: 375000 },
  { id: 'TL-1043', initials: 'DO', name: 'David Obi', role: 'Product designer', hub: 'nHub · Jos', project: 'Mobile onboarding flow', status: 'Checked out', visits: 10, hours: '58h 25m', value: 245000 },
  { id: 'TL-1029', initials: 'ZA', name: 'Zainab Ali', role: 'Data engineer', hub: 'Roar Nigeria · Enugu', project: 'Health data migration', status: 'In hub', visits: 4, hours: '22h 34m', value: 510000 },
  { id: 'TL-1017', initials: 'OO', name: 'Ola Ojo', role: 'Motion designer', hub: 'The Nest · Yaba', project: 'Campaign launch assets', status: 'In hub', visits: 15, hours: '81h 19m', value: 620000 },
  { id: 'TL-1008', initials: 'IM', name: 'Ifeoma Mba', role: 'UX researcher', hub: 'Ventures Park · Abuja', project: 'Merchant research sprint', status: 'Checked out', visits: 8, hours: '39h 47m', value: 390000 },
];

const initialSettlements = [
  { id: 'SET-0726-01', hub: 'The Nest · Yaba', period: '01–31 Jul 2026', talent: 47, visits: 782, projectValue: 11240000, amount: 562000, due: '31 Jul 2026', status: 'Ready' },
  { id: 'SET-0726-02', hub: 'Ventures Park · Abuja', period: '01–31 Jul 2026', talent: 52, visits: 691, projectValue: 9850000, amount: 492500, due: '31 Jul 2026', status: 'Ready' },
  { id: 'SET-0726-03', hub: 'Cafe One · Abuja', period: '01–31 Jul 2026', talent: 28, visits: 324, projectValue: 6480000, amount: 324000, due: '31 Jul 2026', status: 'Pending review' },
  { id: 'SET-0726-04', hub: 'CoLab · Kaduna', period: '01–31 Jul 2026', talent: 31, visits: 419, projectValue: 4760000, amount: 238000, due: '31 Jul 2026', status: 'Ready' },
  { id: 'SET-0626-05', hub: 'nHub · Jos', period: '01–30 Jun 2026', talent: 22, visits: 271, projectValue: 3660000, amount: 183000, due: '10 Jul 2026', status: 'Paid' },
  { id: 'SET-0626-06', hub: 'Roar Nigeria · Enugu', period: '01–30 Jun 2026', talent: 25, visits: 294, projectValue: 4080000, amount: 204000, due: '10 Jul 2026', status: 'Paid' },
];

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Hub centres', icon: Building2, count: 8 },
  { label: 'Freelancers', icon: Users, count: 228 },
  { label: 'Usage analytics', icon: Activity },
  { label: 'Settlements', icon: WalletCards, count: 4 },
];

const formatNaira = (amount, compact = false) => {
  if (compact && amount >= 1000000) return `₦${(amount / 1000000).toFixed(2)}m`;
  return `₦${amount.toLocaleString('en-NG')}`;
};

function Brand({ light = false }) {
  return <div className={`pt-brand ${light ? 'light' : ''}`}><span>chaise</span><b>pro track</b></div>;
}

function Pill({ status }) {
  return <span className={`pt-pill ${status.toLowerCase().replaceAll(' ', '-')}`}><i />{status}</span>;
}

function Avatar({ initials }) {
  return <span className="pt-avatar">{initials}</span>;
}

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.username || !form.password) return setError('Enter your super-admin credentials.');
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!response.ok) return setError('The username or password is incorrect.');
      onLogin();
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-login">
      <section className="pt-login-story">
        <Brand />
        <div>
          <span className="pt-story-label"><Network size={17}/> Ecosystem command centre</span>
          <h1>See every hub. Track every visit. Settle every partner.</h1>
          <p>The operating system for Chaise’s nationwide network of work hubs and independent talent.</p>
          <div className="pt-login-metrics"><div><strong>8</strong><span>Hub partners</span></div><div><strong>228</strong><span>Active talent</span></div><div><strong>₦43.2m</strong><span>Value this month</span></div></div>
        </div>
        <footer><span>Super-admin access only</span><span>© 2026 Chaise</span></footer>
      </section>
      <section className="pt-login-form-wrap">
        <form className="pt-login-form" onSubmit={submit}>
          <span className="pt-kicker">CHAISE PRO TRACK</span>
          <h2>Welcome back</h2>
          <p>Sign in to manage the full Chaise Hub ecosystem.</p>
          <label htmlFor="pt-username">Username</label>
          <div className="pt-input"><Users size={18}/><input id="pt-username" autoComplete="username" placeholder="Enter username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })}/></div>
          <label htmlFor="pt-password">Password</label>
          <div className="pt-input"><ShieldCheck size={18}/><input id="pt-password" autoComplete="current-password" type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })}/><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>
          {error && <div className="pt-form-error">{error}</div>}
          <button className="pt-primary pt-login-submit" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Enter Pro Track'} {!loading && <ArrowRight size={18}/>}</button>
          <a href="/" className="pt-back-link"><ArrowLeft size={15}/> Return to hub admin</a>
        </form>
      </section>
    </main>
  );
}

function Sidebar({ page, setPage, open, setOpen, onLogout, hubCount, settlementCount }) {
  return (
    <aside className={`pt-sidebar ${open ? 'open' : ''}`}>
      <div className="pt-sidebar-head"><Brand/><button onClick={() => setOpen(false)} aria-label="Close navigation"><X size={20}/></button></div>
      <nav aria-label="Pro Track navigation">
        <span className="pt-nav-label">ECOSYSTEM</span>
        {navItems.map(({ label, icon: Icon, count }) => {
          const liveCount = label === 'Hub centres' ? hubCount : label === 'Settlements' ? settlementCount : count;
          return <button key={label} className={page === label ? 'active' : ''} onClick={() => { setPage(label); setOpen(false); }}><Icon size={18}/><span>{label}</span>{liveCount ? <em>{liveCount}</em> : null}</button>;
        })}
        <span className="pt-nav-label manage">ADMINISTRATION</span>
        <button><UserRoundCheck size={18}/><span>Admin access</span></button>
        <button><Settings size={18}/><span>Platform settings</span></button>
        <button><CircleHelp size={18}/><span>Support</span></button>
      </nav>
      <div className="pt-network-card"><div><Network size={18}/><span>Network health</span><strong>98.7%</strong></div><i><b style={{ width: '98.7%' }}/></i><small>All core services operational</small></div>
      <a href="/" className="pt-workspace-switch"><Building2 size={17}/><span><strong>Hub admin</strong><small>Open centre workspace</small></span><ChevronRight size={16}/></a>
      <button className="pt-logout" onClick={onLogout}><LogOut size={17}/> Log out</button>
    </aside>
  );
}

function Topbar({ onMenu, onOnboard }) {
  return (
    <header className="pt-topbar">
      <button className="pt-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={21}/></button>
      <div className="pt-global-search"><Search size={17}/><input aria-label="Search the ecosystem" placeholder="Search hubs, freelancers, settlements..."/><kbd>⌘ K</kbd></div>
      <div className="pt-top-actions"><button className="pt-primary" onClick={onOnboard}><Plus size={17}/> Onboard hub</button><button className="pt-icon" aria-label="Notifications"><Bell size={19}/><i/></button><div className="pt-profile"><Avatar initials="CO"/><span><strong>Chibuzo Ogbonnaya</strong><small>Super administrator</small></span><ChevronDown size={15}/></div></div>
    </header>
  );
}

function Metric({ icon: Icon, label, value, delta, note, tone = 'orange' }) {
  return <article className="pt-metric"><div className={`pt-metric-icon ${tone}`}><Icon size={20}/></div><span>{label}</span><div><strong>{value}</strong>{delta && <em><ArrowUpRight size={12}/>{delta}</em>}</div><small>{note}</small></article>;
}

function PageHeading({ path, title, copy, action }) {
  return <section className="pt-page-head"><div><span>Chaise Pro Track <ChevronRight size={13}/> {path}</span><h1>{title}</h1><p>{copy}</p></div>{action}</section>;
}

function PeriodControl({ period, setPeriod }) {
  return <div className="pt-period">{['Today', 'This week', 'This month'].map((item) => <button key={item} className={period === item ? 'active' : ''} onClick={() => setPeriod(item)}>{item}</button>)}</div>;
}

function Overview({ hubs, onHub, setPage, onOnboard }) {
  const activeHubs = hubs.filter((hub) => hub.status === 'Active');
  const totalPayout = activeHubs.reduce((sum, hub) => sum + hub.payout, 0);
  return <>
    <PageHeading path="Overview" title="Good afternoon, Chibuzo" copy="Here is what is happening across the Chaise Hub ecosystem today." action={<div className="pt-head-actions"><button className="pt-secondary"><Download size={16}/> Export report</button><button className="pt-primary" onClick={onOnboard}><Plus size={17}/> Onboard hub</button></div>}/>
    <section className="pt-metrics"><Metric icon={Building2} label="Active hub centres" value={String(activeHubs.length)} delta="+1" note="1 paused · 1 more onboarding"/><Metric icon={Users} label="Active freelancers" value="228" delta="+12.4%" note="150 visited a hub this month" tone="green"/><Metric icon={Activity} label="Visits this month" value="2,993" delta="+8.7%" note="150 verified visits today" tone="blue"/><Metric icon={TrendingUp} label="Project value generated" value="₦43.21m" delta="+16.3%" note={`${formatNaira(totalPayout)} active-hub payout due`} tone="purple"/></section>
    <section className="pt-overview-grid">
      <article className="pt-panel pt-usage-chart">
        <header><div><h2>Network usage</h2><p>Verified freelancer visits across all active hubs</p></div><button>This week <ChevronDown size={14}/></button></header>
        <div className="pt-chart-summary"><div><strong>757</strong><span>visits this week</span><em><ArrowUpRight size={12}/> 8.7%</em></div><div><span><i className="orange"/>Check-ins</span><span><i/>Completed visits</span></div></div>
        <div className="pt-bars">{[['Fri',62,48],['Sat',43,39],['Sun',30,26],['Mon',74,66],['Tue',69,61],['Wed',88,79],['Thu',81,72]].map(([day, first, second]) => <div key={day}><span><i style={{height:`${second}%`}}/><b style={{height:`${first}%`}}/></span><small>{day}</small></div>)}</div>
      </article>
      <article className="pt-panel pt-map-card"><header><div><h2>Network footprint</h2><p>Partner workspace capacity by city</p></div><button onClick={() => setPage('Hub centres')}>View hubs <ArrowRight size={14}/></button></header><div className="pt-map-visual"><span className="pt-map-grid"/><div className="pt-pin lagos"><i/>Lagos <b>2 hubs</b></div><div className="pt-pin abuja"><i/>Abuja <b>2 hubs</b></div><div className="pt-pin kaduna"><i/>Kaduna</div><div className="pt-pin jos"><i/>Jos</div><div className="pt-pin enugu"><i/>Enugu</div><div className="pt-pin ibadan"><i/>Ibadan</div></div><footer><div><strong>6</strong><span>Active hubs</span></div><div><strong>347</strong><span>Listed seats</span></div><div><strong>200</strong><span>In use now</span></div></footer></article>
    </section>
    <section className="pt-panel pt-table-panel"><header><div><h2>Hub performance</h2><p>Month-to-date talent usage and project value by centre</p></div><button onClick={() => setPage('Hub centres')}>Manage all hubs <ArrowRight size={14}/></button></header><div className="pt-table-wrap"><table className="pt-table"><thead><tr><th>Hub centre</th><th>Capacity</th><th>Active talent</th><th>Visits this month</th><th>Project value</th><th>Partner payout</th><th>Status</th><th></th></tr></thead><tbody>{hubs.slice(0, 6).map((hub) => <tr key={hub.id}><td><button className="pt-hub-cell" onClick={() => onHub(hub)}><span><Building2 size={17}/></span><div><strong>{hub.name}</strong><small>{hub.city} · {hub.id}</small></div></button></td><td><div className="pt-capacity"><span><b style={{width:`${Math.round((hub.occupied / hub.capacity) * 100)}%`}}/></span><small>{hub.occupied}/{hub.capacity}</small></div></td><td><strong>{hub.activeTalent}</strong></td><td>{hub.month.toLocaleString()}</td><td><strong>{formatNaira(hub.projectValue, true)}</strong></td><td>{formatNaira(hub.payout)}</td><td><Pill status={hub.status}/></td><td><button className="pt-row-action" onClick={() => onHub(hub)}>View <ChevronRight size={14}/></button></td></tr>)}</tbody></table></div></section>
    <section className="pt-bottom-grid"><article className="pt-panel pt-revenue"><header><div><h2>Partner payout position</h2><p>July settlement progress across the network</p></div><button onClick={() => setPage('Settlements')}>View settlements <ArrowRight size={14}/></button></header><div className="pt-money-summary"><div><span>Total calculated</span><strong>₦2.16m</strong><small>5% of tracked project value</small></div><div><span>Ready to pay</span><strong>₦1.29m</strong><small>3 approved statements</small></div><div><span>Under review</span><strong>₦459.5k</strong><small>2 statements</small></div></div><div className="pt-progress"><i style={{width:'60%'}}/><b style={{width:'21%'}}/></div></article><article className="pt-panel pt-attention"><header><div><h2>Needs attention</h2><p>Network actions requiring review</p></div><span>4</span></header><button><i className="warning"><FileCheck2 size={17}/></i><div><strong>3 settlements ready for approval</strong><small>₦1,292,500 total payout</small></div><ChevronRight size={16}/></button><button><i><Building2 size={17}/></i><div><strong>TechQuest onboarding incomplete</strong><small>2 compliance documents outstanding</small></div><ChevronRight size={16}/></button><button><i><Activity size={17}/></i><div><strong>Wennovation usage paused</strong><small>No verified visits in 7 days</small></div><ChevronRight size={16}/></button></article></section>
  </>;
}

function HubsPage({ hubs, onHub, onOnboard }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const filtered = hubs.filter((hub) => (status === 'All' || hub.status === status) && `${hub.name} ${hub.city} ${hub.manager}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading path="Hub centres" title="Hub centres" copy="Onboard, monitor, and manage every partner workspace in the Chaise network." action={<button className="pt-primary" onClick={onOnboard}><Plus size={17}/> Onboard new hub</button>}/><section className="pt-metrics pt-hub-metrics"><Metric icon={Building2} label="Total partners" value={String(hubs.length)} note="Across 6 Nigerian cities"/><Metric icon={CheckCircle2} label="Active centres" value={String(hubs.filter((hubItem) => hubItem.status === 'Active').length)} note="1 paused · 1 onboarding" tone="green"/><Metric icon={Landmark} label="Network capacity" value={String(hubs.reduce((sum, hubItem) => sum + hubItem.capacity, 0))} note="200 seats occupied today" tone="blue"/><Metric icon={Users} label="Talent served" value="228" note="150 active this month" tone="purple"/></section><section className="pt-panel pt-directory"><div className="pt-table-tools"><div className="pt-search"><Search size={17}/><input placeholder="Search hubs, city, or manager" value={query} onChange={(event) => setQuery(event.target.value)}/></div><div className="pt-filter-tabs">{['All','Active','Onboarding','Paused'].map((item) => <button key={item} className={status === item ? 'active' : ''} onClick={() => setStatus(item)}>{item}</button>)}</div><button className="pt-secondary"><Filter size={16}/> More filters</button></div><div className="pt-hub-grid">{filtered.map((hubItem) => <article className="pt-hub-card" key={hubItem.id}><header><div className="pt-hub-mark"><Building2 size={20}/></div><Pill status={hubItem.status}/></header><div className="pt-hub-title"><span>{hubItem.id}</span><h2>{hubItem.name}</h2><p><MapPin size={14}/>{hubItem.address}</p></div><div className="pt-hub-stats"><div><strong>{hubItem.occupied}/{hubItem.capacity}</strong><span>Seats in use</span></div><div><strong>{hubItem.activeTalent}</strong><span>Active talent</span></div><div><strong>{hubItem.month}</strong><span>Monthly visits</span></div></div><div className="pt-hub-bar"><span><i style={{width:`${hubItem.capacity ? Math.round((hubItem.occupied / hubItem.capacity) * 100) : 0}%`}}/></span><small>{hubItem.capacity ? Math.round((hubItem.occupied / hubItem.capacity) * 100) : 0}% occupancy</small></div><footer><div><span>July project value</span><strong>{formatNaira(hubItem.projectValue, true)}</strong></div><button onClick={() => onHub(hubItem)}>Open hub <ArrowRight size={15}/></button></footer></article>)}</div>{!filtered.length && <div className="pt-empty"><Search size={24}/><strong>No hubs found</strong><span>Try a different search or filter.</span></div>}</section></>;
}

function TalentPage() {
  const [query, setQuery] = useState('');
  const [hub, setHub] = useState('All hubs');
  const filtered = talent.filter((person) => (hub === 'All hubs' || person.hub === hub) && `${person.name} ${person.role} ${person.hub} ${person.project}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading path="Freelancers" title="Freelancers across the network" copy="See every Chaise talent using a partner hub, where they work, and their verified activity." action={<button className="pt-secondary"><Download size={16}/> Export directory</button>}/><section className="pt-metrics"><Metric icon={Users} label="Registered talent" value="228" delta="+12.4%" note="Across 6 active hubs"/><Metric icon={UserRoundCheck} label="At a hub now" value="150" note="65.8% live network usage" tone="green"/><Metric icon={Clock3} label="Hours this month" value="12,408h" delta="+9.2%" note="54h 25m per active talent" tone="blue"/><Metric icon={FileText} label="Active projects" value="174" note="₦43.21m total tracked value" tone="purple"/></section><section className="pt-panel pt-table-panel"><div className="pt-table-tools"><div className="pt-search"><Search size={17}/><input placeholder="Search talent, project, or hub" value={query} onChange={(event) => setQuery(event.target.value)}/></div><select aria-label="Filter freelancers by hub" value={hub} onChange={(event) => setHub(event.target.value)}><option>All hubs</option>{initialHubs.filter((item) => item.status === 'Active').map((item) => <option key={item.id}>{item.name}</option>)}</select><button className="pt-secondary"><Filter size={16}/> Filters</button></div><div className="pt-table-wrap"><table className="pt-table"><thead><tr><th>Freelancer</th><th>Current hub</th><th>Active project</th><th>Visits</th><th>Verified hours</th><th>Project value</th><th>Today</th><th></th></tr></thead><tbody>{filtered.map((person) => <tr key={person.id}><td><div className="pt-person"><Avatar initials={person.initials}/><div><strong>{person.name}</strong><small>{person.role} · {person.id}</small></div></div></td><td><span className="pt-location"><MapPin size={13}/>{person.hub}</span></td><td>{person.project}</td><td><strong>{person.visits}</strong></td><td>{person.hours}</td><td><strong>{formatNaira(person.value)}</strong></td><td><Pill status={person.status}/></td><td><button className="pt-row-action">Profile <ChevronRight size={14}/></button></td></tr>)}</tbody></table></div></section></>;
}

function UsagePage({ hubs, onHub }) {
  const [period, setPeriod] = useState('This month');
  const periodKey = period === 'Today' ? 'today' : period === 'This week' ? 'week' : 'month';
  const total = hubs.reduce((sum, hub) => sum + hub[periodKey], 0);
  return <><PageHeading path="Usage analytics" title="Network usage" copy="Compare attendance, capacity, and talent activity across every hub centre." action={<div className="pt-head-actions"><PeriodControl period={period} setPeriod={setPeriod}/><button className="pt-secondary"><Download size={16}/> Export data</button></div>}/><section className="pt-metrics"><Metric icon={Activity} label={`Verified visits · ${period.toLowerCase()}`} value={total.toLocaleString()} delta="+8.7%" note="Across 6 active centres"/><Metric icon={Users} label="Unique freelancers" value={period === 'Today' ? '150' : period === 'This week' ? '204' : '228'} delta="+6.2%" note="Repeat usage rate · 71%" tone="green"/><Metric icon={Clock3} label="Average session" value="5h 42m" note="12,408 verified hours total" tone="blue"/><Metric icon={Building2} label="Average occupancy" value="54.5%" note="The Nest leads at 79.7%" tone="purple"/></section><section className="pt-analysis-grid"><article className="pt-panel pt-horizontal-chart"><header><div><h2>Usage by hub</h2><p>{period} verified visits compared across the network</p></div><span>Visits</span></header><div>{hubs.filter((hubItem) => hubItem.status !== 'Onboarding').sort((a,b) => b[periodKey] - a[periodKey]).map((hubItem) => <button key={hubItem.id} onClick={() => onHub(hubItem)}><div><strong>{hubItem.name}</strong><span>{hubItem.activeTalent} active talent</span></div><i><b style={{width:`${(hubItem[periodKey] / Math.max(...hubs.map(item => item[periodKey] || 1))) * 100}%`}}/></i><em>{hubItem[periodKey]}</em></button>)}</div></article><article className="pt-panel pt-insights"><header><div><h2>Network insights</h2><p>Automated signals from hub usage</p></div><Sparkles size={18}/></header><div className="pt-insight hero"><span><TrendingUp size={18}/></span><div><strong>The Nest is your busiest centre</strong><p>It generated 26% of all network visits and 25.9% of project value this month.</p></div></div><div className="pt-insight"><span><Clock3 size={17}/></span><div><strong>Peak arrival window</strong><p>68% of check-ins happen between 8:30 and 10:15 AM.</p></div></div><div className="pt-insight"><span><Activity size={17}/></span><div><strong>Retention is improving</strong><p>Repeat weekly hub use increased by 7.4% over June.</p></div></div><div className="pt-insight warning"><span><Building2 size={17}/></span><div><strong>Wennovation needs review</strong><p>Occupancy is 36%, the lowest in the listed network.</p></div></div></article></section></>;
}

function SettlementsPage({ settlements, setSettlements, notify }) {
  const [filter, setFilter] = useState('All');
  const filtered = settlements.filter((item) => filter === 'All' || item.status === filter);
  const markPaid = (id) => { setSettlements((current) => current.map((item) => item.id === id ? { ...item, status: 'Paid' } : item)); notify('Settlement marked as paid.'); };
  return <><PageHeading path="Settlements" title="Hub payments & settlements" copy="Review the 5% partner share, approve statements, and record every hub payment." action={<button className="pt-primary"><Plus size={17}/> Create settlement run</button>}/><section className="pt-settlement-hero"><div className="pt-settlement-icon"><WalletCards size={26}/></div><div><span>JULY PARTNER PAYOUT</span><strong>₦2,160,500</strong><p>5% of ₦43.21m in network project value</p></div><div><span>Ready for payment</span><strong>₦1,292,500</strong><i><b style={{width:'60%'}}/></i><small>3 of 7 active centres approved</small></div><button className="pt-secondary"><Download size={16}/> Download batch</button></section><section className="pt-metrics"><Metric icon={Banknote} label="Calculated payout" value="₦2.16m" note="7 partner statements"/><Metric icon={CheckCircle2} label="Ready to pay" value="₦1.29m" note="3 approved statements" tone="green"/><Metric icon={Clock3} label="Pending review" value="₦459.5k" note="2 statements need review" tone="blue"/><Metric icon={Landmark} label="Paid in June" value="₦1.84m" note="All 7 centres settled" tone="purple"/></section><section className="pt-panel pt-table-panel"><div className="pt-table-tools"><div><h2>Settlement register</h2><p>Partner payments calculated from verified project activity</p></div><div className="pt-filter-tabs">{['All','Ready','Pending review','Paid'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="pt-table-wrap"><table className="pt-table"><thead><tr><th>Settlement</th><th>Hub centre</th><th>Talent / visits</th><th>Project value</th><th>Hub payout · 5%</th><th>Due date</th><th>Status</th><th></th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.id}</strong><small className="pt-block">{item.period}</small></td><td><span className="pt-location"><Building2 size={13}/>{item.hub}</span></td><td><strong>{item.talent}</strong> talent <small className="pt-block">{item.visits} visits</small></td><td>{formatNaira(item.projectValue)}</td><td><strong>{formatNaira(item.amount)}</strong></td><td>{item.due}</td><td><Pill status={item.status}/></td><td>{item.status === 'Ready' ? <button className="pt-pay-button" onClick={() => markPaid(item.id)}><Check size={14}/> Mark paid</button> : <button className="pt-row-action">Review <ChevronRight size={14}/></button>}</td></tr>)}</tbody></table></div></section></>;
}

function HubDrawer({ hub, onClose }) {
  if (!hub) return null;
  return <div className="pt-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside className="pt-drawer"><header><div><span>{hub.id} · PARTNER PROFILE</span><h2>{hub.name}</h2></div><button onClick={onClose} aria-label="Close hub profile"><X size={20}/></button></header><div className="pt-drawer-body"><div className="pt-hub-profile"><span><Building2 size={23}/></span><div><strong>{hub.name}</strong><small><MapPin size={13}/>{hub.address}</small></div><Pill status={hub.status}/></div><section className="pt-drawer-metrics"><div><span>Capacity</span><strong>{hub.occupied}/{hub.capacity}</strong><small>seats occupied</small></div><div><span>Active talent</span><strong>{hub.activeTalent}</strong><small>this month</small></div><div><span>Verified visits</span><strong>{hub.month}</strong><small>this month</small></div></section><h3>Partner contact</h3><dl className="pt-details"><div><dt>Hub manager</dt><dd>{hub.manager}</dd></div><div><dt>Phone</dt><dd>{hub.phone}</dd></div><div><dt>Email</dt><dd>{hub.email}</dd></div><div><dt>Joined network</dt><dd>{hub.joined}</dd></div></dl><h3>Current month</h3><div className="pt-finance-card"><div><span>Project value generated</span><strong>{formatNaira(hub.projectValue)}</strong></div><div><span>Partner payout · 5%</span><strong>{formatNaira(hub.payout)}</strong></div><footer><span>Last settlement</span><b>{hub.lastPaid}</b></footer></div><h3>Usage snapshot</h3><div className="pt-usage-snapshot"><div><span>Today</span><strong>{hub.today} visits</strong></div><div><span>This week</span><strong>{hub.week} visits</strong></div><div><span>This month</span><strong>{hub.month} visits</strong></div></div><h3>Recent network activity</h3><div className="pt-timeline"><div><i><UserRoundCheck size={15}/></i><span><strong>Freelancer checked in</strong><small>Today, 14:42 · QR pass verified</small></span></div><div><i><WalletCards size={15}/></i><span><strong>Settlement statement generated</strong><small>17 Jul 2026 · July cycle</small></span></div><div><i><FileCheck2 size={15}/></i><span><strong>Capacity details confirmed</strong><small>01 Jul 2026 · by {hub.manager}</small></span></div></div></div><footer><button className="pt-secondary">Edit hub details</button><button className="pt-primary">Open full record</button></footer></aside></div>;
}

function OnboardModal({ onClose, onAdd, notify }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', city: '', address: '', manager: '', email: '', phone: '', capacity: '' });
  const [formError, setFormError] = useState('');
  const update = (field, value) => setForm({ ...form, [field]: value });
  const advance = () => {
    if (!form.name.trim() || !form.city.trim() || !form.address.trim() || !form.capacity || Number(form.capacity) < 1) {
      setFormError('Complete the hub name, city, address, and capacity to continue.');
      return;
    }
    setFormError('');
    setStep(2);
  };
  const submit = (event) => { event.preventDefault(); onAdd({ id: `HUB-${String(Date.now()).slice(-3)}`, name: form.name, city: form.city, region: 'Pending assignment', address: form.address, manager: form.manager, email: form.email, phone: form.phone, capacity: Number(form.capacity), occupied: 0, activeTalent: 0, today: 0, week: 0, month: 0, projectValue: 0, payout: 0, status: 'Onboarding', lastPaid: 'Not yet paid', joined: '18 Jul 2026' }); notify(`${form.name} added to onboarding.`); onClose(); };
  return <div className="pt-overlay center" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><form className="pt-modal" onSubmit={submit}><header><div><span>NEW PARTNER HUB</span><h2>Onboard a hub centre</h2><p>Step {step} of 2 · {step === 1 ? 'Hub information' : 'Partner contact'}</p></div><button type="button" onClick={onClose} aria-label="Close onboarding"><X size={20}/></button></header><div className="pt-stepper"><i className="complete"><Check size={13}/></i><span/><i className={step === 2 ? 'complete' : ''}>{step === 2 ? <Check size={13}/> : '2'}</i></div><div className="pt-modal-body">{step === 1 ? <><label>Hub name<input required placeholder="e.g. Workstation · Victoria Island" value={form.name} onChange={(event) => update('name', event.target.value)}/></label><div className="pt-form-grid"><label>City<input required placeholder="Lagos" value={form.city} onChange={(event) => update('city', event.target.value)}/></label><label>Workspace capacity<input required min="1" type="number" placeholder="40" value={form.capacity} onChange={(event) => update('capacity', event.target.value)}/></label></div><label>Full address<textarea required placeholder="Street, area, city and state" value={form.address} onChange={(event) => update('address', event.target.value)}/></label>{formError && <div className="pt-form-error">{formError}</div>}</> : <><label>Hub manager<input required placeholder="Full name" value={form.manager} onChange={(event) => update('manager', event.target.value)}/></label><div className="pt-form-grid"><label>Email address<input required type="email" placeholder="manager@hub.com" value={form.email} onChange={(event) => update('email', event.target.value)}/></label><label>Phone number<input required placeholder="+234" value={form.phone} onChange={(event) => update('phone', event.target.value)}/></label></div><div className="pt-onboard-note"><ShieldCheck size={18}/><div><strong>Compliance check follows</strong><p>The hub will enter Onboarding status while banking, identity, and workspace documents are reviewed.</p></div></div></>}</div><footer>{step === 2 && <button type="button" className="pt-secondary" onClick={() => setStep(1)}>Back</button>}<button type={step === 1 ? 'button' : 'submit'} className="pt-primary" onClick={step === 1 ? advance : undefined}>{step === 1 ? <>Continue <ArrowRight size={16}/></> : <>Add hub partner <Check size={16}/></>}</button></footer></form></div>;
}

function Dashboard({ onLogout }) {
  const [page, setPage] = useState('Overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hubs, setHubs] = useState(initialHubs);
  const [settlements, setSettlements] = useState(initialSettlements);
  const [selectedHub, setSelectedHub] = useState(null);
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [toast, setToast] = useState('');
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2800); };
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [page]);
  return <div className="pt-shell"><Sidebar page={page} setPage={setPage} open={menuOpen} setOpen={setMenuOpen} onLogout={onLogout} hubCount={hubs.length} settlementCount={settlements.filter((item) => item.status !== 'Paid').length}/>{menuOpen && <button className="pt-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)}/>}<div className="pt-main"><Topbar onMenu={() => setMenuOpen(true)} onOnboard={() => setOnboardOpen(true)}/><main className="pt-content">{page === 'Overview' && <Overview hubs={hubs} onHub={setSelectedHub} setPage={setPage} onOnboard={() => setOnboardOpen(true)}/>} {page === 'Hub centres' && <HubsPage hubs={hubs} onHub={setSelectedHub} onOnboard={() => setOnboardOpen(true)}/>} {page === 'Freelancers' && <TalentPage/>} {page === 'Usage analytics' && <UsagePage hubs={hubs} onHub={setSelectedHub}/>} {page === 'Settlements' && <SettlementsPage settlements={settlements} setSettlements={setSettlements} notify={notify}/>}</main></div><HubDrawer hub={selectedHub} onClose={() => setSelectedHub(null)}/>{onboardOpen && <OnboardModal onClose={() => setOnboardOpen(false)} onAdd={(hub) => setHubs((current) => [...current, hub])} notify={notify}/>} {toast && <div className="pt-toast"><CheckCircle2 size={17}/>{toast}</div>}</div>;
}

export default function ProTrackPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  useEffect(() => { let active = true; fetch('/api/auth/session', { cache: 'no-store' }).then((response) => response.ok ? response.json() : { authenticated: false }).then((data) => active && setAuthenticated(Boolean(data.authenticated))).catch(() => active && setAuthenticated(false)).finally(() => active && setChecking(false)); return () => { active = false; }; }, []);
  const logout = async () => { try { await fetch('/api/auth/logout', { method: 'POST' }); } finally { setAuthenticated(false); } };
  if (checking) return <main className="pt-loader"><Brand/><span>Loading ecosystem data…</span></main>;
  return authenticated ? <Dashboard onLogout={logout}/> : <Login onLogin={() => setAuthenticated(true)}/>;
}
