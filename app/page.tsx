import React from "react";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Cpu,
  CheckCircle2,
  FileText,
  Activity,
  Layers,
  Sparkles,
  BarChart3,
  Lock,
  Download,
  Check
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Banner */}
      <div className="border-b border-slate-800/80 bg-[#0d131f] px-4 py-2 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-emerald-400 font-medium tracking-wide">FRONTFORUMFOCUS IMPACT ENGINE</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">Automated dMRV for Clean Energy Infrastructure</span>
          </div>
          <Link
            href="/demo"
            className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition"
          >
            <span>Explore Interactive Live Demo</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="border-b border-slate-800/60 bg-[#090D14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              FO3
            </div>
            <div>
              <span className="font-semibold tracking-tight text-white flex items-center gap-2">
                FrontForumFocus <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Verifiable Impact</span>
              </span>
              <p className="text-[11px] text-slate-400 hidden sm:block">Turn clean energy data into audit-ready carbon assets</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/demo"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Launch Live Demo</span>
            </Link>
            <a
              href="mailto:george.karani@startupgrind.com?subject=FrontForumFocus%20Pilot%20Inquiry"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 transition shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Book 15-Min Pilot Sync
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0e1726] via-[#0a101d] to-[#090D14] py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-300 text-xs font-medium font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Zero-Hardware Inverter dMRV Platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Turn clean energy data into <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              audit-ready carbon assets.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Connect solar inverters, microgrids, and mobile field contributors to automate dMRV, eliminate 6–18 month audit lag, and capture premium carbon pricing.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold transition flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
            >
              <Activity className="w-4 h-4" />
              Try Interactive Pilot Demo
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:george.karani@startupgrind.com?subject=FrontForumFocus%20Pilot%20Deployment"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              Deploy 1–2 Sites ($500/mo)
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Audit Latency</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">0 Days</div>
              <div className="text-[10px] text-slate-400">vs 240d manual MRV</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Credit Premium</div>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">2x – 4x</div>
              <div className="text-[10px] text-slate-400">high-integrity pricing</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Hardware Cost</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">$0</div>
              <div className="text-[10px] text-slate-400">direct API & Modbus</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Deployment Time</div>
              <div className="text-xl font-bold font-mono text-purple-400 mt-0.5">48 Hours</div>
              <div className="text-[10px] text-slate-400">for 1–2 test sites</div>
            </div>
          </div>
        </div>
      </section>

      {/* How Physical Telemetry Becomes Bankable Capital */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-3 py-1 rounded-full">
            The 3-Step dMRV Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How Telemetry Becomes Bankable Capital</h2>
          <p className="text-sm text-slate-400">
            From raw solar generation pulses to verified carbon assets and automated SDG covenants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c121e] space-y-4 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Direct Telemetry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ingest live feeds from inverters (Growatt, SMA, Victron, Huawei, Deye) and smart meters with zero manual data entry or hardware retrofit costs.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c121e] space-y-4 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Automated dMRV & SDGs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardize raw generation logs into UN SDG compliance metrics (SDG 7, 8, 13) and UNFCCC AMS-I.F registry-ready carbon proof with cryptographic hashes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c121e] space-y-4 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Monetize Premium</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eliminate audit latency, satisfy blended finance covenants, and unlock 2x–4x price premiums on global environmental commodity exchanges.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Demo Teaser Card */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl border border-slate-700/80 bg-gradient-to-r from-[#0f172a] to-[#0d1a29] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 text-xs font-mono font-medium">
              <BarChart3 className="w-3.5 h-3.5" />
              Interactive Carbon & ROI Simulator
            </div>
            <h3 className="text-2xl font-bold text-white">See your inverter's carbon asset yield right now</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Test your solar array capacity, customize baseline diesel offsets, inspect cryptographic telemetry streams, and view a sample audit package in our zero-login interactive demo.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> No signup required</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> All major inverter brands</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Instant PDF dossier preview</span>
            </div>
          </div>

          <Link
            href="/demo"
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] shrink-0 transition"
          >
            Launch Interactive Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pricing & Pilot Packages */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-3 py-1 rounded-full">
            Transparent Deployment Tiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Pricing & Pilot Deployment</h2>
          <p className="text-sm text-slate-400">
            Start with 1–2 test sites to benchmark carbon yield before scaling across your regional portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pilot Package */}
          <div className="p-8 rounded-2xl border-2 border-emerald-500/80 bg-[#0c1626] relative space-y-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[11px] font-bold uppercase font-mono">
                Most Popular for New Pilots
              </div>
              <h3 className="text-xl font-bold text-white">Initial Pilot Tier</h3>
              <p className="text-xs text-slate-300">For clean energy developers running 1–2 test sites.</p>

              <div className="pt-2">
                <span className="text-3xl font-extrabold font-mono text-white">$500</span>
                <span className="text-xs text-slate-400 font-sans"> / month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 1–2 solar/microgrid sites</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Inverter API telemetry ingestion</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Continuous automated dMRV ledger</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> UN SDG 7, 8, 13 automated mapping</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Monthly audit-ready PDF/JSON export</li>
              </ul>
            </div>

            <a
              href="mailto:george.karani@startupgrind.com?subject=Deploy%20%24500%2Fmo%20FrontForumFocus%20Pilot"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs text-center transition block shadow-[0_0_15px_rgba(16,185,129,0.25)]"
            >
              Start $500/mo Pilot
            </a>
          </div>

          {/* Regional Portfolio Tier */}
          <div className="p-8 rounded-2xl border border-slate-800 bg-[#0c121e] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Regional Portfolio</h3>
              <p className="text-xs text-slate-400">For regional C&I solar and mini-grid operators.</p>

              <div className="pt-2">
                <span className="text-3xl font-extrabold font-mono text-white">$1,800</span>
                <span className="text-xs text-slate-400 font-sans"> / month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Up to 15 sites / 5 MW aggregate</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Real-time 10s cryptographic stream</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Direct registry issuance connector</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Custom blended finance debt covenant logs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated impact engineer support</li>
              </ul>
            </div>

            <a
              href="mailto:george.karani@startupgrind.com?subject=Regional%20Portfolio%20Inquiry"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs text-center transition block"
            >
              Contact for Enterprise
            </a>
          </div>

          {/* Registries & Blended Finance */}
          <div className="p-8 rounded-2xl border border-slate-800 bg-[#0c121e] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Registry & Blended Finance</h3>
              <p className="text-xs text-slate-400">For carbon registries, DFIs, and debt funds.</p>

              <div className="pt-2">
                <span className="text-3xl font-extrabold font-mono text-white">Custom</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Portfolio-wide tamper-proof validation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Direct dMRV smart contract integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Multi-country emission factor indexing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Institutional compliance & SLA guarantee</li>
              </ul>
            </div>

            <a
              href="mailto:george.karani@startupgrind.com?subject=Registry%20%26%20Fund%20Collaboration"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs text-center transition block"
            >
              Inquire for Facilities
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b12] py-12 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
              FO3
            </div>
            <span>FrontForumFocus — The Intelligence Layer for Verifiable Impact</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/demo" className="hover:text-emerald-400 transition font-mono">Live Demo</Link>
            <a href="https://frontforumfocus.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">Official Site</a>
            <a href="mailto:george.karani@startupgrind.com" className="hover:text-emerald-400 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
