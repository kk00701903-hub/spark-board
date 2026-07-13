import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Copy, Check, Lightbulb } from 'lucide-react';
import { promptTemplates } from '@/lib/index';
import { springGentle } from '../animations';

export function PromptTemplatesSection() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptTemplates[activePrompt].prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    'Context Setting': 'bg-primary/10 text-primary',
    'Idea Expansion': 'bg-accent/10 text-accent',
    'Business Structuring': 'bg-chart-3/15 text-chart-3',
    'Critical Thinking': 'bg-chart-4/15 text-chart-4',
  };

  return (
    <section id="prompts" className="edu-section">
      <div className="edu-container">
        <div className="text-center mb-10">
          <div className="edu-badge mb-3">
            <Code2 className="w-4 h-4" /> 프롬프트 템플릿
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            복사해서 바로 쓰는 프롬프트
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            검증된 4가지 프롬프트 템플릿으로 AI와의 대화를 더 효과적으로 만들어 보세요
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            {promptTemplates.map((template, i) => (
              <motion.button
                key={template.title}
                type="button"
                onClick={() => setActivePrompt(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${activePrompt === i ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow-sm'}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${activePrompt === i ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-sm leading-tight">{template.title}</div>
                    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${activePrompt === i ? 'bg-white/20 text-primary-foreground' : categoryColors[template.category] || 'bg-muted text-muted-foreground'}`}>
                      {template.category}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePrompt}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={springGentle}
                className="edu-card overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">prompt_template.txt</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? '복사됨!' : '복사하기'}
                  </button>
                </div>

                <div className="p-6">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed bg-muted/30 rounded-xl p-4 overflow-auto max-h-72">
                    {promptTemplates[activePrompt].prompt}
                  </pre>
                </div>

                <div className="mx-6 mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-primary mb-1">활용 팁</div>
                    <p className="text-sm text-muted-foreground">{promptTemplates[activePrompt].tip}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
