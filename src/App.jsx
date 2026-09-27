import React from 'react';
import { useStore } from './store/useStore';
import {
  GraduationCap,
  Award,
  BookOpen,
  BarChart3,
  FileCheck,
  CheckCircle2,
  Calendar,
  User,
  Printer,
  Sparkles,
  TrendingUp,
  Percent,
  Sliders
} from 'lucide-react';

function calculateGPA(subjects) {
  if (!subjects.length) return 4.0;
  const avg = subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length;
  if (avg >= 93) return 4.0;
  if (avg >= 90) return 3.7;
  if (avg >= 87) return 3.3;
  if (avg >= 83) return 3.0;
  if (avg >= 80) return 2.7;
  return 2.0;
}

function getGradeLetter(score) {
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  return 'C';
}

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedStudentId,
    setSelectedStudent,
    selectedTerm,
    students,
    updateScore,
    updateRemarks
  } = useStore();

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const studentGPA = calculateGPA(selectedStudent.subjects);
  const avgScore = (selectedStudent.subjects.reduce((sum, s) => sum + s.score, 0) / selectedStudent.subjects.length).toFixed(1);

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-800 font-sans flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Academic Header */}
      <header className="bg-white border-b border-sky-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-600/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-slate-900 leading-tight block">AEGIS SCHOLAR</span>
              <span className="text-[10px] text-sky-700 font-mono font-semibold uppercase">ACADEMIC GRADEBOOK & PARENT PORTAL</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex items-center gap-1 bg-sky-50 border border-sky-200/60 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('gradebook')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'gradebook' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              Faculty Gradebook
            </button>
            <button
              onClick={() => setActiveTab('portal')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'portal' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              Student Analytics
            </button>
            <button
              onClick={() => setActiveTab('reportCard')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'reportCard' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              Official Report Card
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* FACULTY GRADEBOOK MATRIX */}
        {activeTab === 'gradebook' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-sky-200">
              <div>
                <h1 className="font-display font-bold text-2xl text-slate-900">Senior Honors Grade Matrix ({selectedTerm})</h1>
                <p className="text-xs text-slate-500 font-mono">Live assessment input with instantaneous weighted GPA synchronization</p>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-sky-50/80 border-b border-sky-200 text-slate-700 font-mono text-[11px] uppercase">
                    <th className="p-4 font-bold">Student Profile</th>
                    <th className="p-4 font-bold">AP Calc BC</th>
                    <th className="p-4 font-bold">Quantum Physics</th>
                    <th className="p-4 font-bold">Systems Prog</th>
                    <th className="p-4 font-bold">Literature</th>
                    <th className="p-4 font-bold">Diplomacy</th>
                    <th className="p-4 font-bold text-center">Avg %</th>
                    <th className="p-4 font-bold text-center">Weighted GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100">
                  {students.map(std => {
                    const avg = (std.subjects.reduce((sum, s) => sum + s.score, 0) / std.subjects.length).toFixed(1);
                    const gpa = calculateGPA(std.subjects).toFixed(2);

                    return (
                      <tr key={std.id} className="hover:bg-sky-50/40 transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={std.avatar} alt={std.name} className="w-9 h-9 rounded-full object-cover border border-sky-200" />
                            <div>
                              <span className="font-bold text-slate-900 block">{std.name}</span>
                              <span className="text-[10px] font-mono text-slate-400">{std.rollNumber}</span>
                            </div>
                          </div>
                        </td>

                        {std.subjects.map(sub => (
                          <td key={sub.code} className="p-4 font-mono">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={sub.score}
                              onChange={e => updateScore(std.id, sub.code, e.target.value)}
                              className="w-16 bg-sky-50 border border-sky-200 rounded-lg p-1.5 text-center font-bold text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white"
                            />
                          </td>
                        ))}

                        <td className="p-4 text-center font-mono font-bold text-slate-800">{avg}%</td>
                        <td className="p-4 text-center">
                          <span className="font-mono font-bold text-xs bg-sky-100 text-sky-800 px-2.5 py-1 rounded-full">
                            {gpa} / 4.0
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STUDENT / PARENT PERFORMANCE PORTAL */}
        {activeTab === 'portal' && (
          <div className="space-y-6">
            {/* Student Picker Banner */}
            <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-400 shadow-md" />
                <div>
                  <h2 className="font-display font-bold text-xl text-slate-900">{selectedStudent.name}</h2>
                  <div className="text-xs text-slate-500 font-mono">{selectedStudent.grade} • Roll: {selectedStudent.rollNumber}</div>
                  <div className="text-xs text-sky-700 font-semibold mt-0.5">Parent Dossier: {selectedStudent.parentEmail}</div>
                </div>
              </div>

              {/* Student selector dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">Select Student:</span>
                <select
                  value={selectedStudentId}
                  onChange={e => setSelectedStudent(e.target.value)}
                  className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick KPI stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Weighted Term GPA</span>
                <div className="font-display font-extrabold text-3xl text-sky-600">{studentGPA.toFixed(2)} / 4.00</div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Dean's High Honors List
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Academic Class Percentile</span>
                <div className="font-display font-extrabold text-3xl text-slate-900">Top 1.5%</div>
                <span className="text-[11px] text-slate-500 font-mono">Ranked #2 of 148 Seniors</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Verified Attendance</span>
                <div className="font-display font-extrabold text-3xl text-emerald-600">{selectedStudent.attendance}%</div>
                <span className="text-[11px] text-slate-500 font-mono">0 Unexcused Absences</span>
              </div>
            </div>

            {/* Subject Breakdown Bars */}
            <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-slate-900">Discipline Mastery & Performance Breakdown</h3>
              <div className="space-y-4">
                {selectedStudent.subjects.map(sub => (
                  <div key={sub.code} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{sub.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2">({sub.code} • {sub.teacher})</span>
                      </div>
                      <span className="font-mono font-bold text-sky-800">
                        {sub.score}% ({getGradeLetter(sub.score)})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-sky-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-600 rounded-full transition-all duration-500"
                        style={{ width: `${sub.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OFFICIAL ACADEMIC REPORT CARD */}
        {activeTab === 'reportCard' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print / Export Official PDF
              </button>
            </div>

            {/* Parchment-style Report Card */}
            <div className="bg-white border-2 border-sky-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-lg font-serif text-slate-800">
              {/* Institutional Header */}
              <div className="text-center space-y-1 border-b-2 border-sky-200 pb-6">
                <div className="w-12 h-12 rounded-full bg-sky-900 text-white flex items-center justify-center font-sans font-bold text-lg mx-auto mb-2">
                  Æ
                </div>
                <h2 className="font-sans font-extrabold text-2xl tracking-wide text-sky-950 uppercase">
                  Aegis Academy of Science & Letters
                </h2>
                <p className="text-xs font-sans text-slate-500 uppercase tracking-widest">
                  OFFICIAL ACADEMIC TRANSCRIPT & TERM REPORT • {selectedTerm}
                </p>
              </div>

              {/* Student Metadata */}
              <div className="grid grid-cols-2 gap-4 font-sans text-xs border-b border-sky-100 pb-6">
                <div>
                  <span className="text-slate-400 block font-mono">STUDENT NAME</span>
                  <span className="font-bold text-sm text-slate-900">{selectedStudent.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">STUDENT ROLL NUMBER</span>
                  <span className="font-mono text-sm text-slate-900">{selectedStudent.rollNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">ACADEMIC PROGRAM</span>
                  <span className="font-semibold text-slate-800">{selectedStudent.grade}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">CUMULATIVE TERM GPA</span>
                  <span className="font-bold text-sm text-sky-800 font-mono">{studentGPA.toFixed(2)} (Highest Distinction)</span>
                </div>
              </div>

              {/* Subject Table */}
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-500 font-mono uppercase text-[10px]">
                    <th className="py-2">Course Code</th>
                    <th className="py-2">Course Title</th>
                    <th className="py-2 text-center">Score %</th>
                    <th className="py-2 text-center">Letter Grade</th>
                    <th className="py-2 text-right">Faculty Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedStudent.subjects.map(s => (
                    <tr key={s.code}>
                      <td className="py-2.5 font-mono text-slate-500">{s.code}</td>
                      <td className="py-2.5 font-semibold text-slate-900">{s.name}</td>
                      <td className="py-2.5 text-center font-mono font-bold">{s.score}%</td>
                      <td className="py-2.5 text-center font-mono font-bold text-sky-800">{getGradeLetter(s.score)}</td>
                      <td className="py-2.5 text-right text-slate-500">{s.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Dean Remarks */}
              <div className="font-sans text-xs bg-sky-50/60 p-4 rounded-xl border border-sky-200 space-y-1">
                <span className="font-bold text-sky-950 uppercase font-mono text-[10px]">Faculty & Dean Remarks</span>
                <p className="text-slate-700 italic">"{selectedStudent.remarks}"</p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-8 font-sans text-xs text-center border-t border-slate-200">
                <div>
                  <div className="font-serif italic text-lg text-slate-700 mb-1">Dr. Alistair Ross</div>
                  <div className="border-t border-slate-400 pt-1 text-[10px] text-slate-500 uppercase font-mono">
                    Head of Academic Faculty
                  </div>
                </div>
                <div>
                  <div className="font-serif italic text-lg text-slate-700 mb-1">Helena Vance, Ed.D.</div>
                  <div className="border-t border-slate-400 pt-1 text-[10px] text-slate-500 uppercase font-mono">
                    Dean of Collegiate Affairs
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-200 bg-white py-6 px-4 text-center text-xs font-mono text-slate-500">
        AEGIS SCHOLAR • ACCREDITED TRANSCRIPT ENGINE • REAL-TIME GPA MATRIX
      </footer>
    </div>
  );
}
