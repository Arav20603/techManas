import { useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import assessmentQuestions from './data/assessmentQuestions.json'
import incidentTypes from './data/incidentTypes.json'
import orgChecklist from './data/orgChecklist.json'
import resources from './data/resources.json'
import Button from './components/Button'
import Card from './components/Card'
import ScoreBadge from './components/ScoreBadge'
import StepWizard from './components/StepWizard'
import ProgressBar from './components/ProgressBar'

const shell = 'mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8'
const options = [0, 25, 50, 75, 100]

function AssessmentPage() {
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState({})
  const q = assessmentQuestions[i]
  const navigate = useNavigate()
  const score = Math.round(Object.values(answers).reduce((a, b) => a + b, 0) / assessmentQuestions.length)
  const byCat = assessmentQuestions.reduce((acc, x) => ({ ...acc, [x.category]: acc[x.category] ? [...acc[x.category], answers[x.id] ?? 0] : [answers[x.id] ?? 0] }), {})
  const categoryScores = Object.fromEntries(Object.entries(byCat).map(([k, arr]) => [k, Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)]))
  return <main className={shell}><Card><h1 className="text-2xl font-bold text-brand-blue">Cyber Wellness Assessment</h1><p className="mb-4 mt-1 text-slate-600">Self-reflection guide (demo only)</p><StepWizard index={i} total={assessmentQuestions.length} onPrev={() => setI((v) => Math.max(0, v - 1))} onNext={() => i === assessmentQuestions.length - 1 ? navigate('/preventive/results', { state: { score, categoryScores } }) : setI((v) => v + 1)} canNext={answers[q.id] !== undefined}><div className="space-y-3 rounded-xl bg-brand-mist p-4"><h2 className="font-semibold">{q.question}</h2><div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5">{options.map((o) => <button key={o} onClick={() => setAnswers((p) => ({ ...p, [q.id]: o }))} className={`rounded-lg border px-3 py-2 text-sm ${answers[q.id] === o ? 'bg-brand-blue text-white' : 'bg-white'}`}>{o}</button>)}</div></div></StepWizard></Card></main>
}

function PreventiveResults() {
  const state = history.state?.usr || { score: 0, categoryScores: {} }
  const recs = state.score <= 40 ? ['Keep weekly privacy check-ins.', 'Schedule one screen-free hour daily.', 'Continue healthy conflict boundaries.'] : state.score <= 70 ? ['Use bedtime device cutoff.', 'Reduce trigger accounts for 14 days.', 'Enable all account safety controls.', 'Use guided breathing after distressing events.'] : ['Create immediate digital safety plan.', 'Seek trusted adult/counselor support.', 'Pause high-conflict platforms for 72 hours.', 'Follow incident readiness checklist.', 'Start structured recovery routine.']
  return <main className={shell}><Card className="space-y-4"><h1 className="text-2xl font-bold text-brand-blue">Your Wellness Snapshot</h1><ScoreBadge score={state.score} /><div className="grid gap-3 md:grid-cols-2">{Object.entries(state.categoryScores).map(([k, v]) => <div key={k}><div className="mb-1 flex justify-between text-sm"><span>{k}</span><span>{v}%</span></div><ProgressBar value={v} /></div>)}</div><h2 className="font-semibold">Your Learning Path</h2><ul className="list-inside list-disc space-y-1 text-slate-700">{recs.map((r) => <li key={r}>{r}</li>)}</ul></Card></main>
}

function Home() {
  return <main className={shell}><section className="grid gap-6 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-lavender p-6 text-white md:grid-cols-2"><div><h1 className="text-3xl font-bold">Prevent. Respond. Build Resilience.</h1><p className="mt-2 text-slate-100">Human-centered cyberpsychology support for individuals, families, and organizations.</p><div className="mt-4 flex flex-wrap gap-3"><Link to="/preventive/assessment"><Button className="bg-white text-brand-blue hover:bg-slate-100">Check My Cyber Wellness</Button></Link><Link to="/reactive"><Button variant="danger">I Need Help Now</Button></Link></div></div><div className="rounded-xl bg-white/10 p-4 text-sm">Demo data: 3 in 4 users report lower cyber-stress after two weeks of routines.</div></section><section className="mt-8 grid gap-4 md:grid-cols-3">{['Preventive', 'Reactive', 'Proactive'].map((p) => <Card key={p}><h3 className="text-lg font-semibold text-brand-blue">{p}</h3><p className="mt-2 text-sm text-slate-600">Focused workflows to reduce cyber-stress and improve digital resilience.</p></Card>)}</section></main>
}

