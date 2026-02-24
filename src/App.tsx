/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Rocket, 
  Target, 
  BookOpen, 
  Calculator, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  BarChart3, 
  RefreshCcw,
  Star,
  Zap,
  ShieldCheck,
  Trophy,
  ArrowLeft,
  Pencil,
  ThumbsUp,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getImage, saveImage } from './utils/db';

import { QUESTIONS, Question, Domain } from './data/questions';

// --- Components ---

const ProgressBar = ({ value, max, color = 'bg-[#00b06f]' }: { value: number, max: number, color?: string }) => (
  <div className="w-full bg-black/40 rounded-full h-6 p-1 border-2 border-white/10">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${(value / max) * 100}%` }}
      className={`h-full ${color} rounded-full shadow-inner`}
    />
  </div>
);

const Card = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`bg-[#393b3d]/90 backdrop-blur-sm border-2 border-white/10 rounded-xl p-6 shadow-lg ${className}`}
  >
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = ""
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger',
  disabled?: boolean,
  className?: string
}) => {
  const variants = {
    primary: "bg-white text-slate-900 border-b-4 border-slate-300 hover:bg-slate-50 active:border-b-0 active:translate-y-1",
    secondary: "bg-[#00b06f] text-white border-b-4 border-[#008c58] hover:bg-[#00c47c] active:border-b-0 active:translate-y-1",
    outline: "bg-transparent border-2 border-white/20 text-white hover:bg-white/10",
    ghost: "hover:bg-white/10 text-slate-300 hover:text-white",
    danger: "bg-[#ff3e3e] text-white border-b-4 border-[#cc3232] hover:bg-[#ff5c5c] active:border-b-0 active:translate-y-1"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-display font-bold text-lg transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const RobloxThumbnail = ({ title, fallback }: { title: string, fallback: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = `thumb_v4_${title}`;
    
    const loadAndGenerate = async () => {
      try {
        // Try to load from IndexedDB first
        const cached = await getImage(cacheKey);
        if (cached) {
          setImageUrl(cached);
          setLoading(false);
          return;
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.warn("Gemini API key missing, using fallback for", title);
          setImageUrl(fallback);
          setLoading(false);
          return;
        }

        // Add a small random delay to avoid hitting rate limits when many thumbnails load at once
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `3D cartoon Roblox game thumbnail for "${title}". A cute blocky Roblox character (avatar) with a big smile, wearing colorful clothes, in a vibrant 3D world. High-quality 3D render, bright colors, soft lighting, professional game cover art, blocky aesthetic, LEGO-like style, cartoonish proportions.` }],
          },
          config: {
            imageConfig: { aspectRatio: "1:1" },
          },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const url = `data:image/png;base64,${part.inlineData.data}`;
              setImageUrl(url);
              await saveImage(cacheKey, url);
              break;
            }
          }
        }
        
        // If we still don't have an image URL (e.g. no inlineData found), use fallback
        setImageUrl(prev => prev || fallback);
        
      } catch (error) {
        console.error("Image generation failed for", title, error);
        setImageUrl(fallback);
      } finally {
        setLoading(false);
      }
    };

    loadAndGenerate();
  }, [title, fallback]);

  if (loading) {
    return (
      <div className="w-full h-full bg-[#2b2d2f] flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-4 border-[#00A2FF] border-t-transparent rounded-full animate-spin" />
        <span className="text-[8px] font-black text-[#00A2FF] uppercase tracking-widest animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl || fallback} 
      alt={title} 
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
  );
};

