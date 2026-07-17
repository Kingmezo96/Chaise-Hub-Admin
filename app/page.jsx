'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Bell,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  Eye,
  EyeOff,
  FileText,
  Filter,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  Timer,
  Users,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';

const projects = [
  {
    id: 'CH-2048',
    title: 'NovaPay brand identity rollout',
    freelancer: 'Chibuzo Ogbonnaya',
    initials: 'CO',
    client: 'NovaPay Africa',
    hub: 'Cafe One · Abuja',
    category: 'Brand & product design',
    value: 450000,
    hubFee: 22500,
    start: '20 Jul 2026',
    end: '14 Aug 2026',
    milestone: '2 of 2',
    progress: 68,
    status: 'Active',
    today: '6h 42m',
  },
  {
    id: 'CH-2039',
    title: 'Ledger reconciliation sprint',
    freelancer: 'Amaka Eze',
    initials: 'AE',
    client: 'Migo Stores',
    hub: 'Cafe One · Lekki',
    category: 'Accounting & consulting',
    value: 280000,
    hubFee: 14000,
    start: '08 Jul 2026',
    end: '25 Jul 2026',
    milestone: '1 of 2',
    progress: 82,
    status: 'Active',
    today: '4h 16m',
  },
  {
    id: 'CH-2021',
    title: 'Support knowledge base setup',
    freelancer: 'Farouk Bello',
    initials: 'FB',
    client: 'Kora Health',
    hub: 'Workstation · Lagos VI',
    category: 'Customer service',
    value: 320000,
    hubFee: 16000,
    start: '01 Jul 2026',
    end: '18 Jul 2026',
    milestone: '3 of 3',
    progress: 96,
    status: 'Ending soon',
    today: '7h 08m',
  },
  {
    id: 'CH-1998',
    title: 'Retail performance dashboard',
    freelancer: 'Tomi Adeyemi',
    initials: 'TA',
    client: 'Pine Retail',
    hub: 'Cafe One · Yaba',
    category: 'Data science & analytics',
    value: 600000,
    hubFee: 30000,
    start: '12 Jun 2026',
    end: '12 Jul 2026',
    milestone: '3 of 3',
    progress: 100,
    status: 'Completed',
    today: '—',
  },
];

const attendance = [
  { initials: 'CO', name: 'Chibuzo Ogbonnaya', project: 'NovaPay brand identity rollout', in: '08:47', out: '—', duration: '6h 42m', state: 'In hub' },
  { initials: 'AE', name: 'Amaka Eze', project: 'Ledger reconciliation sprint', in: '09:12', out: '13:28', duration: '4h 16m', state: 'Checked out' },
  { initials: 'FB', name: 'Farouk Bello', project: 'Support knowledge base setup', in: '08:31', out: '—', duration: '7h 08m', state: 'In hub' },
  { initials: 'NJ', name: 'Nneka James', project: 'Legal contract review', in: '10:03', out: '14:12', duration: '4h 09m', state: 'Checked out' },
];

const hubs = [
  { name: 'Cafe One · Abuja', city: 'Abuja', active: 23, desks: 31, utilization: 74, manager: 'Ada Obi', settlement: 84250 },
  { name: 'Cafe One · Lekki', city: 'Lagos', active: 18, desks: 24, utilization: 68, manager: 'Bola Ekun', settlement: 71800 },
  { name: 'Workstation · Lagos VI', city: 'Lagos', active: 14, desks: 20, utilization: 63, manager: 'Ife Okoro', settlement: 56600 },
  { name: 'Ventures Park · Abuja', city: 'Abuja', active: 9, desks: 17, utilization: 52, manager: 'Nura Aliyu', settlement: 39400 },
];

const formatNaira = (amount) => `₦${amount.toLocaleString('en-NG')}`;