function Reactive() {
  const [incident, setIncident] = useState(incidentTypes[0])
  const [urgency, setUrgency] = useState('today')
  return <main className={shell}><Card className="space-y-4"><h1 className="text-2xl font-bold text-brand-blue">Incident Support Wizard</h1><div className="grid gap-3 md:grid-cols-3">{incidentTypes.map((x) => <button key={x.id} onClick={() => setIncident(x)} className={`rounded-xl border p-3 text-left ${x.id === incident.id ? 'border-brand-blue bg-brand-mist' : 'bg-white'}`}><div className="font-semibold">{x.title}</div><div className="text-sm text-slate-600">{x.description}</div></button>)}</div><div className="flex flex-wrap gap-2">{['today', 'ongoing', 'not sure'].map((u) => <button key={u} onClick={() => setUrgency(u)} className={`rounded-full px-3 py-1 text-sm ${urgency === u ? 'bg-brand-blue text-white' : 'bg-slate-100'}`}>{u}</button>)}</div><ol className="list-inside list-decimal space-y-1">{incident.steps.map((s) => <li key={s}>{s}</li>)}</ol><div className="rounded-xl bg-brand-mist p-3 text-sm">Helplines: iCall 9152987821, Vandrevala 9999666555, NCRP 1930. Verify local availability before use.</div><Button onClick={() => window.print()}>Download PDF (Print)</Button></Card></main>
}

function Proactive() {
  const items = ['No-screen first 30 minutes of day', 'Weekly privacy reset', 'Mute toxic channels', 'Dedicated recovery walk', 'No devices during meals', '2FA on all accounts']
  const [checked, setChecked] = useState([])
  const pct = Math.round((checked.length / items.length) * 100)
  return <main className={shell}><Card className="space-y-3"><h1 className="text-2xl font-bold text-brand-blue">Resilience Planner</h1><p className="text-sm text-slate-600">Digital boundaries + recovery actions</p><ProgressBar value={pct} /><div className="grid gap-2">{items.map((it) => <label key={it} className="rounded-lg border p-2 text-sm"><input className="mr-2" type="checkbox" checked={checked.includes(it)} onChange={() => setChecked((p) => p.includes(it) ? p.filter((x) => x !== it) : [...p, it])} />{it}</label>)}</div><Button onClick={() => window.print()}>Download Plan</Button></Card></main>
}

function OrgDashboard() {
  const [scores, setScores] = useState(Object.fromEntries(orgChecklist.map((x) => [x.category, 50])))
  const total = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length)
  return <main className={shell}><Card className="space-y-4"><h1 className="text-2xl font-bold text-brand-blue">Organization Readiness Dashboard</h1><ScoreBadge score={total} /><div className="grid gap-3 md:grid-cols-2">{orgChecklist.map((c) => <div key={c.category} className="space-y-2 rounded-xl border p-3"><div className="font-semibold">{c.category}</div><input type="range" min="0" max="100" value={scores[c.category]} onChange={(e) => setScores((p) => ({ ...p, [c.category]: Number(e.target.value) }))} className="w-full" /><ProgressBar value={scores[c.category]} /></div>)}</div></Card></main>
}

