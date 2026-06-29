// 1. استيراد useState من مكتبة react الأساسية
import { useState } from 'react';

// 2. استيراد الصور (Importing Images) بطريقة Vite الرسمية والذكية
// تأكد من وجود ملف "hero.png" في مجلد "src/assets" كما رأينا في صورتك السابقة
import bgImg from '../assets/flat-lay-desk-with-copy-space.png'; 

// تأكد من وجود ملف اللوغو "Logo-LINGUAPHONE-removebg-preview.png" في مجلد "src/assets"
// إذا لم يكن موجوداً، قم بسحبه وإفلاته داخل المجلد بالـ VS Code الآن.
import logoImg from '../assets/Logo-LINGUAPHONE-removebg-preview.png';

export default function SignIn({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log('بيانات تسجيل الدخول:', { email, password });
  
  //  استدعاء الدالة لنقلك فوراً للواجهة الثانية
  onLoginSuccess(); 
};

  return (
    // الخلفية الكاملة (نستخدم bgImg المستدعاة هنا)
    <div 
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-start pl-[72px]"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="flex flex-col items-center gap-[24px] w-[551px]">
        
        {/* اللوغو (نستخدم logoImg المستدعاة هنا) */}
        <div className="w-[450px] h-[111.71px] flex items-center justify-center">
          <img 
            src={logoImg} 
            alt="LINGUAPHONE Logo" 
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* كرت تسجيل الدخول */}
        {/* نستخدم كلاس backdrop-blur-md لعمل تأثير الزجاج على الصورة */}
        <form 
          onSubmit={handleSubmit}
          className="box-sizing-border-box flex flex-col items-start p-[32px] gap-[64px] w-[551px] bg-black/10 border border-[#7F1D1D] rounded-[25px] backdrop-blur-md"
        >
          <h2 className="w-full text-[36px] font-bold font-['Open_Sans'] text-[#7F1D1D] leading-[49px]">
            Welcome Back!
          </h2>

          <div className="flex flex-col justify-center items-start gap-[56px] w-full">
            
            {/* الإيميل */}
            <div className="flex flex-col justify-center items-start gap-[8px] w-full">
              <label className="text-[24px] font-normal font-['Open_Sans'] text-[#374151] leading-[33px]">
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // كلاس border-b-2 هو الذي يرسم الخط السفلي فقط
                className="w-full text-[20px] pb-1 bg-transparent border-b-2 border-[#7F1D1D] text-[#374151] focus:outline-none focus:border-red-950 transition-colors"
                placeholder="example@domain.com"
              />
            </div>

            {/* الباسورد */}
            <div className="flex flex-col justify-center items-start gap-[8px] w-full">
              <label className="text-[24px] font-normal font-['Open_Sans'] text-[#374151] leading-[33px]">
                Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-[20px] pb-1 bg-transparent border-b-2 border-[#7F1D1D] text-[#374151] focus:outline-none focus:border-red-950 transition-colors"
                placeholder="••••••••"
              />
            </div>

          </div>

          <button 
            type="submit"
            className="flex flex-row justify-center items-center px-[24px] py-[8px] gap-[10px] w-[220px] h-[60px] border-2 border-[#7F1D1D] rounded-[10px] text-[#7F1D1D] text-[32px] font-semibold font-['Open_Sans'] text-center hover:bg-[#7F1D1D] hover:text-white transition-all duration-300 cursor-pointer"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}