import { type FormEvent, type ReactNode, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  DEMO_ACCESS_EMAIL,
  DEMO_ACCESS_PASSWORD,
  grantDemoAccess,
  hasDemoAccess,
} from '../../lib/demo-access';

export default function DemoAccessGate({ children }: { children: ReactNode }) {
  const [isGranted, setIsGranted] = useState(hasDemoAccess);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (isGranted) return children;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim().toLowerCase() !== DEMO_ACCESS_EMAIL || password !== DEMO_ACCESS_PASSWORD) {
      setError('Those credentials do not match.');
      return;
    }

    grantDemoAccess();
    setIsGranted(true);
  };

  return (
    <main className="min-h-screen bg-[#f3f6f4] text-telivity-navy lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-telivity-navy px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-y-0 right-16 w-px bg-white/[0.06]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-24 left-0 h-px w-2/3 bg-white/[0.06]" aria-hidden="true" />

        <div className="relative">
          <p className="text-2xl font-semibold tracking-wide">OrdoStay</p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/55"></p>
        </div>

        <div className="relative max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-telivity-light-teal">
            Management workspace
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight xl:text-5xl">
            See what needs attention before it becomes a problem.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/65">
            One clear view of hotel performance, operational exceptions, and the next decisions that matter.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <Feature icon={BarChart3} title="Performance" text="Revenue and operating KPIs" />
            <Feature icon={ShieldCheck} title="Exceptions" text="Risks and anomalies surfaced" />
            <Feature icon={Sparkles} title="Next actions" text="AI-assisted recommendations" />
          </div>
        </div>

        <p className="relative text-xs text-white/35">Private environment</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <p className="text-2xl font-semibold tracking-wide">OrdoStay</p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-telivity-dark-teal">Secure access</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Welcome to OrdoStay</h2>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="demo-email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="demo-email"
                type="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setError(''); }}
                autoComplete="username"
                className="w-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-telivity-teal focus:ring-2 focus:ring-telivity-teal/15"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="demo-password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="demo-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => { setPassword(event.target.value); setError(''); }}
                  autoComplete="current-password"
                  className="w-full border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-telivity-teal focus:ring-2 focus:ring-telivity-teal/15"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-telivity-slate transition hover:text-telivity-navy"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-telivity-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-telivity-dark-teal focus:outline-none focus:ring-2 focus:ring-telivity-teal focus:ring-offset-2"
            >
              Login
              <ArrowRight size={17} />
            </button>
          </form>

         
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof BarChart3;
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-white/20 pt-4">
      <Icon size={18} className="text-telivity-light-teal" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-white/50">{text}</p>
    </div>
  );
}