function Logo({ inverse = false }) {
  return <div className={`logo ${inverse ? 'logo-inverse' : ''}`}>chaise<span>.</span></div>;
}

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError('Enter your username and password to continue.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        setError('The username or password is incorrect.');
        return;
      }
      onLogin();
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (forgot) {
    return (
      <main className="auth-shell">
        <section className="auth-story">
          <div className="auth-brand"><Logo /></div>
          <div className="story-content">
            <div className="story-kicker"><ShieldCheck size={18} /> Protected hub operations</div>
            <h1>One calm place to run every Chaise Hub.</h1>
            <p>Track live attendance, manage projects, and keep every partner centre aligned.</p>
          </div>
          <div className="story-footer"><span>chaise hub admin</span><span>Secure access</span></div>
        </section>
        <section className="auth-form-wrap">
          <div className="auth-form-card">
            <button className="back-button" onClick={() => { setForgot(false); setSent(false); }}><ArrowLeft size={18} /> Back to sign in</button>
            <div className="auth-icon"><Mail size={25} /></div>
            <h2>{sent ? 'Check your inbox' : 'Reset your password'}</h2>
            <p>{sent ? 'We sent a secure reset link to your administrator email.' : 'Enter the email linked to your hub account and we’ll send you a reset link.'}</p>
            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <label className="field-label" htmlFor="recovery-email">Work email</label>
                <div className="input-wrap"><Mail size={18} /><input id="recovery-email" type="email" placeholder="admin@chaise.com" required /></div>
                <button className="primary-button" type="submit">Send reset link <ArrowRight size={18} /></button>
              </form>
            ) : (
              <button className="primary-button" onClick={() => { setForgot(false); setSent(false); }}>Return to sign in <ArrowRight size={18} /></button>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <section className="auth-story">
        <div className="auth-brand"><Logo /></div>
        <div className="story-content">
          <div className="story-kicker"><Zap size={18} /> Focus. Connect. Deliver.</div>
          <h1>The operating system for every Chaise Hub.</h1>
          <p>Manage projects, verify QR passes, and keep attendance accurate in real time.</p>
          <div className="auth-metrics">
            <div><strong>64</strong><span>Active projects</span></div>
            <div><strong>51</strong><span>Partner hubs</span></div>
            <div><strong>98.4%</strong><span>Check-in accuracy</span></div>
          </div>
        </div>
        <div className="story-footer"><span>chaise hub admin</span><span>© 2026 Chaise</span></div>
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form-card" onSubmit={submit}>
          <div className="mobile-logo"><Logo /></div>
          <div className="eyebrow">ADMIN PORTAL</div>
          <h2>Welcome back</h2>
          <p>Sign in to manage hub operations and project activity.</p>
          <label className="field-label" htmlFor="username">Username</label>
          <div className="input-wrap"><Users size={18} /><input id="username" autoComplete="username" placeholder="Enter your username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
          <div className="password-row"><label className="field-label" htmlFor="password">Password</label><button type="button" onClick={() => setForgot(true)}>Forgot password?</button></div>
          <div className="input-wrap"><ShieldCheck size={18} /><input id="password" autoComplete="current-password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}/><button className="show-password" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>
          {error && <div className="form-error">{error}</div>}
          <label className="remember"><input type="checkbox" /> <span>Keep me signed in on this device</span></label>
          <button className="primary-button" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in to dashboard'} {!submitting && <ArrowRight size={18} />}</button>
          <div className="secure-note"><ShieldCheck size={16} /> Your session is encrypted and monitored.</div>
        </form>
      </section>
    </main>
  );
}

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Projects', icon: FileText, count: 64 },
  { label: 'Attendance', icon: Clock3, count: 12 },
  { label: 'Hub centres', icon: Building2 },
  { label: 'Settlements', icon: WalletCards },
];

