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
    category: 'Brand & product design',
    value: 450000,
    hubFee: 22500,
    start: '20 Jul 2026',
    end: '14 Aug 2026',
    milestone: '2 of 2',
    progress: 68,
    status: 'Ongoing',
    paymentStatus: 'Pending',
    paymentDue: '14 Aug 2026',
    today: '6h 42m',
  },
  {
    id: 'CH-2039',
    title: 'Ledger reconciliation sprint',
    freelancer: 'Amaka Eze',
    initials: 'AE',
    client: 'Migo Stores',
    category: 'Accounting & consulting',
    value: 280000,
    hubFee: 14000,
    start: '08 Jul 2026',
    end: '25 Jul 2026',
    milestone: '1 of 2',
    progress: 82,
    status: 'Ongoing',
    paymentStatus: 'Paid',
    paymentDue: '15 Jul 2026',
    today: '4h 16m',
  },
  {
    id: 'CH-2021',
    title: 'Support knowledge base setup',
    freelancer: 'Farouk Bello',
    initials: 'FB',
    client: 'Kora Health',
    category: 'Customer service',
    value: 320000,
    hubFee: 16000,
    start: '01 Jul 2026',
    end: '18 Jul 2026',
    milestone: '3 of 3',
    progress: 96,
    status: 'Ending soon',
    paymentStatus: 'Overdue',
    paymentDue: '16 Jul 2026',
    today: '7h 08m',
  },
  {
    id: 'CH-1998',
    title: 'Retail performance dashboard',
    freelancer: 'Tomi Adeyemi',
    initials: 'TA',
    client: 'Pine Retail',
    category: 'Data science & analytics',
    value: 600000,
    hubFee: 30000,
    start: '12 Jun 2026',
    end: '12 Jul 2026',
    milestone: '3 of 3',
    progress: 100,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentDue: '12 Jul 2026',
    today: '—',
  },
  {
    id: 'CH-1987',
    title: 'Commercial agreement review',
    freelancer: 'Nneka James',
    initials: 'NJ',
    client: 'Helio Logistics',
    category: 'Legal services',
    value: 375000,
    hubFee: 18750,
    start: '10 Jul 2026',
    end: '31 Jul 2026',
    milestone: '1 of 2',
    progress: 42,
    status: 'Ongoing',
    paymentStatus: 'Scheduled',
    paymentDue: '31 Jul 2026',
    today: '4h 09m',
  },
  {
    id: 'CH-1974',
    title: 'Mobile onboarding flow',
    freelancer: 'David Obi',
    initials: 'DO',
    client: 'Bridge Finance',
    category: 'Product design',
    value: 245000,
    hubFee: 12250,
    start: '02 Jul 2026',
    end: '16 Jul 2026',
    milestone: '2 of 2',
    progress: 100,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentDue: '16 Jul 2026',
    today: '—',
  },
];

const attendance = [
  { initials: 'CO', name: 'Chibuzo Ogbonnaya', project: 'NovaPay brand identity rollout', in: '08:47', out: '—', duration: '6h 42m', state: 'In hub' },
  { initials: 'AE', name: 'Amaka Eze', project: 'Ledger reconciliation sprint', in: '09:12', out: '13:28', duration: '4h 16m', state: 'Checked out' },
  { initials: 'FB', name: 'Farouk Bello', project: 'Support knowledge base setup', in: '08:31', out: '—', duration: '7h 08m', state: 'In hub' },
  { initials: 'NJ', name: 'Nneka James', project: 'Commercial agreement review', in: '10:03', out: '14:12', duration: '4h 09m', state: 'Checked out' },
  { initials: 'DO', name: 'David Obi', project: 'Mobile onboarding flow', in: '09:41', out: '15:06', duration: '5h 25m', state: 'Checked out' },
  { initials: 'ZA', name: 'Zainab Ali', project: 'Health data migration', in: '11:18', out: '—', duration: '2h 34m', state: 'In hub' },
];

