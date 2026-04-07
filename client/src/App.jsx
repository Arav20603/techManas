import { useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import assessmentQuestions from './data/assessment.json'
import incidentTypes from './data/incidents.json'
import orgChecklist from './data/organization.json'
import resources from './data/resources.json'
import recommendations from './data/recommendations.json'
import Button from './components/Button'
import Card from './components/Card'
import ScoreBadge from './components/ScoreBadge'
import StepWizard from './components/StepWizard'
import ProgressBar from './components/ProgressBar'
import { useTheme } from './context/ThemeContext'
import Login from './pages/Login'
import Signup from './pages/Signup'

const shell = 'mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8'
const scoreOptions = [0, 25, 50, 75, 100]
const awarenessCards = [
  'Phishing: verify sender + URL before you click.',
  'Screen-time: use one no-phone routine each day.',
  'Cyberbullying: save evidence before blocking.',
  'Privacy: review app permissions monthly.',
  'Digital empathy: pause before reacting online.',
  'Conflict hygiene: avoid late-night escalation loops.',
]
// 🔐 PROTECTED ROUTE
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function AppHeader() {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  const nav = [
    { to: '/', label: 'Home' },
    { to: '/preventive', label: 'Preventive' },
    { to: '/reactive', label: 'Reactive' },
    { to: '/proactive', label: 'Proactive' },
    { to: '/assessments', label: 'Assessments' },
    { to: '/resources', label: 'Resources' },
    { to: '/org-dashboard', label: 'For Organizations' },
    { to: '/about', label: 'About TechManas' },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur">
      <div className={`${shell} flex items-center justify-between py-2.5`}>
        <Link to="/" className="text-xl font-bold tracking-tight text-brand-blue">
          TechManas
        </Link>
        <button className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 px-3 py-1.5 text-sm shadow-sm md:hidden" onClick={() => setMenu((x) => !x)}>
          Menu
        </button>
        <nav className={`${menu ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:border-none md:p-0`}>
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-md px-2 py-1 text-sm font-medium transition ${isActive ? 'bg-brand-mist text-brand-blue' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
              {item.label}
            </NavLink>
          ))}

          {!isLoggedIn ? (
            <>
              <ThemeToggle />
              <Link to="/login" className="text-sm font-semibold text-brand-blue hover:underline">Login</Link>
              <Link to="/signup" className="rounded-lg bg-brand-teal px-3 py-1 text-sm font-semibold text-white hover:brightness-105">Signup</Link>
            </>
          ) : (
            <>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="rounded-lg bg-brand-coral px-3 py-1 text-sm font-semibold text-white hover:brightness-105"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

function HomePage() {
  const pillars = [
    { title: 'Preventive', color: 'text-brand-teal', body: 'Awareness, risk screening, and digital habit strengthening.' },
    { title: 'Reactive', color: 'text-brand-coral', body: 'Incident response support with emotional first-aid guidance.' },
    { title: 'Proactive', color: 'text-brand-lavender', body: 'Resilience plans, institutional readiness, and long-term recovery.' },
  ]
  const users = [
    { title: 'Individual User', to: '/preventive/assessment' },
    { title: 'Parent / Educator', to: '/parent-toolkit' },
    { title: 'Organization / HR', to: '/org-dashboard' },
    { title: 'Counselor / Support', to: '/login' },
  ]

  return (
    <main className={shell}>
      <section className="grid gap-4 rounded-3xl bg-gradient-to-br from-brand-blue via-sky-700 to-brand-lavender p-5 text-white shadow-soft md:grid-cols-2 md:gap-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold leading-tight md:text-4xl">TechManas: Prevent. Respond. Build resilience.</h1>
          <p className="mt-3 text-slate-100">
            Cyberpsychology for safer digital lives at the intersection of online behavior, emotional impact, cyber risk, and informed intervention.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
            <Link to="/preventive/assessment"><Button className="bg-white text-brand-blue hover:bg-slate-100">Check My Cyber Wellness</Button></Link>
            <Link to="/reactive"><Button variant="danger">I Need Help Now</Button></Link>
            <Link to="/org-dashboard"><Button variant="secondary">For Organizations</Button></Link>
          </div>
        </div>
        <Card className="space-y-2 border-white/20 bg-white/10 text-white shadow-none backdrop-blur-sm">
          <p className="text-sm">How TechManas helps (demo data)</p>
          <p className="text-3xl font-bold">74%</p>
          <p className="text-sm">of users report better digital stress management after adopting recommended routines.</p>
        </Card>
      </section>

      <section className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.title}>
            <h2 className={`text-xl font-semibold ${pillar.color}`}>{pillar.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{pillar.body}</p>
          </Card>
        ))}
      </section>

      <section className="mt-6 md:mt-8">
        <h2 className="text-xl font-semibold text-brand-blue">Choose Your Journey</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {users.map((user) => (
            <Card key={user.title} className="flex flex-col gap-3">
              <h3 className="font-semibold">{user.title}</h3>
              <Link to={user.to}><Button className="w-full">Get Started</Button></Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

function PreventivePage() {
  return (
    <main className={shell}>
      <Card className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-blue">Preventive Module</h1>
        <p className="text-slate-600">Identify early risk, build healthy digital habits, and improve cyberpsychological wellbeing.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {['Digital Behavior Risk Screening', 'Screen-Time & Digital Stress Reflection', 'Online Safety Habit Checklist', 'Early Warning Indicators Dashboard'].map((item) => (
            <Card key={item} className="border p-4"><p className="font-medium">{item}</p></Card>
          ))}
        </div>
        <div>
          <h2 className="font-semibold">Awareness Micro-Learning Cards</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {awarenessCards.map((card) => <Card key={card} className="border p-4 text-sm">{card}</Card>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/preventive/assessment"><Button>Start Cyber Wellness Assessment</Button></Link>
          <Link to="/parent-toolkit"><Button variant="secondary">Open Parent/Educator Toolkit</Button></Link>
        </div>
      </Card>
    </main>
  )
}

function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
    >
      {dark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.02 0-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z" />
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      )}
    </button>
  )
}

function AssessmentPage() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const question = assessmentQuestions[index]
  const navigate = useNavigate()
  const score = Math.round(
    Object.values(answers).reduce((acc, val) => acc + val, 0) /
    assessmentQuestions.length
  )

  const categoryScores = Object.fromEntries(
    [...new Set(assessmentQuestions.map((q) => q.category))].map((category) => {
      const group = assessmentQuestions.filter((q) => q.category === category)
      const total = group.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0)
      return [category, Math.round(total / group.length)]
    })
  )

  return (
    <main className={shell}>
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-blue">
          Cyber Wellness Assessment
        </h1>

        <p className="mb-4 mt-1 text-slate-600 dark:text-slate-400">
          Short reflection across stress, behavior, privacy awareness, and online conflict exposure.
        </p>

        <StepWizard
          index={index}
          total={assessmentQuestions.length}
          onPrev={() => setIndex((v) => Math.max(0, v - 1))}
          onNext={() =>
            index === assessmentQuestions.length - 1
              ? navigate('/preventive/results', { state: { score, categoryScores } })
              : setIndex((v) => v + 1)
          }
          canNext={answers[question.id] !== undefined}
        >
          <div className="space-y-3 rounded-2xl border border-brand-blue/10 bg-gradient-to-b from-brand-mist to-white dark:from-slate-700 dark:to-slate-800 p-4">

            <h2 className="font-semibold dark:text-slate-100">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5">
              {scoreOptions.map((value) => (
                <button
                  key={value}
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: value,
                    }))
                  }
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${answers[question.id] === value
                      ? 'border-brand-blue bg-brand-blue text-white'
                      : 'border-slate-200 bg-white dark:bg-slate-600 dark:text-slate-100 dark:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-500'
                    }`}
                >
                  {value}
                </button>
              ))}
            </div>

          </div>
        </StepWizard>
      </Card>
    </main>
  )
}

function PreventiveResults() {
  const location = useLocation()
  const state = location.state || { score: 0, categoryScores: {} }

  const recommendationsList =
    state.score <= 40
      ? [
        'Keep weekly privacy check-ins.',
        'Schedule one screen-free hour daily.',
        'Continue healthy conflict boundaries.',
      ]
      : state.score <= 70
        ? [
          'Use bedtime device cutoff.',
          'Reduce trigger accounts for 14 days.',
          'Enable all account safety controls.',
          'Use guided breathing after distressing events.',
        ]
        : [
          'Create immediate digital safety plan.',
          'Seek trusted adult/counselor support.',
          'Pause high-conflict platforms for 72 hours.',
          'Follow incident readiness checklist.',
          'Start structured recovery routine.',
        ]

  return (
    <main className={shell}>
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-blue">
          Your Wellness Snapshot
        </h1>

        <ScoreBadge score={state.score} />

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2">
          {Object.entries(state.categoryScores).map(([category, value]) => (
            <div key={category}>
              <div className="mb-1 flex justify-between text-sm dark:text-slate-300">
                <span>{category}</span>
                <span>{value}%</span>
              </div>
              <ProgressBar value={value} />
            </div>
          ))}
        </div>

        <h2 className="font-semibold dark:text-slate-100">
          Your Learning Path
        </h2>

        <ul className="list-inside list-disc space-y-1 text-slate-700 dark:text-slate-300">
          {recommendationsList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <Button onClick={() => window.print()}>
          Save Wellness Plan (Print)
        </Button>
      </Card>
    </main>
  )
}

function ReactivePage() {
  const navigate = useNavigate()
  const [incident, setIncident] = useState(incidentTypes[0])
  const [urgency, setUrgency] = useState('This happened today')
  const [impact, setImpact] = useState({})
  const [details, setDetails] = useState('')
  const platforms = ['WhatsApp', 'Instagram', 'Email', 'LinkedIn']
  const screener = ['I feel unable to sleep due to this incident.', 'I am replaying the incident repeatedly.', 'I feel avoidant about online communication.', 'My concentration has dropped today.', 'I feel unsafe or highly anxious right now.']
  const urgentFlag = Object.values(impact).filter(Boolean).length >= 3

  return (
    <main className={shell}>
      <Card className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-blue">Incident Support Center</h1>
        <p className="text-sm text-slate-600">Warm, practical guidance for the next 10 minutes and beyond.</p>

        <div>
          <h2 className="mb-2 font-semibold">1) Incident Type</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {incidentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setIncident(type)}
                className={`rounded-2xl border p-3 text-left transition ${type.id === incident.id ? 'border-brand-blue bg-brand-mist dark:bg-slate-700 shadow-sm' : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                <p className="font-semibold">{type.title}</p>
                <p className="text-sm text-slate-600">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">2) Urgency</h2>
          <div className="flex flex-wrap gap-2">
            {['This happened today', 'This has been ongoing', "I'm not sure"].map((item) => (
              <button key={item} onClick={() => setUrgency(item)} className={`rounded-full px-3 py-1.5 text-sm font-medium ${urgency === item ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-700'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">3) Incident Details (short form)</h2>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            className="input-base resize-none"
            placeholder="Briefly describe what happened, when it happened, and who is involved."
          />
        </div>

        <div>
          <h2 className="mb-2 font-semibold">4) Evidence Preservation</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {platforms.map((platform) => (
              <details key={platform} className="rounded-lg border p-3">
                <summary className="cursor-pointer font-medium">{platform}</summary>
                <p className="mt-2 text-sm text-slate-600">Capture full screen + profile URL + timestamp. Do not delete original message/thread before backing up evidence.</p>
              </details>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">5) Emotional Impact Screener (self-reflection only)</h2>
          <div className="grid gap-2">
            {screener.map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <input type="checkbox" className="mt-0.5 accent-brand-blue" checked={Boolean(impact[item])} onChange={() => setImpact((prev) => ({ ...prev, [item]: !prev[item] }))} />
                {item}
              </label>
            ))}
          </div>
          {urgentFlag && <p className="mt-2 rounded-lg bg-amber-100 p-3 text-sm text-amber-800">Your responses suggest high distress right now. Consider immediate counselor or trusted-support outreach.</p>}
        </div>

        <Card className="border bg-brand-mist">
          <h2 className="font-semibold">Support Resources Directory</h2>
          <p className="mt-1 text-sm text-slate-700">Escalation path: platform report → legal/cyber complaint → counselor support.</p>
          <p className="mt-2 text-sm">iCall: 9152987821 · Vandrevala Foundation: 9999666555 · NCRP: 1930</p>
        </Card>

        <Button
          onClick={() =>
            navigate('/reactive/output', {
              state: { incident, urgency, details, urgentFlag },
            })
          }
        >
          Generate Support Output
        </Button>
      </Card>
    </main>
  )
}

function ReactiveOutputPage() {
  const location = useLocation()
  const data = location.state || {
    incident: incidentTypes[0],
    urgency: 'This happened today',
    details: '',
    urgentFlag: false,
  }
  const contacts = ['Platform report tools', 'Trusted parent/teacher/manager', 'Counselor support', 'Legal/cybercrime channel if needed']

  return (
    <main className={shell}>
      <Card className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-blue">Incident Support Output</h1>
        <p className="text-sm text-slate-600">Issue: {data.incident.title} · Urgency: {data.urgency}</p>
        {data.details && <Card className="border p-3 text-sm">Details: {data.details}</Card>}
        <div>
          <h2 className="mb-2 font-semibold">What to do in next 10 minutes</h2>
          <ol className="list-inside list-decimal space-y-1 text-slate-700">
            {data.incident.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Evidence Checklist</h2>
          <ul className="list-inside list-disc space-y-1 text-slate-700">
            <li>Screenshots with timestamps</li>
            <li>Profile URLs and usernames</li>
            <li>Chat logs and call records</li>
            <li>Transaction IDs (if fraud/phishing)</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Who to contact</h2>
          <ul className="list-inside list-disc space-y-1 text-slate-700">
            {contacts.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <Card className="border bg-brand-mist p-3 text-sm">
          Emotional support tip: use grounding breath (inhale 4, hold 4, exhale 6) and reach a trusted support person.
          {data.urgentFlag && ' Your responses suggest heightened distress; prioritize counselor outreach today.'}
        </Card>
        <Button onClick={() => window.print()}>Export Incident Summary (Print)</Button>
      </Card>
    </main>
  )
}

function ProactivePage() {
  const boundaries = [
    'No-screen first 30 minutes after waking',
    'No devices during meals',
    'Mute toxic channels by default',
    'Weekly privacy reset',
    'One day each week with reduced social media',
    '2FA on all primary accounts',
    'No conflict replies after 10 PM',
    'Monthly digital declutter',
  ]
  const challengeActions = {
    cyberbullying: ['Create a safety contact list.', 'Use evidence-first response template.', 'Plan recovery check-ins for 2 weeks.', 'Rebuild confidence via low-risk online spaces.', 'Set re-entry boundaries for social platforms.'],
    addiction: ['Use app limits for high-drain apps.', 'Block doom-scroll windows.', 'Create replacement routine (walk/reading).', 'Track stress triggers for screen spikes.', 'Review progress weekly.'],
    fraud: ['Set account monitoring reminders.', 'Create trust-restoration checklist.', 'Use secure password manager.', 'Run monthly fraud hygiene review.', 'Practice no-shame recovery framing.'],
  }
  const [selected, setSelected] = useState([])
  const [challenge, setChallenge] = useState('cyberbullying')
  const progress = Math.round((selected.length / boundaries.length) * 100)

  return (
    <main className={shell}>
      <Card className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-blue">Proactive Resilience Planner</h1>
        <p className="text-sm text-slate-600">Build digital boundaries, recovery routines, and long-term behavior resilience.</p>

        <div>
          <h2 className="mb-2 font-semibold">Digital Boundaries Checklist</h2>
          <ProgressBar value={progress} />
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {boundaries.map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-brand-blue"
                  checked={selected.includes(item)}
                  onChange={() => setSelected((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">Recovery Plan Builder</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(challengeActions).map((key) => (
              <button key={key} onClick={() => setChallenge(key)} className={`rounded-full px-3 py-1 text-sm ${challenge === key ? 'bg-brand-teal text-white' : 'bg-slate-100'}`}>
                {key}
              </button>
            ))}
          </div>
          <div className="mt-3 grid gap-2">
            {challengeActions[challenge].map((action) => <Card key={action} className="border p-3 text-sm">{action}</Card>)}
          </div>
        </div>

        <Button onClick={() => window.print()}>Download Resilience Plan</Button>
      </Card>
    </main>
  )
}

function ParentToolkitPage() {
  const prompts = {
    '6-10': ['What made you feel good online today?', 'Did anything online feel confusing or scary?'],
    '11-14': ['What kind of posts make you stressed?', 'How do you decide what is safe to share?'],
    '15-18': ['When do you feel pressure online?', 'What support helps when conflict happens online?'],
  }
  const [age, setAge] = useState('11-14')

  return (
    <main className={shell}>
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-blue">Parent / Educator Toolkit</h1>
        <p className="text-sm text-slate-600">Practical indicators and conversation tools for child and student cyber wellbeing.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="border">
            <h2 className="font-semibold">Digital Behavior Indicators</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
              <li>Sleep disruption after device use</li>
              <li>Sudden withdrawal from online/offline peers</li>
              <li>Avoiding notifications with visible anxiety</li>
              <li>Frequent fear about reputation or exposure</li>
            </ul>
          </Card>
          <Card className="border">
            <h2 className="font-semibold">Conversation Starter Tool</h2>
            <select className="input-base mt-2" value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="6-10">Age 6-10</option>
              <option value="11-14">Age 11-14</option>
              <option value="15-18">Age 15-18</option>
            </select>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
              {prompts[age].map((prompt) => <li key={prompt}>{prompt}</li>)}
            </ul>
          </Card>
        </div>
      </Card>
    </main>
  )
}

function AssessmentsPage() {
  return (
    <main className={shell}>
      <Card className="space-y-3">
        <h1 className="text-2xl font-bold text-brand-blue">Assessments</h1>
        <p className="text-slate-600">Start with the Cyber Wellness Self-Assessment to get a personalized risk summary and action path.</p>
        <Link to="/preventive/assessment"><Button>Open Assessment Flow</Button></Link>
      </Card>
    </main>
  )
}

function OrgDashboardPage() {
  const initial = Object.fromEntries(orgChecklist.flatMap((group) => group.items.map((item) => [item, 'partial'])))
  const [answers, setAnswers] = useState(initial)
  const scoreMap = { no: 0, partial: 50, yes: 100 }

  const categoryScores = orgChecklist.map((group) => {
    const values = group.items.map((item) => scoreMap[answers[item]])
    const score = Math.round(values.reduce((acc, value) => acc + value, 0) / values.length)
    return { category: group.category, score }
  })

  const readiness = Math.round(categoryScores.reduce((acc, c) => acc + c.score, 0) / categoryScores.length)
  const maturity = readiness < 40 ? 'Beginner' : readiness < 70 ? 'Developing' : 'Advanced'
  const actionPriorities = [...categoryScores].sort((a, b) => a.score - b.score).slice(0, 3)

  return (
    <main className={shell}>
      <Card className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-blue">Organization Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
          <ScoreBadge score={readiness} />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">{maturity}</span>
        </div>

        <div className="grid gap-4">
          {orgChecklist.map((group) => (
            <Card key={group.category} className="border">
              <h2 className="font-semibold">{group.category}</h2>
              <div className="mt-2 space-y-2">
                {group.items.map((item) => (
                  <div key={item} className="rounded-lg border p-2">
                    <p className="text-sm">{item}</p>
                    <div className="mt-2 flex gap-2">
                      {['yes', 'partial', 'no'].map((value) => (
                        <button
                          key={value}
                          onClick={() => setAnswers((prev) => ({ ...prev, [item]: value }))}
                          className={`rounded-full px-3 py-1 text-xs ${answers[item] === value ? 'bg-brand-blue text-white' : 'bg-slate-100'}`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="border bg-brand-mist">
          <h2 className="font-semibold">Action Priorities</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-slate-700">
            {actionPriorities.map((item) => <li key={item.category}>{item.category}: run targeted awareness + policy reinforcement</li>)}
          </ul>
        </Card>
        <Button onClick={() => window.print()}>Download Readiness Summary</Button>
      </Card>
    </main>
  )
}

function ResourceLibraryPage() {
  const [audience, setAudience] = useState('All')
  const [issue, setIssue] = useState('All')
  const filtered = useMemo(() => resources.filter((resource) => (audience === 'All' || resource.audience === audience) && (issue === 'All' || resource.issue === issue)), [audience, issue])
  const audiences = ['All', ...new Set(resources.map((r) => r.audience))]
  const issues = ['All', ...new Set(resources.map((r) => r.issue))]

  return (
    <main className={shell}>
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-blue">Resource Library</h1>
        <div className="flex flex-wrap gap-2">
          {audiences.map((item) => <button key={item} onClick={() => setAudience(item)} className={`rounded-full px-3 py-1 text-sm ${audience === item ? 'bg-brand-blue text-white' : 'bg-slate-100'}`}>{item}</button>)}
        </div>
        <div className="flex flex-wrap gap-2">
          {issues.map((item) => <button key={item} onClick={() => setIssue(item)} className={`rounded-full px-3 py-1 text-sm ${issue === item ? 'bg-brand-teal text-white' : 'bg-slate-100'}`}>{item}</button>)}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((resource) => (
            <Card key={resource.id} className="border">
              <h3 className="font-semibold">{resource.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{resource.audience} · {resource.issue} · {resource.type}</p>
            </Card>
          ))}
        </div>
      </Card>
    </main>
  )
}

function LoginPage() {
  return (
    <main className={shell}>
      <Card className="mx-auto max-w-md space-y-3">
        <h1 className="text-2xl font-bold text-brand-blue">Demo Login</h1>
        <select className="input-base">
          <option>Individual</option>
          <option>Organization</option>
          <option>Counselor</option>
        </select>
        <input className="input-base" placeholder="Email" />
        <input className="input-base" type="password" placeholder="Password" />
        <Link to="/"><Button className="w-full">Continue</Button></Link>
      </Card>
    </main>
  )
}

function AboutPage() {
  return (
    <main className={shell}>
      <Card className="space-y-3">
        <h1 className="text-2xl font-bold text-brand-blue">About TechManas</h1>
        <p className="text-slate-700">
          TechManas is a cyberpsychology platform built to translate digital risks into supportive, practical interventions for individuals, families, schools, and workplaces.
        </p>
      </Card>
    </main>
  )
}

function AppFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className={`${shell} flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-slate-600 dark:text-slate-400`}>
        <span>TechManas · Cyberpsychology for safer digital lives</span>
        <div className="flex gap-3">
          <Link to="/about" className="hover:text-brand-blue transition-colors">About</Link>
          <a href="#" className="hover:text-brand-blue transition-colors">Contact</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <AppHeader />
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/preventive" element={<ProtectedRoute><PreventivePage /></ProtectedRoute>} />
        <Route path="/preventive/assessment" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
        <Route path="/preventive/results" element={<ProtectedRoute><PreventiveResults /></ProtectedRoute>} />
        <Route path="/reactive" element={<ProtectedRoute><ReactivePage /></ProtectedRoute>} />
        <Route path="/reactive/output" element={<ProtectedRoute><ReactiveOutputPage /></ProtectedRoute>} />
        <Route path="/proactive" element={<ProtectedRoute><ProactivePage /></ProtectedRoute>} />
        <Route path="/assessments" element={<ProtectedRoute><AssessmentsPage /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><ResourceLibraryPage /></ProtectedRoute>} />
        <Route path="/org-dashboard" element={<ProtectedRoute><OrgDashboardPage /></ProtectedRoute>} />
        <Route path="/parent-toolkit" element={<ProtectedRoute><ParentToolkitPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
      </Routes>
      <AppFooter />
    </div>
  )
}

export default App