function Sidebar({ page, setPage, open, setOpen, onLogout }) {
  return (
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><Logo /><button className="mobile-close" onClick={() => setOpen(false)}><X size={22}/></button></div>
      <nav className="side-nav" aria-label="Admin navigation">
        <span className="nav-group-label">WORKSPACE</span>
        {navItems.map((item) => {
          const Icon = item.icon;
          return <button key={item.label} className={page === item.label ? 'active' : ''} onClick={() => { setPage(item.label); setOpen(false); }}><Icon size={19}/><span>{item.label}</span>{item.count && <em>{item.count}</em>}</button>;
        })}
        <span className="nav-group-label second">MANAGE</span>
        <button><Users size={19}/><span>Team access</span></button>
        <button><Settings size={19}/><span>Settings</span></button>
        <button><CircleHelp size={19}/><span>Help centre</span></button>
      </nav>
      <div className="hub-plan">
        <div className="plan-icon"><Building2 size={20}/></div>
        <strong>Chaise Network</strong>
        <span>51 partner centres active</span>
        <div className="plan-progress"><i style={{width: '82%'}} /></div>
        <small>82% monthly capacity</small>
      </div>
      <button className="logout" onClick={onLogout}><LogOut size={18}/> Log out</button>
    </aside>
  );
}

function Topbar({ setSidebarOpen, onScan }) {
  return (
    <header className="topbar">
      <button className="menu-button" onClick={() => setSidebarOpen(true)}><Menu size={22}/></button>
      <div className="global-search"><Search size={18}/><input placeholder="Search people, projects or hub ID..." /><kbd>⌘ K</kbd></div>
      <div className="top-actions">
        <button className="scan-button" onClick={onScan}><QrCode size={18}/> Scan QR pass</button>
        <button className="icon-button" aria-label="Notifications"><Bell size={20}/><span className="notification-dot"/></button>
        <div className="profile"><div className="avatar orange">AO</div><div><strong>Ada Okafor</strong><span>Super admin</span></div><ChevronDown size={16}/></div>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, change, tone = 'orange', note }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={21}/></div>
      <span className="stat-label">{label}</span>
      <div className="stat-value-row"><strong>{value}</strong>{change && <span className={change.startsWith('+') ? 'up' : 'neutral'}>{change.startsWith('+') ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>} {change}</span>}</div>
      <small>{note}</small>
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`status ${status.toLowerCase().replaceAll(' ', '-')}`}><i/>{status}</span>;
}

function Avatar({ initials }) { return <div className="avatar">{initials}</div>; }