const people = [
  { initials: 'CO', name: 'Chibuzo Ogbonnaya', role: 'Brand & product designer', email: 'chibuzo@chaise.work', phone: '+234 803 241 8840', project: 'NovaPay brand identity rollout', status: 'In hub', hours: '64h 36m', visits: 11, payment: 'Pending' },
  { initials: 'AE', name: 'Amaka Eze', role: 'Accounting consultant', email: 'amaka@chaise.work', phone: '+234 806 114 2093', project: 'Ledger reconciliation sprint', status: 'Checked out', hours: '48h 12m', visits: 9, payment: 'Paid' },
  { initials: 'FB', name: 'Farouk Bello', role: 'Customer success specialist', email: 'farouk@chaise.work', phone: '+234 812 603 7714', project: 'Support knowledge base setup', status: 'In hub', hours: '72h 08m', visits: 13, payment: 'Overdue' },
  { initials: 'NJ', name: 'Nneka James', role: 'Legal consultant', email: 'nneka@chaise.work', phone: '+234 809 411 5721', project: 'Commercial agreement review', status: 'Checked out', hours: '31h 44m', visits: 6, payment: 'Scheduled' },
  { initials: 'DO', name: 'David Obi', role: 'Product designer', email: 'david@chaise.work', phone: '+234 815 340 2298', project: 'Mobile onboarding flow', status: 'Checked out', hours: '58h 25m', visits: 10, payment: 'Paid' },
  { initials: 'ZA', name: 'Zainab Ali', role: 'Data engineer', email: 'zainab@chaise.work', phone: '+234 807 995 6102', project: 'Health data migration', status: 'In hub', hours: '22h 34m', visits: 4, payment: 'Pending' },
];

const hubProfile = {
  name: 'Cafe One · Abuja',
  address: '1st Floor, Sterling Bank Plaza, CBD Abuja, FCT',
  manager: 'Ada Okafor',
  desks: 31,
  occupied: 23,
};

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
            <h1>One calm place to run your Chaise Hub.</h1>
            <p>Protect access to your centre’s attendance, projects, people, and payment records.</p>
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
          <h1>Everything happening in your hub, in one place.</h1>
          <p>Manage every person, project, QR check-in, work hour, and payment at Cafe One Abuja.</p>
          <div className="auth-metrics">
            <div><strong>6</strong><span>Current projects</span></div>
            <div><strong>23</strong><span>People on site</span></div>
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
  { label: 'People', icon: Users, count: 23 },
  { label: 'Attendance', icon: Clock3, count: 3 },
  { label: 'Projects', icon: FileText, count: 6 },
  { label: 'Payments', icon: WalletCards, count: 2 },
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
        <a className="pro-track-link" href="/pro-track"><Building2 size={19}/><span>Chaise Pro Track</span><em>SUPER</em></a>
        <button><Users size={19}/><span>Team access</span></button>
        <button><Settings size={19}/><span>Settings</span></button>
        <button><CircleHelp size={19}/><span>Help centre</span></button>
      </nav>
      <div className="hub-plan">
        <div className="plan-icon"><Building2 size={20}/></div>
        <strong>{hubProfile.name}</strong>
        <span>{hubProfile.occupied} of {hubProfile.desks} desks occupied</span>
        <div className="plan-progress"><i style={{width: '74%'}} /></div>
        <small>74% live occupancy</small>
      </div>
      <button className="logout" onClick={onLogout}><LogOut size={18}/> Log out</button>
    </aside>
  );
}

