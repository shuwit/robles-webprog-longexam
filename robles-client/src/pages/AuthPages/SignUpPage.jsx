import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border-2 border-emerald-900 bg-white px-4 py-3 text-sm text-emerald-950 outline-none transition placeholder:text-emerald-300 focus:bg-emerald-50 focus:ring-2 focus:ring-emerald-500';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back to Home Button */}
      <Link to="/" className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 transition hover:text-emerald-900">
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Home
      </Link>

      <h1 className="text-4xl font-black tracking-tight text-emerald-900">Join the Farm</h1>
      <p className="mt-3 text-sm leading-6 text-emerald-700">
        Register to start supporting local agriculture.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-xs font-bold uppercase tracking-widest text-emerald-800">First Name</label>
            <input id="first-name" type="text" placeholder="Juan" className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="last-name" className="text-xs font-bold uppercase tracking-widest text-emerald-800">Last Name</label>
            <input id="last-name" type="text" placeholder="Dela Cruz" className={inputClasses} required />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-xs font-bold uppercase tracking-widest text-emerald-800">Email Address</label>
          <input id="signup-email" type="email" placeholder="juan@email.com" className={inputClasses} required />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-xs font-bold uppercase tracking-widest text-emerald-800">Password</label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              className={inputClasses}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-tighter text-emerald-900 hover:text-emerald-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full bg-emerald-600 border-emerald-900 py-4 shadow-[4px_4px_0px_0px_rgba(6,78,59,1)]">
          Create Account
        </Button>
      </form>

      <div className="mt-8 border-t-2 border-dashed border-emerald-200 pt-6 text-center">
        <p className="text-sm text-emerald-700">
          Already a member? <Link to="/auth/signin" className="font-black text-emerald-900 underline decoration-emerald-500 decoration-2 underline-offset-4">Sign In Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;