function Overview({ onViewProject, onScan, setPage }) {
  return (
    <>
      <section className="page-heading">
        <div><div className="breadcrumb">Dashboard <ChevronRight size={14}/> Overview</div><h1>Good afternoon, Ada</h1><p>Here’s what’s happening across the Chaise Hub network today.</p></div>
        <div className="heading-actions"><button className="secondary-button"><Download size={17}/> Export report</button><button className="primary-button compact" onClick={onScan}><QrCode size={17}/> Scan QR pass</button></div>
      </section>
      <section className="stats-grid">
        <StatCard icon={FileText} label="Active projects" value="64" change="+8.2%" note="5 ending this week" />
        <StatCard icon={Users} label="People in hubs" value="128" change="+12.4%" note="Across 31 centres" tone="green" />
        <StatCard icon={Timer} label="Hours logged today" value="846h" change="+6.1%" note="6.6 hours average" tone="blue" />
        <StatCard icon={Banknote} label="Pending settlements" value="₦1.28m" change="7.8%" note="Next run · 31 Jul" tone="purple" />
      </section>
      <section className="dashboard-grid">
        <div className="panel activity-panel">
          <div className="panel-head"><div><h2>Hub activity</h2><p>Daily check-ins across all partner centres</p></div><button className="period-button">Last 7 days <ChevronDown size={15}/></button></div>
          <div className="chart-summary"><div><span>1,846</span><small>Total check-ins</small></div><div className="legend"><span><i className="legend-orange"/>Check-ins</span><span><i className="legend-gray"/>Capacity</span></div></div>
          <div className="bar-chart" aria-label="Check-ins chart">
            {[
              ['Fri', 54, 78], ['Sat', 38, 64], ['Sun', 31, 59], ['Mon', 67, 84], ['Tue', 73, 88], ['Wed', 82, 92], ['Thu', 70, 86]
            ].map(([day, value, capacity]) => <div className="bar-item" key={day}><div className="bars"><i style={{height: `${capacity}%`}}/><b style={{height: `${value}%`}}/></div><span>{day}</span></div>)}
          </div>
        </div>
        <div className="panel live-panel">
          <div className="panel-head"><div><h2>Live attendance</h2><p><span className="live-dot"/> 128 people currently active</p></div><button className="text-button" onClick={() => setPage('Attendance')}>View all <ArrowRight size={15}/></button></div>
          <div className="attendance-list">
            {attendance.slice(0, 3).map((entry) => <div className="attendance-row" key={entry.name}><Avatar initials={entry.initials}/><div className="attendance-person"><strong>{entry.name}</strong><span>{entry.project}</span></div><div className="attendance-time"><strong>{entry.in}</strong><span>{entry.state}</span></div></div>)}
          </div>
          <button className="panel-cta" onClick={onScan}><QrCode size={18}/> Scan a hub pass</button>
        </div>
      </section>
      <section className="panel projects-panel">
        <div className="panel-head"><div><h2>Active projects</h2><p>Projects currently using partner hub spaces</p></div><button className="text-button" onClick={() => setPage('Projects')}>View all projects <ArrowRight size={15}/></button></div>
        <ProjectTable data={projects.slice(0, 3)} onViewProject={onViewProject}/>
      </section>
      <section className="bottom-grid">
        <div className="panel utilization-panel">
          <div className="panel-head"><div><h2>Hub centre utilization</h2><p>Today’s busiest partner locations</p></div><button className="icon-button"><MoreHorizontal size={20}/></button></div>
          {hubs.slice(0,3).map(hub => <div className="hub-util" key={hub.name}><div><strong>{hub.name}</strong><span>{hub.active} active freelancers</span></div><div className="util-bar"><i style={{width: `${hub.utilization}%`}}/></div><b>{hub.utilization}%</b></div>)}
        </div>
        <div className="panel alerts-panel">
          <div className="panel-head"><div><h2>Needs attention</h2><p>Time-sensitive project updates</p></div><span className="alert-count">3</span></div>
          <div className="alert-item warning"><div className="alert-icon"><Timer size={18}/></div><div><strong>Project ending tomorrow</strong><p>Support knowledge base setup · CH-2021</p></div><ChevronRight size={18}/></div>
          <div className="alert-item"><div className="alert-icon"><Clock3 size={18}/></div><div><strong>Missing check-out</strong><p>2 records from Cafe One · Lekki</p></div><ChevronRight size={18}/></div>
          <div className="alert-item"><div className="alert-icon"><Banknote size={18}/></div><div><strong>Settlement ready to review</strong><p>₦482,300 across 9 hub centres</p></div><ChevronRight size={18}/></div>
        </div>
      </section>
    </>
  );
}