const GameCard = ({ 
  title, 
  image, 
  winRate, 
  players, 
  onClick,
  progress,
  badge
}: { 
  title: string, 
  image: string, 
  winRate: number, 
  players: string, 
  onClick: () => void,
  progress?: number,
  badge?: 'NEW' | 'HOT' | 'UPDATE',
  key?: string | number
}) => (
  <div 
    onClick={onClick}
    className="group cursor-pointer space-y-2 w-full"
  >
    <div className="relative aspect-square overflow-hidden rounded-xl bg-[#393b3d] border border-white/5 shadow-md group-hover:scale-[1.02] transition-transform duration-200">
      <RobloxThumbnail title={title} fallback={image} />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60 group-hover:opacity-40 transition-opacity" />
      
      {/* Glossy Reflection */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      
      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-black text-white border border-white/10">
        OBBY
      </div>
      
      {badge && (
        <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-black text-white shadow-sm ${
          badge === 'NEW' ? 'bg-[#00b06f]' : badge === 'HOT' ? 'bg-[#ff3e3e]' : 'bg-[#00A2FF]'
        }`}>
          {badge}
        </div>
      )}

      {progress !== undefined && progress > 0 && (
        <div className="absolute bottom-2 left-2 right-2 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
          <div 
            className="h-full bg-[#00b06f] transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      )}
    </div>
    <div className="space-y-0.5 px-0.5">
      <h3 className="text-white font-display font-bold text-sm leading-tight group-hover:text-[#00A2FF] transition-colors line-clamp-2">
        {title}
      </h3>
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
        <div className="flex items-center gap-0.5">
          <ThumbsUp className="w-3 h-3 fill-slate-400/20" />
          <span>{winRate}%</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Users className="w-3 h-3 fill-slate-400/20" />
          <span>{players}</span>
        </div>
      </div>
    </div>
  </div>
);

interface Obby {
  id: string;
  title: string;
  domain: Domain;
  year: number;
  image: string;
  players: string;
  winRate: number;
  badge?: 'NEW' | 'HOT' | 'UPDATE';
}

const OBBYS: Obby[] = [
  { id: '2016-num', title: 'Maths Tycoon 2016', domain: 'Numeracy', year: 2016, image: 'https://picsum.photos/seed/roblox-math-cartoon-1/400/400', players: '12K+', winRate: 92, badge: 'HOT' },
  { id: '2016-lit', title: 'Word Sim 2016', domain: 'Literacy', year: 2016, image: 'https://picsum.photos/seed/roblox-word-cartoon-2/400/400', players: '8K+', winRate: 85 },
  { id: '2016-lc', title: 'Grammar Obby 2016', domain: 'Language Conventions', year: 2016, image: 'https://picsum.photos/seed/roblox-grammar-cartoon-3/400/400', players: '15K+', winRate: 88, badge: 'UPDATE' },
  { id: '2015-num', title: 'Maths Tycoon 2015', domain: 'Numeracy', year: 2015, image: 'https://picsum.photos/seed/roblox-math-cartoon-4/400/400', players: '10K+', winRate: 90 },
  { id: '2015-lit', title: 'Word Sim 2015', domain: 'Literacy', year: 2015, image: 'https://picsum.photos/seed/roblox-word-cartoon-5/400/400', players: '7K+', winRate: 82 },
  { id: '2015-lc', title: 'Grammar Obby 2015', domain: 'Language Conventions', year: 2015, image: 'https://picsum.photos/seed/roblox-grammar-cartoon-6/400/400', players: '11K+', winRate: 86 },
  { id: '2011-lc', title: 'Classic Grammar 2011', domain: 'Language Conventions', year: 2011, image: 'https://picsum.photos/seed/roblox-classic-cartoon-7/400/400', players: '5K+', winRate: 95, badge: 'NEW' },
];

// --- Main Application ---

const CelebrationOverlay = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      className="relative z-10 text-center space-y-4"
    >
      <div className="flex justify-center gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -50, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            <Star className="w-12 h-12 text-[#F5B324] fill-[#F5B324]" />
          </motion.div>
        ))}
      </div>
      <h2 className="text-7xl font-display font-black text-white drop-shadow-[0_5px_0_rgba(0,0,0,0.5)] italic">
        UNSTOPPABLE!
      </h2>
      <p className="text-2xl font-bold text-[#00b06f] bg-white px-6 py-2 rounded-full inline-block shadow-lg">
        +50 BONUS FUEL AWARDED
      </p>
    </motion.div>
    
    {/* Particle-like effect */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={`p-${i}`}
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: window.innerHeight + 100,
          opacity: 1
        }}
        animate={{ 
          y: -100,
          x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth),
          rotate: 360
        }}
        transition={{ 
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-4 h-4 rounded-sm"
        style={{ 
          backgroundColor: ['#00A2FF', '#00b06f', '#ff3e3e', '#F5B324'][Math.floor(Math.random() * 4)]
        }}
      />
    ))}
  </motion.div>
);

export default function App() {
  const [view, setView] = useState<'dashboard' | 'quiz' | 'results' | 'diagnostic'>('dashboard');
  const [currentModule, setCurrentModule] = useState<Domain | 'Diagnostic' | string | null>(null);
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('naplan_obby_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load stats", e);
      }
    }
    return {
      fuel: 0,
      rank: 'Noob',
      streak: 0,
      completedQuestions: [] as number[],
      domainScores: {
        Numeracy: { correct: 0, total: 0 },
        Literacy: { correct: 0, total: 0 },
        'Language Conventions': { correct: 0, total: 0 }
      },
      obbyProgress: {} as Record<string, { 
        started: boolean, 
        completed: boolean, 
        currentIndex: number,
        answers: { questionId: number, isCorrect: boolean }[]
      }>
    };
  });

  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    localStorage.setItem('naplan_obby_stats', JSON.stringify(userStats));
  }, [userStats]);

  const [quizState, setQuizState] = useState({
    currentIndex: 0,
    questions: [] as Question[],
    answers: [] as { questionId: number, isCorrect: boolean }[],
    showFeedback: false,
    selectedOption: null as number | null,
  });

  // Derived Rank
  const rank = useMemo(() => {
    const total = userStats.domainScores.Numeracy.total + userStats.domainScores.Literacy.total + userStats.domainScores['Language Conventions'].total;
    const correct = userStats.domainScores.Numeracy.correct + userStats.domainScores.Literacy.correct + userStats.domainScores['Language Conventions'].correct;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;

    if (total < 5) return 'Noob';
    if (accuracy > 90) return 'Obby Master';
    if (accuracy > 75) return 'Pro Gamer';
    if (accuracy > 50) return 'Explorer';
    return 'Guest';
  }, [userStats]);

  const startQuiz = (module: Domain | 'Diagnostic' | string) => {
    let filteredQuestions: Question[] = [];
    let savedProgress = userStats.obbyProgress[module];

    if (module === 'Diagnostic') {
      const num = QUESTIONS.filter(q => q.domain === 'Numeracy').sort(() => Math.random() - 0.5).slice(0, 7);
      const lit = QUESTIONS.filter(q => q.domain === 'Literacy').sort(() => Math.random() - 0.5).slice(0, 7);
      const lang = QUESTIONS.filter(q => q.domain === 'Language Conventions').sort(() => Math.random() - 0.5).slice(0, 6);
      filteredQuestions = [...num, ...lit, ...lang].sort(() => Math.random() - 0.5);
    } else {
      const obby = OBBYS.find(o => o.id === module);
      if (obby) {
        filteredQuestions = QUESTIONS.filter(q => q.domain === obby.domain && q.year === obby.year).sort((a, b) => a.id - b.id);
      } else {
        filteredQuestions = QUESTIONS.filter(q => q.domain === module).sort(() => Math.random() - 0.5);
      }
    }

    setQuizState({
      currentIndex: savedProgress?.currentIndex || 0,
      questions: filteredQuestions,
      answers: savedProgress?.answers || [],
      showFeedback: false,
      selectedOption: null,
    });
    setCurrentModule(module);
    setView(module === 'Diagnostic' ? 'diagnostic' : 'quiz');

    if (!savedProgress) {
      setUserStats(prev => ({
        ...prev,
        obbyProgress: {
          ...prev.obbyProgress,
          [module]: { started: true, completed: false, currentIndex: 0, answers: [] }
        }
      }));
    }
  };

  const saveProgress = () => {
    if (!currentModule) return;
    setUserStats(prev => ({
      ...prev,
      obbyProgress: {
        ...prev.obbyProgress,
        [currentModule]: {
          ...prev.obbyProgress[currentModule],
          currentIndex: quizState.currentIndex,
          answers: quizState.answers
        }
      }
    }));
    setView('dashboard');
  };

  const finishQuiz = () => {
    if (currentModule) {
      setUserStats(prev => ({
        ...prev,
        obbyProgress: {
          ...prev.obbyProgress,
          [currentModule]: {
            ...prev.obbyProgress[currentModule],
            completed: true,
            currentIndex: quizState.currentIndex,
            answers: quizState.answers
          }
        }
      }));
    }
    setView('results');
  };

  const handleAnswer = (optionIndex: number) => {
    if (quizState.showFeedback) return;

    const currentQuestion = quizState.questions[quizState.currentIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswer;

    setQuizState(prev => ({
      ...prev,
      selectedOption: optionIndex,
      showFeedback: true,
      answers: [...prev.answers, { questionId: currentQuestion.id, isCorrect }]
    }));

    if (isCorrect) {
      const newStreak = userStats.streak + 1;
      const triggerEasterEgg = newStreak === 10;

      setUserStats(prev => ({
        ...prev,
        fuel: triggerEasterEgg ? Math.min(prev.fuel + 50, 150) : Math.min(prev.fuel + 10, 100),
        streak: newStreak,
        domainScores: {
          ...prev.domainScores,
          [currentQuestion.domain]: {
            correct: prev.domainScores[currentQuestion.domain].correct + 1,
            total: prev.domainScores[currentQuestion.domain].total + 1
          }
        }
      }));

      if (triggerEasterEgg) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
      }
    } else {
      setUserStats(prev => ({
        ...prev,
        streak: 0,
        domainScores: {
          ...prev.domainScores,
          [currentQuestion.domain]: {
            ...prev.domainScores[currentQuestion.domain],
            total: prev.domainScores[currentQuestion.domain].total + 1
          }
        }
      }));
    }
  };

  const nextQuestion = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        showFeedback: false,
        selectedOption: null
      }));
    } else {
      finishQuiz();
    }
  };

  const renderDashboard = () => (
    <div className="max-w-5xl mx-auto space-y-12 relative pb-20">
      {/* Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-display font-black text-white tracking-tight flex items-center gap-3 drop-shadow-md">
            <div className="bg-white text-[#232527] p-2 rounded-lg">
              <Rocket className="w-8 h-8" />
            </div>
            NAPLAN Obby
          </h1>
          <p className="text-slate-300 text-xl font-medium">Welcome, <span className="text-[#00b06f] font-bold">{rank}</span>! Let's get some wins.</p>
        </div>
        <Card className="flex items-center gap-6 py-4 px-8 bg-[#232527] border-white/20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Robux (Fuel)</p>
            <div className="flex items-center gap-3 justify-center">
              <div className="bg-[#00b06f] p-1 rounded-full">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">{userStats.fuel}</span>
            </div>
          </div>
          <div className="w-0.5 h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Rank</p>
            <div className="flex items-center gap-3 justify-center">
              <Award className="w-6 h-6 text-[#F5B324]" />
              <span className="text-xl font-display font-bold text-white whitespace-nowrap">{rank}</span>
            </div>
          </div>
        </Card>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 flex flex-col justify-between border-white/10 bg-gradient-to-br from-[#393b3d] to-[#2b2d2f] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <RobloxThumbnail title="Diagnostic Obby" fallback="https://picsum.photos/seed/diagnostic/800/400" />
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#F5B324] text-black text-[10px] font-black rounded-full shadow-lg rotate-3 z-10">
            FEATURED
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-[#00A2FF] p-2 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold">Diagnostic Obby</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              New player? Run this 20-question obstacle course to test your skills in Maths and English!
            </p>
          </div>
          <Button onClick={() => startQuiz('Diagnostic')} className="mt-8 w-full md:w-auto" variant="primary">
            Start Obby
            <ChevronRight className="w-6 h-6" />
          </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center text-center space-y-4 border-[#F5B324]/30 bg-[#F5B324]/10">
          <div className="p-4 bg-[#F5B324] rounded-xl shadow-lg rotate-3">
            <Trophy className="w-10 h-10 text-white fill-white" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-display font-bold text-[#F5B324]">Daily Quest</h3>
            <p className="text-sm text-slate-300 font-medium">Complete 5 questions for bonus loot!</p>
          </div>
          <ProgressBar value={Math.min(userStats.domainScores.Numeracy.total + userStats.domainScores.Literacy.total, 5)} max={5} color="bg-[#F5B324]" />
        </Card>
      </div>

      {/* New Obbys */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-display font-bold text-white">New Obbys</h2>
          <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {OBBYS.filter(o => !userStats.obbyProgress[o.id]?.started).map(obby => (
            <GameCard 
              key={obby.id}
              title={obby.title}
              image={obby.image}
              winRate={obby.winRate}
              players={obby.players}
              onClick={() => startQuiz(obby.id)}
              badge={obby.badge}
            />
          ))}
        </div>
      </div>

      {/* Continue your Obby */}
      {Object.values(userStats.obbyProgress).some((p: any) => p.started && !p.completed) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-display font-bold text-white">Continue your Obby</h2>
            <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
              See All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {OBBYS.filter(o => userStats.obbyProgress[o.id]?.started && !userStats.obbyProgress[o.id]?.completed).map(obby => {
            const progress = userStats.obbyProgress[obby.id];
            const questions = QUESTIONS.filter(q => q.domain === obby.domain && q.year === obby.year);
            const percent = questions.length > 0 ? (progress.currentIndex / questions.length) * 100 : 0;
            return (
              <GameCard 
                key={obby.id}
                title={obby.title}
                image={obby.image}
                winRate={obby.winRate}
                players={obby.players}
                onClick={() => startQuiz(obby.id)}
                progress={percent}
                badge={obby.badge}
              />
            );
          })}
        </div>
        </div>
      )}

      {/* Completed Obbys */}
      {Object.values(userStats.obbyProgress).some((p: any) => p.completed) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-display font-bold text-white">Completed Obbys</h2>
            <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
              See All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {OBBYS.filter(o => userStats.obbyProgress[o.id]?.completed).map(obby => (
              <GameCard 
                key={obby.id}
                title={obby.title}
                image={obby.image}
                winRate={obby.winRate}
                players={obby.players}
                onClick={() => startQuiz(obby.id)}
                badge={obby.badge}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = quizState.questions[quizState.currentIndex];
    if (!currentQuestion) return null;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" onClick={saveProgress} className="px-2">
            <ArrowLeft className="w-6 h-6" />
            Save & Exit
          </Button>
          <div className="flex items-center gap-4 bg-[#232527] px-4 py-2 rounded-xl border border-white/10">
            <span className="text-sm font-display font-bold text-slate-300">Stage {quizState.currentIndex + 1}/{quizState.questions.length}</span>
            <div className="w-32">
              <ProgressBar value={quizState.currentIndex + 1} max={quizState.questions.length} color="bg-[#00A2FF]" />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <Card className="p-8 space-y-8 min-h-[400px] flex flex-col justify-center border-t-4 border-t-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#232527] text-[#00A2FF] text-xs font-black rounded-lg uppercase tracking-widest border border-white/10">
                    {currentQuestion.category}
                  </span>
                  <span className="text-slate-500 text-xs font-black">///</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">{currentQuestion.skill}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white leading-tight drop-shadow-sm">
                  {currentQuestion.text}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = quizState.selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const showResult = quizState.showFeedback;

                  let buttonClass = "bg-[#2b2d2f] border-b-4 border-black/40 hover:bg-[#393b3d] hover:border-black/60";
                  if (showResult) {
                    if (isCorrect) buttonClass = "bg-[#00b06f] border-b-4 border-[#008c58] text-white";
                    else if (isSelected) buttonClass = "bg-[#ff3e3e] border-b-4 border-[#cc3232] text-white";
                    else buttonClass = "opacity-50 bg-[#2b2d2f] border-b-4 border-black/20";
                  } else if (isSelected) {
                    buttonClass = "bg-[#00A2FF] border-b-4 border-[#007acc] text-white";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showResult}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full p-5 rounded-xl text-left font-display font-bold text-lg transition-all flex items-center justify-between group active:scale-[0.99] active:border-b-0 active:translate-y-1 ${buttonClass}`}
                    >
                      <span>{option}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-8 h-8 text-white drop-shadow-md" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-8 h-8 text-white drop-shadow-md" />}
                    </button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {quizState.showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card className={`p-6 border-l-8 ${quizState.selectedOption === currentQuestion.correctAnswer ? 'border-l-[#00b06f] bg-[#00b06f]/10' : 'border-l-[#ff3e3e] bg-[#ff3e3e]/10'}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${quizState.selectedOption === currentQuestion.correctAnswer ? 'bg-[#00b06f]' : 'bg-[#ff3e3e]'}`}>
                    {quizState.selectedOption === currentQuestion.correctAnswer ? (
                      <Star className="w-6 h-6 text-white fill-white" />
                    ) : (
                      <ShieldCheck className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-display font-black text-xl ${quizState.selectedOption === currentQuestion.correctAnswer ? 'text-[#00b06f]' : 'text-[#ff3e3e]'}`}>
                      {quizState.selectedOption === currentQuestion.correctAnswer ? 'GG! Correct!' : 'Oof! Try this:'}
                    </h4>
                    <p className="text-slate-200 text-md font-medium leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </Card>
              <Button onClick={nextQuestion} className="w-full py-5 text-2xl" variant="primary">
                {quizState.currentIndex === quizState.questions.length - 1 ? 'Finish Obby' : 'Next Stage'}
                <ChevronRight className="w-8 h-8" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderResults = () => {
    const correctCount = quizState.answers.filter(a => a.isCorrect).length;
    const totalCount = quizState.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    // Calculate strengths and weaknesses
    const categoryStats = quizState.questions.reduce((acc, q) => {
      if (!acc[q.category]) acc[q.category] = { correct: 0, total: 0 };
      acc[q.category].total++;
      if (quizState.answers.find(a => a.questionId === q.id)?.isCorrect) {
        acc[q.category].correct++;
      }
      return acc;
    }, {} as Record<string, { correct: number, total: number }>);

    const strengths = (Object.entries(categoryStats) as [string, { correct: number, total: number }][])
      .filter(([_, stats]) => (stats.correct / stats.total) >= 0.8)
      .map(([cat]) => cat);

    const weaknesses = (Object.entries(categoryStats) as [string, { correct: number, total: number }][])
      .filter(([_, stats]) => (stats.correct / stats.total) < 0.6)
      .map(([cat]) => cat);

    return (
      <div className="max-w-3xl mx-auto space-y-8 text-center pb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="inline-block p-8 bg-[#F5B324] rounded-3xl shadow-[0_10px_0_rgba(0,0,0,0.2)] mb-4 rotate-6">
            <Trophy className="w-24 h-24 text-white fill-white drop-shadow-md" />
          </div>
          <h1 className="text-6xl font-display font-black text-white drop-shadow-lg">VICTORY!</h1>
          <p className="text-2xl text-slate-300 font-medium">
            {percentage >= 80 ? "You are a LEGEND!" : "Good game! Ready for round 2?"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-2 bg-[#00A2FF]/10 border-[#00A2FF]/30">
            <p className="text-xs font-black text-[#00A2FF] uppercase tracking-widest">Accuracy</p>
            <p className="text-5xl font-display font-black text-white">{percentage}%</p>
          </Card>
          <Card className="space-y-2 bg-[#00b06f]/10 border-[#00b06f]/30">
            <p className="text-xs font-black text-[#00b06f] uppercase tracking-widest">Score</p>
            <p className="text-5xl font-display font-black text-white">{correctCount}/{totalCount}</p>
          </Card>
          <Card className="space-y-2 bg-[#F5B324]/10 border-[#F5B324]/30">
            <p className="text-xs font-black text-[#F5B324] uppercase tracking-widest">Loot</p>
            <p className="text-5xl font-display font-black text-white">+{correctCount * 10}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 text-left space-y-4 border-[#00b06f]/30 bg-[#00b06f]/5">
            <div className="flex items-center gap-3 text-[#00b06f]">
              <Star className="w-8 h-8 fill-[#00b06f]" />
              <h3 className="text-2xl font-display font-black">Pro Skills</h3>
            </div>
            {strengths.length > 0 ? (
              <ul className="space-y-3">
                {strengths.map(cat => (
                  <li key={cat} className="flex items-center gap-3 text-slate-200 font-bold bg-black/20 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-[#00b06f]" />
                    {cat}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm font-medium">Keep grinding to get those skills up!</p>
            )}
          </Card>

          <Card className="p-6 text-left space-y-4 border-[#F5B324]/30 bg-[#F5B324]/5">
            <div className="flex items-center gap-3 text-[#F5B324]">
              <Target className="w-8 h-8" />
              <h3 className="text-2xl font-display font-black">Needs Practice</h3>
            </div>
            {weaknesses.length > 0 ? (
              <ul className="space-y-3">
                {weaknesses.map(cat => (
                  <li key={cat} className="flex items-center gap-3 text-slate-200 font-bold bg-black/20 p-2 rounded-lg">
                    <RefreshCcw className="w-5 h-5 text-[#F5B324]" />
                    {cat}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm font-medium">No weaknesses? You're hacking! (Just kidding, great job!)</p>
            )}
          </Card>
        </div>

        <Card className="p-8 space-y-6">
          <h3 className="text-3xl font-display font-black text-white">Stats</h3>
          <div className="space-y-6">
            {(['Numeracy', 'Literacy', 'Language Conventions'] as const).map(domain => {
              const domainQuestions = quizState.questions.filter(q => q.domain === domain);
              if (domainQuestions.length === 0) return null;
              
              const domainCorrect = quizState.answers.filter(a => {
                const q = quizState.questions.find(quest => quest.id === a.questionId);
                return q?.domain === domain && a.isCorrect;
              }).length;
              const domainTotal = domainQuestions.length;
              const domainPercent = Math.round((domainCorrect / domainTotal) * 100);

              let color = 'bg-[#00b06f]'; // Numeracy
              let textColor = 'text-[#00b06f]';
              if (domain === 'Literacy') {
                color = 'bg-[#00A2FF]';
                textColor = 'text-[#00A2FF]';
              } else if (domain === 'Language Conventions') {
                color = 'bg-[#F5B324]';
                textColor = 'text-[#F5B324]';
              }

              return (
                <div key={domain} className="space-y-2">
                  <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                    <span className="text-slate-300">{domain}</span>
                    <span className={domainPercent > 70 ? 'text-[#00b06f]' : domainPercent > 40 ? 'text-[#F5B324]' : 'text-[#ff3e3e]'}>
                      {domainPercent}%
                    </span>
                  </div>
                  <ProgressBar value={domainCorrect} max={domainTotal} color={color} />
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <Button onClick={() => setView('dashboard')} variant="outline" className="w-full md:w-auto">
            Back to Lobby
          </Button>
          <Button onClick={() => startQuiz(currentModule || 'Diagnostic')} className="w-full md:w-auto" variant="primary">
            <RefreshCcw className="w-6 h-6" />
            Replay Obby
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white selection:bg-[#00A2FF]/30 pb-20">
      <AnimatePresence>
        {showEasterEgg && <CelebrationOverlay />}
      </AnimatePresence>
      <main className="relative z-10 container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {renderDashboard()}
            </motion.div>
          )}
          {(view === 'quiz' || view === 'diagnostic') && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderQuiz()}
            </motion.div>
          )}
          {view === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {renderResults()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-slate-500 text-xs font-bold bg-[#232527]/90 backdrop-blur-md border-t border-white/10">
        <p>NAPLAN Obby v1.0 • Made for Legends</p>
      </footer>
    </div>
  );
}