function ResourceLibrary() {
  const [audience, setAudience] = useState('All')
  const [issue, setIssue] = useState('All')
  const filtered = useMemo(() => resources.filter((r) => (audience === 'All' || r.audience === audience) && (issue === 'All' || r.issue === issue)), [audience, issue])
  const issues = ['All', ...new Set(resources.map((x) => x.issue))]
  return <main className={shell}><Card className="space-y-4"><h1 className="text-2xl font-bold text-brand-blue">Resource Library</h1><div className="flex flex-wrap gap-2">{['All', 'Individual', 'Parent', 'Organization'].map((a) => <button key={a} onClick={() => setAudience(a)} className={`rounded-full px-3 py-1 text-sm ${audience === a ? 'bg-brand-blue text-white' : 'bg-slate-100'}`}>{a}</button>)}</div><div className="flex flex-wrap gap-2">{issues.map((a) => <button key={a} onClick={() => setIssue(a)} className={`rounded-full px-3 py-1 text-sm ${issue === a ? 'bg-brand-teal text-white' : 'bg-slate-100'}`}>{a}</button>)}</div><div className="grid gap-3 md:grid-cols-3">{filtered.map((r) => <Card key={r.id} className="border"><h3 className="font-semibold">{r.title}</h3><p className="mt-1 text-xs text-slate-500">{r.audience} · {r.issue}</p></Card>)}</div></Card></main>
}

function Login() { return <main className={shell}><Card className="mx-auto max-w-md space-y-3"><h1 className="text-2xl font-bold text-brand-blue">Demo Login</h1><select className="w-full rounded-lg border p-2"><option>Individual</option><option>Organization</option><option>Counselor</option></select><input className="w-full rounded-lg border p-2" placeholder="Email" /><input className="w-full rounded-lg border p-2" type="password" placeholder="Password" /><Link to="/"><Button className="w-full">Continue</Button></Link></Card></main> }
function About() { return <main className={shell}><Card><h1 className="text-2xl font-bold text-brand-blue">About TechManas</h1><p className="mt-2 text-slate-600">TechManas translates cyberpsychology into practical, reassuring actions for homes, schools, and companies.</p></Card></main> }
function ParentToolkit() { return <main className={shell}><Card><h1 className="text-2xl font-bold text-brand-blue">Parent/Educator Toolkit</h1><ul className="mt-3 list-inside list-disc space-y-1 text-slate-700"><li>Sleep changes, social withdrawal, or fear after being online.</li><li>Conversation starter: "What happened online today that made you feel good or bad?"</li><li>Action: create family screen boundary plan and weekly check-in.</li></ul></Card></main> }
function PreventiveOverview() { return <main className={shell}><Card className="space-y-3"><h1 className="text-2xl font-bold text-brand-blue">Preventive Module</h1><p className="text-slate-600">Risk screening, safety habits, and awareness micro-learning cards.</p><Link to="/preventive/assessment"><Button>Start Assessment</Button></Link></Card></main> }

function App() {
  const [menu, setMenu] = useState(false)
  const nav = [{ to: '/', label: 'Home' }, { to: '/preventive', label: 'Preventive' }, { to: '/reactive', label: 'Reactive' }, { to: '/proactive', label: 'Proactive' }, { to: '/resources', label: 'Resources' }, { to: '/org-dashboard', label: 'For Orgs' }]
  return (
    <div>
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur"><div className={`${shell} flex items-center justify-between py-3`}><Link to="/" className="text-xl font-bold text-brand-blue">TechManas</Link><button className="md:hidden" onClick={() => setMenu((x) => !x)}>Menu</button><nav className={`${menu ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-3 border-b bg-white p-4 md:static md:flex md:w-auto md:flex-row md:border-none md:p-0`}>{nav.map((n) => <NavLink key={n.to} to={n.to} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand-blue' : 'text-slate-600'}`}>{n.label}</NavLink>)}</nav></div></header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/preventive" element={<PreventiveOverview />} />
        <Route path="/preventive/assessment" element={<AssessmentPage />} />
        <Route path="/preventive/results" element={<PreventiveResults />} />
        <Route path="/reactive" element={<Reactive />} />
        <Route path="/proactive" element={<Proactive />} />
        <Route path="/resources" element={<ResourceLibrary />} />
        <Route path="/org-dashboard" element={<OrgDashboard />} />
        <Route path="/parent-toolkit" element={<ParentToolkit />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <footer className="border-t bg-white"><div className={`${shell} flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-slate-600`}><span>TechManas · Prevent. Respond. Build Resilience.</span><div className="flex gap-3"><Link to="/about">About</Link><a href="#">Privacy</a><a href="#">Terms</a></div></div></footer>
    </div>
  )
}

export default App
