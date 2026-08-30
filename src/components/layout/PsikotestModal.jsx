import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X, Clock, CheckCircle2, AlertCircle, Bookmark, ChevronLeft, ChevronRight,
  RotateCcw, Play, Award, BarChart3, BookOpen, Calculator, Shapes, FileCheck,
  ShieldAlert, Sparkles, HelpCircle, Check, Flag, Zap, ArrowRight, History
} from 'lucide-react';
import {
  PSIKOTEST_CATEGORIES,
  PSIKOTEST_QUESTIONS,
  generatePsychotestFeedback
} from '../../data/psikotestData';
import { soundFx } from '../../utils/audio';

export default function PsikotestModal({ isOpen, onClose }) {
  // Views: 'menu' | 'exam' | 'result' | 'review'
  const [view, setView] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [bookmarked, setBookmarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeAllocated, setTotalTimeAllocated] = useState(0);
  const [historyScores, setHistoryScores] = useState([]);
  const timerRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rifai_psikotest_history');
      if (saved) {
        setHistoryScores(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Timer countdown handler
  useEffect(() => {
    if (view === 'exam' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [view, timeLeft]);

  // Start new test session
  const startSession = (mode = 'full', catKey = 'all') => {
    soundFx.playCardClick();
    let qList = [];

    if (mode === 'category' && catKey !== 'all') {
      qList = PSIKOTEST_QUESTIONS.filter((q) => q.category === catKey);
    } else if (mode === 'speed') {
      qList = PSIKOTEST_QUESTIONS.filter((q) => q.category === 'clerical');
    } else {
      // Full mock exam: take random balanced mix
      qList = [...PSIKOTEST_QUESTIONS].sort(() => 0.5 - Math.random());
    }

    // Shuffle options if desired or keep standard
    setActiveQuestions(qList);
    setCurrentIndex(0);
    setUserAnswers({});
    setBookmarked({});

    // Set duration
    let durationSec = 10 * 60; // 10 mins default for mock
    if (mode === 'speed') durationSec = 90; // 90s speed sprint
    else if (mode === 'category') durationSec = qList.length * 45;

    setTimeLeft(durationSec);
    setTotalTimeAllocated(durationSec);
    setView('exam');
  };

  const handleSelectAnswer = (optIndex) => {
    soundFx.playCardClick();
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  const toggleBookmark = () => {
    soundFx.playHover();
    setBookmarked((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const handleFinishExam = () => {
    soundFx.playCardClick();
    clearInterval(timerRef.current);

    // Calculate score
    let correctCount = 0;
    const catStats = {
      numerical: { correct: 0, total: 0 },
      verbal: { correct: 0, total: 0 },
      figural: { correct: 0, total: 0 },
      clerical: { correct: 0, total: 0 },
      sjt: { correct: 0, total: 0 }
    };

    activeQuestions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (isCorrect) correctCount++;
      if (catStats[q.category]) {
        catStats[q.category].total++;
        if (isCorrect) catStats[q.category].correct++;
      }
    });

    const totalScore = Math.round((correctCount / (activeQuestions.length || 1)) * 100);

    const categoryPercentages = {};
    Object.keys(catStats).forEach((cat) => {
      const c = catStats[cat];
      categoryPercentages[cat] = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 100;
    });

    const resultRecord = {
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      score: totalScore,
      correct: correctCount,
      total: activeQuestions.length,
      timeSpent: totalTimeAllocated - timeLeft,
      categoryScores: categoryPercentages
    };

    try {
      const updated = [resultRecord, ...historyScores].slice(0, 10);
      setHistoryScores(updated);
      localStorage.setItem('rifai_psikotest_history', JSON.stringify(updated));
    } catch {}

    setView('result');
  };

  // Format MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Result metrics
  const resultStats = useMemo(() => {
    if (view !== 'result' && view !== 'review') return null;
    let correctCount = 0;
    const catStats = {
      numerical: { correct: 0, total: 0 },
      verbal: { correct: 0, total: 0 },
      figural: { correct: 0, total: 0 },
      clerical: { correct: 0, total: 0 },
      sjt: { correct: 0, total: 0 }
    };

    activeQuestions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (isCorrect) correctCount++;
      if (catStats[q.category]) {
        catStats[q.category].total++;
        if (isCorrect) catStats[q.category].correct++;
      }
    });

    const totalScore = Math.round((correctCount / (activeQuestions.length || 1)) * 100);
    const categoryPercentages = {};
    Object.keys(catStats).forEach((cat) => {
      const c = catStats[cat];
      categoryPercentages[cat] = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 100;
    });

    const feedback = generatePsychotestFeedback(categoryPercentages, totalScore);

    return {
      totalScore,
      correctCount,
      totalQuestions: activeQuestions.length,
      categoryPercentages,
      catStats,
      feedback
    };
  }, [view, activeQuestions, userAnswers]);

  if (!isOpen) return null;

  const currentQ = activeQuestions[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--card-border)',
          borderRadius: '24px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px 24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          position: 'relative',
          color: 'var(--ink)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={() => {
            soundFx.playCardClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--surface-chip)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--ink)',
            zIndex: 10
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* ========================================================= */}
        {/* VIEW 1: MENU & MODE SELECTION */}
        {/* ========================================================= */}
        {view === 'menu' && (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '20px', paddingRight: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--folio-blue)',
                  background: 'var(--surface-chip)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  Interactive In-App Simulator
                </span>
                <span style={{ fontSize: '11px', color: 'var(--folio-mute)', fontFamily: 'var(--font-mono)' }}>
                  BCA • Mandiri • BRI • BNI • BI
                </span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--folio-ink)', margin: '0 0 6px' }}>
                Psikotes Perbankan & ODP Assessment Arena
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--folio-mute)', margin: 0 }}>
                Platform latihan simulasi psikotes terstandar perbankan nasional. Dilengkapi bank soal terverifikasi, timer ketat, analisis radar keahlian, dan rekomendasi strategi perbaikan personal.
              </p>
            </div>

            {/* Test Modes Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '22px' }}>
              {/* Mode 1: Full Mock Exam */}
              <div
                onClick={() => startSession('full')}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.02) 100%)',
                  border: '1.5px solid rgba(37,99,235,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
                className="mode-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={18} />
                  </div>
                  <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#2563eb', background: 'rgba(37,99,235,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    RECOMMENDED
                  </span>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                    Simulasi Lengkap ODP/MT
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--folio-mute)', lineHeight: 1.45 }}>
                    Campuran seimbang 5 modul (Numerik, Verbal, Figural, Ketelitian, SJT) dengan batas waktu 10 menit.
                  </p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>
                  <span>Mulai Simulasi Ujian</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Mode 2: Speed Sprint Ketelitian */}
              <div
                onClick={() => startSession('speed')}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--card-border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
                className="mode-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={18} />
                  </div>
                  <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ea580c', background: 'rgba(234,88,12,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    SPEED ATTACK
                  </span>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                    Speed Sprint Ketelitian
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--folio-mute)', lineHeight: 1.45 }}>
                    Latihan kilat 90 detik fokus pada verifikasi nomor rekening nasabah dan pencocokan data clerical.
                  </p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#ea580c' }}>
                  <span>Mulai Speed Sprint</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* Category Drill Section */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--folio-mute)', letterSpacing: '0.8px', marginBottom: '10px' }}>
                Latihan Terfokus Per Modul:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '8px' }}>
                {Object.values(PSIKOTEST_CATEGORIES).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => startSession('category', cat.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: 'var(--surface-sunken)',
                      border: '1px solid var(--card-border)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--folio-ink)',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{cat.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Score History Preview */}
            {historyScores.length > 0 && (
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--folio-mute)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <History size={12} />
                  <span>Riwayat Nilai Terakhir:</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {historyScores.slice(0, 4).map((rec, i) => (
                    <div key={i} style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--surface-card)', border: '1px solid var(--card-border)', minWidth: '110px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: rec.score >= 80 ? '#10b981' : rec.score >= 65 ? '#2563eb' : '#ef4444' }}>
                        {rec.score} <span style={{ fontSize: '11px', color: 'var(--folio-mute)' }}>/100</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--folio-mute)', fontFamily: 'var(--font-mono)' }}>{rec.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: TEST RUNNER (EXAM MODE) */}
        {/* ========================================================= */}
        {view === 'exam' && currentQ && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Top Examination Meta Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--card-border)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: PSIKOTEST_CATEGORIES[currentQ.category]?.color || 'var(--folio-blue)',
                  background: 'var(--surface-sunken)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  {PSIKOTEST_CATEGORIES[currentQ.category]?.shortName} • Soal {currentIndex + 1} / {activeQuestions.length}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--folio-mute)', fontFamily: 'var(--font-mono)' }}>
                  {currentQ.type}
                </span>
              </div>

              {/* Countdown Clock */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '8px',
                background: timeLeft < 120 ? 'rgba(239, 68, 68, 0.12)' : 'var(--surface-sunken)',
                color: timeLeft < 120 ? '#ef4444' : 'var(--folio-ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                border: timeLeft < 120 ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--card-border)',
                animation: timeLeft < 60 ? 'pulse 1s infinite' : 'none'
              }}>
                <Clock size={13} />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Question Matrix Drawer */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '8px', background: 'var(--surface-sunken)', borderRadius: '10px' }}>
              {activeQuestions.map((q, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentIndex;
                const isFlagged = bookmarked[idx];

                let bg = 'var(--surface-card)';
                let color = 'var(--folio-mute)';
                let border = '1px solid var(--card-border)';

                if (isCurrent) {
                  bg = 'var(--folio-blue)';
                  color = '#ffffff';
                  border = '1px solid var(--folio-blue)';
                } else if (isFlagged) {
                  bg = '#f59e0b';
                  color = '#ffffff';
                  border = '1px solid #f59e0b';
                } else if (isAnswered) {
                  bg = 'rgba(16, 185, 129, 0.15)';
                  color = '#10b981';
                  border = '1px solid rgba(16, 185, 129, 0.4)';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playCardClick();
                      setCurrentIndex(idx);
                    }}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      background: bg,
                      color: color,
                      border: border,
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Question Box */}
            <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'var(--surface-card)', border: '1px solid var(--card-border)', minHeight: '140px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--folio-ink)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                {currentQ.question}
              </p>
            </div>

            {/* Answer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D, E

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(optIdx)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(37, 99, 235, 0.1)' : 'var(--surface-card)',
                      border: isSelected ? '1.5px solid var(--folio-blue)' : '1px solid var(--card-border)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--folio-blue)' : 'var(--surface-sunken)',
                      color: isSelected ? '#ffffff' : 'var(--folio-mute)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {letter}
                    </span>
                    <span style={{ fontSize: '13.5px', color: isSelected ? 'var(--folio-ink)' : 'var(--folio-body)', fontWeight: isSelected ? 600 : 400 }}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '12px', borderTop: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  disabled={currentIndex === 0}
                  onClick={() => {
                    soundFx.playCardClick();
                    setCurrentIndex((p) => Math.max(0, p - 1));
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'var(--surface-sunken)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--folio-ink)',
                    cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentIndex === 0 ? 0.4 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  <ChevronLeft size={14} />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={toggleBookmark}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: bookmarked[currentIndex] ? 'rgba(245, 158, 11, 0.15)' : 'var(--surface-sunken)',
                    border: bookmarked[currentIndex] ? '1px solid #f59e0b' : '1px solid var(--card-border)',
                    color: bookmarked[currentIndex] ? '#f59e0b' : 'var(--folio-mute)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  <Bookmark size={13} fill={bookmarked[currentIndex] ? '#f59e0b' : 'none'} />
                  <span>{bookmarked[currentIndex] ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {currentIndex < activeQuestions.length - 1 ? (
                  <button
                    onClick={() => {
                      soundFx.playCardClick();
                      setCurrentIndex((p) => Math.min(activeQuestions.length - 1, p + 1));
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'var(--folio-blue)',
                      border: 'none',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishExam}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      background: '#10b981',
                      border: 'none',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}
                  >
                    <Check size={14} />
                    <span>Selesai & Nilai</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: RESULTS & AI PERFORMANCE COACHING */}
        {/* ========================================================= */}
        {view === 'result' && resultStats && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Score Banner */}
            <div style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(16,185,129,0.08) 100%)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: resultStats.feedback.badgeColor
                }}>
                  {resultStats.feedback.gradeTitle}
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--folio-ink)', margin: '4px 0 6px' }}>
                  Nilai Akhir: {resultStats.totalScore} <span style={{ fontSize: '14px', color: 'var(--folio-mute)', fontWeight: 500 }}>/ 100</span>
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--folio-body)', margin: 0, maxWidth: '420px' }}>
                  {resultStats.feedback.summary}
                </p>
              </div>

              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: resultStats.feedback.badgeColor,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                boxShadow: `0 8px 24px ${resultStats.feedback.badgeColor}40`
              }}>
                {resultStats.feedback.grade}
              </div>
            </div>

            {/* Radar / Category Performance Bars */}
            <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
              <h4 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--folio-mute)', margin: '0 0 14px' }}>
                Distribusi Skor Per Kategori:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.keys(PSIKOTEST_CATEGORIES).map((catKey) => {
                  const cat = PSIKOTEST_CATEGORIES[catKey];
                  const percentage = resultStats.categoryPercentages[catKey] ?? 100;
                  const stat = resultStats.catStats[catKey];

                  return (
                    <div key={catKey}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--folio-ink)', marginBottom: '4px' }}>
                        <span>{cat.name} ({stat ? `${stat.correct}/${stat.total}` : '-'})</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: percentage >= 75 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444' }}>
                          {percentage}%
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '7px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', background: cat.color, borderRadius: '4px', transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actionable Feedback & Strategy Recommendations */}
            <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={16} color="var(--folio-blue)" />
                <h4 style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--folio-blue)', margin: 0 }}>
                  Rekomendasi Strategi & Langkah Perbaikan:
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {resultStats.feedback.recommendations.map((rec, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', fontSize: '12.5px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--folio-ink)', marginBottom: '2px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{rec.category}</span>
                      <span style={{ fontSize: '11px', color: rec.status.includes('Sangat') || rec.status.includes('Kuat') || rec.status.includes('Unggul') ? '#10b981' : '#f59e0b' }}>
                        {rec.status}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--folio-body)', lineHeight: 1.45 }}>{rec.advice}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Review Answers or Retake */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  soundFx.playCardClick();
                  setCurrentIndex(0);
                  setView('review');
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--folio-blue)',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <BookOpen size={16} />
                <span>Lihat Pembahasan Lengkap</span>
              </button>

              <button
                onClick={() => setView('menu')}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--folio-ink)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={15} />
                <span>Menu Latihan</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: STEP-BY-STEP REVIEW MODE */}
        {/* ========================================================= */}
        {view === 'review' && currentQ && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--card-border)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--folio-blue)' }}>
                Pembahasan Soal {currentIndex + 1} / {activeQuestions.length} ({PSIKOTEST_CATEGORIES[currentQ.category]?.shortName})
              </span>
              <button
                onClick={() => setView('result')}
                style={{ background: 'none', border: 'none', color: 'var(--folio-blue)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
              >
                Kembali ke Skor
              </button>
            </div>

            {/* Question Box */}
            <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
              <p style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--folio-ink)', margin: 0, whiteSpace: 'pre-line' }}>
                {currentQ.question}
              </p>
            </div>

            {/* Options with Correct vs User answer indicators */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentQ.options.map((opt, optIdx) => {
                const isCorrect = optIdx === currentQ.correctIndex;
                const isUserChosen = userAnswers[currentIndex] === optIdx;

                let border = '1px solid var(--card-border)';
                let bg = 'var(--surface-card)';
                let badge = null;

                if (isCorrect) {
                  border = '1.5px solid #10b981';
                  bg = 'rgba(16, 185, 129, 0.1)';
                  badge = <CheckCircle2 size={16} color="#10b981" />;
                } else if (isUserChosen && !isCorrect) {
                  border = '1.5px solid #ef4444';
                  bg = 'rgba(239, 68, 68, 0.1)';
                  badge = <AlertCircle size={16} color="#ef4444" />;
                }

                return (
                  <div
                    key={optIdx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: bg,
                      border: border,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--folio-mute)' }}>
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span style={{ color: isCorrect ? '#10b981' : isUserChosen ? '#ef4444' : 'var(--folio-body)', fontWeight: isCorrect ? 600 : 400 }}>
                        {opt}
                      </span>
                    </div>
                    {badge}
                  </div>
                );
              })}
            </div>

            {/* Step-by-Step Explanation Box */}
            <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', marginBottom: '6px' }}>
                <HelpCircle size={13} />
                <span>Kunci & Langkah Pembahasan:</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--folio-body)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre-line' }}>
                {currentQ.explanation}
              </p>
            </div>

            {/* Bottom Nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--folio-ink)',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === 0 ? 0.4 : 1,
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Sebelumnya
              </button>

              <button
                disabled={currentIndex === activeQuestions.length - 1}
                onClick={() => setCurrentIndex((p) => Math.min(activeQuestions.length - 1, p + 1))}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'var(--folio-blue)',
                  border: 'none',
                  color: '#ffffff',
                  cursor: currentIndex === activeQuestions.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === activeQuestions.length - 1 ? 0.4 : 1,
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
