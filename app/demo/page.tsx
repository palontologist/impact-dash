"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  TrendingUp,
  FileText,
  Download,
  CheckCircle2,
  Activity,
  ArrowRight,
  Sliders,
  RefreshCw,
  ExternalLink,
  Lock,
  Building2,
  Sparkles,
  Globe,
  Cpu,
  Layers,
  ChevronRight,
  BarChart3,
  Calendar,
  Clock,
  Check,
  AlertCircle
} from "lucide-react";

export default function FrontForumFocusDemoPage() {
  // Persona state: 'operator' | 'carbon_buyer' | 'investor'
  const [persona, setPersona] = useState<"operator" | "carbon_buyer" | "investor">("operator");

  // Calculator state
  const [capacityKW, setCapacityKW] = useState<number>(250);
  const [sunHours, setSunHours] = useState<number>(5.2);
  const [gridFactor, setGridFactor] = useState<number>(0.72); // kg CO2e per kWh (diesel/fossil baseline)
  const [selectedInverter, setSelectedInverter] = useState<string>("Growatt MAX 100-125KTL3");
  const [isAuditorModalOpen, setIsAuditorModalOpen] = useState<boolean>(false);
  const [liveStreamIndex, setLiveStreamIndex] = useState<number>(0);

  // Live telemetry simulation ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStreamIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic calculations
  const dailyKWh = capacityKW * sunHours;
  const annualMWh = (dailyKWh * 365) / 1000;
  const annualAvoidedTonsCO2 = (annualMWh * 1000 * gridFactor) / 1000;
  
  // Pricing: Standard credit ($8/t) vs FrontForumFocus dMRV Premium ($32/t)
  const standardRevenueUSD = annualAvoidedTonsCO2 * 8;
  const dmrvPremiumRevenueUSD = annualAvoidedTonsCO2 * 32;
  const unlockedUpsideUSD = dmrvPremiumRevenueUSD - standardRevenueUSD;

  // Mock telemetry stream records
  const telemetryLogs = [
    { time: "Just now", deviceId: "INV-AFR-019", kw: "184.2 kW", v: "400.1 V", co2Offset: "132.6 kg/hr", hash: "0x89e2...c41a", status: "VERIFIED" },
    { time: "3s ago", deviceId: "INV-AFR-020", kw: "210.8 kW", v: "402.4 V", co2Offset: "151.7 kg/hr", hash: "0x4b71...19df", status: "VERIFIED" },
    { time: "6s ago", deviceId: "MTR-SMART-004", kw: "98.4 kW", v: "399.8 V", co2Offset: "70.8 kg/hr", hash: "0x91d3...e54a", status: "VERIFIED" },
    { time: "9s ago", deviceId: "INV-AFR-019", kw: "182.9 kW", v: "399.5 V", co2Offset: "131.6 kg/hr", hash: "0x3f18...aa02", status: "VERIFIED" },
    { time: "12s ago", deviceId: "BAT-STOR-002", kw: "45.0 kW", v: "48.2 V", co2Offset: "32.4 kg/hr", hash: "0x77c2...55b1", status: "VERIFIED" },
  ];

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Banner / Live Provenance Tag */}
      <div className="border-b border-slate-800/80 bg-[#0d131f] px-4 py-2 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-emerald-400 font-medium tracking-wide">LIVE dMRV ENGINE ACTIVE</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">Cryptographic Inverter Telemetry</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Audit Latency: <strong className="text-emerald-400">0 Days</strong></span>
            <span>Integrity: <strong className="text-cyan-400">100% Cryptographic Proof</strong></span>
            <span className="hidden md:inline">Standard: <strong className="text-slate-200">UN SDG 7 / 13 / AMS-I.F</strong></span>
          </div>
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
                FrontForumFocus <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">Pilot Demo</span>
              </span>
              <p className="text-[11px] text-slate-400">Turn Clean Energy Data Into Audit-Ready Carbon Assets</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuditorModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-900/60 text-xs font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Sample Auditor Dossier
            </button>
            <a
              href="https://frontforumfocus.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 transition shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Book 15-Min Pilot Sync
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero / Quick Context */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-[#0d1424] to-[#090D14] px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Zero-Friction Inverter-to-Registry Pilot Environment
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Verifiable Clean Energy & Carbon Intelligence
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
                Connect solar inverters, microgrids, and field meters to automate digital MRV (dMRV), eliminate 6–18 month audit lag, and capture premium credit pricing on global exchanges.
              </p>
            </div>

            {/* Persona Switcher Buttons */}
            <div className="bg-[#0f172a] p-1.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-1 self-start lg:self-center">
              <span className="text-[11px] font-mono text-slate-400 px-2 py-1 flex items-center">View As:</span>
              <button
                onClick={() => setPersona("operator")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  persona === "operator"
                    ? "bg-emerald-500 text-slate-950 shadow font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Solar / Mini-Grid Operator
              </button>
              <button
                onClick={() => setPersona("carbon_buyer")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  persona === "carbon_buyer"
                    ? "bg-cyan-500 text-slate-950 shadow font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Carbon Buyer / Broker
              </button>
              <button
                onClick={() => setPersona("investor")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  persona === "investor"
                    ? "bg-indigo-500 text-slate-950 shadow font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Blended Finance / Fund
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* 1. Top Stat Cards (Persona-Tailored) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-800/80 bg-[#0c121e] relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Annual Clean Generation</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              {annualMWh.toFixed(1)} <span className="text-sm font-sans font-normal text-slate-400">MWh/yr</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <Activity className="w-3 h-3" />
              <span>{(dailyKWh / 24).toFixed(1)} kW average continuous</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-[#0c121e] relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Verified Avoided Carbon</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {annualAvoidedTonsCO2.toFixed(1)} <span className="text-sm font-sans font-normal text-slate-400">tCO₂e</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <span>Displacing {(annualAvoidedTonsCO2 * 380).toFixed(0)}L diesel fuel</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-[#0c121e] relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>dMRV Asset Value (@ $32/t)</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-cyan-400 font-mono">
              ${dmrvPremiumRevenueUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <span>+${unlockedUpsideUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })} premium over opaque spot</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-[#0c121e] relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Issuance & Audit Latency</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              &lt; 24 <span className="text-sm font-sans font-normal text-slate-400">Hours</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-purple-300 font-mono">
              <span>vs 240+ days manual MRV</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Inverter & Yield Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Inverter Selection */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-[#0c121e] space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">Site & Inverter Config</h2>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded">
                Pilot Test Profile
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Hardware / Inverter Device:
                </label>
                <select
                  value={selectedInverter}
                  onChange={(e) => setSelectedInverter(e.target.value)}
                  className="w-full bg-[#131b2c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Growatt MAX 100-125KTL3">Growatt MAX 100-125KTL3 (Direct Inverter API)</option>
                  <option value="SMA Sunny Tripower CORE2">SMA Sunny Tripower CORE2</option>
                  <option value="Victron Energy Color Control GX">Victron Energy Color Control GX / VRM</option>
                  <option value="Huawei SUN2000 Smart PV">Huawei SUN2000 Smart PV Controller</option>
                  <option value="Deye Hybrid 50kW">Deye Hybrid 50kW C&I</option>
                  <option value="Generic Modbus / RS485 Smart Meter">Generic Modbus / RS485 Smart Meter</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Installed Array Capacity:</span>
                  <span className="font-mono font-bold text-emerald-400">{capacityKW} kWp</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={capacityKW}
                  onChange={(e) => setCapacityKW(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>20 kW (Mini-grid)</span>
                  <span>500 kW</span>
                  <span>1 MW (C&I Solar)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Peak Sun Hours (Daily Average):</span>
                  <span className="font-mono font-bold text-amber-400">{sunHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="7.0"
                  step="0.1"
                  value={sunHours}
                  onChange={(e) => setSunHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>3.0h (Sub-optimal)</span>
                  <span>5.2h (East Africa avg)</span>
                  <span>7.0h (High Irradiance)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Baseline Grid/Diesel Factor:</span>
                  <span className="font-mono font-bold text-cyan-400">{gridFactor} kg CO₂/kWh</span>
                </div>
                <input
                  type="range"
                  min="0.35"
                  max="0.95"
                  step="0.01"
                  value={gridFactor}
                  onChange={(e) => setGridFactor(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>0.35 (Cleaner grid)</span>
                  <span>0.72 (Diesel genset mix)</span>
                  <span>0.95 (Pure diesel)</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090e18] border border-slate-800/80 space-y-2">
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                dMRV Verification Method
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Applying <strong>UNFCCC CDM AMS-I.F</strong> microscale methodology + ISO 14064-2 standard. Direct inverter pulses verified against local irradiance satellite feeds.
              </p>
            </div>
          </div>

          {/* Value Monetization & dMRV Spread */}
          <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-800 bg-[#0c121e] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">Carbon Asset Monetization Engine</h2>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded">
                  2x–4x Pricing Premium
                </span>
              </div>

              {/* Comparison Bars */}
              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Opaque / Legacy Carbon Credits ($8/ton spot)</span>
                    <span className="font-mono text-slate-300">${standardRevenueUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-500 h-full rounded-full transition-all duration-500"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Subject to 12-month audit latency, discounts for non-verifiable claims.</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      FrontForumFocus Verified dMRV Credits ($32/ton premium)
                    </span>
                    <span className="font-mono text-emerald-400 font-bold text-sm">
                      ${dmrvPremiumRevenueUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-emerald-500/40 p-0.5">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-emerald-400/90 mt-1 block font-mono">
                    Instant audit logs + registry pre-minting + zero intermediary dilution.
                  </span>
                </div>
              </div>

              {/* UN SDG Multi-benefit Badges (Greta Engine) */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono block mb-3">
                  Mapped UN SDG Co-Benefits (Auto-Evidenced)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-lg bg-[#111927] border border-amber-900/30 text-xs">
                    <div className="font-bold text-amber-400 font-mono">SDG 7.2</div>
                    <div className="text-slate-300 text-[11px] font-medium">Clean Energy Generation</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">{annualMWh.toFixed(0)} MWh produced</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#111927] border border-emerald-900/30 text-xs">
                    <div className="font-bold text-emerald-400 font-mono">SDG 13.1</div>
                    <div className="text-slate-300 text-[11px] font-medium">Climate Mitigation</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">{annualAvoidedTonsCO2.toFixed(1)} tCO₂e mitigated</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#111927] border border-cyan-900/30 text-xs">
                    <div className="font-bold text-cyan-400 font-mono">SDG 8.4</div>
                    <div className="text-slate-300 text-[11px] font-medium">Productive Use Energy</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">{(annualMWh * 0.65).toFixed(0)} MWh productive load</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">Want this dMRV layer on your 1–2 pilot sites?</span>
              <button
                onClick={() => setIsAuditorModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Inspect Raw Proof Dossier
              </button>
            </div>
          </div>
        </div>

        {/* 3. Live Cryptographic Telemetry Feed */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c121e] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                Live Inverter Telemetry Stream & Hash Proof
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Streaming 10-second pulse records from pilot solar inverters with SHA-256 signature hashes.</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full">
              <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
              Live Ingesting
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3">TIMESTAMP</th>
                  <th className="py-2.5 px-3">DEVICE ID / SOURCE</th>
                  <th className="py-2.5 px-3">ACTIVE POWER</th>
                  <th className="py-2.5 px-3">VOLTAGE</th>
                  <th className="py-2.5 px-3">CO₂ OFFSET RATE</th>
                  <th className="py-2.5 px-3">CRYPTOGRAPHIC HASH</th>
                  <th className="py-2.5 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300">
                {telemetryLogs.map((log, idx) => (
                  <tr key={idx} className={idx === 0 ? "bg-emerald-950/20 text-white font-medium" : "hover:bg-slate-800/30"}>
                    <td className="py-2.5 px-3 text-slate-400">{log.time}</td>
                    <td className="py-2.5 px-3 text-cyan-300">{log.deviceId}</td>
                    <td className="py-2.5 px-3 text-amber-300">{log.kw}</td>
                    <td className="py-2.5 px-3 text-slate-400">{log.v}</td>
                    <td className="py-2.5 px-3 text-emerald-400">{log.co2Offset}</td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono">{log.hash}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Persona Callout / Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-800/80 bg-[#0c121e]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">For Clean Energy Developers</h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Plug in inverters with zero hardware overhead. Eliminate manual spreadsheet MRV and claim carbon revenues automatically.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800/80 bg-[#0c121e]">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">For Carbon Buyers & Registries</h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Every credit backed by minute-by-minute generation data, GPS location, and tamper-resistant cryptographic hashes.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800/80 bg-[#0c121e]">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">For Blended Finance & ESG Funds</h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Automate sustainability-linked debt compliance and output continuous UN SDG impact covenants with zero audit delay.
            </p>
          </div>
        </div>

        {/* 5. Sticky Bottom Action Bar for Outreach Leads */}
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#0d1e1c] via-[#0c1626] to-[#0c121e] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">Ready to connect 1–2 test sites to FrontForumFocus?</h3>
            <p className="text-xs text-slate-300">
              We deploy the dMRV adapter in 48 hours with zero hardware replacement.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="mailto:george.karani@startupgrind.com?subject=FrontForumFocus%20dMRV%20Pilot%20Inquiry"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Request Pilot Deployment
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      {/* Auditor Dossier Sample Modal */}
      {isAuditorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                  Sample Digital MRV Audit Dossier
                </h3>
              </div>
              <button
                onClick={() => setIsAuditorModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-mono px-2 py-1 rounded hover:bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="text-slate-400">
                This cryptographic packet is compiled automatically by FrontForumFocus for every vintage batch and submitted directly to registries & verifiers.
              </p>

              <div className="bg-[#070b12] p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1 overflow-x-auto">
                <div>// FRONTFORUMFOCUS dMRV PROOF HEADER</div>
                <div>batch_id: &quot;FO3-2026-VINTAGE-SEP-01&quot;</div>
                <div>methodology: &quot;UNFCCC-CDM-AMS-IF-V12&quot;</div>
                <div>site_coordinates: &quot;-1.2921° N, 36.8219° E&quot;</div>
                <div>inverter_brand: &quot;Growatt MAX 125KTL3&quot;</div>
                <div>gross_energy_generated_kwh: 76500.00</div>
                <div>baseline_grid_emission_factor_kg_co2_kwh: 0.720</div>
                <div>net_avoided_co2e_metric_tons: 55.08</div>
                <div>telemetry_sha256_root: &quot;0x7f4e8b9a2c3d1e0f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e&quot;</div>
                <div>status: &quot;REGISTRY_AUDIT_READY&quot;</div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">Format: JSON-LD + Signed PDF Report</span>
                <button
                  onClick={() => alert("Sample audit PDF package downloaded.")}
                  className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sample Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
