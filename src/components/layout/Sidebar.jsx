import { navItems, studentNavItems } from '../../config/navItems';

export default function Sidebar({ currentView, onViewChange, onLogOut, variant = 'default' }) {
  const items = variant === 'student' ? studentNavItems : navItems;
  const activeItemName = variant === 'student' ? 'Student Management' : currentView;

  if (variant === 'student') {
    return (
      <aside className="w-[256px] bg-[#0F172A] flex flex-col p-[16px_12px] gap-[12px]">
        <div className="flex flex-col gap-[8px] flex-grow">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onViewChange(item.name)}
              className={`flex items-center gap-[12px] px-[16px] py-[12px] w-full rounded-[10px] text-[18px] font-medium text-left transition-all ${
                item.name === activeItemName
                  ? 'bg-gradient-to-r from-[#8B0000] to-transparent text-white border-l-4 border-[#8B0000]'
                  : 'text-[#99A1AF] hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <button onClick={onLogOut} className="flex items-center gap-[12px] px-[16px] py-[12px] w-full rounded-[10px] text-[18px] text-[#99A1AF] hover:text-red-400 hover:bg-slate-800 transition-all">
          <span>🚪</span> <span>Log Out</span>
        </button>
      </aside>
    );
  }

  if (variant === 'system') {
    return (
      <aside className="w-[256px] bg-[#0F172A] flex flex-col p-4 gap-3 flex-shrink-0 z-20 shadow-xl">
        <div className="flex flex-col gap-1.5 flex-grow">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onViewChange(item.name)}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-[10px] text-[16px] font-medium text-left transition-all duration-200 ${
                currentView === item.name
                  ? 'bg-gradient-to-r from-[#8B0000] to-transparent text-white border-l-4 border-[#8B0000]'
                  : 'text-[#99A1AF] hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center text-[18px]">{item.icon}</span>
              <span className="truncate flex-1 font-['Inter']">{item.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onLogOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-[10px] text-[16px] font-medium text-left text-[#99A1AF] hover:text-red-400 hover:bg-slate-800/80 transition-all duration-200 mt-auto border-t border-slate-800/50 pt-4"
        >
          <span className="w-5 h-5 text-[18px]">🚪</span>
          <span className="font-['Inter']">Log Out</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-[256px] bg-[#0F172A] flex flex-col p-4 gap-3 flex-shrink-0">
      <div className="flex flex-col gap-2 flex-grow">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onViewChange(item.name)}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-[10px] text-[18px] font-medium text-left transition-all ${
              currentView === item.name
                ? 'bg-gradient-to-r from-[#8B0000] to-transparent text-white border-l-4 border-[#8B0000]'
                : 'text-[#99A1AF] hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
            <span className="truncate flex-1">{item.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onLogOut}
        className="flex items-center gap-3 px-4 py-3 w-full rounded-[10px] text-[18px] font-medium text-left text-[#99A1AF] hover:text-red-400 hover:bg-slate-800 transition-all"
      >
        <span className="w-5 h-5">🚪</span>
        <span>Log Out</span>
      </button>
    </aside>
  );
}
