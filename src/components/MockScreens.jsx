// // src/components/MockScreens.jsx
// import React from 'react';
// import SystemShell from './SystemShell';

// export default function MockScreens({ currentView, onLogOut, onViewChange }) {
//   const getMockContent = () => {
//     switch (currentView) {
//       case 'Dashboard':
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left font-['Inter']">
//             <div className="bg-white p-6 rounded-[14px] border border-slate-200/60 shadow-sm">
//               <span className="text-3xl bg-red-50 p-3 rounded-xl inline-block">📊</span>
//               <h3 className="text-slate-500 text-[14px] mt-4 font-medium uppercase tracking-wider">Total Institute Revenue</h3>
//               <p className="text-slate-800 text-[32px] font-bold mt-1 font-mono">$14,250.00</p>
//               <span className="text-xs text-green-600 font-semibold mt-2 block">↑ 12% vs last month</span>
//             </div>
//             <div className="bg-white p-6 rounded-[14px] border border-slate-200/60 shadow-sm">
//               <span className="text-3xl bg-blue-50 p-3 rounded-xl inline-block">👥</span>
//               <h3 className="text-slate-500 text-[14px] mt-4 font-medium uppercase tracking-wider">Active Instructors</h3>
//               <p className="text-slate-800 text-[32px] font-bold mt-1 font-mono">18 Teachers</p>
//               <span className="text-xs text-slate-400 mt-2 block">Across 4 languages</span>
//             </div>
//             <div className="bg-white p-6 rounded-[14px] border border-slate-200/60 shadow-sm">
//               <span className="text-3xl bg-indigo-50 p-3 rounded-xl inline-block">📝</span>
//               <h3 className="text-slate-500 text-[14px] mt-4 font-medium uppercase tracking-wider">Ongoing Batches</h3>
//               <p className="text-slate-800 text-[32px] font-bold mt-1 font-mono">24 Active</p>
//               <span className="text-xs text-amber-600 font-semibold mt-2 block">8 Exams scheduled today</span>
//             </div>
//           </div>
//         );
//       case 'Teacher Affairs':
//         return (
//           <div className="bg-white rounded-[14px] border border-slate-200/60 p-12 text-center text-slate-400 italic font-['Inter']">
//             <span className="text-4xl block mb-2">👔</span>
//             <p className="font-semibold text-slate-700 not-italic text-[16px] mb-1">Teacher Affairs Dashboard</p>
//             This sub-module interface is currently undergoing structural database mappings.
//           </div>
//         );
//       case 'Send Notifications':
//         return (
//           <div className="bg-white rounded-[14px] border border-slate-200/60 p-12 text-center text-slate-400 italic font-['Inter']">
//             <span className="text-4xl block mb-2">🔔</span>
//             <p className="font-semibold text-slate-700 not-italic text-[16px] mb-1">Broadcast Notification Center</p>
//             SMTP & WhatsApp API relay parameters are being optimized for bulk notifications.
//           </div>
//         );
//       default:
//         return (
//           <div className="bg-white rounded-[14px] border border-slate-200/60 p-12 text-center text-slate-400 italic font-['Inter']">
//             <span className="text-4xl block mb-2">🚧</span>
//             <p className="font-semibold text-slate-700 not-italic text-[16px] mb-1">{currentView} Interface</p>
//             Component view will link dynamically upon UI state approval.
//           </div>
//         );
//     }
//   };

//   return (
//     <SystemShell 
//       viewTitle={currentView} 
//       currentView={currentView} 
//       onViewChange={onViewChange} 
//       onLogOut={onLogOut}
//     >
//       {getMockContent()}
//     </SystemShell>
//   );
// }