function Topbar({ setSidebarOpen, onScan }) {
  return (
    <header className="topbar">
      <button className="menu-button" onClick={() => setSidebarOpen(true)}><Menu size={22}/></button>
      <div className="global-search"><Search size={18}/><input placeholder="Search people, projects or payments..." /><kbd>⌘ K</kbd></div>
      <div className="top-actions">
        <button className="scan-button" onClick={onScan}><QrCode size={18}/> Scan QR pass</button>
        <button className="icon-button" aria-label="Notifications"><Bell size={20}/><span className="notification-dot"/></button>
        <div className="profile"><div className="avatar orange">AO</div><div><strong>{hubProfile.manager}</strong><span>Hub manager</span></div><ChevronDown size={16}/></div>
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
        <div><div className="breadcrumb">{hubProfile.name} <ChevronRight size={14}/> Overview</div><h1>Good afternoon, Ada</h1><p>{hubProfile.address}</p></div>
        <div className="heading-actions"><button className="secondary-button"><Download size={17}/> Export report</button><button className="primary-button compact" onClick={onScan}><QrCode size={17}/> Scan QR pass</button></div>
      </section>
      <section className="stats-grid">
        <StatCard icon={LogIn} label="Check-ins today" value="8" change="+14.2%" note="3 people currently in the hub" />
        <StatCard icon={Users} label="Active members" value="23" change="+4.5%" note="6 currently assigned projects" tone="green" />
        <StatCard icon={Timer} label="Hours logged today" value="36h 14m" change="+6.1%" note="5h 11m average visit" tone="blue" />
        <StatCard icon={Banknote} label="Hub revenue · July" value="₦113,500" change="+9.8%" note="₦57,250 awaiting payment" tone="purple" />
      </section>
      <section className="dashboard-grid">
        <div className="panel activity-panel">
          <div className="panel-head"><div><h2>Daily footfall</h2><p>Verified arrivals and departures at this centre</p></div><button className="period-button">Last 7 days <ChevronDown size={15}/></button></div>
          <div className="chart-summary"><div><span>86</span><small>Total visits this week</small></div><div className="legend"><span><i className="legend-orange"/>Check-ins</span><span><i className="legend-gray"/>Check-outs</span></div></div>
          <div className="bar-chart" aria-label="Check-ins chart">
            {[
              ['Fri', 48, 42], ['Sat', 36, 34], ['Sun', 24, 21], ['Mon', 71, 66], ['Tue', 64, 58], ['Wed', 82, 76], ['Thu', 69, 61]
            ].map(([day, arrivals, departures]) => <div className="bar-item" key={day}><div className="bars"><i style={{height: `${departures}%`}}/><b style={{height: `${arrivals}%`}}/></div><span>{day}</span></div>)}
          </div>
        </div>
        <div className="panel live-panel">
          <div className="panel-head"><div><h2>Who is here now</h2><p><span className="live-dot"/> 3 people currently checked in</p></div><button className="text-button" onClick={() => setPage('Attendance')}>View all <ArrowRight size={15}/></button></div>
          <div className="attendance-list">
            {attendance.filter(entry => entry.state === 'In hub').map((entry) => <div className="attendance-row" key={entry.name}><Avatar initials={entry.initials}/><div className="attendance-person"><strong>{entry.name}</strong><span>{entry.project}</span></div><div className="attendance-time"><strong>{entry.in}</strong><span>{entry.state}</span></div></div>)}
          </div>
          <button className="panel-cta" onClick={onScan}><QrCode size={18}/> Scan a hub pass</button>
        </div>
      </section>
      <section className="panel projects-panel">
        <div className="panel-head"><div><h2>Current projects</h2><p>Work being carried out from {hubProfile.name}</p></div><button className="text-button" onClick={() => setPage('Projects')}>View all projects <ArrowRight size={15}/></button></div>
        <ProjectTable data={projects.slice(0, 3)} onViewProject={onViewProject}/>
      </section>
      <section className="bottom-grid">
        <div className="panel revenue-panel">
          <div className="panel-head"><div><h2>Payment overview</h2><p>Hub revenue attached to each worker’s project</p></div><button className="text-button" onClick={() => setPage('Payments')}>Manage payments <ArrowRight size={15}/></button></div>
          <div className="revenue-summary"><div><span>Received</span><strong>₦56,250</strong><small>3 payments</small></div><div><span>Pending</span><strong>₦41,250</strong><small>2 payments</small></div><div><span>Overdue</span><strong>₦16,000</strong><small>1 payment</small></div></div>
          <div className="revenue-progress"><i style={{width:'49.5%'}}/><b style={{width:'36.3%'}}/></div>
          <div className="revenue-legend"><span><i className="paid-dot"/>Received 49.5%</span><span><i className="pending-dot"/>Pending 36.3%</span><span><i className="overdue-dot"/>Overdue 14.2%</span></div>
        </div>
        <div className="panel alerts-panel">
          <div className="panel-head"><div><h2>Needs attention</h2><p>Actions for this hub centre</p></div><span className="alert-count">3</span></div>
          <div className="alert-item warning"><div className="alert-icon"><Timer size={18}/></div><div><strong>Project ending tomorrow</strong><p>Support knowledge base setup · CH-2021</p></div><ChevronRight size={18}/></div>
          <div className="alert-item"><div className="alert-icon"><Clock3 size={18}/></div><div><strong>Missing check-out</strong><p>1 attendance record requires review</p></div><ChevronRight size={18}/></div>
          <div className="alert-item"><div className="alert-icon"><Banknote size={18}/></div><div><strong>Payment overdue</strong><p>₦16,000 hub revenue · Farouk Bello</p></div><ChevronRight size={18}/></div>
        </div>
      </section>
    </>
  );
}

