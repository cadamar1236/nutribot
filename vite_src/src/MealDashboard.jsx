import { useState, useMemo } from 'react';

/* ─── seed data ─── */
const SEED_MEALS = [
  { id: 1, date: '2025-03-17', type: 'Breakfast', food: 'Oatmeal with berries & almonds', carbs: 48, protein: 14, fat: 12, calories: 350 },
  { id: 2, date: '2025-03-17', type: 'Lunch', food: 'Grilled chicken salad with quinoa', carbs: 36, protein: 42, fat: 16, calories: 460 },
  { id: 3, date: '2025-03-17', type: 'Dinner', food: 'Salmon with roasted vegetables', carbs: 22, protein: 38, fat: 20, calories: 440 },
  { id: 4, date: '2025-03-18', type: 'Breakfast', food: 'Smoothie bowl with granola', carbs: 58, protein: 18, fat: 10, calories: 400 },
  { id: 5, date: '2025-03-18', type: 'Lunch', food: 'Turkey wrap with avocado', carbs: 40, protein: 36, fat: 18, calories: 480 },
  { id: 6, date: '2025-03-18', type: 'Dinner', food: 'Stir-fried tofu with brown rice', carbs: 52, protein: 28, fat: 14, calories: 440 },
  { id: 7, date: '2025-03-19', type: 'Breakfast', food: 'Eggs & whole grain toast', carbs: 32, protein: 24, fat: 16, calories: 380 },
  { id: 8, date: '2025-03-19', type: 'Lunch', food: 'Lentil soup & side salad', carbs: 44, protein: 20, fat: 8, calories: 340 },
  { id: 9, date: '2025-03-19', type: 'Dinner', food: 'Beef stir-fry with noodles', carbs: 48, protein: 34, fat: 22, calories: 520 },
];

const MEAL_ICONS = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙' };
const TYPE_ORDER = ['Breakfast', 'Lunch', 'Dinner'];

function getTodayStr() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/* ─── color badge for each macro ─── */
function MacroBadge({ label, value, unit, color }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label} {value}{unit}
    </span>
  );
}

/* ─── single meal row ─── */
function MealRow({ meal }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-emerald-100 rounded-xl overflow-hidden transition-all hover:shadow-md hover:border-emerald-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{MEAL_ICONS[meal.type] || '🍽️'}</span>
          <div>
            <p className="text-sm font-semibold text-emerald-800">{meal.type}</p>
            <p className="text-xs text-emerald-500 mt-0.5">{meal.food}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-emerald-800">{meal.calories}</span>
          <span className="text-xs text-emerald-400">kcal</span>
          <svg
            className={`w-4 h-4 text-emerald-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0 flex flex-wrap gap-2 border-t border-emerald-100 pt-3">
          <MacroBadge label="Carbs" value={meal.carbs} unit="g" color="bg-blue-100 text-blue-600" />
          <MacroBadge label="Protein" value={meal.protein} unit="g" color="bg-red-100 text-red-600" />
          <MacroBadge label="Fat" value={meal.fat} unit="g" color="bg-yellow-100 text-yellow-600" />
        </div>
      )}
    </div>
  );
}

/* ─── macro summary card ─── */
function MacroSummaryCard({ mealsForDate }) {
  const totals = useMemo(() => {
    const safe = Array.isArray(mealsForDate) ? mealsForDate : [];
    const cals = safe.reduce((s, m) => s + (m.calories || 0), 0);
    const c = safe.reduce((s, m) => s + (m.carbs || 0), 0);
    const p = safe.reduce((s, m) => s + (m.protein || 0), 0);
    const f = safe.reduce((s, m) => s + (m.fat || 0), 0);
    const totalG = c + p + f || 1;
    return {
      calories: cals,
      carbs: c,
      protein: p,
      fat: f,
      carbsPct: ((c / totalG) * 100).toFixed(1),
      proteinPct: ((p / totalG) * 100).toFixed(1),
      fatPct: ((f / totalG) * 100).toFixed(1),
    };
  }, [mealsForDate]);

  const macros = [
    { label: 'Carbs', value: totals.carbs, pct: totals.carbsPct, color: 'bg-blue-500', barColor: 'bg-blue-500/20' },
    { label: 'Protein', value: totals.protein, pct: totals.proteinPct, color: 'bg-red-500', barColor: 'bg-red-500/20' },
    { label: 'Fat', value: totals.fat, pct: totals.fatPct, color: 'bg-yellow-500', barColor: 'bg-yellow-500/20' },
  ];

  return (
    <div className="bg-white border border-emerald-100 rounded-xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">Macro Breakdown</h3>
        <span className="text-2xl font-bold text-emerald-800">{totals.calories} <span className="text-sm text-emerald-400 font-normal">kcal</span></span>
      </div>

      {/* donut-style bar stack */}
      <div className="h-3 bg-emerald-100 rounded-full overflow-hidden flex">
        {(macros || []).map(m => (
          <div
            key={m.label}
            className={`${m.color} h-full transition-all`}
            style={{ width: `${Math.max(1, parseFloat(m.pct))}%` }}
            title={`${m.label}: ${m.value}g (${m.pct}%)`}
          />
        ))}
      </div>

      {/* individual rows */}
      <div className="space-y-3">
        {(macros || []).map(m => {
          const pctNum = parseFloat(m.pct);
          return (
            <div key={m.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-500 font-medium">{m.label}</span>
                <span className="text-emerald-600">{m.value}g &middot; <span className="text-emerald-400">{m.pct}%</span></span>
              </div>
              <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.color}`} style={{ width: `${pctNum}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── main exported component ─── */
export default function MealDashboard() {
  const [selectedDate, setSelectedDate] = useState(getTodayStr());

  const mealsForDate = useMemo(() => {
    return (SEED_MEALS || [])
      .filter(m => m.date === selectedDate)
      .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
  }, [selectedDate]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">Meal Dashboard</h1>
          <p className="text-sm text-emerald-500 mt-1">View your daily food log and macro split.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-emerald-200 rounded-lg px-3 py-2 shadow-sm">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="bg-transparent text-emerald-700 text-sm focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* meal log */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
          Meal Log &middot; {selectedDate}
        </h2>
        {(mealsForDate || []).length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center">
            <p className="text-emerald-400 text-sm">No meals logged for this date.</p>
          </div>
        ) : (
          (mealsForDate || []).map(meal => <MealRow key={meal.id} meal={meal} />)
        )}
      </div>

      {/* macro summary */}
      <MacroSummaryCard mealsForDate={mealsForDate} />
    </div>
  );
}