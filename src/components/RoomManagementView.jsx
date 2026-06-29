// // src/components/RoomManagementView.jsx
// import React, { useState } from 'react';

// const initialRooms = [
//   { id: '101', name: 'Lecture Hall 101', type: 'Standard Classroom', capacity: 30, status: 'Available', currentClass: 'None' },
//   { id: '102', name: 'Lecture Hall 102', type: 'Standard Classroom', capacity: 25, status: 'Occupied', currentClass: 'English Conversation B2' },
//   { id: '103', name: 'Multimedia Lab A', type: 'Computer Lab', capacity: 20, status: 'Occupied', currentClass: 'German Intensive A1' },
//   { id: '104', name: 'VIP Seminar Room', type: 'Conference Room', capacity: 12, status: 'Available', currentClass: 'None' },
//   { id: '201', name: 'Lecture Hall 201', type: 'Standard Classroom', capacity: 35, status: 'Maintenance', currentClass: 'None' },
// ];

// export default function RoomManagementView() {
//   const [rooms, setRooms] = useState(initialRooms);
//   const [filterStatus, setFilterStatus] = useState('All');

//   const filteredRooms = filterStatus === 'All' 
//     ? rooms 
//     : rooms.filter(r => r.status === filterStatus);

//   return (
//     <div className="space-y-6 text-left font-['Inter']">
//       {/* بطاقات الإحصائيات السريعة */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-[14px] border border-slate-200/60 shadow-sm flex items-center justify-between">
//           <div>
//             <h3 className="text-slate-400 text-[13px] font-medium uppercase tracking-wider">Total Lecture Halls</h3>
//             <p className="text-slate-800 text-[28px] font-bold mt-1 font-mono">{rooms.length} Rooms</p>
//           </div>
//           <span className="text-3xl bg-slate-100 p-3 rounded-xl">🏫</span>
//         </div>
//         <div className="bg-white p-6 rounded-[14px] border border-slate-200/60 shadow-sm flex items-center justify-between">
//           <div>
//             <h3 className="text-slate-400 text-[13px] font-medium uppercase tracking-wider">Available Now</h3>
//             <p className="text-green-600 text-[28px] font-bold mt-1 font-mono">{rooms.filter(r => r.status === 'Available').length} Rooms</p>
//           </div>
//           <span className="text-3xl bg-green-50 p-3 rounded-xl">🟢</span>
//         </div>
//         <div className="bg-white p-6 rounded-[14px] border border-slate-200/60 shadow-sm flex items-center justify-between">
//           <div>
//             <h3 className="text-slate-400 text-[13px] font-medium uppercase tracking-wider">Under Maintenance</h3>
//             <p className="text-amber-600 text-[28px] font-bold mt-1 font-mono">{rooms.filter(r => r.status === 'Maintenance').length}</p>
//           </div>
//           <span className="text-3xl bg-amber-50 p-3 rounded-xl">🛠️</span>
//         </div>
//       </div>

//       {/* شريط الفلاتر والإجراءات */}
//       <div className="bg-white rounded-[14px] border border-slate-200/60 shadow-sm overflow-hidden">
//         <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
//           <div className="flex items-center gap-4">
//             <h3 className="font-bold text-slate-800 text-[16px]">Halls & Reservation Matrix</h3>
//             <div className="flex bg-slate-200/60 p-1 rounded-lg text-xs font-medium">
//               {['All', 'Available', 'Occupied', 'Maintenance'].map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setFilterStatus(status)}
//                   className={`px-3 py-1.5 rounded-md transition-colors ${filterStatus === status ? 'bg-white text-[#8B0000] shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
//                 >
//                   {status}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <button 
//             onClick={() => alert('Feature to create booking coming soon!')}
//             className="h-[38px] px-4 bg-[#8B0000] text-white rounded-[8px] text-[13px] font-semibold hover:bg-[#660000] transition-all shadow-xs"
//           >
//             + Create New Booking
//           </button>
//         </div>

//         {/* جدول البيانات الكامل المنسق */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-100 text-slate-400 text-[12px] uppercase tracking-wider font-semibold bg-slate-50/30">
//                 <th className="py-4 px-6">Room ID</th>
//                 <th className="py-4 px-6">Room Name</th>
//                 <th className="py-4 px-6">Type</th>
//                 <th className="py-4 px-6">Max Capacity</th>
//                 <th className="py-4 px-6">Current Activity</th>
//                 <th className="py-4 px-6">Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-[14px] text-slate-700 divide-y divide-slate-100">
//               {filteredRooms.map((room) => (
//                 <tr key={room.id} className="hover:bg-slate-50/50 transition-colors">
//                   <td className="py-4 px-6 font-mono font-medium text-slate-500">{room.id}</td>
//                   <td className="py-4 px-6 font-semibold text-slate-900">{room.name}</td>
//                   <td className="py-4 px-6 text-slate-500">{room.type}</td>
//                   <td className="py-4 px-6 font-mono">{room.capacity} Students</td>
//                   <td className="py-4 px-6 text-sm text-slate-600 italic">{room.currentClass}</td>
//                   <td className="py-4 px-6">
//                     <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
//                       room.status === 'Available' ? 'bg-green-50 text-green-700 border border-green-200' :
//                       room.status === 'Occupied' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
//                       'bg-amber-50 text-amber-700 border border-amber-200'
//                     }`}>
//                       {room.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }