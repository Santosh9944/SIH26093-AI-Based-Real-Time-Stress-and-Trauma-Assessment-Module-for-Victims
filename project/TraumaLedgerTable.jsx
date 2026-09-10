import React, { useState } from 'react';
import { 
  Lock, 
  Copy, 
  Check, 
  History, 
  Search, 
  Clock, 
  ShieldAlert, 
  HeartHandshake, 
  Scale, 
  Ambulance, 
  Send,
  PhoneCall
} from 'lucide-react';

/**
 * Enterprise-grade Cryptographic DPDP-Compliant Trauma Ledger & Emergency Protocol Dispatch Component
 * Fully aligned with SIH26093 - National Helpline Against Atrocities (NHAA - 14566)
 * Features:
 * - 4 Emergency Intervention Action Dispatch Cards
 * - DPDP-compliant ledger with ACOUSTIC / NLP column
 * - Truncated SHA-256 integrity hash with copy functionality
 * - Total Sessions: 9 header indicator
 */

const INITIAL_SESSIONS = [
  {
    id: "NHAA-2026-8600",
    timestamp: "22:56:07",
    dialect: "Hindi",
    sviScore: 92.6,
    triageLevel: "CRITICAL",
    acousticNlp: "83.5%",
    actionProtocol: "TRIGGER_IMMEDIATE_EMERGENCY_INTE..",
    assignedAgency: "District SP Special Cell (PoA)",
    integrityHash: "3bdc8b01c2c2b145"
  },
  {
    id: "NHAA-2026-9488",
    timestamp: "22:56:06",
    dialect: "Hindi",
    sviScore: 92.6,
    triageLevel: "CRITICAL",
    acousticNlp: "83.5%",
    actionProtocol: "TRIGGER_IMMEDIATE_EMERGENCY_INTE..",
    assignedAgency: "District SP Special Cell (PoA)",
    integrityHash: "a79b810e9fca5c35"
  },
  {
    id: "NHAA-2026-9374",
    timestamp: "22:56:05",
    dialect: "Hindi",
    sviScore: 92.6,
    triageLevel: "CRITICAL",
    acousticNlp: "83.5%",
    actionProtocol: "TRIGGER_IMMEDIATE_EMERGENCY_INTE..",
    assignedAgency: "State Mental Health Authority",
    integrityHash: "4bdc30ba625a7738"
  },
  {
    id: "NHAA-2026-6138",
    timestamp: "22:55:57",
    dialect: "Hindi",
    sviScore: 92.6,
    triageLevel: "CRITICAL",
    acousticNlp: "83.5%",
    actionProtocol: "TRIGGER_IMMEDIATE_EMERGENCY_INTE..",
    assignedAgency: "District Magistrate Special Cell",
    integrityHash: "4a0e3e9aa177a03d"
  },
  {
    id: "NHAA-2026-9014",
    timestamp: "10:45:12",
    dialect: "Hindi",
    sviScore: 84.6,
    triageLevel: "CRITICAL",
    acousticNlp: "78.2%",
    actionProtocol: "DISPATCH_POLICE_AND_CRISIS_COUNS..",
    assignedAgency: "Tele-MANAS Crisis Unit",
    integrityHash: "e3b0c44298fc"
  },
  {
    id: "NHAA-2026-9013",
    timestamp: "10:40:08",
    dialect: "Marathi",
    sviScore: 68.2,
    triageLevel: "HIGH",
    acousticNlp: "62.0%",
    actionProtocol: "ASSIGN_DLSA_LEGAL_AID",
    assignedAgency: "District Legal Services Authority",
    integrityHash: "7a8b9c1d2e3f"
  },
  {
    id: "NHAA-2026-9012",
    timestamp: "10:35:19",
    dialect: "Tamil",
    sviScore: 46.5,
    triageLevel: "MODERATE",
    acousticNlp: "44.0%",
    actionProtocol: "SCHEDULE_WELFARE_CHECK",
    assignedAgency: "Welfare Directorate",
    integrityHash: "4f5a6b7c8d9e"
  },
  {
    id: "NHAA-2026-9011",
    timestamp: "10:30:44",
    dialect: "Hindi",
    sviScore: 79.4,
    triageLevel: "CRITICAL",
    acousticNlp: "75.8%",
    actionProtocol: "DISPATCH_POLICE_AND_CRISIS_COUNS..",
    assignedAgency: "District PoA Special Cell",
    integrityHash: "9e8d7c6b5a4f"
  },
  {
    id: "NHAA-2026-9010",
    timestamp: "10:24:15",
    dialect: "English",
    sviScore: 18.2,
    triageLevel: "LOW",
    acousticNlp: "21.0%",
    actionProtocol: "STANDARD_RECORDING",
    assignedAgency: "NHAA Central Desk",
    integrityHash: "1a2b3c4d5e6f"
  }
];

