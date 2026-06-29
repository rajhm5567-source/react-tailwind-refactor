import { useState } from 'react';
// استيراد المكونات Container الجديدة
import StudentManagementContainer from './components/StudentManagementContainer';
import SignIn from './components/SignIn';
import SessionsManagementContainer from './components/SessionsManagementContainer';
import CurriculumManagementContainer from './components/CurriculumManagementContainer';
import Sidebar from './components/layout/Sidebar';
import PageHeader from './components/layout/PageHeader';

// مكوّن الهيكل الموحد (Layout Shell) للواجهات التي لا تزال قيد التطوير (Mock Screens)
function RenderSystemShell({ viewTitle, children, currentView, onViewChange, onLogOut }) {
  return (
    <div className="flex min-h-screen bg-[#444444] p-6 font-sans justify-center items-center relative">
      <div className="flex w-full max-w-[1841px] h-[851px] bg-[#F8FAFC] rounded-[2px] overflow-hidden border border-white/10 shadow-2xl">
        
        <Sidebar currentView={currentView} onViewChange={onViewChange} onLogOut={onLogOut} />

        {/* المحتوى الأيمن للواجهة */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <PageHeader title={viewTitle} />

          {/* ساحة العرض الداخلية */}
          <main className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('Curriculum Management');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // دالة التعامل مع تسجيل الخروج
  const handleLogOut = () => {
    const confirmLogOut = window.confirm("Are you sure you want to log out?");
    if (confirmLogOut) {
      setIsLoggedIn(false);
    }
  };

  // دالة التبديل بين الشاشات
  const handleViewChange = (viewName) => {
    setCurrentView(viewName);
  };

  // 1. إذا كان المستخدم غير مسجل دخول، تفتح فوراً واجهة الـ SignIn الاحترافية الممررة
  if (!isLoggedIn) {
    return <SignIn onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      {/* 2. واجهة إدارة الجلسات والحجوزات الكاملة */}
      {currentView === 'Sessions Management' && (
        <SessionsManagementContainer onLogOut={handleLogOut} onViewChange={handleViewChange} />
      )}

      {/* 3. واجهة إدارة المناهج والملفات الكاملة */}
      {currentView === 'Curriculum Management' && (
        <CurriculumManagementContainer onLogOut={handleLogOut} onViewChange={handleViewChange} />
      )}

      {/* 4. واجهة إدارة الطلاب المكتملة */}
      {currentView === 'Student Management' && (
        <StudentManagementContainer onLogOut={handleLogOut} onViewChange={handleViewChange} />
      )}

      {/* ======================================================================= */}
      {/* باقي واجهات الـ Mock المتبقية يتم عرضها داخل الـ Shell لحين برمجتها مستقبلاً */}
      
      {/* لوحة التحكم الرئيسي (Dashboard) */}
      {currentView === 'Dashboard' && (
        <RenderSystemShell viewTitle="Dashboard Overview" currentView={currentView} onViewChange={handleViewChange} onLogOut={handleLogOut}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-left">
              <span className="text-2xl">🎓</span>
              <h3 className="text-slate-500 text-[14px] mt-2 font-medium">Total Active Students</h3>
              <p className="text-slate-800 text-[28px] font-bold mt-1 font-mono">1,248</p>
            </div>
            <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-left">
              <span className="text-2xl">🏫</span>
              <h3 className="text-slate-500 text-[14px] mt-2 font-medium">Sessions Today</h3>
              <p className="text-slate-800 text-[28px] font-bold mt-1 font-mono">28 / 32</p>
            </div>
            <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-left">
              <span className="text-2xl">📚</span>
              <h3 className="text-slate-500 text-[14px] mt-2 font-medium">Languages Taught</h3>
              <p className="text-slate-800 text-[28px] font-bold mt-1 font-mono">4 Courses</p>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm h-[300px] flex items-center justify-center text-slate-400 italic">
            [Interactive Analytics Chart Placeholder]
          </div>
        </RenderSystemShell>
      )}

      {/* شؤون المعلمين (Teacher Affairs) */}
      {currentView === 'Teacher Affairs' && (
        <RenderSystemShell viewTitle="Teacher Affairs" currentView={currentView} onViewChange={handleViewChange} onLogOut={handleLogOut}>
          <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-center text-slate-400 italic">
            👔 قسم إدارة شؤون الأساتذة، الحضور، وتوزيع المناهج التعليمية.
          </div>
        </RenderSystemShell>
      )}

      {/* إرسال الإشعارات (Send Notifications) */}
      {currentView === 'Send Notifications' && (
        <RenderSystemShell viewTitle="Send Notifications" currentView={currentView} onViewChange={handleViewChange} onLogOut={handleLogOut}>
          <div className="max-w-xl bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-left flex flex-col gap-4">
            <h3 className="font-bold text-slate-800">Broadcast New Push Notification</h3>
            <input type="text" placeholder="Notification Title" className="w-full h-[40px] px-3 border border-slate-200 rounded-lg outline-none" />
            <textarea placeholder="Write message body here..." className="w-full h-[100px] p-3 border border-slate-200 rounded-lg outline-none resize-none" />
            <button className="h-[40px] bg-[#8B0000] text-white font-bold rounded-lg text-[14px]">Send to All Devices</button>
          </div>
        </RenderSystemShell>
      )}

      {/* الإعلانات (Announcements) */}
      {currentView === 'Announcements' && (
        <RenderSystemShell viewTitle="Announcements Panel" currentView={currentView} onViewChange={handleViewChange} onLogOut={handleLogOut}>
          <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-center text-slate-400 italic">
            📢 لوحة نشر الإعلانات العامة على تطبيق الطلاب والأساتذة.
          </div>
        </RenderSystemShell>
      )}

      {/* التقارير (Reports) */}
      {currentView === 'Reports' && (
        <RenderSystemShell viewTitle="System Reports" currentView={currentView} onViewChange={handleViewChange} onLogOut={handleLogOut}>
          <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-center text-slate-400 italic">
            📈 تصدير تقارير الحضور، المناهج، ونسب الإشغال للقاعات بصيغة Excel / PDF.
          </div>
        </RenderSystemShell>
      )}

      {/* الإعدادات (Settings) */}
      {currentView === 'Settings' && (
        <RenderSystemShell viewTitle="System Settings" currentView={currentView} onViewChange={handleViewChange} onLogOut={handleLogOut}>
          <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm text-center text-slate-400 italic">
            ⚙️ إعدادات الصلاحيات، الحسابات الإدارية، وتخصيص هوية المعهد.
          </div>
        </RenderSystemShell>
      )}
    </>
  );
}
