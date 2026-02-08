import { useEffect, useRef, useState } from 'react';
import { Mail, Briefcase, Heart, Mountain, Tv, TrendingUp, Moon, Languages, BookOpen } from 'lucide-react';
import bgImg from './assets/bg.jpg'; 
import avatarImg from './assets/avatar.png';


// Language context type
type Language = 'zh' | 'en';

interface Translations {
  nav: {
    about: string;
    experience: string;
    contact: string;
  };
  hero: {
    tagline: string;
    contactBtn: string;
  };
  about: {
    title: string;
    identity: string;
    identityText: string;
    timeline: string;
    interests: string;
  };
  timeline: {
    y2017: string;
    y2023: string;
    y2026: string;
  };
  interests: {
    sleep: string;
    stock: string;
    stockLine: string;
    tv: string;
    hiking: string;
    english: string;
  };
  experience: {
    title: string;
    role: string;
  };
  contact: {
    title: string;
    subtitle: string;
  };
  footer: {
    text: string;
    subtext: string;
  };
}

const translations: Record<Language, Translations> = {
  zh: {
    nav: { about: '关于', experience: '经历', contact: '联系' },
    hero: {
      tagline: '热爱睡觉和小猫，但却要求自己学会AI和炒股，希望世界和平和人民幸福。',
      contactBtn: '联系我',
    },
    about: {
      title: '关于我',
      identity: '身份',
      identityText: '西南大学心理学硕士（研究方向：教育与心理测量），2026届。',
      timeline: '履历摘要',
      interests: '个人成分',
    },
    timeline: {
      y2017: '非本人意愿，被迫就读不喜欢的师范专业。',
      y2023: '跨城、跨校、跨专业，一战自学考研成功。',
      y2026: '毕业入职某科技公司的 AI 开发平台产品经理。',
    },
    interests: {
      sleep: '睡觉：最高优先级的爱好',
      stock: '股市韭菜',
      stockLine: '，投资者',
      tv: '美剧：彻底疯狂《Better call Saul》《Breaking Bad》，目前正在《Person of Interest》',
      hiking: '爬山：这是我唯一接受的运动方式',
      english: '目前正在被英语折磨，感觉这么多年学白上了……',
    },
    experience: {
      title: '实习经历',
      role: '产品实习生',
    },
    contact: {
      title: '联系我',
      subtitle: '欢迎通过邮件与我交流',
    },
    footer: {
      text: '2026 梁欣 Xin Liang',
      subtext: '小猫占据大脑',
    },
  },
  en: {
    nav: { about: 'About', experience: 'Experience', contact: 'Contact' },
    hero: {
      tagline: 'I love sleeping and cats, but I push myself to learn AI and stock trading. Wishing for world peace and happiness for all.',
      contactBtn: 'Contact Me',
    },
    about: {
      title: 'About Me',
      identity: 'Identity',
      identityText: 'Master of Psychology at Southwest University (Educational & Psychological Measurement), Class of 2026.',
      timeline: 'Timeline',
      interests: 'Personal Profile',
    },
    timeline: {
      y2017: 'Against my will, forced to study teaching major I disliked.',
      y2023: 'Cross-city, cross-school, cross-major. Self-taught and succeeded in grad school entrance exam.',
      y2026: 'Joining a tech company as an AI Development Platform Product Manager.',
    },
    interests: {
      sleep: 'Sleeping: My highest priority hobby',
      stock: 'Stock market noob',
      stockLine: ', investor',
      tv: 'TV Series: Obsessed with "Better Call Saul" & "Breaking Bad", currently watching "Person of Interest"',
      hiking: 'Hiking: The only exercise I accept',
      english: 'Currently tortured by English, feeling like all those years of study were wasted...',
    },
    experience: {
      title: 'Experience',
      role: 'Product Intern',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Feel free to reach out via email',
    },
    footer: {
      text: '2026 Xin Liang',
      subtext: 'Cats occupy my brain',
    },
  },
};

// Language context
const LanguageContext = React.createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}>({ lang: 'zh', setLang: () => {}, t: translations.zh });

