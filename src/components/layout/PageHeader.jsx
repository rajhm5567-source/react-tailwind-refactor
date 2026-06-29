import logoImg from '../../assets/Logo-LINGUAPHONE-removebg-preview.png';
import logoPng from '../../assets/Logo.png';

export default function PageHeader({ variant = 'default', title, searchPlaceholder }) {
  if (variant === 'student') {
    return (
      <header className="h-[112px] bg-white border-b border-[#D1D5DC] flex items-center justify-between px-[32px]">
        <div className="flex items-center gap-[24px]">
          <img src={logoPng} alt="Logo" className="w-[72px] h-[72px] object-contain" />
          <h1 className="text-[23px] font-medium text-[#101828]">{title}</h1>
        </div>
        <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-full flex items-center justify-center text-white font-medium shadow-md">AD</div>
      </header>
    );
  }

  if (variant === 'system') {
    return (
      <header className="h-[113px] bg-white border-b border-[#D1D5DC] flex items-center justify-between px-8 flex-shrink-0 z-10">
        <div className="flex items-center gap-6">
          <div className="w-[72px] h-[72px] bg-[#8B0000]/10 rounded-xl flex items-center justify-center font-bold text-[#8B0000] text-xl border border-[#8B0000]/20 shadow-inner">
            LINGUA
          </div>
          <h1 className="text-[26px] font-semibold text-[#101828] font-['Inter'] tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-[320px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder={searchPlaceholder ?? `Search ${title.toLowerCase()}...`}
              className="w-full h-[38px] pl-11 pr-4 bg-white border border-[#D1D5DC] rounded-[10px] text-[13px] font-['Inter'] focus:outline-none focus:border-[#8B0000] transition-colors placeholder:text-gray-400"
            />
          </div>
          <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-full flex items-center justify-center text-white text-[13.6px] font-semibold tracking-wider font-['Inter'] shadow-md hover:scale-105 transition-transform cursor-pointer">
            AD
          </div>
        </div>
      </header>
    );
  }

  if (variant === 'room') {
    return (
      <header className="h-[112px] bg-white border-b border-[#D1D5DC] flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center gap-6">
          <img src={logoPng} alt="Logo" className="w-[72px] h-[72px] object-contain" />
          <h1 className="text-[24px] font-medium text-[#101828] font-['Inter']">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-[280px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder={searchPlaceholder ?? 'Search students...'}
              className="w-full h-[40px] pl-11 pr-4 bg-white border border-[#D1D5DC] rounded-[10px] text-[14px] font-['Inter'] focus:outline-none focus:border-[#8B0000]"
            />
          </div>
          <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-full flex items-center justify-center text-white text-[14px] font-medium shadow-md">
            AD
          </div>
        </div>
      </header>
    );
  }

  if (variant === 'curriculum') {
    return (
      <header className="h-[112px] bg-white border-b border-[#D1D5DC] flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center gap-6">
          <img src={logoImg} alt="Logo" className="w-[72px] h-[72px] object-contain" />
          <h1 className="text-[28.8px] font-semibold text-[#101828] font-['Inter']">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-[280px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder={searchPlaceholder ?? 'Search curriculum materials...'}
              className="w-full h-[40px] pl-11 pr-4 bg-white border border-[#D1D5DC] rounded-[10px] text-[14px] font-['Inter'] focus:outline-none focus:border-[#8B0000]"
            />
          </div>
          <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-full flex items-center justify-center text-white text-[14px] font-medium shadow-md">
            AD
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="h-[112px] bg-white border-b border-[#D1D5DC] flex items-center justify-between px-8 flex-shrink-0">
      <div className="flex items-center gap-6">
        <img src={logoImg} alt="Logo" className="w-[72px] h-[72px] object-contain" />
        <h1 className="text-[28.8px] font-semibold text-[#101828] font-['Inter']">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-[280px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder={searchPlaceholder ?? `Search ${title.toLowerCase()}...`}
            className="w-full h-[40px] pl-11 pr-4 bg-white border border-[#D1D5DC] rounded-[10px] text-[14px] font-['Inter'] focus:outline-none focus:border-[#8B0000]"
          />
        </div>
        <div className="w-[40px] h-[40px] bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-full flex items-center justify-center text-white text-[14px] font-medium shadow-md">
          AD
        </div>
      </div>
    </header>
  );
}
