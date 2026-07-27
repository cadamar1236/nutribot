import { useState, useEffect, useCallback, useRef } from 'react';
import MealDashboard from './MealDashboard.jsx';
import { Camera, Utensils, TrendingUp, Apple, Watch, BarChart3, ChevronDown, ChevronUp, Plus, Search, Bell, LogOut, Crown, Sparkles, ArrowRight, Check, Star, Zap, Shield, Leaf, Users, Clock, Target, Activity, X, Mail, Smartphone, DollarSign, Image, Flame, CreditCard, CheckCircle, Percent, Gift, Heart } from 'lucide-react';

const App = () => {
  const [auth, setAuth] = useState(() => {
    try { const d = JSON.parse(localStorage.getItem('nc_auth') || 'null'); return d; }
    catch { return null; }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showMacroDetail, setShowMacroDetail] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meals');
      if (!response.ok) throw new Error('Failed to fetch meals');
      const data = await response.json();
      setMeals(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data || []);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setUserProfile(data || {});
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
    fetchNotifications();
    fetchUserProfile();
  }, [fetchMeals, fetchNotifications, fetchUserProfile]);

  const addMeal = useCallback(async (mealData) => {
    try {
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData),
      });
      if (!response.ok) throw new Error('Failed to add meal');
      const newMeal = await response.json();
      setMeals(prev => [...prev, newMeal]);
      setShowAddMeal(false);
    } catch (err) {
      console.error('Failed to add meal:', err);
    }
  }, []);

  const deleteMeal = useCallback(async (mealId) => {
    try {
      const response = await fetch(`/api/meals/${mealId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete meal');
      setMeals(prev => prev.filter(m => m.id !== mealId));
    } catch (err) {
      console.error('Failed to delete meal:', err);
    }
  }, []);

  const scanMeal = useCallback(async (imageData) => {
    try {
      const response = await fetch('/api/ai/scan-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });
      if (!response.ok) throw new Error('Failed to scan meal');
      const data = await response.json();
      setMeals(prev => [...prev, data]);
      setShowScanner(false);
    } catch (err) {
      console.error('Failed to scan meal:', err);
    }
  }, []);

  const totalCalories = (meals || []).reduce((sum, m) => sum + (m.calories || 0), 0);
  const totalProtein = (meals || []).reduce((sum, m) => sum + (m.protein || 0), 0);
  const totalCarbs = (meals || []).reduce((sum, m) => sum + (m.carbs || 0), 0);
  const totalFat = (meals || []).reduce((sum, m) => sum + (m.fat || 0), 0);

  const filteredMeals = (meals || []).filter(m =>
    !searchQuery || (m.name && m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const todayCalories = (meals || []).filter(m => {
    const mealDate = new Date(m.date);
    const today = new Date();
    return mealDate.toDateString() === today.toDateString();
  }).reduce((sum, m) => sum + (m.calories || 0), 0);

  const mealTypeColors = {
    breakfast: 'bg-orange-100 text-orange-600',
    lunch: 'bg-green-100 text-green-600',
    dinner: 'bg-blue-100 text-blue-600',
    snack: 'bg-purple-100 text-purple-600',
  };

  const handleAuth = async (mode, data) => {
    try {
      const base = window.__NC_BASE__ || '';
      const slug = window.__COMPANY_SLUG__ || 'nutribot';
      const res = await fetch(base + '/api/c/' + slug + '/auth/' + mode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.ok) {
        localStorage.setItem('nc_auth', JSON.stringify({ token: result.token, user: result.user }));
        setAuth({ token: result.token, user: result.user });
        setShowAuthModal(false);
      } else {
        alert(result.error || 'Authentication failed');
      }
    } catch {
      alert('Network error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nc_auth');
    setAuth(null);
  };

  if (!auth?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        {/* Hero Section */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-2 rounded-xl">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-emerald-800">NutriBot</h1>
                  <p className="text-xs text-emerald-500">AI-Powered Nutrition</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className="text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-5 py-2 rounded-xl text-sm font-medium hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-200"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Landing Hero */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-1 bg-emerald-100 rounded-full px-4 py-1.5 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-emerald-600 font-medium">AI-Powered Nutrition Coaching</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Eat Smart,{'\n'}Live Better{'\n'}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">With AI</span>
            </h2>
            <p className="text-lg text-emerald-600 max-w-2xl mx-auto mb-10">
              Snap a photo of your meal — our AI instantly logs calories, protein, carbs, and fat.
              Get personalized weekly meal plans, track your macros, and sync with Apple Health & Fitbit.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-xl shadow-emerald-200"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
              <button className="border border-emerald-200 text-emerald-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-emerald-50 transition-all">
                See How It Works
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center text-emerald-900 mb-12">Why NutriBot?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Camera, title: 'AI Meal Scanner', desc: 'Snap a photo — our AI identifies ingredients and calculates macros instantly.' },
                { icon: TrendingUp, title: 'Smart Tracking', desc: 'Auto-track calories, protein, carbs & fat. No manual logging needed.' },
                { icon: Watch, title: 'Wearable Sync', desc: 'Syncs with Apple Health and Fitbit for a complete health picture.' },
                { icon: Utensils, title: 'Weekly Meal Plans', desc: 'AI generates personalized meal plans based on your goals & preferences.' },
                { icon: BarChart3, title: 'Advanced Analytics', desc: 'Deep insights into your nutrition patterns with beautiful visualizations.' },
                { icon: Users, title: 'Family Plans', desc: 'Share nutrition tracking with up to 5 family members. Only $19/mo.' },
              ].map((feat, i) => (
                <div key={i} className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center mb-4">
                    <feat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-800 mb-2">{feat.title}</h4>
                  <p className="text-sm text-emerald-600">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section on Landing */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center text-emerald-900 mb-4">Simple Pricing</h3>
            <p className="text-emerald-500 text-center mb-12 max-w-xl mx-auto">Start free, upgrade when you need more. No hidden fees.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Free */}
              <div className="bg-white rounded-2xl p-6 border border-emerald-200">
                <h4 className="text-lg font-bold text-emerald-800 mb-2">Starter</h4>
                <p className="text-3xl font-bold text-emerald-800 mb-4">$0<span className="text-sm font-normal text-emerald-500">/mo</span></p>
                <ul className="space-y-2 mb-6 text-sm text-emerald-600">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Manual meal logging</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Basic calorie tracking</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>3-day meal history</span></li>
                </ul>
                <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="w-full bg-emerald-100 text-emerald-700 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-200 transition-all">Get Started</button>
              </div>
              {/* Pro */}
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-xs font-bold px-4 py-1 rounded-full">POPULAR</div>
                <h4 className="text-lg font-bold text-emerald-800 mb-2">Pro</h4>
                <p className="text-3xl font-bold text-emerald-800 mb-4">$12<span className="text-sm font-normal text-emerald-500">/mo</span></p>
                <ul className="space-y-2 mb-6 text-sm text-emerald-600">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>AI photo recognition</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Full macro & micro tracking</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>AI weekly meal plans</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Apple Health & Fitbit sync</span></li>
                </ul>
                <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-200">Start Free Trial</button>
              </div>
              {/* Family */}
              <div className="bg-white rounded-2xl p-6 border border-emerald-200">
                <h4 className="text-lg font-bold text-emerald-800 mb-2">Family</h4>
                <p className="text-3xl font-bold text-emerald-800 mb-4">$19<span className="text-sm font-normal text-emerald-500">/mo</span></p>
                <ul className="space-y-2 mb-6 text-sm text-emerald-600">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Everything in Pro</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Up to 5 family members</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Shared meal plans</span></li>
                </ul>
                <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-2.5 rounded-xl text-sm font-medium hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-200">Start Family Trial</button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-emerald-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-emerald-400">
            <p>&copy; 2025 NutriBot. All rights reserved.</p>
          </div>
        </footer>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 p-2 hover:bg-emerald-100 rounded-xl text-emerald-500">
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-800">{authMode === 'login' ? 'Welcome Back' : 'Join NutriBot'}</h2>
                <p className="text-sm text-emerald-500 mt-1">{authMode === 'login' ? 'Sign in to your account' : 'Create your account and start tracking'}</p>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                handleAuth(authMode, {
                  email: fd.get('email'),
                  password: fd.get('password'),
                  ...(authMode === 'signup' ? { name: fd.get('name') } : {}),
                });
              }}>
                {authMode === 'signup' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-emerald-700 mb-1">Name</label>
                    <input name="name" required className="w-full px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400" placeholder="Your name" />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-emerald-700 mb-1">Email</label>
                  <input name="email" type="email" required className="w-full px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400" placeholder="you@example.com" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-emerald-700 mb-1">Password</label>
                  <input name="password" type="password" required className="w-full px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white py-3 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-200 mb-4">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
              <p className="text-center text-sm text-emerald-500">
                {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-emerald-600 font-medium hover:underline">
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-2 rounded-xl">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-800">NutriBot</h1>
                <p className="text-xs text-emerald-500">AI-Powered Nutrition</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <input
                  type="text"
                  placeholder="Search meals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent w-64 text-emerald-700 placeholder-emerald-400"
                />
              </div>

              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                className="relative p-2 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5 text-emerald-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                className="flex items-center space-x-2 p-2 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {userProfile?.name ? userProfile.name[0] : '?'}
                  </span>
                </div>
              </button>

              <button
                onClick={() => { setShowPremium(true); setShowPricing(false); }}
                className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-200"
              >
                <Crown className="w-4 h-4" />
                <span>Premium</span>
              </button>

              <button
                onClick={() => { setShowPricing(true); setShowPremium(false); }}
                className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-200"
              >
                <DollarSign className="w-4 h-4" />
                <span>Pricing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-16 right-4 w-80 bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="p-4 border-b border-emerald-100">
              <h3 className="font-semibold text-emerald-800">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {(notifications || []).map((notif, idx) => (
                <div key={idx} className="p-4 hover:bg-emerald-50 border-b border-emerald-50">
                  <p className="text-sm text-emerald-700">{notif.message}</p>
                  <p className="text-xs text-emerald-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="p-4 text-center text-emerald-400 text-sm">No notifications</div>
              )}
            </div>
          </div>
        )}

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute top-16 right-4 w-72 bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="p-6 text-center border-b border-emerald-100">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl font-bold">
                  {userProfile?.name ? userProfile.name[0] : '?'}
                </span>
              </div>
              <h3 className="font-semibold text-emerald-800">{userProfile?.name || 'User'}</h3>
              <p className="text-sm text-emerald-500">{userProfile?.email || ''}</p>
              <div className="flex justify-center mt-3 space-x-4 text-sm text-emerald-600">
                <span>{userProfile?.age || '-'} yrs</span>
                <span>{userProfile?.weight || '-'} kg</span>
                <span>{userProfile?.height || '-'} cm</span>
              </div>
            </div>
            <div className="p-3 space-y-1">
              <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 rounded-xl text-sm text-emerald-700">
                Edit Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-emerald-50 rounded-xl text-sm text-emerald-700">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-red-50 rounded-xl text-sm text-red-600">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Premium Modal */}
        {showPremium && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative">
              <button
                onClick={() => setShowPremium(false)}
                className="absolute top-4 right-4 p-2 hover:bg-emerald-100 rounded-xl text-emerald-500"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-800">Go Premium</h2>
                <p className="text-emerald-500 mt-2">Unlock the full power of AI nutrition</p>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  { icon: Zap, text: 'AI Meal Scanner & Recognition' },
                  { icon: BarChart3, text: 'Advanced Analytics & Insights' },
                  { icon: Target, text: 'Personalized Meal Plans' },
                  { icon: Watch, text: 'Wearable Integration' },
                  { icon: Users, text: 'Community Challenges' },
                  { icon: Shield, text: 'Priority Support & No Ads' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-emerald-700 flex-1">{feature.text}</span>
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-200 mb-4">
                  Start Free Trial - $9.99/mo
                </button>
                <p className="text-xs text-emerald-400">Cancel anytime. No questions asked.</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Modal */}
        {showPricing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-8 relative">
              <button
                onClick={() => setShowPricing(false)}
                className="absolute top-4 right-4 p-2 hover:bg-emerald-100 rounded-xl text-emerald-500 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-10">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-emerald-800">Simple, Transparent Pricing</h2>
                <p className="text-emerald-500 mt-2 max-w-xl mx-auto">Choose the plan that fits your lifestyle. All plans include a 14-day free trial.</p>
              </div>

              {/* Billing Toggle */}
              <div className="flex justify-center mb-10">
                <div className="bg-emerald-100 rounded-xl p-1 inline-flex">
                  <button className="px-6 py-2 rounded-lg text-sm font-medium bg-white text-emerald-700 shadow-sm">Monthly</button>
                  <button className="px-6 py-2 rounded-lg text-sm font-medium text-emerald-500 hover:text-emerald-700">Yearly <span className="text-xs text-amber-500 font-semibold">Save 20%</span></button>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Free Plan */}
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all relative">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-800">Starter</h3>
                    <p className="text-sm text-emerald-500 mt-1">For getting started</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-emerald-800">$0</span>
                    <span className="text-emerald-500 text-sm ml-1">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Manual meal logging',
                      'Basic calorie tracking',
                      '3-day meal history',
                      'Web dashboard access',
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-emerald-600">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-emerald-200 text-emerald-700 py-3 rounded-xl font-medium hover:bg-emerald-300 transition-all">
                    Current Plan
                  </button>
                </div>

                {/* Pro Plan - highlighted */}
                <div className="bg-white rounded-2xl p-6 border-2 border-emerald-400 hover:shadow-xl transition-all relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center mb-4">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-800">Pro</h3>
                    <p className="text-sm text-emerald-500 mt-1">For health enthusiasts</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-emerald-800">$12</span>
                    <span className="text-emerald-500 text-sm ml-1">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      'AI-powered meal scanning',
                      'Full macro & micro tracking',
                      'Weekly AI meal plans',
                      'Apple Health & Fitbit sync',
                      'Unlimited meal history',
                      'Priority support',
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-emerald-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white py-3 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-200">
                    Start Free Trial
                  </button>
                </div>

                {/* Family Plan */}
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all relative">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-800">Family</h3>
                    <p className="text-sm text-emerald-500 mt-1">For the whole household</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-emerald-800">$19</span>
                    <span className="text-emerald-500 text-sm ml-1">/mo</span>
                    <div className="mt-1">
                      <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">Save 33%</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Everything in Pro',
                      'Up to 5 family members',
                      'Shared meal plans',
                      'Family dashboard & insights',
                      'Parental controls',
                      'Dedicated family support',
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-emerald-600">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white py-3 rounded-xl font-medium hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-200">
                    Start Family Trial
                  </button>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-emerald-800 mb-4 text-center">Feature Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-emerald-200">
                        <th className="text-left py-3 text-emerald-600 font-medium">Feature</th>
                        <th className="text-center py-3 text-emerald-600 font-medium">Starter</th>
                        <th className="text-center py-3 text-emerald-700 font-semibold bg-emerald-100 rounded-t-lg">Pro</th>
                        <th className="text-center py-3 text-emerald-600 font-medium">Family</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Manual meal logging', '✓', '✓', '✓'],
                        ['AI Photo Recognition', '—', '✓', '✓'],
                        ['Macro Tracking', 'Basic', 'Advanced', 'Advanced'],
                        ['Micro Nutrients', '—', '✓', '✓'],
                        ['Weekly Meal Plans', '—', '✓', '✓'],
                        ['Apple Health Sync', '—', '✓', '✓'],
                        ['Fitbit Sync', '—', '✓', '✓'],
                        ['Family Members', '1', '1', 'Up to 5'],
                        ['Meal History', '3 days', 'Unlimited', 'Unlimited'],
                        ['Priority Support', '—', '✓', '✓'],
                        ['Price', 'Free', '$12/mo', '$19/mo'],
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-emerald-100">
                          <td className="py-2.5 text-emerald-700">{row[0]}</td>
                          <td className="text-center py-2.5 text-emerald-500">{row[1]}</td>
                          <td className="text-center py-2.5 text-emerald-600 font-medium bg-emerald-100/50">{row[2]}</td>
                          <td className="text-center py-2.5 text-emerald-500">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 text-center text-xs text-emerald-400">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-3 h-3" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Percent className="w-3 h-3" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Gift className="w-3 h-3" />
                  <span>No hidden fees</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{totalCalories}</p>
            <p className="text-xs text-emerald-500">Total Calories</p>
            <p className="text-xs text-emerald-400 mt-1">Today: {todayCalories} cal</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{totalProtein.toFixed(1)}g</p>
            <p className="text-xs text-emerald-500">Total Protein</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Wheat className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{totalCarbs.toFixed(1)}g</p>
            <p className="text-xs text-emerald-500">Total Carbs</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Beaker className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{totalFat.toFixed(1)}g</p>
            <p className="text-xs text-emerald-500">Total Fat</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setShowScanner(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-200"
          >
            <Camera className="w-5 h-5" />
            <span>Scan Meal</span>
          </button>
          <button
            onClick={() => setShowAddMeal(true)}
            className="flex items-center space-x-2 bg-white border-2 border-emerald-200 text-emerald-700 px-6 py-3 rounded-xl font-medium hover:bg-emerald-50 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Meal</span>
          </button>
        </div>

        {/* Macro Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 mb-8">
          <h2 className="text-lg font-semibold text-emerald-800 mb-4">Macro Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-emerald-500 mb-2">Protein</p>
              <div className="w-full bg-emerald-100 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((totalProtein / 100) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-emerald-400 mt-1">{totalProtein.toFixed(1)}g / 100g target</p>
            </div>
            <div>
              <p className="text-sm text-emerald-500 mb-2">Carbs</p>
              <div className="w-full bg-emerald-100 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((totalCarbs / 200) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-emerald-400 mt-1">{totalCarbs.toFixed(1)}g / 200g target</p>
            </div>
            <div>
              <p className="text-sm text-emerald-500 mb-2">Fat</p>
              <div className="w-full bg-emerald-100 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((totalFat / 65) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-emerald-400 mt-1">{totalFat.toFixed(1)}g / 65g target</p>
            </div>
          </div>
        </div>

        {/* Meal Dashboard */}
        <div className="mb-8">
          <MealDashboard meals={filteredMeals} onDelete={deleteMeal} loading={loading} error={error} onRetry={fetchMeals} />
        </div>
      </main>

      {/* Scan Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-emerald-800">Scan Your Meal</h2>
              <p className="text-sm text-emerald-500 mt-1">Take a photo to automatically detect nutrients</p>
            </div>
            <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-12 text-center bg-emerald-50 mb-6">
              <Image className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
              <p className="text-sm text-emerald-500">Click to upload or drag and drop</p>
              <p className="text-xs text-emerald-400 mt-1">PNG, JPG up to 10MB</p>
            </div>
            <button
              onClick={() => setShowScanner(false)}
              className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl font-medium hover:bg-emerald-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8">
            <h2 className="text-xl font-bold text-emerald-800 mb-6">Add Meal Manually</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              addMeal({
                name: formData.get('name'),
                calories: parseInt(formData.get('calories')),
                protein: parseFloat(formData.get('protein')),
                carbs: parseFloat(formData.get('carbs')),
                fat: parseFloat(formData.get('fat')),
                type: formData.get('type'),
                date: new Date().toISOString(),
              });
            }}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Meal name"
                  required
                  className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400"
                />
                <select
                  name="type"
                  required
                  className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700"
                >
                  <option value="">Select meal type</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="calories"
                    placeholder="Calories"
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400"
                  />
                  <input
                    type="number"
                    name="protein"
                    placeholder="Protein (g)"
                    required
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400"
                  />
                  <input
                    type="number"
                    name="carbs"
                    placeholder="Carbs (g)"
                    required
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400"
                  />
                  <input
                    type="number"
                    name="fat"
                    placeholder="Fat (g)"
                    required
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 placeholder-emerald-400"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-white py-3 rounded-xl font-medium hover:from-emerald-500 hover:to-teal-500 transition-all"
                >
                  Add Meal
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMeal(false)}
                  className="flex-1 bg-emerald-100 text-emerald-700 py-3 rounded-xl font-medium hover:bg-emerald-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;