import { useState } from 'react';
import RoomManagementView from './RoomManagementView';

const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export default function RoomManagementContainer({ onLogOut, onViewChange }) {
  // ==================== STATE MANAGEMENT ====================
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

  // Modal states
  const [selectedCell, setSelectedCell] = useState(null); 
  const [activeLesson, setActiveLesson] = useState(null); 
  const [notificationCell, setNotificationCell] = useState(null);

  // Mock available students
  const [mockAvailableStudents] = useState([
    { id: "ST-201", name: "Ahmad Al-Saeed", level: "A1" },
    { id: "ST-202", name: "Ali Mahmoud", level: "A2" },
    { id: "ST-203", name: "Youssef Ibrahim", level: "B1" },
    { id: "ST-204", name: "Karem Mansour", level: "B2" },
    { id: "ST-205", name: "Rania Haddad", level: "C1" },
  ]);

  // Selected students for notifications
  const [selectedStudentsForNotify, setSelectedStudentsForNotify] = useState([]);

  // Booking form
  const [studentIdInput, setStudentIdInput] = useState('');
  const [levelInput, setLevelInput] = useState('A1');
  const [isFixedDuration, setIsFixedDuration] = useState(false);
  const [currentCourse] = useState('ENG');

  // ==================== EVENT HANDLERS ====================
  const handleEmptyCellClick = (time, teacher) => {
    setStudentIdInput('');
    setIsFixedDuration(false);
    setSelectedCell({ time, teacher });
  };

  const handleOpenNotificationModal = (time, teacher) => {
    setSelectedStudentsForNotify([]);
    setNotificationCell({ time, teacher });
  };

  const handleToggleStudentSelection = (studentId) => {
    if (selectedStudentsForNotify.includes(studentId)) {
      setSelectedStudentsForNotify(selectedStudentsForNotify.filter(id => id !== studentId));
    } else {
      setSelectedStudentsForNotify([...selectedStudentsForNotify, studentId]);
    }
  };

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

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // ==================== RENDER VIEW ====================
  return (
    <RoomManagementView
      onLogOut={onLogOut}
      onViewChange={onViewChange}
      timeSlots={timeSlots}
      teachers={teachers}
      selectedDate={selectedDate}
      studentAssignments={studentAssignments}
      mockAvailableStudents={mockAvailableStudents}
      selectedStudentsForNotify={selectedStudentsForNotify}
      studentIdInput={studentIdInput}
      levelInput={levelInput}
      isFixedDuration={isFixedDuration}
      currentCourse={currentCourse}
      selectedCell={selectedCell}
      activeLesson={activeLesson}
      notificationCell={notificationCell}
      onDateChange={handleDateChange}
      onEmptyCellClick={handleEmptyCellClick}
      onOpenNotificationModal={handleOpenNotificationModal}
      onToggleStudentSelection={handleToggleStudentSelection}
      onSendNotifications={handleSendNotifications}
      onConfirmBooking={handleConfirmBooking}
      onDeleteBooking={handleDeleteBooking}
      onSetSelectedCell={setSelectedCell}
      onSetActiveLesson={setActiveLesson}
      onSetNotificationCell={setNotificationCell}
      onSetStudentIdInput={setStudentIdInput}
      onSetLevelInput={setLevelInput}
      onSetIsFixedDuration={setIsFixedDuration}
    />
  );
}
