import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { educationSteps } from '@/lib/index';
import { springGentle, springSnappy } from '../animations';

export function CurriculumSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="curriculum" className="edu-section bg-background">
      <div className="edu-container">
        <div className="text-center mb-10">
          <div className="edu-badge mb-3">
            <BookOpen className="w-4 h-4" /> 교육 커리큘럼
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            4단계 AI 아이디어 구체화 과정
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            이론보다는 워크숍 형태로 진행하여, 참가자가 자신의 실무 데이터를 직접 넣어보는 실습 중심 교육
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {educationSteps.map((step, i) => (
            <motion.button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`relative p-4 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] ${activeStep === i ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-card text-card-foreground border-border hover:border-primary/50'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-2xl mb-2">{step.icon}</div>
              <div className="text-xs font-semibold opacity-70 mb-1">Step {step.id}</div>
              <div className="text-sm font-bold leading-tight">{step.title}</div>
              {activeStep === i && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-primary-foreground/30"
                  layoutId="activeStepBorder"
                />
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={springGentle}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            <div className="edu-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${educationSteps[activeStep].color}`}>
                  {educationSteps[activeStep].icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">Step {educationSteps[activeStep].id}</div>
                  <h3 className="text-xl font-bold text-foreground">{educationSteps[activeStep].title}</h3>
                  <p className="text-sm text-primary font-medium">{educationSteps[activeStep].subtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {educationSteps[activeStep].description}
              </p>
              <div className="flex gap-2">
                {activeStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveStep((s) => s - 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                  >
                    이전 단계
                  </button>
                )}
                {activeStep < educationSteps.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveStep((s) => s + 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors ml-auto"
                  >
                    다음 단계 <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> 이 단계에서 해야 할 것
              </h4>
              <div className="space-y-3">
                {educationSteps[activeStep].detail.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...springSnappy, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-muted">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>학습 진행도</span>
                  <span>{(((activeStep + 1) / educationSteps.length) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeStep + 1) / educationSteps.length) * 100}%` }}
                    transition={springGentle}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
