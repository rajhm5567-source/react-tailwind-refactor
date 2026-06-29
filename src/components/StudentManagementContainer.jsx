import { useState } from 'react';
import StudentManagementView from './StudentManagementView';

export default function StudentManagementContainer({ onLogOut, onViewChange }) {
  // ==================== STATE MANAGEMENT ====================
  const [students] = useState([
    { id: '1245', name: 'John Doe', status: 'Active', major: 'English Level 3' },
    { id: '1246', name: 'Sarah Williams', status: 'Active', major: 'IELTS Preparation' },
    { id: '1247', name: 'Michael Chen', status: 'Inactive', major: 'German Level 1' },
    { id: '1248', name: 'Emma Thompson', status: 'Active', major: 'English Level 1' },
    { id: '1249', name: 'David Martinez', status: 'Active', major: 'Spanish Level 2' },
  ]);

  const [searchId, setSearchId] = useState('');
  const [generatedCard, setGeneratedCard] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // ==================== EVENT HANDLERS ====================
  const handleGenerateCard = (id) => {
    if (!id.trim()) return;
    const student = students.find(s => s.id === id.trim());
    if (student) {
      setGeneratedCard(student);
      setErrorMsg('');
    } else {
      setGeneratedCard(null);
      setErrorMsg('❌ الرقم الأكاديمي غير مسجل!');
    }
  };

  // ==================== RENDER VIEW ====================
  return (
    <StudentManagementView
      onLogOut={onLogOut}
      onViewChange={onViewChange}
      students={students}
      searchId={searchId}
      generatedCard={generatedCard}
      errorMsg={errorMsg}
      onSearchIdChange={setSearchId}
      onGenerateCard={handleGenerateCard}
      onSetGeneratedCard={setGeneratedCard}
    />
  );
}
