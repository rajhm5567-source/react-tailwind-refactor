import logoImg from '../assets/Logo.png';
import Sidebar from './layout/Sidebar';
import PageHeader from './layout/PageHeader';

export default function StudentManagementView({
  onLogOut,
  onViewChange,
  students,
  searchId,
  generatedCard,
  errorMsg,
  onSearchIdChange,
  onGenerateCard,
  onSetGeneratedCard,
}) {
  return (
    <div className="flex min-h-screen bg-[#444444] p-[100px] font-sans justify-center items-center">
      <div className="flex w-full max-w-[1841px] h-[851px] bg-[#F8FAFC] rounded-[2px] overflow-hidden border border-white/10 shadow-2xl">
        
        <Sidebar variant="student" onViewChange={onViewChange} onLogOut={onLogOut} />

        {/* Content Box */}
        <div className="flex-1 flex flex-col min-w-0">
          <PageHeader variant="student" title="Student Management" />

          <main className="flex-1 p-[32px] overflow-y-auto bg-[#F8FAFC] flex flex-col gap-[24px]">
            <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-[16px_24px] text-[13.5px] font-bold text-[#4A5565]">Academic ID</th>
                    <th className="p-[16px_24px] text-[13.5px] font-bold text-[#4A5565]">Student Name</th>
                    <th className="p-[16px_24px] text-[13.5px] font-bold text-[#4A5565]">Status</th>
                    <th className="p-[16px_24px] text-[13.5px] font-bold text-[#4A5565]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-[24px] text-[13px] text-[#364153] font-mono">{student.id}</td>
                      <td className="p-[24px] text-[13px] font-medium text-[#101828]">{student.name}</td>
                      <td className="p-[24px]">
                        <span className={`inline-flex items-center px-[12px] py-[4px] rounded-full text-[11px] font-medium ${student.status === 'Active' ? 'bg-[#F0FDF4] text-[#008236]' : 'bg-gray-100 text-gray-600'}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="p-[24px]">
                        <button onClick={() => onGenerateCard(student.id)} className="px-[16px] py-[8px] bg-[#F3F4F6] text-[#364153] text-[13px] font-medium rounded-[10px] hover:bg-[#e4e6eb] transition-colors">
                          View Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Generator Section */}
            <div className="bg-white rounded-[14px] p-[24px] shadow-sm border border-slate-100 flex flex-col gap-[16px]">
              <h3 className="text-[16px] font-bold text-gray-800">ID Card Generator</h3>
              <div className="flex gap-[16px]">
                <input 
                  type="text" 
                  placeholder="Enter Academic ID" 
                  value={searchId}
                  onChange={(e) => onSearchIdChange(e.target.value)}
                  className="flex-1 h-[48px] px-[16px] border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-[#8B0000]"
                />
                <button onClick={() => onGenerateCard(searchId)} className="h-[48px] px-[32px] bg-[#8B0000] text-white font-bold text-[14px] rounded-lg hover:bg-red-950 transition-all">
                  Generate
                </button>
              </div>
              {errorMsg && <div className="text-red-600 text-[14px]">{errorMsg}</div>}

              {generatedCard && (
                <div className="mt-4 bg-slate-900 text-white p-[24px] rounded-[15px] max-w-[400px] border-l-8 border-[#8B0000] shadow-xl self-center w-full relative">
                  <button onClick={() => onSetGeneratedCard(null)} className="absolute top-3 right-3 text-gray-400 hover:text-white">✕</button>
                  <div className="flex items-center gap-[12px] border-b border-slate-800 pb-3 mb-3">
                    <img src={logoImg} alt="Linguaphone" className="w-[35px] h-[35px] bg-white rounded-full p-1" />
                    <div>
                      <h3 className="text-[12px] font-bold tracking-wider">LINGUAPHONE</h3>
                      <p className="text-[9px] text-red-400 font-semibold uppercase">Student ID Card</p>
                    </div>
                  </div>
                  <div className="flex gap-[16px] items-center">
                    <div className="w-[60px] h-[60px] bg-slate-800 rounded-[10px] flex items-center justify-center text-[28px]">👤</div>
                    <div className="text-[13px] flex flex-col gap-[2px]">
                      <p className="text-gray-400">Name: <span className="text-white font-semibold">{generatedCard.name}</span></p>
                      <p className="text-gray-400">ID: <span className="text-red-400 font-mono font-bold">{generatedCard.id}</span></p>
                      <p className="text-gray-400">Course: <span className="text-white">{generatedCard.major}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