function ProjectTable({ data, onViewProject }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Project</th><th>Freelancer</th><th>Timeline</th><th>Hours today</th><th>Project</th><th>Payment</th><th></th></tr></thead>
        <tbody>{data.map(project => <tr key={project.id}>
          <td><button className="project-cell" onClick={() => onViewProject(project)}><strong>{project.title}</strong><span>{project.id} · {project.category}</span></button></td>
          <td><div className="person-cell"><Avatar initials={project.initials}/><span>{project.freelancer}</span></div></td>
          <td><div className="timeline-cell"><span>{project.end}</span><div><i style={{width: `${project.progress}%`}}/></div></div></td>
          <td><strong>{project.today}</strong></td>
          <td><StatusBadge status={project.status}/></td>
          <td><StatusBadge status={project.paymentStatus}/></td>
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
      <section className="page-heading"><div><div className="breadcrumb">{hubProfile.name} <ChevronRight size={14}/> Projects</div><h1>Projects</h1><p>Track every project being delivered from this centre, from arrival to final payment.</p></div><button className="primary-button compact"><FileText size={17}/> Add project</button></section>
      <section className="mini-stats">
        <div><span>All projects</span><strong>6</strong></div><div><span>Ongoing</span><strong>3</strong></div><div><span>Completed</span><strong>2</strong></div><div><span>Fully paid</span><strong>3</strong></div>
      </section>
      <section className="panel data-panel">
        <div className="table-tools"><div className="search-control"><Search size={17}/><input placeholder="Search projects or people" value={query} onChange={e => setQuery(e.target.value)}/></div><div className="filter-tabs">{['All','Ongoing','Ending soon','Completed'].map(item => <button key={item} className={status === item ? 'selected' : ''} onClick={() => setStatus(item)}>{item}</button>)}</div><button className="secondary-button"><Filter size={16}/> Filters</button></div>
        <ProjectTable data={filtered} onViewProject={onViewProject}/>
        {filtered.length === 0 && <div className="empty-state"><Search size={24}/><strong>No projects found</strong><span>Try a different search or status.</span></div>}
      </section>
    </>
  );
}

function AttendancePage({ onScan }) {
  return (
    <>
      <section className="page-heading"><div><div className="breadcrumb">{hubProfile.name} <ChevronRight size={14}/> Attendance</div><h1>Attendance</h1><p>Live arrivals, departures, and verified working hours for this centre.</p></div><button className="primary-button compact" onClick={onScan}><QrCode size={17}/> Scan QR pass</button></section>
      <section className="stats-grid attendance-stats">
        <StatCard icon={LogIn} label="Checked in today" value="8" change="+14.2%" note="3 currently in the hub" />
        <StatCard icon={LogOut} label="Checked out" value="5" note="Latest departure · 15:06" tone="green" />
        <StatCard icon={Timer} label="Average visit" value="5h 11m" note="36h 14m recorded today" tone="blue" />
        <StatCard icon={Activity} label="Missing check-outs" value="1" note="Requires manager review" tone="purple" />
      </section>
      <section className="panel data-panel">
        <div className="panel-head"><div><h2>Today’s attendance</h2><p>Saturday, 18 July 2026 · {hubProfile.name}</p></div><div className="heading-actions"><button className="secondary-button"><CalendarDays size={16}/> Today</button><button className="secondary-button"><Download size={16}/> Export</button></div></div>
        <div className="table-wrap"><table><thead><tr><th>Freelancer</th><th>Project</th><th>Time in</th><th>Time out</th><th>Duration</th><th>State</th><th></th></tr></thead><tbody>{attendance.map(row => <tr key={row.name}><td><div className="person-cell"><Avatar initials={row.initials}/><strong>{row.name}</strong></div></td><td>{row.project}</td><td>{row.in}</td><td>{row.out}</td><td><strong>{row.duration}</strong></td><td><StatusBadge status={row.state}/></td><td><button className="icon-button"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>
      </section>
    </>
  );
}

function PeoplePage({ onViewPerson }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const filtered = useMemo(() => people.filter(person => (status === 'All' || person.status === status) && `${person.name} ${person.role} ${person.project}`.toLowerCase().includes(query.toLowerCase())), [query, status]);
  return (
    <>
      <section className="page-heading"><div><div className="breadcrumb">{hubProfile.name} <ChevronRight size={14}/> People</div><h1>People</h1><p>See everyone using this centre, their contact details, project, visits, hours, and payment state.</p></div><button className="primary-button compact"><Users size={17}/> Add member</button></section>
      <section className="mini-stats">
        <div><span>Registered members</span><strong>23</strong></div><div><span>In the hub now</span><strong>3</strong></div><div><span>Active projects</span><strong>4</strong></div><div><span>Payments due</span><strong>2</strong></div>
      </section>
      <section className="panel data-panel">
        <div className="table-tools"><div className="search-control"><Search size={17}/><input placeholder="Search members or projects" value={query} onChange={e => setQuery(e.target.value)}/></div><div className="filter-tabs">{['All','In hub','Checked out'].map(item => <button key={item} className={status === item ? 'selected' : ''} onClick={() => setStatus(item)}>{item}</button>)}</div><button className="secondary-button"><Filter size={16}/> Filters</button></div>
        <div className="table-wrap"><table><thead><tr><th>Member</th><th>Contact</th><th>Current project</th><th>Total hours</th><th>Visits</th><th>Payment</th><th>Status</th><th></th></tr></thead><tbody>{filtered.map(person => <tr key={person.name}><td><div className="person-cell"><Avatar initials={person.initials}/><div><strong>{person.name}</strong><span className="subcell">{person.role}</span></div></div></td><td><span>{person.email}</span><span className="subcell">{person.phone}</span></td><td>{person.project}</td><td><strong>{person.hours}</strong></td><td>{person.visits}</td><td><StatusBadge status={person.payment}/></td><td><StatusBadge status={person.status}/></td><td><button className="text-button" onClick={() => onViewPerson(person)}>View <ChevronRight size={14}/></button></td></tr>)}</tbody></table></div>
        {filtered.length === 0 && <div className="empty-state"><Search size={24}/><strong>No members found</strong><span>Try a different search or attendance state.</span></div>}
      </section>
    </>
  );
}

function PaymentsPage() {
  const [status, setStatus] = useState('All');
  const filtered = status === 'All' ? projects : projects.filter(project => project.paymentStatus === status);
  const total = projects.reduce((sum, project) => sum + project.hubFee, 0);
  const received = projects.filter(project => project.paymentStatus === 'Paid').reduce((sum, project) => sum + project.hubFee, 0);
  return (
    <>
      <section className="page-heading"><div><div className="breadcrumb">{hubProfile.name} <ChevronRight size={14}/> Payments</div><h1>Payments & revenue</h1><p>Track the hub’s 5% revenue against every person and project completed at this centre.</p></div><button className="primary-button compact"><CheckCircle2 size={17}/> Record payment</button></section>
      <section className="settlement-banner"><div className="settlement-icon"><WalletCards size={27}/></div><div><span>JULY HUB REVENUE</span><strong>{formatNaira(total)}</strong><p>{projects.length} project-linked payments · {hubProfile.name}</p></div><div className="settlement-progress"><div><span>Received so far</span><strong>{Math.round((received / total) * 100)}%</strong></div><div><i style={{width:`${(received / total) * 100}%`}}/></div></div><button className="secondary-button"><Download size={16}/> Export statement</button></section>
      <section className="stats-grid payment-stats">
        <StatCard icon={CheckCircle2} label="Revenue received" value={formatNaira(received)} note="3 payments confirmed" tone="green" />
        <StatCard icon={Clock3} label="Pending revenue" value="₦41,250" note="2 payments expected" />
        <StatCard icon={Activity} label="Overdue revenue" value="₦16,000" note="1 payment needs follow-up" tone="purple" />
        <StatCard icon={FileText} label="Project value tracked" value="₦2.27m" note="Across 6 centre users" tone="blue" />
      </section>
      <section className="panel data-panel"><div className="table-tools"><div><h2>Payment register</h2><p>Every project and the revenue due to this hub</p></div><div className="filter-tabs payment-tabs">{['All','Paid','Pending','Scheduled','Overdue'].map(item => <button key={item} className={status === item ? 'selected' : ''} onClick={() => setStatus(item)}>{item}</button>)}</div></div><div className="table-wrap"><table><thead><tr><th>Worker</th><th>Project</th><th>Project value</th><th>Hub revenue</th><th>Due date</th><th>Payment</th><th></th></tr></thead><tbody>{filtered.map(project => <tr key={project.id}><td><div className="person-cell"><Avatar initials={project.initials}/><div><strong>{project.freelancer}</strong><span className="subcell">{project.id}</span></div></div></td><td>{project.title}</td><td>{formatNaira(project.value)}</td><td><strong>{formatNaira(project.hubFee)}</strong><span className="subcell">5% hub share</span></td><td>{project.paymentDue}</td><td><StatusBadge status={project.paymentStatus}/></td><td>{project.paymentStatus === 'Paid' ? <span className="verified"><Check size={14}/> Confirmed</span> : <button className="text-button">Update <ChevronRight size={14}/></button>}</td></tr>)}</tbody><tfoot><tr><td colSpan="3">Total hub revenue</td><td>{formatNaira(total)}</td><td colSpan="3"></td></tr></tfoot></table></div></section>
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
          <dl className="details-grid"><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Payment</dt><dd>{project.paymentStatus} · due {project.paymentDue}</dd></div><div><dt>Project value</dt><dd>{formatNaira(project.value)}</dd></div><div><dt>Hub revenue</dt><dd>{formatNaira(project.hubFee)} · 5%</dd></div><div><dt>Milestones</dt><dd>{project.milestone} complete</dd></div><div><dt>Hours logged</dt><dd>64h 36m</dd></div></dl>
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

function PersonDrawer({ person, onClose }) {
  if (!person) return null;
  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="drawer">
        <div className="drawer-head"><div><span className="eyebrow">MEMBER PROFILE</span><h2>{person.name}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close member profile"><X size={20}/></button></div>
        <div className="drawer-content">
          <div className="member-identity"><Avatar initials={person.initials}/><div><strong>{person.name}</strong><span>{person.role}</span></div><StatusBadge status={person.status}/></div>
          <div className="member-contact"><div><Mail size={16}/><span>{person.email}</span></div><div><Users size={16}/><span>{person.phone}</span></div></div>
          <h3>Hub activity</h3>
          <dl className="details-grid"><div><dt>Total verified hours</dt><dd>{person.hours}</dd></div><div><dt>Centre visits</dt><dd>{person.visits} visits</dd></div><div><dt>Current attendance</dt><dd>{person.status}</dd></div><div><dt>Payment state</dt><dd>{person.payment}</dd></div></dl>
          <h3>Current project</h3>
          <div className="member-project-card"><FileText size={20}/><div><strong>{person.project}</strong><span>{hubProfile.name} · Verified member</span></div><ChevronRight size={18}/></div>
          <h3>Recent visits</h3>
          <div className="activity-timeline"><div><i><LogIn size={16}/></i><div><strong>Today · Checked in</strong><span>08:47 via verified QR pass</span></div><b>6h 42m</b></div><div><i><CheckCircle2 size={16}/></i><div><strong>17 Jul · Completed visit</strong><span>09:06 — 16:38</span></div><b>7h 32m</b></div><div><i><CheckCircle2 size={16}/></i><div><strong>16 Jul · Completed visit</strong><span>08:52 — 15:47</span></div><b>6h 55m</b></div></div>
          <h3>Payment summary</h3>
          <div className="payment-profile"><div><span>Current state</span><StatusBadge status={person.payment}/></div><div><span>Revenue linked to member</span><strong>{formatNaira(projects.find(project => project.freelancer === person.name)?.hubFee || 0)}</strong></div></div>
        </div>
        <div className="drawer-actions"><button className="secondary-button">Attendance history</button><button className="primary-button compact">Manage member</button></div>
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
  const [person, setPerson] = useState(null);
  const [scanOpen, setScanOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} onLogout={onLogout}/>
      {sidebarOpen && <div className="mobile-scrim" onClick={() => setSidebarOpen(false)}/>} 
      <div className="main-shell">
        <Topbar setSidebarOpen={setSidebarOpen} onScan={() => setScanOpen(true)}/>
        <main className="content">
          {page === 'Overview' && <Overview onViewProject={setProject} onScan={() => setScanOpen(true)} setPage={setPage}/>} 
          {page === 'People' && <PeoplePage onViewPerson={setPerson}/>}
          {page === 'Attendance' && <AttendancePage onScan={() => setScanOpen(true)}/>} 
          {page === 'Projects' && <ProjectsPage onViewProject={setProject}/>}
          {page === 'Payments' && <PaymentsPage/>}
        </main>
      </div>
      <ProjectDrawer project={project} onClose={() => setProject(null)}/>
      <PersonDrawer person={person} onClose={() => setPerson(null)}/>
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
