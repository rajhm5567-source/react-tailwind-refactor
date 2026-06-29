import { useState } from 'react';
import CurriculumManagementView from './CurriculumManagementView';

export default function CurriculumManagementContainer({ onLogOut, onViewChange }) {
  // ==================== STATE MANAGEMENT ====================
  const [languages] = useState(["English", "German", "French", "Spanish"]);
  const [activeLanguage, setActiveLanguage] = useState("English");
  
  const [levels] = useState(["All Levels", "A1", "A2", "B1", "B2", "C1"]);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("All Levels");

  // Upload form data
  const [materialType, setMaterialType] = useState("pdf");
  const [uploadLevel, setUploadLevel] = useState("A1");
  const [newFileName, setNewFileName] = useState("");

  // Curriculum database
  const [curriculumData, setCurriculumData] = useState({
    English: [
      { id: 1, name: "Grammar Exercise Set 1.pdf", type: "pdf", level: "A1", size: "2.4 MB" },
      { id: 2, name: "Listening Practice A1.mp3", type: "audio", level: "A1", size: "12.8 MB" },
      { id: 3, name: "Vocabulary Builder Level B1.pdf", type: "pdf", level: "B1", size: "4.1 MB" },
      { id: 4, name: "Business English Dialogue.mp3", type: "audio", level: "B2", size: "18.5 MB" }
    ],
    German: [
      { id: 5, name: "Start Deutsch A1 Vocab.pdf", type: "pdf", level: "A1", size: "3.1 MB" },
      { id: 6, name: "Phonetik Übungen Audio.mp3", type: "audio", level: "A2", size: "9.4 MB" }
    ],
    French: [
      { id: 7, name: "Conjugaison des verbes PDF.pdf", type: "pdf", level: "A2", size: "1.8 MB" }
    ],
    Spanish: [
      { id: 8, name: "Comprensión Auditiva ELE.mp3", type: "audio", level: "B1", size: "15.2 MB" }
    ]
  });

  // ==================== EVENT HANDLERS ====================
  const handleUploadMaterial = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const extension = materialType === 'pdf' ? '.pdf' : '.mp3';
    const formattedName = newFileName.endsWith(extension) ? newFileName : `${newFileName}${extension}`;

    const newMaterial = {
      id: Date.now(),
      name: formattedName,
      type: materialType,
      level: uploadLevel,
      size: materialType === 'pdf' ? "3.2 MB" : "11.5 MB"
    };

    setCurriculumData({
      ...curriculumData,
      [activeLanguage]: [newMaterial, ...curriculumData[activeLanguage]]
    });

    setNewFileName("");
    alert(`🎯 تم رفع المادة التعليمية بنجاح وضبطها لمنهج ${activeLanguage} - مستوى ${uploadLevel}!`);
  };

  const handleDeleteMaterial = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setCurriculumData({
        ...curriculumData,
        [activeLanguage]: curriculumData[activeLanguage].filter(item => item.id !== id)
      });
    }
  };

  // Filter displayed materials
  const displayedMaterials = (curriculumData[activeLanguage] || []).filter(item => {
    if (selectedLevelFilter === "All Levels") return true;
    return item.level === selectedLevelFilter;
  });

  // ==================== RENDER VIEW ====================
  return (
    <CurriculumManagementView
      onLogOut={onLogOut}
      onViewChange={onViewChange}
      languages={languages}
      activeLanguage={activeLanguage}
      levels={levels}
      selectedLevelFilter={selectedLevelFilter}
      materialType={materialType}
      uploadLevel={uploadLevel}
      newFileName={newFileName}
      displayedMaterials={displayedMaterials}
      onSetActiveLanguage={setActiveLanguage}
      onSetSelectedLevelFilter={setSelectedLevelFilter}
      onSetMaterialType={setMaterialType}
      onSetUploadLevel={setUploadLevel}
      onSetNewFileName={setNewFileName}
      onUploadMaterial={handleUploadMaterial}
      onDeleteMaterial={handleDeleteMaterial}
    />
  );
}
