import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Building, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginUser } = useApp();
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Login inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regGst, setRegGst] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAgree, setRegAgree] = useState(false);

  // Status message
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    // Simulate check
    setMessage({ type: 'success', text: 'Logged in successfully! Welcome to Premium Textiles.' });
    setTimeout(() => {
      // If logging in, parse a nice username from email or default
      const username = email.split('@')[0];
      loginUser(username.charAt(0).toUpperCase() + username.slice(1), email, "Wholesale Boutique Inc.", "07AAAAA1111A1Z1");
      setAuthModalOpen(false);
      setMessage(null);
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regCompany || !regPassword) {
      setMessage({ type: 'error', text: 'Please fill in required fields (*).' });
      return;
    }
    if (!regAgree) {
      setMessage({ type: 'error', text: 'Please agree to the Wholesale Partner Terms.' });
      return;
    }
    setMessage({ type: 'success', text: 'Account registered successfully! Welcome as a wholesale partner.' });
    setTimeout(() => {
      loginUser(regName, regEmail, regCompany, regGst || "Pending Verification");
      setAuthModalOpen(false);
      setMessage(null);
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your registered email.' });
      return;
    }
    setMessage({ type: 'success', text: 'Password reset link sent to your registered email.' });
    setTimeout(() => {
      setTab('login');
      setMessage(null);
    }, 2000);
  };

  const triggerGoogleLogin = () => {
    setMessage({ type: 'success', text: 'Connecting with Google Account...' });
    setTimeout(() => {
      loginUser('Alina Malik', 'alina.malik@boutiquedesign.com', 'Alina Luxury Couture', '07BBBBB2222B2Z2');
      setAuthModalOpen(false);
      setMessage(null);
    }, 1200);
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Banner header */}
        <div className="relative p-6 text-center bg-gradient-to-br from-neutral-950 to-neutral-900 dark:from-neutral-950 dark:to-neutral-900 text-white border-b border-neutral-800">
          <button
            onClick={() => {
              setAuthModalOpen(false);
              setMessage(null);
            }}
            className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full transition-colors bg-white/5 hover:bg-white/10"
            id="close-auth-modal"
          >
            <X size={18} />
          </button>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">B2B Wholesaler Portal</span>
          <h3 className="mt-1 font-serif text-2xl tracking-wide text-gold-200">PREMIUM TEXTILES</h3>
          <p className="mt-2 text-xs text-neutral-400 font-sans">
            Katra Neel, Chandni Chowk | Serving Luxury Boutiques Worldwide
          </p>
        </div>

        {/* Status Alert */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`px-6 py-3 text-xs text-center font-medium ${
                message.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="p-8">
          {/* Tabs */}
          {tab !== 'forgot' && (
            <div className="flex border-b border-neutral-100 dark:border-neutral-800 mb-6">
              <button
                onClick={() => {
                  setTab('login');
                  setMessage(null);
                }}
                className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase transition-colors relative ${
                  tab === 'login' ? 'text-gold-600 dark:text-gold-400' : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600'
                }`}
              >
                Login
                {tab === 'login' && (
                  <motion.div
                    layoutId="auth-tab-bar"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                  />
                )}
              </button>
              <button
                onClick={() => {
                  setTab('register');
                  setMessage(null);
                }}
                className={`flex-1 pb-3 text-sm font-semibold tracking-wider uppercase transition-colors relative ${
                  tab === 'register' ? 'text-gold-600 dark:text-gold-400' : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600'
                }`}
              >
                Create Account
                {tab === 'register' && (
                  <motion.div
                    layoutId="auth-tab-bar"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                  />
                )}
              </button>
            </div>
          )}

          {/* Form container */}
          <div className="space-y-4">
            {tab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                    Boutique / Business Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. buyer@boutique.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setTab('forgot')}
                      className="text-xs text-gold-600 dark:text-gold-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs uppercase tracking-widest font-semibold bg-neutral-900 text-white hover:bg-neutral-850 dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-neutral-950 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  Enter Wholesaler Dashboard <ArrowRight size={14} />
                </button>
              </form>
            )}

            {tab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                      Full Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        <User size={15} />
                      </span>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Alina Malik"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                      Business Email *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        <Mail size={15} />
                      </span>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="info@yourboutique.com"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                      Boutique / Company Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        <Building size={15} />
                      </span>
                      <input
                        type="text"
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder="e.g. Zari Boutique Ltd"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                      GSTIN / Business Tax ID
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        <Landmark size={15} />
                      </span>
                      <input
                        type="text"
                        value={regGst}
                        onChange={(e) => setRegGst(e.target.value)}
                        placeholder="e.g. 07AAAAA1111A1Z1"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                    Create Password *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                      <Lock size={15} />
                    </span>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 py-1">
                  <input
                    type="checkbox"
                    id="reg-agree"
                    checked={regAgree}
                    onChange={(e) => setRegAgree(e.target.checked)}
                    className="mt-0.5 rounded-sm accent-gold-500 border-neutral-300 dark:border-neutral-750"
                  />
                  <label htmlFor="reg-agree" className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-normal">
                    I verify that I am a business owner or retail merchant buying wholesale garments, and agree to Premium Textiles' <span className="text-gold-600 dark:text-gold-400 font-semibold">Wholesale Trade Agreement</span>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs uppercase tracking-widest font-semibold bg-neutral-900 text-white hover:bg-neutral-850 dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-neutral-950 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1"
                >
                  Register Wholesale Business <ShieldCheck size={14} />
                </button>
              </form>
            )}

            {tab === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-1">
                  Enter your business email address and we'll send you instructions to securely reset your credentials and access wholesale rates.
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                    Business Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. buyer@boutique.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold bg-neutral-900 text-white hover:bg-neutral-850 dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-neutral-950 rounded-lg transition-colors"
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="py-3 px-4 text-xs uppercase tracking-widest border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-950 rounded-lg text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Google Divider */}
            {tab !== 'forgot' && (
              <div className="relative my-5 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-150 dark:border-neutral-800" />
                </div>
                <span className="relative px-3 text-[10px] uppercase tracking-wider font-semibold bg-white dark:bg-neutral-900 text-neutral-400">
                  Or Connect Instantly
                </span>
              </div>
            )}

            {/* Google Login Button */}
            {tab !== 'forgot' && (
              <button
                onClick={triggerGoogleLogin}
                type="button"
                className="w-full py-2.5 px-4 text-xs font-semibold border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-950 rounded-lg text-neutral-700 dark:text-neutral-300 transition-colors flex items-center justify-center gap-2"
                id="google-login-btn"
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google (B2B Secure)
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
