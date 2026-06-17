import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDown, ChevronRight, Sparkles, Users, Play,
  Lightbulb, FlaskConical, Rocket,
} from 'lucide-react';
import { springGentle } from './animations';
import { NavMenuButton } from '@/components/nav/NavSidebar';

const workshopStepLinks = [
  { label: '1단계', sub: '아이디어 구체화', to: '/workshop/idea', icon: Lightbulb },
  { label: '2단계', sub: '예제 따라하기', to: '/workshop/example', icon: FlaskConical },
  { label: '3단계', sub: '내 아이디어 구현', to: '/workshop/implement', icon: Rocket },
] as const;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <NavMenuButton
              className={
                scrolled
                  ? undefined
                  : 'bg-white/10 border-white/25 text-white hover:bg-white/20'
              }
            />
            <Link to="/" className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className={`font-bold text-lg ${scrolled ? 'text-foreground' : 'text-white'}`}>
                AI 아이디어 스파크
              </span>
            </Link>
          </div>
          <Link
            to="/workshop"
            className={`hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] shadow-md ${
              scrolled
                ? 'bg-foreground text-background border border-border hover:opacity-90'
                : 'bg-white text-foreground shadow-[0_4px_20px_-4px_rgba(0,0,0,0.45)] border border-white/40 hover:bg-white/95'
            }`}
          >
            <Play className="w-3.5 h-3.5 shrink-0" /> 실습 시작
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, oklch(0.20 0.08 240) 0%, oklch(0.18 0.10 260) 40%, oklch(0.16 0.08 280) 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, oklch(0.62 0.22 240), transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, oklch(0.65 0.20 270), transparent 70%)' }}
        />
        <div
          className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, oklch(0.70 0.18 150), transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(oklch(0.98 0.004 240) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0.004 240) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springGentle, delay: 0.1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            AI 활용 교육 워크숍 | 2026년
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.2 }}
        >
          AI로 업무 아이디어를<br />
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            실제 제안서로 만들어보자
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.3 }}
        >
          단순 툴 사용법을 넘어서,{' '}
          <strong className="text-white/90">문제 정의 → 프롬프트 엔지니어링 → 비즈니스 가치 검증</strong>의
          체계적인 흐름으로 AI 아이디어를 구체화하는 방법을 배웁니다.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.4 }}
        >
          <Link
            to="/workshop"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
            style={{ boxShadow: '0 8px 30px -6px oklch(0.48 0.18 240 / 0.5)' }}
          >
            <Users className="w-5 h-5" /> 워크숍 실습 구성 <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.5 }}
        >
          {workshopStepLinks.map((step) => (
            <Link
              key={step.to}
              to={step.to}
              className="group p-5 rounded-xl bg-white/5 border border-white/10 text-center transition-all duration-200 hover:bg-white/10 hover:border-white/25 hover:scale-[1.02]"
            >
              <step.icon className="w-6 h-6 text-blue-300 mx-auto mb-3 group-hover:text-blue-200 transition-colors" />
              <div className="text-xl font-bold text-white">{step.label}</div>
              <div className="text-sm text-white/70 mt-1">{step.sub}</div>
            </Link>
          ))}
        </motion.div>
      </div>

      <Link
        to="/workshop"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors"
        aria-label="워크숍 실습 구성으로 이동"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="block">
          <ChevronDown className="w-6 h-6" />
        </motion.span>
      </Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-bold text-foreground">(주)제때 AI 아이디어 스파크</span>
        </div>
        <p className="text-sm text-muted-foreground">
          2026 교육 커리큘럼 · ChatGPT 활용 아이디어 구체화 워크숍
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}
