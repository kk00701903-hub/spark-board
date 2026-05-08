import { motion } from 'framer-motion';
import {
  Award, Users, Code2, ExternalLink, FileText, Zap, ChevronRight, TrendingUp, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { caseStudyStats } from '@/lib/index';
import { springSnappy } from '../animations';

export function CaseStudySection() {
  return (
    <section id="casestudy" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Award className="w-4 h-4" /> 실제 성공 사례
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            나라장터 공고 AI 자동 분석 시스템
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            영업지원팀에서 제안한 실제 AI 아이디어. 나라장터 물류 공고 수작업 분석을{' '}
            <strong className="text-foreground">Gemini API + Python</strong>으로 완전 자동화한 사례
          </p>
        </div>

        <div
          className="mb-12 p-6 rounded-2xl border border-border bg-card overflow-hidden relative"
          style={{ boxShadow: '0 8px 30px -6px oklch(0.48 0.18 240 / 0.08)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" />
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { label: '제출자', value: '영업지원팀', icon: Users },
              { label: '적용 기술', value: 'Gemini API + Python', icon: Code2 },
              { label: '연계 시스템', value: '나라장터 Open API', icon: ExternalLink },
              { label: '자동 발송', value: 'Microsoft Outlook', icon: FileText },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className="text-sm font-semibold text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> AI 해결 시나리오 흐름도
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { step: '01', title: '나라장터 API', desc: '일평균 1,200건\n용역 공고 자동 추출', icon: '📥', color: 'from-blue-500 to-blue-600' },
              { step: '02', title: '멀티 스테이지 필터링', desc: '물류 60종 키워드\n예산/면허 자동 스크리닝', icon: '🔽', color: 'from-purple-500 to-purple-600' },
              { step: '03', title: 'Gemini AI 과업 분석', desc: '첨부파일 자동 분석\n5대 사업 적합성 판별', icon: '🤖', color: 'from-green-500 to-green-600' },
              { step: '04', title: '자동 보고서 발송', desc: 'PDF+Excel 생성\nOutlook 자동 메일 발송', icon: '📧', color: 'from-orange-500 to-orange-600' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div
                  className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors h-full"
                  style={{ boxShadow: '0 4px 12px -4px oklch(0.48 0.18 240 / 0.06)' }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl mb-3`}>
                    {item.icon}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Step {item.step}</div>
                  <div className="text-sm font-bold text-foreground mb-2">{item.title}</div>
                  <div className="text-xs text-muted-foreground whitespace-pre-line">{item.desc}</div>
                </div>
                {i < 3 && (
                  <div className="hidden md:flex absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 w-3 h-3 bg-primary rounded-full items-center justify-center">
                    <ChevronRight className="w-2 h-2 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" /> 도입 전·후 비교 (23~25년 분석 사례 기준)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseStudyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSnappy, delay: i * 0.08 }}
                className="p-5 rounded-xl bg-card border border-border hover:border-green-500/40 transition-all duration-200 hover:shadow-md"
              >
                <div className="text-xs text-muted-foreground mb-3 font-medium">{stat.label}</div>
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <span className="line-through opacity-70">{stat.before}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="font-semibold">{stat.after}</span>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold text-center border border-green-200">
                  {stat.reduction}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
