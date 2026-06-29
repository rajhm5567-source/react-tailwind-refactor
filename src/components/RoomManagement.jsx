import { useState } from 'react';
import Sidebar from './layout/Sidebar';
import PageHeader from './layout/PageHeader';

const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export default function RoomManagement({ onLogOut, onViewChange }) {
  const [timeSlots] = useState([
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ]);
  
  const [teachers] = useState(["Samer", "Amer", "Mohammed", "Omar", "komay", "majed", "maya"]);

  const tomorrowStr = getTomorrowDateString();
  const [selectedDate, setSelectedDate] = useState(tomorrowStr);

  const [dailyAssignments, setDailyAssignments] = useState({
    [tomorrowStr]: [
      { time: "10:00 AM", teacher: "Samer", id: "1001", level: "A1", isFixed: false },
      { time: "11:00 AM", teacher: "Samer", id: "1001", level: "A1", isFixed: false },
      { time: "12:00 PM", teacher: "Samer", id: "1001", level: "A2", isFixed: true },
      { time: "01:00 PM", teacher: "Samer", id: "1001", level: "B1", isFixed: false },
      { time: "02:00 PM", teacher: "Mohammed", id: "1023", level: "B2", isFixed: true },
      { time: "03:00 PM", teacher: "komay", id: "1045", level: "C1", isFixed: false },
      { time: "04:00 PM", teacher: "Amer", id: "1067", level: "A1", isFixed: true },
    ]
  });

  const studentAssignments = dailyAssignments[selectedDate] || [];

  // States للتحكم بالمودالات
  const [selectedCell, setSelectedCell] = useState(null); 
  const [activeLesson, setActiveLesson] = useState(null); 
  const [notificationCell, setNotificationCell] = useState(null); // مودال الإشعارات الجديد

  // مصفوفة تجريبية للطلاب المتاحين لإرسال الإشعارات لهم
  const [mockAvailableStudents] = useState([
    { id: "ST-201", name: "Ahmad Al-Saeed", level: "A1" },
    { id: "ST-202", name: "Ali Mahmoud", level: "A2" },
    { id: "ST-203", name: "Youssef Ibrahim", level: "B1" },
    { id: "ST-204", name: "Karem Mansour", level: "B2" },
    { id: "ST-205", name: "Rania Haddad", level: "C1" },
  ]);

  // تخزين الطلاب المحددين للإشعارات
  const [selectedStudentsForNotify, setSelectedStudentsForNotify] = useState([]);

  // فورم الحجز اليدوي الجديد
  const [studentIdInput, setStudentIdInput] = useState('');
  const [levelInput, setLevelInput] = useState('A1');
  const [isFixedDuration, setIsFixedDuration] = useState(false);
  const [currentCourse] = useState('ENG');

  const handleEmptyCellClick = (time, teacher) => {
    setStudentIdInput('');
    setIsFixedDuration(false);
    setSelectedCell({ time, teacher });
  };

  // فتح نافذة الإشعارات للحصة الفاضية
  const handleOpenNotificationModal = (time, teacher) => {
    setSelectedStudentsForNotify([]); // تصفير التحديد القديم
    setNotificationCell({ time, teacher });
  };

  // تبديل اختيار الطالب في قائمة الإشعارات
  const handleToggleStudentSelection = (studentId) => {
    if (selectedStudentsForNotify.includes(studentId)) {
      setSelectedStudentsForNotify(selectedStudentsForNotify.filter(id => id !== studentId));
    } else {
      setSelectedStudentsForNotify([...selectedStudentsForNotify, studentId]);
    }
  };

  // إرسال الإشعارات بنجاح
  const handleSendNotifications = () => {
    alert(`Done! Notifications sent to ${selectedStudentsForNotify.length} students for ${notificationCell.teacher}'s class at ${notificationCell.time}.`);
    setNotificationCell(null);
  };

  const handleConfirmBooking = () => {
    if (!studentIdInput.trim()) return;

    const newBooking = {
      time: selectedCell.time,
      teacher: selectedCell.teacher,
      id: studentIdInput,
      level: levelInput,
      isFixed: isFixedDuration
    };

    setDailyAssignments({
      ...dailyAssignments,
      [selectedDate]: [...studentAssignments, newBooking]
    });
    setSelectedCell(null);
  };

  const handleDeleteBooking = (time, teacher) => {
    setDailyAssignments({
      ...dailyAssignments,
      [selectedDate]: studentAssignments.filter(a => !(a.time === time && a.teacher === teacher))
    });
    setActiveLesson(null);
  };

  return (
    <div className="flex min-h-screen bg-[#444444] p-6 font-sans justify-center items-center relative">
      <div className="flex w-full max-w-[1841px] h-[851px] bg-[#F8FAFC] rounded-[2px] overflow-hidden border border-white/10 shadow-2xl">
        
        <Sidebar currentView="Room Management" onViewChange={onViewChange} onLogOut={onLogOut} />

        {/* Right Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <PageHeader variant="room" title="Room Management" />

          {/* Main Area */}
          <main className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC] flex flex-col gap-6">
            
            {/* Top Controls */}
            <div className="flex items-end justify-between gap-4 bg-white p-4 rounded-[12px] border border-slate-100 shadow-sm">
              <div className="flex flex-col gap-2 w-[140px]">
                <label className="text-[14px] font-bold text-gray-700 font-['Inter']">Courses</label>
                <select className="w-full h-[40px] px-3 bg-white border border-[#D9D9D9] rounded-[8px] text-[15px] font-['Inter'] outline-none focus:border-[#8B0000]">
                  <option>English</option>
                  <option>German</option>
                  <option>French</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 w-[200px]">
                <label className="text-[14px] font-bold text-gray-700 font-['Inter']">Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-[40px] px-3 bg-white border border-[#D9D9D9] rounded-[8px] text-[15px] font-['Inter'] outline-none focus:border-[#8B0000] cursor-pointer text-gray-800"
                />
              </div>
            </div>

            {/* الجدول */}
            <div className="flex-1 bg-white rounded-[14px] shadow-sm overflow-auto border border-slate-100 min-h-[500px]">
              <table className="w-full text-center border-collapse min-w-[1000px]">
                <thead className="h-[55px] bg-[#F9FAFB] border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 text-left w-[180px] text-[14px] font-bold text-[#364153] font-['Inter'] bg-[#F9FAFB]">
                      Time / Teacher
                    </th>
                    {teachers.map((teacher, index) => (
                      <th key={index} className="p-3 text-[14px] font-bold text-[#364153] font-['Inter'] w-[120px]">
                        {teacher}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {timeSlots.map((time) => (
                    <tr key={time} className="h-[90px]">
                      <td className="p-4 text-left text-[13px] font-bold text-[#4A5565] font-['Inter'] bg-gray-50 border-r border-slate-50">
                        {time}
                      </td>
                      {teachers.map((teacher) => {
                        const assignment = studentAssignments.find(a => a.time === time && a.teacher === teacher);
                        return (
                          <td key={teacher} className="p-2 border-r border-slate-50 relative align-middle h-full">
                            {assignment ? (
                              <div 
                                onClick={() => setActiveLesson(assignment)}
                                className="w-full h-full flex flex-col justify-center items-center bg-[#8B0000] rounded-[10px] shadow-md text-white min-h-[70px] cursor-pointer hover:bg-[#A30000] transition-colors"
                              >
                                <span className="text-[11px] font-medium opacity-90">Student ID:</span>
                                <span className="text-[13px] font-bold font-mono">{assignment.id}</span>
                              </div>
                            ) : (
                              /* المربع الفاضي يحتوي على خيارين الآن عند تمرير الماوس */
                              <div className="w-full h-full flex justify-center items-center gap-3 border border-dashed border-slate-200 rounded-[10px] text-gray-300 min-h-[70px] p-2 group hover:border-[#8B0000] transition-all">
                                <button 
                                  onClick={() => handleEmptyCellClick(time, teacher)}
                                  className="text-[20px] text-gray-400 hover:text-[#8B0000] hover:scale-125 transition-transform"
                                  title="حجز يدوي"
                                >
                                  +
                                </button>
                                <button 
                                  onClick={() => handleOpenNotificationModal(time, teacher)}
                                  className="w-7 h-7 bg-slate-100 hover:bg-[#8B0000] text-slate-500 hover:text-white rounded-full flex items-center justify-center text-[12px] transition-all shadow-sm opacity-0 group-hover:opacity-100"
                                  title="تعبئة تلقائية عبر الإشعارات"
                                >
                                  🔔
                                </button>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </main>
        </div>
      </div>

      {/* ==================== 1. مودال الحجز الجديد (New Booking) ==================== */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-[100px]">
          <div className="w-[448px] max-w-[448px] h-[478.2px] bg-white rounded-[14px] p-6 flex flex-col gap-6 shadow-2xl relative border border-slate-100 font-['Inter']">
            <div className="flex items-center justify-between w-[400px] h-[28px]">
              <h2 className="text-[19.2px] font-semibold text-[#101828] leading-[28px]">New Booking</h2>
              <button onClick={() => setSelectedCell(null)} className="w-7 h-7 flex items-center justify-center rounded-[10px] hover:bg-slate-100 text-[#4A5565] transition-colors text-lg">✕</button>
            </div>
            <div className="flex flex-col gap-4 w-[400px] h-[312.6px]">
              <div className="w-[400px] h-[85px] bg-[#F9FAFB] rounded-[10px] p-3 flex flex-col justify-center text-left">
                <p className="text-[13.3px] font-normal text-[#4A5565] leading-[20px]">
                  Teacher: <span className="font-semibold text-[#101828]">{selectedCell.teacher}</span> | Course: <span className="font-semibold text-[#8B0000]">{currentCourse}</span>
                </p>
                <p className="text-[12.7px] font-normal text-[#4A5565] leading-[20px] mt-1">
                  Time: <span className="font-medium text-[#101828]">{selectedCell.time}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 w-[400px]">
                <label className="text-[13.3px] font-medium text-[#364153] leading-[20px] text-left">Student ID/Name</label>
                <input type="text" value={studentIdInput} onChange={(e) => setStudentIdInput(e.target.value)} placeholder="Enter student ID/Name" className="w-[400px] h-[38px] border border-[#D1D5DC] rounded-[10px] px-3 text-[14.9px] text-[#101828] focus:outline-none focus:border-[#8B0000]" />
              </div>
              <div className="flex flex-col gap-2 w-[400px]">
                <label className="text-[14.4px] font-normal text-black text-left">Level</label>
                <select value={levelInput} onChange={(e) => setLevelInput(e.target.value)} className="w-[400px] h-[35.6px] border border-[#D1D5DC] rounded-[10px] px-3 text-[14.9px] bg-white focus:outline-none focus:border-[#8B0000]">
                  <option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option><option value="C1">C1</option>
                </select>
              </div>
              <div className="w-[400px] h-[48px] bg-[#F9FAFB] rounded-[10px] px-3 flex items-center justify-between">
                <span className="text-[13.3px] font-medium text-[#364153]">Fixed for Course Duration</span>
                <div onClick={() => setIsFixedDuration(!isFixedDuration)} className={`w-[44px] h-[24px] rounded-full p-[4px] cursor-pointer flex items-center transition-colors ${isFixedDuration ? 'bg-[#8B0000]' : 'bg-[#D1D5DC]'}`}>
                  <div className={`w-[16px] h-[16px] bg-white rounded-full shadow-md transform transition-transform ${isFixedDuration ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 w-[400px] h-[41.6px]">
              <button onClick={() => setSelectedCell(null)} className="w-[194.8px] h-[41.6px] border border-[#D1D5DC] rounded-[10px] text-[14.5px] font-medium text-[#0A0A0A] hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleConfirmBooking} disabled={!studentIdInput.trim()} className="w-[193.2px] h-[41.6px] bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white rounded-[10px] text-[15.5px] font-medium shadow-md transition-all" style={{ opacity: studentIdInput.trim() ? 1 : 0.5 }}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. مودال تفاصيل الحصة (Lesson Details) ==================== */}
      {activeLesson && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-[100px]">
          <div className="w-[448px] max-w-[448px] bg-white rounded-[14px] p-6 flex flex-col gap-6 shadow-2xl relative border border-slate-100 font-['Inter']">
            <div className="flex items-center justify-between w-full h-[28px]">
              <h2 className="text-[19.2px] font-semibold text-[#101828] leading-[28px]">Lesson Details</h2>
              <button onClick={() => setActiveLesson(null)} className="w-7 h-7 flex items-center justify-center rounded-[10px] hover:bg-slate-100 text-[#4A5565] transition-colors">✕</button>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100 flex flex-col gap-2 text-left">
                <p className="text-[14px] text-slate-600">Teacher: <span className="font-bold text-slate-900">{activeLesson.teacher}</span></p>
                <p className="text-[14px] text-slate-600">Time: <span className="font-bold text-slate-900">{activeLesson.time}</span></p>
                <p className="text-[14px] text-slate-600">Course: <span className="font-bold text-[#8B0000]">{currentCourse}</span></p>
                <p className="text-[14px] text-slate-600">Student ID / Name: <span className="font-bold text-slate-900 font-mono">{activeLesson.id}</span></p>
                <p className="text-[14px] text-slate-600">Level: <span className="font-bold text-slate-900">{activeLesson.level}</span></p>
                <p className="text-[14px] text-slate-600">Duration Status: <span className="font-bold text-slate-900">{activeLesson.isFixed ? 'Fixed (Full Course)' : 'Single Session'}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => setActiveLesson(null)} className="flex-1 h-[41.6px] border border-[#D1D5DC] rounded-[10px] text-[14.5px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">Close</button>
              <button onClick={() => handleDeleteBooking(activeLesson.time, activeLesson.teacher)} className="flex-1 h-[41.6px] bg-red-50 text-red-600 border border-red-200 rounded-[10px] text-[14.5px] font-medium hover:bg-red-100 transition-colors">Delete Booking</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. مودال التعبئة التلقائية والإشعارات الجديد (Auto-Fill / Invites) ==================== */}
      {notificationCell && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-[100px]">
          <div className="w-[448px] max-w-[448px] bg-white rounded-[14px] p-6 flex flex-col gap-6 shadow-2xl relative border border-slate-100 font-['Inter']">
            
            <div className="flex items-center justify-between w-full h-[28px]">
              <h2 className="text-[19.2px] font-semibold text-[#101828] leading-[28px]">Auto-Fill (Send Invites)</h2>
              <button onClick={() => setNotificationCell(null)} className="w-7 h-7 flex items-center justify-center rounded-[10px] hover:bg-slate-100 text-[#4A5565] transition-colors text-lg">✕</button>
            </div>
            
            {/* تفاصيل تفاعلية عن الحصة المستهدفة */}
            <div className="w-full bg-[#F9FAFB] rounded-[10px] p-3 text-left">
              <p className="text-[13.3px] font-normal text-[#4A5565]">
                Targeting Slot: <span className="font-semibold text-[#101828]">{notificationCell.teacher}</span> at <span className="font-semibold text-[#8B0000]">{notificationCell.time}</span>
              </p>
            </div>

            {/* قائمة الطلاب مع خانات الاختيار المتعدد */}
            <div className="flex flex-col gap-2 w-full max-h-[220px] overflow-y-auto pr-1">
              <label className="text-[13.3px] font-medium text-[#364153] text-left mb-1">Select Students to Notify:</label>
              {mockAvailableStudents.map(student => (
                <div 
                  key={student.id} 
                  onClick={() => handleToggleStudentSelection(student.id)}
                  className={`flex items-center justify-between p-3 rounded-[10px] border cursor-pointer transition-all ${
                    selectedStudentsForNotify.includes(student.id) 
                      ? 'border-[#8B0000] bg-red-50/30' 
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-medium text-slate-800">{student.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{student.id} - Level: {student.level}</span>
                  </div>
                  {/* علامة المربع المختار */}
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-[11px] font-bold transition-colors ${
                    selectedStudentsForNotify.includes(student.id) ? 'bg-[#8B0000] border-[#8B0000] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {selectedStudentsForNotify.includes(student.id) && '✓'}
                  </div>
                </div>
              ))}
            </div>

            {/* الأزرار السفلى للمودال */}
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => setNotificationCell(null)} 
                className="flex-1 h-[41.6px] border border-[#D1D5DC] rounded-[10px] text-[14.5px] font-medium text-[#0A0A0A] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendNotifications}
                disabled={selectedStudentsForNotify.length === 0}
                className="flex-1 h-[41.6px] bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white rounded-[10px] text-[15.5px] font-medium shadow-md transition-all disabled:opacity-40"
              >
                Send Invites ({selectedStudentsForNotify.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}