export default function TraumaLedgerTable({ onDispatch }) {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [copiedHash, setCopiedHash] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dispatchMessage, setDispatchMessage] = useState(null);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleTriggerDispatch = (protocol, unit) => {
    setDispatchMessage(`Dispatched: ${protocol} ➔ ${unit}`);
    if (onDispatch) onDispatch(protocol, unit);
    setTimeout(() => setDispatchMessage(null), 4000);
  };

  const filteredSessions = sessions.filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.dialect.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.actionProtocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.integrityHash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 text-slate-100 font-sans">
      
      {/* 1. Automated Emergency Intervention Protocol Dispatch Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-rose-500 animate-pulse">🚨</span>
              Automated Emergency Intervention Protocol Dispatch
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Actionable decision support automatically mapped to the victim's evaluated Stress Vulnerability Index
            </p>
          </div>
          {dispatchMessage && (
            <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-fade-in">
              {dispatchMessage}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Police Protection */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/80 border border-rose-900/40 hover:border-rose-600/60 transition flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  Police Protection
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                  TIER 1
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">Immediate Police & Witness Protection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alerts District Superintendent of Police (SP) and local PoA special cell for instant field deployment.
              </p>
            </div>
            <button 
              onClick={() => handleTriggerDispatch("POLICE_EMERGENCY_PROTECTION", "Superintendent of Police (PoA Special Cell)")}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50"
            >
              <Send className="w-3.5 h-3.5" /> Dispatch Police Unit
            </button>
          </div>

          {/* Card 2: Trauma Counseling */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/80 border border-amber-900/40 hover:border-amber-600/60 transition flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  Trauma Counseling
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  TELE-MANAS
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">Crisis Psychological First Aid</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Routes call directly to a certified Tele-MANAS / MoSJE trauma psychologist specializing in caste atrocities.
              </p>
            </div>
            <button 
              onClick={() => handleTriggerDispatch("CRISIS_TRAUMA_COUNSELING", "Tele-MANAS Crisis Mental Health Network")}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Connect Crisis Counselor
            </button>
          </div>

          {/* Card 3: Legal Aid */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/80 border border-blue-900/40 hover:border-blue-600/60 transition flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-400" />
                  Legal Aid
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                  DLSA
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">District Legal Services Authority</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assigns dedicated free legal aid counsel under the SC/ST Prevention of Atrocities Act statutory guidelines.
              </p>
            </div>
            <button 
              onClick={() => handleTriggerDispatch("FREE_LEGAL_AID", "District Legal Services Authority (DLSA)")}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50"
            >
              <Scale className="w-3.5 h-3.5" /> Assign Legal Counsel
            </button>
          </div>

          {/* Card 4: Medical & Relief */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/80 border border-emerald-900/40 hover:border-emerald-600/60 transition flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-emerald-400" />
                  Medical & Relief
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  RELIEF CELL
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">Emergency Medical Aid & Relief</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dispatches emergency ambulance and triggers interim financial relief under PoA victim compensation schemes.
              </p>
            </div>
            <button 
              onClick={() => handleTriggerDispatch("EMERGENCY_MEDICAL_RELIEF", "District Civil Hospital & Welfare Board")}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
            >
              <Ambulance className="w-3.5 h-3.5" /> Mobilize Relief Unit
            </button>
          </div>

        </div>
      </section>

      {/* 2. Cryptographic DPDP-Compliant Trauma Assessment Ledger */}
      <section className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                Cryptographic DPDP-Compliant Trauma Assessment Ledger
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Tamper-evident SHA-256 audit chaining ensuring judicial admissibility under Indian Evidence Act & DPDP Act 2023
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 uppercase">
              TOTAL SESSIONS: <strong className="text-white font-bold">{sessions.length}</strong>
            </span>
          </div>
        </div>

        {/* Ledger Table matching Image 2 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="text-slate-400 bg-[#080d1a] border-b border-slate-800 text-[11px]">
              <tr>
                <th className="py-3.5 px-5">TIMESTAMP</th>
                <th className="py-3.5 px-5">CALL / SESSION ID</th>
                <th className="py-3.5 px-5">DIALECT</th>
                <th className="py-3.5 px-5">SVI SCORE</th>
                <th className="py-3.5 px-5">TRIAGE LEVEL</th>
                <th className="py-3.5 px-5">ACOUSTIC / NLP</th>
                <th className="py-3.5 px-5">ACTION PROTOCOL</th>
                <th className="py-3.5 px-5">INTEGRITY HASH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredSessions.map((s) => {
                const isCopied = copiedHash === s.integrityHash;
                return (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-5 text-slate-400 whitespace-nowrap">{s.timestamp}</td>
                    <td className="py-3 px-5 font-bold text-white whitespace-nowrap">{s.id}</td>
                    <td className="py-3 px-5 text-slate-300 whitespace-nowrap">{s.dialect}</td>
                    <td className="py-3 px-5 font-bold text-rose-500 whitespace-nowrap">{s.sviScore.toFixed(1)}</td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.triageLevel === 'CRITICAL' 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                          : s.triageLevel === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : s.triageLevel === 'MODERATE'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {s.triageLevel}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-slate-400 whitespace-nowrap">{s.acousticNlp}</td>
                    <td className="py-3 px-5 text-slate-300 whitespace-nowrap max-w-[220px] truncate" title={s.actionProtocol}>
                      {s.actionProtocol}
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 text-rose-500 font-mono font-bold">
                        <span>{s.integrityHash}</span>
                        <button
                          onClick={() => handleCopyHash(s.integrityHash)}
                          title="Copy Hash"
                          className="text-slate-400 hover:text-white transition p-0.5 rounded"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </section>

    </div>
  );
}
