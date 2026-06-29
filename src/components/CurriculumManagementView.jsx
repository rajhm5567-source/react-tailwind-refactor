// // src/components/CurriculumManagementView.jsx
// import React, { useState } from 'react';

// const initialMaterials = {
//   English: [
//     { id: 'M-ENG-01', title: 'Interchange Level 1 Textbook', format: 'PDF', size: '14.2 MB', category: 'Textbook' },
//     { id: 'M-ENG-02', title: 'Cambridge Listening Tracks Pack 1', format: 'MP3', size: '45.8 MB', category: 'Audio' },
//     { id: 'M-ENG-03', title: 'Business English Vocabulary Workbook', format: 'PDF', size: '8.1 MB', category: 'Workbook' }
//   ],
//   French: [
//     { id: 'M-FRE-01', title: 'Le Nouveau Taxi A1', format: 'PDF', size: '18.4 MB', category: 'Textbook' },
//     { id: 'M-FRE-02', title: 'French Pronunciation Guide tracks', format: 'MP3', size: '32.1 MB', category: 'Audio' }
//   ],
//   German: [
//     { id: 'M-GER-01', title: 'Menschen A1.1 Kursbuch', format: 'PDF', size: '22.0 MB', category: 'Textbook' },
//     { id: 'M-GER-02', title: 'Studio D B1 Audio Elements', format: 'WAV', size: '112.5 MB', category: 'Audio' }
//   ],
//   Spanish: [
//     { id: 'M-SPA-01', title: 'Aula Internacional 1 Nueva Edición', format: 'PDF', size: '25.6 MB', category: 'Textbook' }
//   ]
// };

// export default function CurriculumManagementView() {
//   const [activeTab, setActiveTab] = useState('English'); // فلاتر اللغات كما هي في الـ Figma التابع لك

//   return (
//     <div className="space-y-6 text-left font-['Inter']">
      
//       {/* شريط اختيار اللغة المعتمد والمصمم بدقة حسب مواصفات Figma */}
//       <div className="bg-white rounded-[14px] border border-slate-200/60 shadow-sm px-2 flex border-b border-slate-200">
//         {['English', 'French', 'German', 'Spanish'].map((lang) => (
//           <button
//             key={lang}
//             onClick={() => setActiveTab(lang)}
//             className={`relative py-4 px-6 text-[14.6px] font-semibold transition-all duration-150 ${
//               activeTab === lang 
//                 ? 'text-[#0F172A]' 
//                 : 'text-[#62748E] hover:text-slate-800'
//             }`}
//           >
//             {lang}
//             {activeTab === lang && (
//               <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#8B0000] rounded-t-full" />
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
//         {/* صندوق الرفع الذكي للملفات */}
//         <div className="bg-white p-6 rounded-[14px] border border-slate-200/60 shadow-sm lg:col-span-1">
//           <h3 className="text-[16px] font-bold text-slate-800 mb-4">Upload Educational Materials</h3>
          
//           <div 
//             onClick={() => alert('File explorer opening...')}
//             className="border-2 border-dashed border-slate-200 rounded-[10px] p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group"
//           >
//             <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">📁</span>
//             <p className="text-[13.3px] text-[#45556C] font-normal">
//               Drag & Drop file here, or <span className="text-[#8B0000] font-semibold underline">Browse</span>
//             </p>
//             <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
//               Supports secure PDF textbooks or high-quality MP3 audio tracks for curriculum.
//             </p>
//           </div>

//           <button className="w-full mt-4 h-[40px] bg-[#8B0000] text-white rounded-[8px] text-[13px] font-semibold hover:bg-[#660000] transition-colors shadow-sm">
//             Process & Register Document
//           </button>
//         </div>

//         {/* جدول استعراض الملفات حسب اللغة النشطة */}
//         <div className="bg-white rounded-[14px] border border-slate-200/60 shadow-sm overflow-hidden lg:col-span-2">
//           <div className="p-5 border-b border-slate-100 bg-slate-50/50">
//             <h4 className="font-bold text-slate-800 text-[15px]">Active Materials under ({activeTab})</h4>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/20">
//                   <th className="py-3.5 px-6">Code</th>
//                   <th className="py-3.5 px-6">Material Title</th>
//                   <th className="py-3.5 px-6">Category</th>
//                   <th className="py-3.5 px-6">Format</th>
//                   <th className="py-3.5 px-6">Size</th>
//                 </tr>
//               </thead>
//               <tbody className="text-[13.5px] text-slate-700 divide-y divide-slate-100">
//                 {initialMaterials[activeTab].map((mat) => (
//                   <tr key={mat.id} className="hover:bg-slate-50/30 transition-colors">
//                     <td className="py-3.5 px-6 font-mono text-xs text-slate-500">{mat.id}</td>
//                     <td className="py-3.5 px-6 font-medium text-slate-900">{mat.title}</td>
//                     <td className="py-3.5 px-6 text-slate-500">{mat.category}</td>
//                     <td className="py-3.5 px-6">
//                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${mat.format === 'PDF' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
//                         {mat.format}
//                       </span>
//                     </td>
//                     <td className="py-3.5 px-6 font-mono text-slate-500 text-xs">{mat.size}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }