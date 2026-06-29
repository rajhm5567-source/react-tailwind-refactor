import Sidebar from './layout/Sidebar';
import PageHeader from './layout/PageHeader';

export default function SessionsManagementView({
  onLogOut,
  onViewChange,
  timeSlots,
  teachers,
  selectedDate,
  selectedCourse,
  sessionAssignments,
  mockAvailableStudents,
  selectedStudentsForNotify,
  notifySelectAll,
  studentSearchInput,
  filteredStudents,
  sessionType,
  selectedCell,
  activeSession,
  notificationCell,
  emptySessionsForNotify,
  onDateChange,
  onCourseChange,
  onEmptyCellClick,
  onSelectStudent,
  onOpenNotificationModal,
  onToggleStudentSelection,
  onSelectAllStudents,
  onSendNotifications,
  onConfirmBooking,
  onDeleteSession,
  onToggleFixed,
  onSetSelectedCell,
  onSetActiveSession,
  onSetNotificationCell,
  onSetStudentSearchInput,
  onSetSessionType,
}) {
  return (
    <div className="flex min-h-screen bg-[#444444] p-6 font-sans justify-center items-center relative">
      <div className="flex w-full max-w-[1841px] h-[851px] bg-[#F8FAFC] rounded-[2px] overflow-hidden border border-white/10 shadow-2xl">
        
        <Sidebar currentView="Sessions Management" onViewChange={onViewChange} onLogOut={onLogOut} />

        {/* Right Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <PageHeader variant="room" title="Sessions Management" />

          {/* Main Area */}
          <main className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC] flex flex-col gap-6">
            
            {/* Top Controls */}
            <div className="flex items-end justify-between gap-4 bg-white p-4 rounded-[12px] border border-slate-100 shadow-sm">
              <div className="flex flex-col gap-2 w-[140px]">
                <label className="text-[14px] font-bold text-gray-700 font-['Inter']">Courses</label>
                <select 
                  value={selectedCourse}
                  onChange={(e) => onCourseChange(e.target.value)}
                  className="w-full h-[40px] px-3 bg-white border border-[#D9D9D9] rounded-[8px] text-[15px] font-['Inter'] outline-none focus:border-[#8B0000]"
                >
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
                  onChange={(e) => onDateChange(e.target.value)}
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
                      <th key={index} className="p-3 text-[14px] font-bold text-[#364153] font-['Inter'] w-[180px]">
                        {teacher}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {timeSlots.map((time) => (
                    <tr key={time} className="h-[100px]">
                      <td className="p-4 text-left text-[13px] font-bold text-[#4A5565] font-['Inter'] bg-gray-50 border-r border-slate-50">
                        {time}
                      </td>
                      {teachers.map((teacher) => {
                        const session = sessionAssignments.find(a => a.time === time && a.teacher === teacher);
                        return (
                          <td key={teacher} className="p-2 border-r border-slate-50 relative align-middle h-full">
                            {session ? (
                              <div 
                                onClick={() => onSetActiveSession(session)}
                                className={`w-full h-full flex flex-col justify-center items-center rounded-[10px] shadow-md text-white min-h-[80px] cursor-pointer transition-colors ${
                                  session.isFixed 
                                    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED]' 
                                    : 'bg-[#8B0000] hover:bg-[#A30000]'
                                }`}
                              >
                                <span className="text-[10px] font-medium opacity-90">{session.studentId}</span>
                                <span className="text-[11px] font-bold font-mono">{session.studentName}</span>
                                <span className="text-[9px] opacity-75 mt-0.5">{session.type}</span>
                              </div>
                            ) : (
                              /* Empty cell with two options */
                              <div className="w-full h-full flex justify-center items-center gap-3 border border-dashed border-slate-200 rounded-[10px] text-gray-300 min-h-[80px] p-2 group hover:border-slate-300 transition-colors">
                                <button 
                                  onClick={() => onEmptyCellClick(time, teacher)}
                                  className="text-[20px] text-gray-400 hover:text-[#8B0000] hover:scale-125 transition-transform"
                                  title="حجز جلسة جديدة"
                                >
                                  +
                                </button>
                                <button 
                                  onClick={() => onOpenNotificationModal(time, teacher)}
                                  className="w-7 h-7 bg-slate-100 hover:bg-[#8B0000] text-slate-500 hover:text-white rounded-full flex items-center justify-center text-[12px] transition-all shadow-sm"
                                  title="إرسال إشعارات تلقائية"
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

      {/* ==================== 1. مودال حجز جلسة جديدة ==================== */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-[100px]">
          <div className="w-[500px] max-w-[500px] bg-white rounded-[14px] p-6 flex flex-col gap-6 shadow-2xl relative border border-slate-100 font-['Inter']">
            <div className="flex items-center justify-between w-full h-[28px]">
              <h2 className="text-[19.2px] font-semibold text-[#101828] leading-[28px]">New Session Booking</h2>
              <button onClick={() => onSetSelectedCell(null)} className="w-7 h-7 flex items-center justify-center rounded-[10px] hover:bg-slate-100 text-[#4A5565] transition-colors text-lg">✕</button>
            </div>
            
            <div className="w-full bg-[#F9FAFB] rounded-[10px] p-3 flex flex-col justify-center text-left">
              <p className="text-[13.3px] font-normal text-[#4A5565] leading-[20px]">
                Teacher: <span className="font-semibold text-[#101828]">{selectedCell.teacher}</span> | Course: <span className="font-semibold text-[#8B0000]">{selectedCourse}</span>
              </p>
              <p className="text-[12.7px] font-normal text-[#4A5565] leading-[20px] mt-1">
                Time: <span className="font-medium text-[#101828]">{selectedCell.time}</span>
              </p>
            </div>

            {/* Student Search */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[13.3px] font-medium text-[#364153] leading-[20px] text-left">Student ID / Name</label>
              <input 
                type="text" 
                value={studentSearchInput}
                onChange={(e) => onSetStudentSearchInput(e.target.value)}
                placeholder="Search by ID or Name (e.g., ST-2026 or Komy)" 
                className="w-full h-[40px] border border-[#D1D5DC] rounded-[10px] px-3 text-[14px] outline-none focus:border-[#8B0000]"
              />
              
              {/* Dropdown suggestions */}
              {filteredStudents.length > 0 && (
                <div className="w-full max-h-[200px] overflow-y-auto border border-slate-200 rounded-[10px] bg-white shadow-lg">
                  {filteredStudents.map(student => (
                    <div
                      key={student.id}
                      onClick={() => onSelectStudent(student)}
                      className="px-4 py-3 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="text-[13px] font-semibold text-slate-900">{student.id}</span>
                      <span className="text-[13px] text-slate-700 ml-2">{student.name}</span>
                      <span className="text-[11px] text-slate-500 ml-2">Level: {student.level}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Student Display */}
            {selectedCell.selectedStudent && (
              <div className="w-full bg-green-50 border border-green-200 rounded-[10px] p-3">
                <p className="text-[13px] text-green-800 font-medium">
                  ✓ Selected: <span className="font-bold">{selectedCell.selectedStudent.id}</span> - {selectedCell.selectedStudent.name}
                </p>
              </div>
            )}

            {/* Session Type */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[13.3px] font-medium text-[#364153] text-left">Session Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSetSessionType('Virtual')}
                  className={`h-[40px] rounded-[8px] border font-semibold text-[13px] transition-all ${
                    sessionType === 'Virtual' ? 'border-[#8B0000] bg-red-50 text-[#8B0000]' : 'border-gray-200 text-gray-500 bg-white'
                  }`}
                >
                  💻 Virtual
                </button>
                <button
                  type="button"
                  onClick={() => onSetSessionType('In-Person')}
                  className={`h-[40px] rounded-[8px] border font-semibold text-[13px] transition-all ${
                    sessionType === 'In-Person' ? 'border-[#8B0000] bg-red-50 text-[#8B0000]' : 'border-gray-200 text-gray-500 bg-white'
                  }`}
                >
                  🏢 In-Person
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => onSetSelectedCell(null)} 
                className="flex-1 h-[41.6px] border border-[#D1D5DC] rounded-[10px] text-[14.5px] font-medium text-[#0A0A0A] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirmBooking} 
                disabled={!selectedCell.selectedStudent} 
                className="flex-1 h-[41.6px] bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white rounded-[10px] text-[14.5px] font-semibold transition-all disabled:opacity-40"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. مودال تفاصيل الحصة ==================== */}
      {activeSession && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-[100px]">
          <div className="w-[480px] max-w-[480px] bg-white rounded-[14px] p-6 flex flex-col gap-6 shadow-2xl relative border border-slate-100 font-['Inter']">
            <div className="flex items-center justify-between w-full h-[28px]">
              <h2 className="text-[19.2px] font-semibold text-[#101828] leading-[28px]">Session Details</h2>
              <button onClick={() => onSetActiveSession(null)} className="w-7 h-7 flex items-center justify-center rounded-[10px] hover:bg-slate-100 text-[#4A5565] transition-colors">✕</button>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="p-4 bg-slate-50 rounded-[10px] border border-slate-100 flex flex-col gap-3 text-left">
                <p className="text-[14px] text-slate-600">Teacher: <span className="font-bold text-slate-900">{activeSession.teacher}</span></p>
                <p className="text-[14px] text-slate-600">Time: <span className="font-bold text-slate-900">{activeSession.time}</span></p>
                <p className="text-[14px] text-slate-600">Student ID: <span className="font-bold text-slate-900 font-mono">{activeSession.studentId}</span></p>
                <p className="text-[14px] text-slate-600">Student Name: <span className="font-bold text-slate-900">{activeSession.studentName}</span></p>
                <p className="text-[14px] text-slate-600">Level: <span className="font-bold text-slate-900">{activeSession.level}</span></p>
                <p className="text-[14px] text-slate-600">Type: <span className="font-bold text-slate-900">{activeSession.type}</span></p>
                <p className="text-[14px] text-slate-600">Status: <span className={`font-bold ${
                  activeSession.isFixed ? 'text-[#6366F1]' : 'text-slate-900'
                }`}>{activeSession.isFixed ? '✓ Fixed' : 'Regular'}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => onSetActiveSession(null)} 
                className="flex-1 h-[41.6px] border border-[#D1D5DC] rounded-[10px] text-[14.5px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => onToggleFixed(activeSession.time, activeSession.teacher)}
                className={`flex-1 h-[41.6px] rounded-[10px] text-[14.5px] font-medium transition-colors ${
                  activeSession.isFixed 
                    ? 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100' 
                    : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                {activeSession.isFixed ? 'Unfix Session' : 'Fix Session'}
              </button>
              <button 
                onClick={() => onDeleteSession(activeSession.time, activeSession.teacher)} 
                className="flex-1 h-[41.6px] bg-red-50 text-red-600 border border-red-200 rounded-[10px] text-[14.5px] font-medium hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. مودال الإشعارات والتعبئة التلقائية ==================== */}
      {notificationCell && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-[100px]">
          <div className="w-[520px] max-w-[520px] bg-white rounded-[14px] p-6 flex flex-col gap-6 shadow-2xl relative border border-slate-100 font-['Inter']">
            
            <div className="flex items-center justify-between w-full h-[28px]">
              <h2 className="text-[19.2px] font-semibold text-[#101828] leading-[28px]">Auto-Fill Sessions</h2>
              <button onClick={() => onSetNotificationCell(null)} className="w-7 h-7 flex items-center justify-center rounded-[10px] hover:bg-slate-100 text-[#4A5565] transition-colors text-lg">✕</button>
            </div>
            
            {/* Empty Sessions Summary */}
            <div className="w-full bg-[#F9FAFB] rounded-[10px] p-4 text-left border border-slate-200">
              <p className="text-[13px] font-semibold text-[#364153] mb-2">📅 Empty Sessions Summary:</p>
              <p className="text-[12px] text-[#4A5565] mb-1">Date: <span className="font-bold">{notificationCell.date}</span></p>
              <p className="text-[12px] text-[#4A5565] mb-2">Course: <span className="font-bold">{notificationCell.course}</span></p>
              <div className="flex flex-wrap gap-2">
                {emptySessionsForNotify.map((slot, idx) => (
                  <div key={idx} className="bg-white border border-slate-300 rounded-[6px] px-3 py-1">
                    <span className="text-[11px] font-semibold text-slate-700">{slot.time}: {slot.teachers.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Select All Button */}
            <div className="flex items-center gap-3 w-full bg-blue-50 border border-blue-200 rounded-[10px] p-3">
              <input 
                type="checkbox"
                checked={notifySelectAll}
                onChange={onSelectAllStudents}
                className="w-5 h-5 cursor-pointer accent-[#8B0000]"
              />
              <label className="text-[13px] font-semibold text-blue-800 cursor-pointer flex-1">
                Select All Students ({selectedStudentsForNotify.length}/{mockAvailableStudents.length})
              </label>
            </div>

            {/* Student List */}
            <div className="flex flex-col gap-2 w-full max-h-[250px] overflow-y-auto pr-2">
              <label className="text-[13.3px] font-medium text-[#364153] text-left">Students to Notify:</label>
              {mockAvailableStudents.map(student => (
                <div 
                  key={student.id} 
                  onClick={() => onToggleStudentSelection(student.id)}
                  className={`flex items-center justify-between p-3 rounded-[10px] border cursor-pointer transition-all ${
                    selectedStudentsForNotify.includes(student.id) 
                      ? 'border-[#8B0000] bg-red-50/30' 
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[13px] font-semibold text-slate-800">{student.id} {student.name}</span>
                    <span className="text-[11px] text-slate-400">Level: {student.level}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-[11px] font-bold transition-colors ${
                    selectedStudentsForNotify.includes(student.id) ? 'bg-[#8B0000] border-[#8B0000] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {selectedStudentsForNotify.includes(student.id) && '✓'}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => onSetNotificationCell(null)} 
                className="flex-1 h-[41.6px] border border-[#D1D5DC] rounded-[10px] text-[14.5px] font-medium text-[#0A0A0A] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={onSendNotifications}
                disabled={selectedStudentsForNotify.length === 0}
                className="flex-1 h-[41.6px] bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white rounded-[10px] text-[14.5px] font-medium shadow-md transition-all disabled:opacity-40"
              >
                Send to {selectedStudentsForNotify.length} Students
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
