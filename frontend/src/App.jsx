import { useEffect, useState } from 'react';
import { Camera, Apple, Heart, Sparkles, Activity, Users, ChevronRight, Star, CheckCircle, ArrowRight } from 'lucide-react';

function LandingPage({ onGetStarted, onLogin }) {
  const [email, setEmail] = useState('');

  const handleEarlyAccess = (e) => {
    e.preventDefault();
    if (email) onGetStarted();
  };

  return (
    <div style={{ background: '#F0F4F0', color: '#1a2e1a', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      <style>{`

        .gradient-text { background: linear-gradient(135deg, #2D6A4F, #40916C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .card-hover { transition: all 0.3s ease; } .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(45,106,79,0.15); }
      `}</style>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#2D6A4F', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={20} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#2D6A4F' }}>NutriBot</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={onLogin} style={{ background: 'transparent', border: 'none', color: '#2D6A4F', fontWeight: 600, cursor: 'pointer', padding: '8px 16px', borderRadius: 8, fontSize: 14 }}>Sign in</button>
          <button onClick={onGetStarted} style={{ background: '#FFB703', border: 'none', color: '#1a2e1a', fontWeight: 700, padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontSize: 14, transition: '0.2s' }}>Get started free</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
        <div style={{ background: '#e8f0e8', padding: '8px 16px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2D6A4F', fontWeight: 600 }}>
          <Sparkles size={14} /> AI-powered nutrition — no counting required
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
          <span className="gradient-text">Your personal AI nutritionist</span><br />
          <span style={{ color: '#1a2e1a' }}>that works while you work</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4a6b4a', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
          Snap a photo of your meal. NutriBot logs macros, plans your week, and syncs with Apple Health & Fitbit. No spreadsheets, no guilt.
        </p>
        <form onSubmit={handleEarlyAccess} style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 440, marginTop: 8 }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your work email" required style={{ flex: 1, padding: '14px 16px', borderRadius: 10, border: '2px solid #d0e0d0', fontSize: 15, outline: 'none', background: 'white' }} />
          <button type="submit" style={{ background: '#2D6A4F', color: 'white', border: 'none', padding: '14px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
            Start free <ArrowRight size={18} />
          </button>
        </form>
        <div style={{ display: 'flex', gap: 24, fontSize: 14, color: '#4a6b4a', marginTop: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={14} color="#2D6A4F" /> No credit card</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={14} color="#2D6A4F" /> Cancel anytime</span>
        </div>
      </section>

      {/* Key metric */}
      <section style={{ background: '#2D6A4F', padding: '40px 24px', margin: '20px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 48, color: 'white', textAlign: 'center' }}>
          <div><div style={{ fontSize: 40, fontWeight: 800 }}>87%</div><div style={{ fontSize: 14, opacity: 0.8 }}>users hit weekly macro goals</div></div>
          <div><div style={{ fontSize: 40, fontWeight: 800 }}>12 min</div><div style={{ fontSize: 14, opacity: 0.8 }}>daily time saved vs logging</div></div>
          <div><div style={{ fontSize: 40, fontWeight: 800 }}>4.9★</div><div style={{ fontSize: 14, opacity: 0.8 }}>app store rating (12k reviews)</div></div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 48, color: '#1a2e1a' }}>Three taps. That's it.</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {[
            { icon: <Camera size={28} />, title: 'Snap your meal', desc: 'Open the app, take a photo. AI instantly identifies every ingredient and portion.' },
            { icon: <Sparkles size={28} />, title: 'AI plans your week', desc: 'Your personalized meal plan adapts to your schedule, preferences, and macros.' },
            { icon: <Activity size={28} />, title: 'Sync & forget', desc: 'Macros flow to Apple Health & Fitbit. No logging, no spreadsheets.' },
          ].map((item, i) => (
            <div key={i} className="card-hover" style={{ background: 'white', borderRadius: 16, padding: 28, width: 300, border: '1px solid #d0e0d0', textAlign: 'center' }}>
              <div style={{ background: '#e8f0e8', width: 56, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#2D6A4F' }}>{item.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ color: '#4a6b4a', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: 'white', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 48, color: '#1a2e1a' }}>Everything you need, nothing you don't</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, columns: 2 }}>
            {[
              { icon: <Camera size={20} />, title: 'Photo recognition', desc: 'AI identifies 5,000+ foods with 95% accuracy — including restaurant dishes.' },
              { icon: <Apple size={20} />, title: 'Apple Health sync', desc: 'Calories, protein, carbs, fat — all pushed to Health automatically.' },
              { icon: <Activity size={20} />, title: 'Fitbit integration', desc: 'Your daily macros appear in Fitbit dashboard alongside steps and sleep.' },
              { icon: <Heart size={20} />, title: 'Health insights', desc: 'Weekly summaries show trends in protein intake, fiber, and micronutrients.' },
              { icon: <Users size={20} />, title: 'Family plan', desc: 'Up to 5 members. Shared meal plans and grocery lists for the whole household.' },
              { icon: <Star size={20} />, title: 'Smart grocery lists', desc: 'AI generates shopping lists from your weekly plan — organized by aisle.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', width: 340 }}>
                <div style={{ background: '#e8f0e8', padding: 8, borderRadius: 10, color: '#2D6A4F', flexShrink: 0 }}>{f.icon}</div>
                <div><h4 style={{ fontWeight: 600, marginBottom: 4, fontSize: 15 }}>{f.title}</h4><p style={{ color: '#4a6b4a', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#1a2e1a' }}>Pricing</h2>
        <p style={{ textAlign: 'center', color: '#4a6b4a', marginBottom: 40, fontSize: 15 }}>Cancel anytime. No hidden fees.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
          <div className="card-hover" style={{ background: 'white', borderRadius: 16, padding: 32, width: 300, border: '1px solid #d0e0d0', textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Individual</h3>
            <div style={{ color: '#2D6A4F', fontSize: 44, fontWeight: 800, margin: '12px 0' }}>$12<span style={{ fontSize: 16, fontWeight: 400, color: '#4a6b4a' }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 24px', textAlign: 'left', color: '#4a6b4a', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} color="#2D6A4F" /> Unlimited meal scans</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} color="#2D6A4F" /> Weekly AI meal plans</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} color="#2D6A4F" /> Apple Health & Fitbit sync</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} color="#2D6A4F" /> Health insights</li>
            </ul>
            <button onClick={onGetStarted} style={{ background: '#2D6A4F', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', width: '100%', fontSize: 15, transition: '0.2s' }}>
              Start free trial
            </button>
          </div>
          <div className="card-hover" style={{ background: '#2D6A4F', borderRadius: 16, padding: 32, width: 300, color: 'white', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -10, right: 20, background: '#FFB703', color: '#1a2e1a', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>POPULAR</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Family</h3>
            <div style={{ fontSize: 44, fontWeight: 800, margin: '12px 0' }}>$19<span style={{ fontSize: 16, fontWeight: 400, opacity: 0.8 }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 24px', textAlign: 'left', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} /> Up to 5 members</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} /> Shared meal plans</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} /> Smart grocery lists</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={16} /> Everything in Individual</li>
            </ul>
            <button onClick={onGetStarted} style={{ background: '#FFB703', color: '#1a2e1a', border: 'none', padding: '14px 28px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', width: '100%', fontSize: 15, transition: '0.2s' }}>
              Start family trial
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1a2e1a', padding: '60px 24px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Stop counting. Start living.</h2>
        <p style={{ color: '#a0c0a0', marginBottom: 24, fontSize: 16 }}>Join 50,000+ professionals who've reclaimed their lunch break.</p>
        <button onClick={onGetStarted} style={{ background: '#FFB703', color: '#1a2e1a', border: 'none', padding: '16px 40px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: '0.2s' }}>
          Get started free <ChevronRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#4a6b4a' }}>
        <span>© 2025 NutriBot. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={onLogin} style={{ background: 'transparent', border: 'none', color: '#4a6b4a', cursor: 'pointer', fontSize: 13 }}>Privacy</button>
          <button onClick={onLogin} style={{ background: 'transparent', border: 'none', color: '#4a6b4a', cursor: 'pointer', fontSize: 13 }}>Terms</button>
        </div>
      </footer>
    </div>
  );
}

function ProductApp({ user, onLogout }) {
  /* ── State for live data (loaded from API) ── */
  const [today, setToday] = useState([]);
  const [meals, setMeals] = useState([]);
  const [weekPlan, setWeekPlan] = useState([]);
  const [insights, setInsights] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [planExpanded, setPlanExpanded] = useState(false);

  /* ── Fetch dashboard data from API (no mocks) ── */
  useEffect(() => {
    if (!user?.token) return;
    const base = window.__NC_BASE__ || '';
    const slug = window.__COMPANY_SLUG__ || '';
    fetch(`${base}/api/c/${slug}/dashboard`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setToday(data.today ?? []);
          setMeals(data.meals ?? []);
          setWeekPlan(data.weekPlan ?? []);
          setInsights(data.insights ?? []);
        }
        setDataLoading(false);
      })
      .catch(() => setDataLoading(false));
  }, []);

  const s = {
    page: { minHeight: '100vh', background: '#F7FAF7', color: '#1a2e1a', fontFamily: "'Inter', sans-serif" },
    nav: { background: '#fff', borderBottom: '1px solid #e0ece0', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 100 },
    logo: { display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, color: '#2D6A4F' },
    container: { maxWidth: 1200, margin: '0 auto', padding: '24px' },
    card: { background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e0ece0', boxShadow: '0 2px 12px rgba(45,106,79,0.06)' },
    cardDark: { background: '#2D6A4F', borderRadius: 16, padding: 20, color: '#fff' },
    badge: { background: '#e8f0e8', padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: '#2D6A4F', display: 'inline-flex', alignItems: 'center', gap: 4 },
    btnSm: { padding: '8px 16px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' },
  };

  return (
    <div style={s.page}>
      {/* ── Top Navigation ── */}
      <nav style={s.nav}>
        <div style={s.logo}>
          <div style={{ background: '#2D6A4F', width: 32, height: 32, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={18} color="white" />
          </div>
          NutriBot
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#4a6b4a' }}>{user?.name || user?.email}</span>
          <button onClick={onLogout} style={{ ...s.btnSm, background: 'transparent', border: '1px solid #d0e0d0', color: '#4a6b4a' }}>Log out</button>
        </div>
      </nav>

      <div style={s.container}>
        {/* ── Welcome header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋</h1>
            <p style={{ color: '#4a6b4a', margin: '4px 0 0', fontSize: 14 }}>Here's your nutrition summary for today</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ ...s.btnSm, background: '#FFB703', color: '#1a2e1a' }}>
              <Camera size={14} style={{ marginRight: 4 }} /> Log meal
            </button>
          </div>
        </div>

        {/* ── Macro Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          {(today ?? []).map((m, i) => {
            const pct = Math.min(Math.round((m.current / m.target) * 100), 100);
            return (
              <div key={i} style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#4a6b4a' }}>{m.label}</span>
                  <span style={{ fontSize: 20, fontWeight: 800 }}>{m.current}<span style={{ fontSize: 12, fontWeight: 400, color: '#4a6b4a' }}>/{m.target}{m.unit}</span></span>
                </div>
                <div style={{ height: 6, background: '#e8f0e8', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: m.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
                </div>
                <span style={{ fontSize: 12, color: pct >= 90 ? '#2D6A4F' : '#4a6b4a', marginTop: 4, display: 'block' }}>{pct}% of daily goal</span>
              </div>
            );
          })}
        </div>

        {/* ── Two-column layout: Meals feed + Weekly plan ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Recent meals */}
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Today's meals</h3>
              <span style={s.badge}><Camera size={12} /> 4 logged</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(meals ?? []).map((meal, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F7FAF7', borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ background: '#e8f0e8', padding: 6, borderRadius: 8, color: '#2D6A4F' }}>
                      {meal.type === 'breakfast' ? <Activity size={16} /> : meal.type === 'lunch' ? <Heart size={16} /> : meal.type === 'dinner' ? <Star size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{meal.name}</div>
                      <div style={{ fontSize: 12, color: '#4a6b4a' }}>{meal.time} · {meal.kcal} kcal · {meal.protein}g protein</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly plan */}
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Weekly meal plan</h3>
              <button onClick={() => setPlanExpanded(!planExpanded)} style={{ ...s.btnSm, background: '#e8f0e8', color: '#2D6A4F' }}>
                {planExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {((planExpanded ? weekPlan : weekPlan.slice(0, 3)) ?? []).map((d, i) => (
                <div key={i} style={{ padding: '10px 12px', background: '#F7FAF7', borderRadius: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#2D6A4F', marginBottom: 4 }}>{d.day}</div>
                  <div style={{ fontSize: 12, color: '#4a6b4a' }}>{(d.meals ?? []).join(' · ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom row: Insights + Sync status ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          {(insights ?? []).map((ins, i) => (
            <div key={i} style={i === 1 ? s.cardDark : s.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ opacity: i === 1 ? 0.9 : 0.7 }}>{ins.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.8 }}>{ins.label}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{ins.value}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{ins.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Premium upgrade / Family plan ── */}
        <div style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#FFB703', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#1a2e1a" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Family plan — $19/mo</div>
              <div style={{ fontSize: 12, color: '#4a6b4a' }}>Add up to 5 members. Shared meal plans & grocery lists.</div>
            </div>
          </div>
          <button style={{ ...s.btnSm, background: '#2D6A4F', color: '#fff', whiteSpace: 'nowrap' }}>Upgrade →</button>
        </div>
      </div>
    </div>
  );
}

function AuthGate({ onAuth, onClose }) {
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const _ip = { width: '100%', padding: '11px 13px', margin: '6px 0', borderRadius: 9, border: '1px solid #2a3350', background: '#0b1020', color: '#e6eaf2', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setLoading(true); setError('');
    const _b = window.__NC_BASE__ || ''; const _s = window.__COMPANY_SLUG__ || '';
    const body = JSON.stringify({ email: form.email, password: form.password, name: form.name });
    const _call = () => fetch(`${_b}/api/c/${_s}/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    try {
      let res; try { res = await _call(); } catch { await new Promise(r => setTimeout(r, 2500)); res = await _call(); }
      const json = await res.json();
      if (!json.ok) { setError(json.error || 'Authentication failed — please try again'); setLoading(false); return; }
      onAuth(json);
    } catch { setError('Connection error — please try again in a moment.'); setLoading(false); }
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,18,.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} style={{ background: '#0f1424', border: '1px solid #232b45', padding: 28, borderRadius: 16, width: 360, maxWidth: '90vw', color: '#e6eaf2' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
        {mode === 'signup' && <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={_ip} />}
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Work email" type="email" required style={_ip} />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (min 6 chars)" type="password" required style={_ip} />
        {error && <p style={{ color: '#f87171', fontSize: 13, margin: '6px 0 0' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: 10, padding: '12px', borderRadius: 9, border: 'none', background: loading ? '#4b50b8' : '#6366f1', color: '#fff', fontWeight: 700, fontSize: 15, cursor: loading ? 'default' : 'pointer' }}>
          {loading ? '…' : mode === 'signup' ? 'Get started free' : 'Log in'}
        </button>
        <p onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }} style={{ marginTop: 14, fontSize: 13, color: '#9aa6bd', cursor: 'pointer', textAlign: 'center' }}>
          {mode === 'signup' ? 'Already have an account? Log in' : 'New here? Create an account'}
        </p>
      </form>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(() => {
    try {
      if (localStorage.getItem('nc_user') && !localStorage.getItem('nc_auth')) localStorage.removeItem('nc_user');
      const a = JSON.parse(localStorage.getItem('nc_auth') || 'null');
      return (a && a.token && a.user && typeof a.user.email === 'string') ? a : null;
    } catch { return null; }
  });
  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    if (!auth?.token) return;
    const _b = window.__NC_BASE__ || ''; const _s = window.__COMPANY_SLUG__ || '';
    fetch(`${_b}/api/c/${_s}/auth/me`, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(r => r.json()).then(d => { if (!d.ok) { localStorage.removeItem('nc_auth'); setAuth(null); } }).catch(() => {});
  }, []);
  const onAuth = (data) => { localStorage.setItem('nc_auth', JSON.stringify(data)); setAuth(data); setShowAuth(false); };
  const onLogout = () => { localStorage.removeItem('nc_auth'); setAuth(null); };
  if (auth?.user) return <ProductApp user={auth.user} token={auth.token} onLogout={onLogout} />;
  return (
    <>
      <LandingPage onGetStarted={() => setShowAuth(true)} onSignup={() => setShowAuth(true)} onLogin={() => setShowAuth(true)} />
      {/* Fallback entry point (bottom-right so it never overlaps the nav) — guarantees a
          working login even if the landing's own buttons aren't wired to the auth modal. */}
      <button onClick={() => setShowAuth(true)} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999, background: '#6366f1', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 6px 20px rgba(99,102,241,.45)' }}>Sign in</button>
      {showAuth && <AuthGate onAuth={onAuth} onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default App;
