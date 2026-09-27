import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'gradebook', // 'gradebook' | 'portal' | 'reportCard'
  selectedStudentId: 'std-01',
  selectedTerm: 'Fall 2026',

  gradingScale: [
    { min: 93, letter: 'A', gpa: 4.0 },
    { min: 90, letter: 'A-', gpa: 3.7 },
    { min: 87, letter: 'B+', gpa: 3.3 },
    { min: 83, letter: 'B', gpa: 3.0 },
    { min: 80, letter: 'B-', gpa: 2.7 },
    { min: 70, letter: 'C', gpa: 2.0 }
  ],

  students: [
    {
      id: 'std-01',
      name: 'Eleanor Vance',
      grade: 'Grade 12 (Senior Honors)',
      rollNumber: 'SCH-2026-088',
      attendance: 98.4,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      parentEmail: 'vance.family@starlight.edu',
      remarks: 'Demonstrates exceptional analytical rigor in mathematical modeling and systems logic.',
      subjects: [
        { code: 'MATH-401', name: 'AP Calculus BC', score: 96, teacher: 'Dr. Alistair Ross' },
        { code: 'PHYS-402', name: 'Quantum & Particle Physics', score: 94, teacher: 'Prof. Helena Rostova' },
        { code: 'CS-403', name: 'Advanced Systems Programming', score: 98, teacher: 'Eng. Marcus Thorne' },
        { code: 'LIT-404', name: 'World Literature & Rhetoric', score: 91, teacher: 'Sarah Jenkins' },
        { code: 'HIST-405', name: 'Modern Global Diplomacy', score: 93, teacher: 'Arthur Kensington' }
      ]
    },
    {
      id: 'std-02',
      name: 'Julian Montgomery',
      grade: 'Grade 12 (Senior Honors)',
      rollNumber: 'SCH-2026-092',
      attendance: 94.2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      parentEmail: 'montgomery.j@cloud.com',
      remarks: 'Strong mechanical aptitude; encouraged to dedicate additional review to rhetorical essays.',
      subjects: [
        { code: 'MATH-401', name: 'AP Calculus BC', score: 88, teacher: 'Dr. Alistair Ross' },
        { code: 'PHYS-402', name: 'Quantum & Particle Physics', score: 92, teacher: 'Prof. Helena Rostova' },
        { code: 'CS-403', name: 'Advanced Systems Programming', score: 95, teacher: 'Eng. Marcus Thorne' },
        { code: 'LIT-404', name: 'World Literature & Rhetoric', score: 84, teacher: 'Sarah Jenkins' },
        { code: 'HIST-405', name: 'Modern Global Diplomacy', score: 89, teacher: 'Arthur Kensington' }
      ]
    },
    {
      id: 'std-03',
      name: 'Aria Sterling',
      grade: 'Grade 12 (Senior Honors)',
      rollNumber: 'SCH-2026-104',
      attendance: 99.1,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      parentEmail: 'sterling.aria@firm.com',
      remarks: 'Exemplary leadership in academic robotics decathlon and global mock parliament.',
      subjects: [
        { code: 'MATH-401', name: 'AP Calculus BC', score: 97, teacher: 'Dr. Alistair Ross' },
        { code: 'PHYS-402', name: 'Quantum & Particle Physics', score: 98, teacher: 'Prof. Helena Rostova' },
        { code: 'CS-403', name: 'Advanced Systems Programming', score: 99, teacher: 'Eng. Marcus Thorne' },
        { code: 'LIT-404', name: 'World Literature & Rhetoric', score: 95, teacher: 'Sarah Jenkins' },
        { code: 'HIST-405', name: 'Modern Global Diplomacy', score: 96, teacher: 'Arthur Kensington' }
      ]
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedStudent: (id) => set({ selectedStudentId: id }),

  // Update subject score in teacher gradebook
  updateScore: (studentId, subjectCode, newScore) => set((state) => ({
    students: state.students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          subjects: s.subjects.map(sub =>
            sub.code === subjectCode ? { ...sub, score: Number(newScore) } : sub
          )
        };
      }
      return s;
    })
  })),

  // Update remarks
  updateRemarks: (studentId, remarks) => set((state) => ({
    students: state.students.map(s => s.id === studentId ? { ...s, remarks } : s)
  }))
}));