function ProjectTable({ data, onViewProject }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Project</th><th>Freelancer</th><th>Hub centre</th><th>Timeline</th><th>Today</th><th>Status</th><th></th></tr></thead>
        <tbody>{data.map(project => <tr key={project.id}>
          <td><button className="project-cell" onClick={() => onViewProject(project)}><strong>{project.title}</strong><span>{project.id} · {project.category}</span></button></td>
          <td><div className="person-cell"><Avatar initials={project.initials}/><span>{project.freelancer}</span></div></td>
          <td>{project.hub}</td>
          <td><div className="timeline-cell"><span>{project.end}</span><div><i style={{width: `${project.progress}%`}}/></div></div></td>
          <td><strong>{project.today}</strong></td>
          <td><StatusBadge status={project.status}/></td>
          <td><button className="icon-button" onClick={() => onViewProject(project)} aria-label={`View ${project.title}`}><ChevronRight size={18}/></button></td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

function ProjectsPage({ onViewProject }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const filtered = useMemo(() => projects.filter(project => (status === 'All' || project.status === status) && `${project.title} ${project.freelancer} ${project.id}`.toLowerCase().includes(query.toLowerCase())), [query, status]);
  return (
    <>
      <section className="page-heading"><div><div className="breadcrumb">Workspace <ChevronRight size={14}/> Projects</div><h1>Projects</h1><p>Monitor every active contract, milestone, timeline, and workspace record.</p></div><button className="primary-button compact"><FileText size={17}/> Add project</button></section>
      <section className="mini-stats">
        <div><span>All projects</span><strong>128</strong></div><div><span>Active</span><strong>64</strong></div><div><span>Ending this week</span><strong>5</strong></div><div><span>Completed this month</span><strong>22</strong></div>
      </section>
      <section className="panel data-panel">
        <div className="table-tools"><div className="search-control"><Search size={17}/><input placeholder="Search projects or people" value={query} onChange={e => setQuery(e.target.value)}/></div><div className="filter-tabs">{['All','Active','Ending soon','Completed'].map(item => <button key={item} className={status === item ? 'selected' : ''} onClick={() => setStatus(item)}>{item}</button>)}</div><button className="secondary-button"><Filter size={16}/> Filters</button></div>
        <ProjectTable data={filtered} onViewProject={onViewProject}/>
        {filtered.length === 0 && <div className="empty-state"><Search size={24}/><strong>No projects found</strong><span>Try a different search or status.</span></div>}
      </section>
    </>
  );
}

function AttendancePage({ onScan }) {
  return (
    <>
      <section className="page-heading"><div><div className="breadcrumb">Workspace <ChevronRight size={14}/> Attendance</div><h1>Attendance</h1><p>Live time-in, time-out, and verified hours across the network.</p></div><button className="primary-button compact" onClick={onScan}><QrCode size={17}/> Scan QR pass</button></section>
      <section className="stats-grid attendance-stats">
        <StatCard icon={LogIn} label="Checked in today" value="186" change="+14.2%" note="128 currently active" />
        <StatCard icon={LogOut} label="Checked out" value="58" note="31.2% of check-ins" tone="green" />
        <StatCard icon={Timer} label="Average work time" value="6h 36m" note="24m above network avg" tone="blue" />
        <StatCard icon={Activity} label="Missed check-outs" value="3" note="Requires admin review" tone="purple" />
      </section>
      <section className="panel data-panel">
        <div className="panel-head"><div><h2>Today’s attendance</h2><p>Friday, 17 July 2026 · All hub centres</p></div><div className="heading-actions"><button className="secondary-button"><CalendarDays size={16}/> Today</button><button className="secondary-button"><Download size={16}/> Export</button></div></div>
        <div className="table-wrap"><table><thead><tr><th>Freelancer</th><th>Project</th><th>Time in</th><th>Time out</th><th>Duration</th><th>State</th><th></th></tr></thead><tbody>{attendance.map(row => <tr key={row.name}><td><div className="person-cell"><Avatar initials={row.initials}/><strong>{row.name}</strong></div></td><td>{row.project}</td><td>{row.in}</td><td>{row.out}</td><td><strong>{row.duration}</strong></td><td><StatusBadge status={row.state}/></td><td><button className="icon-button"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>
      </section>
    </>
  );
}

function HubsPage() {
  return (
    <>
      <section className="page-heading"><div><div className="breadcrumb">Manage <ChevronRight size={14}/> Hub centres</div><h1>Hub centres</h1><p>Manage partner locations, capacity, managers, and operating status.</p></div><button className="primary-button compact"><Building2 size={17}/> Add hub centre</button></section>
      <section className="hub-grid">{hubs.map(hub => <article className="hub-card" key={hub.name}><div className="hub-card-top"><div className="building-icon"><Building2 size={22}/></div><StatusBadge status="Active"/></div><h3>{hub.name}</h3><p>{hub.city}, Nigeria · Managed by {hub.manager}</p><div className="hub-card-metrics"><div><span>Active now</span><strong>{hub.active}</strong></div><div><span>Workspaces</span><strong>{hub.desks}</strong></div><div><span>Utilization</span><strong>{hub.utilization}%</strong></div></div><div className="util-bar large"><i style={{width: `${hub.utilization}%`}}/></div><div className="hub-card-foot"><span>Jul settlement <strong>{formatNaira(hub.settlement)}</strong></span><button>Manage <ArrowRight size={15}/></button></div></article>)}</section>
    </>
  );
}

function SettlementsPage() {
  const total = hubs.reduce((sum, hub) => sum + hub.settlement, 0);
  return (
    <>
      <section className="page-heading"><div><div className="breadcrumb">Manage <ChevronRight size={14}/> Settlements</div><h1>Hub settlements</h1><p>Review the 5% hub service fees before monthly partner payouts.</p></div><button className="primary-button compact"><CheckCircle2 size={17}/> Review payout run</button></section>
      <section className="settlement-banner"><div className="settlement-icon"><WalletCards size={27}/></div><div><span>Next payout run · 31 July 2026</span><strong>₦1,284,500</strong><p>47 partner centres · 218 completed milestones</p></div><div className="settlement-progress"><div><span>Ready for approval</span><strong>92%</strong></div><div><i style={{width:'92%'}}/></div></div><button className="secondary-button">View breakdown <ArrowRight size={16}/></button></section>
      <section className="panel data-panel"><div className="panel-head"><div><h2>Partner settlement preview</h2><p>Calculated automatically from successful project transactions</p></div><button className="secondary-button"><Download size={16}/> Export statement</button></div><div className="table-wrap"><table><thead><tr><th>Hub centre</th><th>Active projects</th><th>Eligible transactions</th><th>Hub share</th><th>Validation</th><th></th></tr></thead><tbody>{hubs.map((hub, index) => <tr key={hub.name}><td><strong>{hub.name}</strong></td><td>{hub.active}</td><td>{formatNaira(hub.settlement * 20)}</td><td><strong>{formatNaira(hub.settlement)}</strong><span className="subcell">5% service share</span></td><td><span className="verified"><Check size={14}/> Verified</span></td><td><button className="text-button">Review <ChevronRight size={14}/></button></td></tr>)}</tbody><tfoot><tr><td colSpan="3">Preview subtotal</td><td>{formatNaira(total)}</td><td colSpan="2"></td></tr></tfoot></table></div></section>
    </>
  );
}

function ProjectDrawer({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="drawer">
        <div className="drawer-head"><div><span className="eyebrow">{project.id}</span><h2>{project.title}</h2></div><button className="icon-button" onClick={onClose}><X size={20}/></button></div>
        <div className="drawer-content">
          <div className="project-owner"><Avatar initials={project.initials}/><div><strong>{project.freelancer}</strong><span>{project.category}</span></div><StatusBadge status={project.status}/></div>
          <div className="project-highlight"><div><span>Project timeline</span><strong>{project.start} — {project.end}</strong></div><div className="progress-line"><i style={{width:`${project.progress}%`}}/></div><small>{project.progress}% of scheduled duration elapsed</small></div>
          <h3>Project details</h3>
          <dl className="details-grid"><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Hub centre</dt><dd>{project.hub}</dd></div><div><dt>Project value</dt><dd>{formatNaira(project.value)}</dd></div><div><dt>Hub service share</dt><dd>{formatNaira(project.hubFee)} · 5%</dd></div><div><dt>Milestones</dt><dd>{project.milestone} complete</dd></div><div><dt>Hours logged</dt><dd>64h 36m</dd></div></dl>
          <h3>Today’s activity</h3>
          <div className="activity-timeline"><div><i><LogIn size={16}/></i><div><strong>Checked in</strong><span>08:47 · QR pass verified at reception</span></div><b>Verified</b></div><div><i><Clock3 size={16}/></i><div><strong>Currently working</strong><span>6 hours 42 minutes recorded today</span></div><b className="live-text">Live</b></div></div>
          <h3>Milestones</h3>
          <div className="milestone-card"><div><CheckCircle2 size={19}/><div><strong>Client review and final revisions</strong><span>Due 30 Jul 2026</span></div><strong>{formatNaira(project.value / 2)}</strong></div><div><Clock3 size={19}/><div><strong>Final files and handover</strong><span>Due {project.end}</span></div><strong>{formatNaira(project.value / 2)}</strong></div></div>
        </div>
        <div className="drawer-actions"><button className="secondary-button">View full record</button><button className="primary-button compact">Manage project</button></div>
      </aside>
    </div>
  );
}

function QRModal({ onClose }) {
  const [scanned, setScanned] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  return (
    <div className="overlay center" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="qr-modal">
        <div className="modal-head"><div><span className="eyebrow">HUB RECEPTION</span><h2>{scanned ? 'Pass verified' : 'Scan hub pass'}</h2></div><button className="icon-button" onClick={onClose}><X size={20}/></button></div>
        {!scanned ? <>
          <p>Place the freelancer’s QR pass inside the frame to load their project and attendance record.</p>
          <button className="scanner-frame" onClick={() => setScanned(true)}>
            <span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/>
            <QrCode size={72}/><i/><span>Camera ready · click to simulate scan</span>
          </button>
          <div className="manual-entry"><span>or enter pass ID manually</span><div><input placeholder="e.g. CH-2048-ABJ"/><button onClick={() => setScanned(true)}><ArrowRight size={18}/></button></div></div>
        </> : <>
          <div className="verified-banner"><CheckCircle2 size={24}/><div><strong>Valid Chaise Hub pass</strong><span>Identity and active project confirmed</span></div></div>
          <div className="scan-person"><Avatar initials="CO"/><div><strong>Chibuzo Ogbonnaya</strong><span>Brand & product designer</span></div><span className="id-chip">CH-2048</span></div>
          <div className="scan-project"><span>PROJECT</span><strong>NovaPay brand identity rollout</strong><p>Complete the final brand guidelines, social templates, and handover files.</p><div><span><CalendarDays size={15}/> 20 Jul — 14 Aug 2026</span><span><Building2 size={15}/> Cafe One · Abuja</span></div></div>
          <div className="scan-facts"><div><span>Expected today</span><strong>09:00 — 17:00</strong></div><div><span>Project value</span><strong>₦450,000</strong></div><div><span>Milestone</span><strong>2 of 2</strong></div><div><span>Time logged</span><strong>{checkedIn ? '00h 01m' : '64h 36m'}</strong></div></div>
          <button className={`primary-button scan-confirm ${checkedIn ? 'success-button' : ''}`} onClick={() => setCheckedIn(true)}>{checkedIn ? <><CheckCircle2 size={19}/> Check-in recorded at 15:31</> : <><LogIn size={19}/> Confirm check-in</>}</button>
          {checkedIn && <button className="secondary-button full" onClick={onClose}>Done</button>}
        </>}
      </div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [page, setPage] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [scanOpen, setScanOpen] = useState(false);
  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} onLogout={onLogout}/>
      {sidebarOpen && <div className="mobile-scrim" onClick={() => setSidebarOpen(false)}/>} 
      <div className="main-shell">
        <Topbar setSidebarOpen={setSidebarOpen} onScan={() => setScanOpen(true)}/>
        <main className="content">
          {page === 'Overview' && <Overview onViewProject={setProject} onScan={() => setScanOpen(true)} setPage={setPage}/>} 
          {page === 'Projects' && <ProjectsPage onViewProject={setProject}/>} 
          {page === 'Attendance' && <AttendancePage onScan={() => setScanOpen(true)}/>} 
          {page === 'Hub centres' && <HubsPage/>} 
          {page === 'Settlements' && <SettlementsPage/>}
        </main>
      </div>
      <ProjectDrawer project={project} onClose={() => setProject(null)}/>
      {scanOpen && <QRModal onClose={() => setScanOpen(false)}/>} 
    </div>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : { authenticated: false })
      .then((session) => {
        if (active) setAuthenticated(Boolean(session.authenticated));
      })
      .catch(() => {
        if (active) setAuthenticated(false);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => { active = false; };
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setAuthenticated(false);
    }
  };

  if (checkingSession) {
    return <main className="session-loader"><Logo /><span>Preparing your workspace…</span></main>;
  }

  return authenticated ? <Dashboard onLogout={logout}/> : <Login onLogin={() => setAuthenticated(true)}/>;
}

export default App;
