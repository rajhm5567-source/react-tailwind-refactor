// src/components/SystemShell.jsx
import Sidebar from './layout/Sidebar';
import PageHeader from './layout/PageHeader';

export default function SystemShell({ viewTitle, children, currentView, onViewChange, onLogOut }) {
  return (
    <div className="flex min-h-screen bg-[#444444] p-6 font-sans justify-center items-center relative select-none">
      <div className="flex w-full max-w-[1841px] h-[851px] bg-[#F1F5F9] rounded-[2px] overflow-hidden border border-white/10 shadow-2xl">
        
        <Sidebar variant="system" currentView={currentView} onViewChange={onViewChange} onLogOut={onLogOut} />

        {/* المحتوى الأيمن للمنصة */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          
          <PageHeader variant="system" title={viewTitle} />

          {/* ساحة محتوى الواجهة الداخلية النشطة بداخل السكرول */}
          <main className="flex-1 p-8 overflow-y-auto bg-[#F1F5F9]">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}
