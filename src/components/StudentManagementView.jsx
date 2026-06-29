// // src/components/StudentManagementView.jsx
// import React, { useState } from 'react';

// const initialStudents = [
//   { id: 'STU-9921', name: 'Ahmad Al-Saeed', email: 'ahmad@example.com', level: 'English B1', batch: 'Morning Shift', status: 'Active' },
//   { id: 'STU-9922', name: 'Sarah Mansour', email: 'sarah.m@example.com', level: 'French A2', batch: 'Evening Shift', status: 'Active' },
//   { id: 'STU-9923', name: 'Omar Farooq', email: 'omar.f@example.com', level: 'German Intensive A1', batch: 'Morning Shift', status: 'Suspended' },
//   { id: 'STU-9924', name: 'Lina Kabbani', email: 'lina@example.com', level: 'English C1', batch: 'Evening Shift', status: 'Active' },
//   { id: 'STU-9925', name: 'Youssef Hussein', email: 'youssef@example.com', level: 'Spanish Basic', batch: 'Morning Shift', status: 'Active' },
// ];

// export default function StudentManagementView() {
//   const [students, setStudents] = useState(initialStudents);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [batchFilter, setBatchFilter] = useState('All Batches');

//   const filteredStudents = students.filter(student => {
//     const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.id.includes(searchQuery);
//     const matchesBatch = batchFilter === 'All Batches' || student.batch === batchFilter;
//     return matchesSearch && matchesBatch;
//   });

//   return (
//     <div className="space-y-6 text-left font-['Inter']">
//       {/* أدوات البحث والفلترة العلوية */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-[14px] border border-slate-200/60 shadow-sm">
//         <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
//           <input 
//             type="text" 
//             placeholder="Search student by name or ID..." 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-[38px] px-3 w-[24px] min-w-[240px] bg-white border border-slate-200 rounded-lg text-[13px] outline-none focus:border-[#8B0000] transition-colors" 
//           />
//           <select 
//             value={batchFilter}
//             onChange={(e) => setBatchFilter(e.target.value)}
//             className="h-[38px] px-3 bg-white border border-slate-200 rounded-lg text-[13px] outline-none text-slate-600 focus:border-[#8B0000] cursor-pointer"
//           >
//             <option>All Batches</option>
//             <option>Morning Shift</option>
//             <option>Evening Shift</option>
//           </select>
//         </div>
//         <button 
//           onClick={() => alert('Add student form workflow coming next!')}
//           className="h-[38px] px-4 bg-[#8B0000] text-white rounded-[8px] text-[13px] font-semibold hover:bg-[#660000] transition-colors w-full sm:w-auto text-center shadow-xs"
//         >
//           + Add New Student
//         </button>
//       </div>

//       {/* جدول الطلاب الشامل والكامل */}
//       <div className="bg-white rounded-[14px] border border-slate-200/60 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-100 text-slate-400 text-[12px] uppercase tracking-wider font-semibold bg-slate-50/30">
//                 <th className="py-4 px-6">Student ID</th>
//                 <th className="py-4 px-6">Full Name</th>
//                 <th className="py-4 px-6">Email Address</th>
//                 <th className="py-4 px-6">Registered Level</th>
//                 <th className="py-4 px-6">Batch Time</th>
//                 <th className="py-4 px-6">Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-[14px] text-slate-700 divide-y divide-slate-100">
//               {filteredStudents.length > 0 ? (
//                 filteredStudents.map((student) => (
//                   <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
//                     <td className="py-4 px-6 font-mono font-medium text-slate-500">{student.id}</td>
//                     <td className="py-4 px-6 font-semibold text-slate-900">{student.name}</td>
//                     <td className="py-4 px-6 text-slate-500 text-sm">{student.email}</td>
//                     <td className="py-4 px-6 font-medium text-slate-700">{student.level}</td>
//                     <td className="py-4 px-6 text-slate-600">{student.batch}</td>
//                     <td className="py-4 px-6">
//                       <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
//                         student.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
//                       }`}>
//                         {student.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="py-12 text-center text-slate-400 italic">
//                     ❌ No students matching your search filters found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }