import { useState } from 'react';
import Sidebar from './layout/Sidebar';
import PageHeader from './layout/PageHeader';

export default function CurriculumManagement({ onLogOut, onViewChange }) {
  // الحالات المتاحة لإدارة المناهج والتصفية
  const [languages] = useState(["English", "German", "French", "Spanish"]);
  const [activeLanguage, setActiveLanguage] = useState("English");
  
  const [levels] = useState(["All Levels", "A1", "A2", "B1", "B2", "C1"]);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("All Levels");

  // بيانات نموذج الرفع
  const [materialType, setMaterialType] = useState("pdf"); // pdf أو audio
  const [uploadLevel, setUploadLevel] = useState("A1");
  const [newFileName, setNewFileName] = useState("");

  // قاعدة البيانات المركزية للمواد التعليمية للسيستم
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

  // معالجة رفع مادة تعليمية جديدة
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

  // معالجة حذف مادة تعليمية
  const handleDeleteMaterial = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setCurriculumData({
        ...curriculumData,
        [activeLanguage]: curriculumData[activeLanguage].filter(item => item.id !== id)
      });
    }
  };

  // تصفية المواد المعروضة بناءً على اللغة والمستوى المختار من القائمة العلويّة
  const displayedMaterials = (curriculumData[activeLanguage] || []).filter(item => {
    if (selectedLevelFilter === "All Levels") return true;
    return item.level === selectedLevelFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#444444] p-6 font-sans justify-center items-center relative">
      <div className="flex w-full max-w-[1841px] h-[851px] bg-[#F8FAFC] rounded-[2px] overflow-hidden border border-white/10 shadow-2xl">
        
        <Sidebar currentView="Curriculum Management" onViewChange={onViewChange} onLogOut={onLogOut} />

        {/* ==================== المحتوى الأيمن الأساسي بالكامل ==================== */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          <PageHeader variant="curriculum" title="Curriculum Management" />

          {/* ==================== 3. شريط التحكم والتصفية العلوي (Filter Bar) ==================== */}
          <div className="h-[72px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8 flex-shrink-0">
            {/* ألسنة تبديل لغة الكورس الفعالة */}
            <div className="flex items-center gap-2 h-full">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-5 h-full text-[15px] font-semibold font-['Inter'] transition-all relative ${
                    activeLanguage === lang ? 'text-[#8B0000]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {lang} Course
                  {activeLanguage === lang && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#8B0000] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* أداة الاختيار والتصفية حسب المستويات المخصصة بمقاسات الفيجما الدقيقة */}
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium text-gray-500 font-['Inter']">Filter by:</span>
              <select
                value={selectedLevelFilter}
                onChange={(e) => setSelectedLevelFilter(e.target.value)}
                className="w-[120px] min-width-[120px] h-[40px] bg-white border border-[#D9D9D9] rounded-[8px] px-3 text-[16px] font-['Inter'] font-normal text-[#1E1E1E] outline-none cursor-pointer focus:border-[#8B0000]"
              >
                {levels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ==================== 4. ساحة العمل الأساسية (المواد + لوحة الرفع الجانبية) ==================== */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* [اليسار] - استعراض المواد التعليمية للمنهج الحالي */}
            <div className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-bold text-slate-800 font-['Inter']">
                  Available Materials ({displayedMaterials.length})
                </h2>
                <span className="text-[12px] bg-[#8B0000]/5 text-[#8B0000] px-3 py-1 rounded-md font-bold font-mono">
                  {activeLanguage} / {selectedLevelFilter}
                </span>
              </div>

              {displayedMaterials.length === 0 ? (
                <div className="w-full h-[260px] border border-dashed border-slate-200 rounded-[12px] bg-white flex flex-col items-center justify-center p-6">
                  <span className="text-[36px] mb-2">📂</span>
                  <p className="text-[14px] text-slate-400 font-medium font-['Inter']">No curriculum items match your selection.</p>
                </div>
              ) : (
                /* شبكة عرض البطاقات الملونة الاحترافية حسب الصيغة والمستوى */
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {displayedMaterials.map((item) => (
                    <div 
                      key={item.id}
                      className={`bg-white p-4 rounded-[12px] border flex items-center justify-between shadow-sm transition-all hover:shadow-md ${
                        item.type === 'pdf' ? 'border-l-4 border-l-[#FB2C36] border-slate-100' : 'border-l-4 border-l-[#AD46FF] border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-4 text-left min-w-0">
                        {/* أيقونة مميزة ملونة حسب نوع المادة */}
                        <div className={`w-[44px] h-[44px] rounded-[10px] flex items-center justify-center text-[20px] flex-shrink-0 ${
                          item.type === 'pdf' ? 'bg-red-50 text-[#FB2C36]' : 'bg-purple-50 text-[#AD46FF]'
                        }`}>
                          {item.type === 'pdf' ? '📄' : '🎵'}
                        </div>
                        
                        <div className="flex flex-col min-w-0">
                          <span className="text-[14px] font-bold text-slate-800 truncate pr-2 font-['Inter']" title={item.name}>
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-mono">
                              {item.level}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">{item.size}</span>
                          </div>
                        </div>
                      </div>

                      {/* إجراءات الحذف الفوري للمواد */}
                      <button
                        onClick={() => handleDeleteMaterial(item.id)}
                        className="w-9 h-9 rounded-[8px] bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors border border-slate-100 flex-shrink-0"
                        title="Delete resource"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* [اليمين] - لوحة رفع المواد والملفات المدمجة بالكامل لليمين */}
            <div className="w-[360px] bg-white border-l border-[#E2E8F0] p-6 flex flex-col gap-5 overflow-y-auto flex-shrink-0 h-full shadow-sm">
              <div className="border-b border-slate-100 pb-3 text-left">
                <h3 className="text-[16px] font-bold text-gray-800 font-['Inter']">Upload New Material</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">Add data assets directly into the system</p>
              </div>

              <form onSubmit={handleUploadMaterial} className="flex flex-col gap-4">
                {/* اسم الملف المستهدف */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[13px] font-semibold text-gray-700 font-['Inter']">Material Title</label>
                  <input 
                    type="text"
                    placeholder="e.g. Dialogue Practice"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="w-full h-[40px] px-3 border border-[#D9D9D9] rounded-[8px] text-[14px] font-['Inter'] outline-none focus:border-[#8B0000]"
                  />
                </div>

                {/* صيغة ونوع المادة المرفوعة */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[13px] font-semibold text-gray-700 font-['Inter']">Material Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMaterialType('pdf')}
                      className={`h-[38px] rounded-[8px] border font-semibold text-[13px] transition-all ${
                        materialType === 'pdf' ? 'border-[#FB2C36] bg-red-50/50 text-[#FB2C36]' : 'border-gray-200 text-gray-500 bg-white'
                      }`}
                    >
                      📄 Document (PDF)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMaterialType('audio')}
                      className={`h-[38px] rounded-[8px] border font-semibold text-[13px] transition-all ${
                        materialType === 'audio' ? 'border-[#AD46FF] bg-purple-50/50 text-[#AD46FF]' : 'border-gray-200 text-gray-500 bg-white'
                      }`}
                    >
                      🎵 Audio (MP3)
                    </button>
                  </div>
                </div>

                {/* تصنيف المستوى التعليمي للمادة المرفوعة */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[13px] font-semibold text-gray-700 font-['Inter']">Target Level</label>
                  <select 
                    value={uploadLevel}
                    onChange={(e) => setUploadLevel(e.target.value)}
                    className="w-full h-[40px] px-3 bg-white border border-[#D9D9D9] rounded-[8px] text-[14px] font-['Inter'] outline-none focus:border-[#8B0000] font-bold cursor-pointer"
                  >
                    {levels.filter(l => l !== "All Levels").map(lvl => (
                      <option key={lvl} value={lvl}>Level {lvl}</option>
                    ))}
                  </select>
                </div>

                {/* منطقة السحب والإفلات الأنيقة والمطابقة للفيجما */}
                <div className="w-full h-[130px] border-2 border-dashed border-slate-200 rounded-[10px] flex flex-col items-center justify-center bg-slate-50/50 p-4 cursor-pointer hover:border-[#8B0000] transition-colors group">
                  <span className="text-[26px] mb-1 group-hover:scale-115 transition-transform">📁</span>
                  <span className="text-[13.3px] font-normal text-[#45556C] font-['Inter']">Drag & Drop file here</span>
                  <span className="text-[11px] text-gray-400 mt-0.5 font-['Inter']">or click to browse local storage</span>
                </div>

                {/* زر الإرسال والحفظ الفوري بالسيستم */}
                <button
                  type="submit"
                  disabled={!newFileName.trim()}
                  className="w-full h-[42px] bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white rounded-[8px] font-bold text-[14px] shadow-sm transition-all disabled:opacity-40 mt-2 hover:shadow-md"
                >
                  Publish Content
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}