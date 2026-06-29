import { useState, useMemo } from 'react';
import SessionsManagementView from './SessionsManagementView';

const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const mockStudents = [
  { id: 'ST-2026-001', name: 'Komy Abo Fakher', level: 'A1' },
  { id: 'ST-2026-002', name: 'Ahmad Al-Saeed', level: 'A2' },
  { id: 'ST-2026-003', name: 'Ali Mahmoud', level: 'B1' },
  { id: 'ST-2026-004', name: 'Youssef Ibrahim', level: 'B2' },
  { id: 'ST-2026-005', name: 'Karem Mansour', level: 'C1' },
  { id: 'ST-2026-006', name: 'Rania Haddad', level: 'A1' },
  { id: 'ST-2026-007', name: 'Sarah Williams', level: 'B1' },
];

export default function SessionsManagementContainer({ onLogOut, onViewChange }) {
  // ==================== STATE MANAGEMENT ====================
  const [timeSlots] = useState([
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ]);
  
  const [teachers] = useState(["Samer", "Amer", "Mohammed", "Omar", "komay", "majed", "maya"]);

  const tomorrowStr = getTomorrowDateString();
  const [selectedDate, setSelectedDate] = useState(tomorrowStr);
  const [selectedCourse, setSelectedCourse] = useState('English');

  const [dailySessions, setDailySessions] = useState({
    [tomorrowStr]: [
      { time: "10:00 AM", teacher: "Samer", studentId: "ST-2026-001", studentName: "Komy Abo Fakher", level: "A1", isFixed: false, type: "Virtual" },
      { time: "11:00 AM", teacher: "Samer", studentId: "ST-2026-002", studentName: "Ahmad Al-Saeed", level: "A1", isFixed: false, type: "In-Person" },
      { time: "12:00 PM", teacher: "Samer", studentId: "ST-2026-003", studentName: "Ali Mahmoud", level: "A2", isFixed: true, type: "Virtual" },
      { time: "01:00 PM", teacher: "Samer", studentId: "ST-2026-004", studentName: "Youssef Ibrahim", level: "B1", isFixed: false, type: "In-Person" },
      { time: "02:00 PM", teacher: "Mohammed", studentId: "ST-2026-005", studentName: "Karem Mansour", level: "B2", isFixed: true, type: "Virtual" },
      { time: "03:00 PM", teacher: "komay", studentId: "ST-2026-006", studentName: "Rania Haddad", level: "C1", isFixed: false, type: "In-Person" },
      { time: "04:00 PM", teacher: "Amer", studentId: "ST-2026-007", studentName: "Sarah Williams", level: "A1", isFixed: true, type: "Virtual" },
    ]
  });

  const sessionAssignments = dailySessions[selectedDate] || [];

  // Modal states
  const [selectedCell, setSelectedCell] = useState(null); 
  const [activeSession, setActiveSession] = useState(null); 
  const [notificationCell, setNotificationCell] = useState(null);
  const [studentSearchInput, setStudentSearchInput] = useState('');
  const [sessionType, setSessionType] = useState('Virtual');

  // Mock available students for notifications
  const [mockAvailableStudents] = useState(mockStudents);
  const [selectedStudentsForNotify, setSelectedStudentsForNotify] = useState([]);
  const [emptySessionsForNotify, setEmptySessionsForNotify] = useState([]);
  const [notifySelectAll, setNotifySelectAll] = useState(false);

  // Filtered students based on search
  const filteredStudents = useMemo(() => {
    if (!studentSearchInput.trim()) return [];
    return mockStudents.filter(student => 
      student.id.toLowerCase().includes(studentSearchInput.toLowerCase()) ||
      student.name.toLowerCase().includes(studentSearchInput.toLowerCase())
    );
  }, [studentSearchInput]);

  // ==================== EVENT HANDLERS ====================
  const handleEmptyCellClick = (time, teacher) => {
    setStudentSearchInput('');
    setSessionType('Virtual');
    setSelectedCell({ time, teacher });
  };

  const handleSelectStudent = (student) => {
    setSelectedCell(prev => ({ ...prev, selectedStudent: student }));
    setStudentSearchInput('');
  };

  const handleOpenNotificationModal = (time, teacher) => {
    setSelectedStudentsForNotify([]);
    setNotifySelectAll(false);
    
    // Get empty sessions for this date and course
    const emptySessions = timeSlots
      .map(t => ({
        time: t,
        teachers: teachers.filter(th => {
          const hasSession = sessionAssignments.some(s => s.time === t && s.teacher === th);
          return !hasSession;
        })
      }))
      .filter(s => s.teachers.length > 0);
    
    setEmptySessionsForNotify(emptySessions);
    setNotificationCell({ time, teacher, date: selectedDate, course: selectedCourse });
  };

  const handleToggleStudentSelection = (studentId) => {
    if (selectedStudentsForNotify.includes(studentId)) {
      setSelectedStudentsForNotify(selectedStudentsForNotify.filter(id => id !== studentId));
    } else {
      setSelectedStudentsForNotify([...selectedStudentsForNotify, studentId]);
    }
  };

  const handleSelectAllStudents = () => {
    if (notifySelectAll) {
      setSelectedStudentsForNotify([]);
      setNotifySelectAll(false);
    } else {
      setSelectedStudentsForNotify(mockAvailableStudents.map(s => s.id));
      setNotifySelectAll(true);
    }
  };

  const handleSendNotifications = () => {
    const emptySlotsText = emptySessionsForNotify
      .map(s => `${s.time}: ${s.teachers.join(', ')}`)
      .join(' | ');
    
    alert(`✅ تم إرسال إشعارات لـ ${selectedStudentsForNotify.length} طالب\n\nالحصص الفارغة:\n${emptySlotsText}\n\nالتاريخ: ${selectedDate}\nالكورس: ${selectedCourse}`);
    setNotificationCell(null);
  };

  const handleConfirmBooking = () => {
    if (!selectedCell.selectedStudent) return;

    const newSession = {
      time: selectedCell.time,
      teacher: selectedCell.teacher,
      studentId: selectedCell.selectedStudent.id,
      studentName: selectedCell.selectedStudent.name,
      level: selectedCell.selectedStudent.level,
      isFixed: false,
      type: sessionType
    };

    setDailySessions({
      ...dailySessions,
      [selectedDate]: [...sessionAssignments, newSession]
    });
    setSelectedCell(null);
  };

  const handleDeleteSession = (time, teacher) => {
    setDailySessions({
      ...dailySessions,
      [selectedDate]: sessionAssignments.filter(a => !(a.time === time && a.teacher === teacher))
    });
    setActiveSession(null);
  };

  const handleToggleFixed = (time, teacher) => {
    const updatedSessions = sessionAssignments.map(session => {
      if (session.time === time && session.teacher === teacher) {
        return { ...session, isFixed: !session.isFixed };
      }
      return session;
    });
    
    setDailySessions({
      ...dailySessions,
      [selectedDate]: updatedSessions
    });
    setActiveSession(prev => ({ ...prev, isFixed: !prev.isFixed }));
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // ==================== RENDER VIEW ====================
  return (
    <SessionsManagementView
      onLogOut={onLogOut}
      onViewChange={onViewChange}
      timeSlots={timeSlots}
      teachers={teachers}
      selectedDate={selectedDate}
      selectedCourse={selectedCourse}
      sessionAssignments={sessionAssignments}
      mockAvailableStudents={mockAvailableStudents}
      selectedStudentsForNotify={selectedStudentsForNotify}
      notifySelectAll={notifySelectAll}
      studentSearchInput={studentSearchInput}
      filteredStudents={filteredStudents}
      sessionType={sessionType}
      selectedCell={selectedCell}
      activeSession={activeSession}
      notificationCell={notificationCell}
      emptySessionsForNotify={emptySessionsForNotify}
      onDateChange={handleDateChange}
      onCourseChange={setSelectedCourse}
      onEmptyCellClick={handleEmptyCellClick}
      onSelectStudent={handleSelectStudent}
      onOpenNotificationModal={handleOpenNotificationModal}
      onToggleStudentSelection={handleToggleStudentSelection}
      onSelectAllStudents={handleSelectAllStudents}
      onSendNotifications={handleSendNotifications}
      onConfirmBooking={handleConfirmBooking}
      onDeleteSession={handleDeleteSession}
      onToggleFixed={handleToggleFixed}
      onSetSelectedCell={setSelectedCell}
      onSetActiveSession={setActiveSession}
      onSetNotificationCell={setNotificationCell}
      onSetStudentSearchInput={setStudentSearchInput}
      onSetSessionType={setSessionType}
    />
  );
}