import React from 'react';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = React.useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  const navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <a
            href="#"
            className={`font-semibold text-lg transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            {lang === 'zh' ? '梁欣' : 'Xin Liang'}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {item.label}
              </a>
            ))}
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                isScrolled
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-white/20 text-white'
              }`}
            >
              <Languages className="w-3 h-3" />
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
            </button>
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`w-5 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'}`} />
              <div className={`w-5 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'}`} />
              <div className={`w-5 h-0.5 transition-all ${isScrolled ? 'bg-gray-800' : 'bg-white'}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const { t } = React.useContext(LanguageContext);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl mx-auto">
        {/* Avatar */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative inline-block">
            <img
              src={avatarImg}
              alt="梁欣"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/30 shadow-2xl animate-float"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2 animate-fade-in-up animation-delay-100">
          梁欣
        </h1>
        <p className="text-lg sm:text-xl text-white/80 font-light mb-6 animate-fade-in-up animation-delay-200">
          Xin Liang
        </p>

        {/* Tagline */}
        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8 animate-fade-in-up animation-delay-300">
          {t.hero.tagline}
        </p>

        {/* Contact Button */}
        <button
          onClick={scrollToContact}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white text-sm transition-all duration-200 animate-fade-in-up animation-delay-400 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>{t.hero.contactBtn}</span>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = React.useContext(LanguageContext);

  const timeline = [
    { year: '2017', text: t.timeline.y2017 },
    { year: '2023', text: t.timeline.y2023 },
    { year: '2026', text: t.timeline.y2026 },
  ];

  const interests = [
    { icon: Moon, text: t.interests.sleep },
    { icon: TrendingUp, text: 'stock', isStock: true },
    { icon: Tv, text: t.interests.tv },
    { icon: Mountain, text: t.interests.hiking },
    { icon: BookOpen, text: t.interests.english },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 bg-[#E8A87C] rounded-full" />
          <h2 className="text-2xl font-semibold text-gray-800">{t.about.title}</h2>
        </div>

        {/* Identity Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F0E6DC] mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Briefcase className="w-5 h-5 text-[#E8A87C] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 mb-1">{t.about.identity}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.about.identityText}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F0E6DC] mb-6">
          <h3 className="font-medium text-gray-800 mb-4">{t.about.timeline}</h3>
          <div className="relative">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-[#F0E6DC]" />
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="relative flex gap-4 mb-4 last:mb-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 rounded-full bg-[#E8A87C] mt-2 relative z-10 ring-4 ring-white" />
                <div>
                  <span className="text-sm font-medium text-[#E8A87C]">{item.year}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F0E6DC]">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#E8A87C]" />
            <h3 className="font-medium text-gray-800">{t.about.interests}</h3>
          </div>
          <div className="space-y-3">
            {interests.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                {item.isStock ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      <span className="line-through text-gray-400">{t.interests.stock}</span>
                      {t.interests.stockLine}
                    </span>
                  </>
                ) : (
                  <>
                    <item.icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const { ref, isVisible } = useScrollReveal();
  const { t, lang } = React.useContext(LanguageContext);

  const experiences = [
    {
      period: '2024.6 - 2024.10',
      company: '滴滴出行',
      companyEn: 'DiDi',
      department: '地图事业部',
      departmentEn: 'Map Business Unit',
    },
    {
      period: '2025.2 - 2025.4',
      company: '小米',
      companyEn: 'Xiaomi',
      department: '互联互通部',
      departmentEn: 'Interconnection Dept',
    },
    {
      period: '2025.4 - 2025.7',
      company: '字节跳动',
      companyEn: 'ByteDance',
      department: '地理位置中台',
      departmentEn: 'Geo-location Platform',
    },
    {
      period: '2025.7',
      company: '心纪源',
      companyEn: 'Xinjiyuan',
      department: '林间聊愈室APP',
      departmentEn: 'Forest Healing Room App',
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 bg-white/50">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 bg-[#E8A87C] rounded-full" />
          <h2 className="text-2xl font-semibold text-gray-800">{t.experience.title}</h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-sm border border-[#F0E6DC] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <span className="text-sm font-medium text-[#E8A87C]">{exp.period}</span>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full w-fit">
                  {t.experience.role}
                </span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">
                {lang === 'zh' ? exp.company : exp.companyEn}
              </h3>
              {/* 下面这一行是刚刚报错的地方，已修正为 </p> */}
              <p className="text-sm text-gray-500">
                {lang === 'zh' ? exp.department : exp.departmentEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = React.useContext(LanguageContext);

  return (
    <section id="contact" className="py-20 px-4 sm:px-6">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Section Title */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-1 h-6 bg-[#E8A87C] rounded-full" />
          <h2 className="text-2xl font-semibold text-gray-800">{t.contact.title}</h2>
          <div className="w-1 h-6 bg-[#E8A87C] rounded-full" />
        </div>

        <p className="text-gray-600 mb-8">
          {t.contact.subtitle}
        </p>

        <a
          href="mailto:lexi_12122024@126.com"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#E8A87C] hover:bg-[#D4956A] text-white rounded-xl transition-colors duration-200 shadow-sm"
        >
          <Mail className="w-5 h-5" />
          <span>lexi_12122024@126.com</span>
        </a>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const { t } = React.useContext(LanguageContext);

  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-[#F0E6DC]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm text-gray-400">
          {t.footer.text}
        </p>
        <p className="text-xs text-gray-300 mt-1">
          {t.footer.subtext}
        </p>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [lang, setLang] = useState<Language>('zh');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className="min-h-screen bg-[#FDF8F3]">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
