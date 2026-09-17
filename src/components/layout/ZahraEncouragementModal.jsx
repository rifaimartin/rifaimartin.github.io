import React, { useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, X, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/audio';

export default function ZahraEncouragementModal({ isOpen, trackTitle, onStart, onBack, onClose, isDark }) {
  useEffect(() => {
    if (isOpen) {
      soundFx.playNfcSuccess();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#38bdf8', '#a855f7']
      });

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 145,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: isDark
            ? 'linear-gradient(145deg, #1e1b4b 0%, #0f172a 100%)'
            : 'linear-gradient(145deg, #fff1f2 0%, #ffffff 100%)',
          border: '1.5px solid rgba(244, 63, 94, 0.4)',
          borderRadius: '28px',
          maxWidth: '520px',
          width: '100%',
          padding: '32px 28px',
          boxShadow: '0 25px 70px rgba(244, 63, 94, 0.25), 0 10px 30px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          animation: 'zahraModalPop 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playCardClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'transparent',
            border: 'none',
            color: 'var(--folio-mute)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Tutup"
        >
          <X size={18} />
        </button>

        {/* Animated Beating Heart Avatar */}
        <div style={{ position: 'relative', marginBottom: '18px' }}>
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #e11d48 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 10px 25px rgba(244, 63, 94, 0.4)',
              animation: 'zahraHeartBeat 2s infinite ease-in-out'
            }}
          >
            <Heart size={36} fill="#ffffff" />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-6px',
              background: '#fbbf24',
              borderRadius: '50%',
              padding: '4px',
              color: '#78350f',
              boxShadow: '0 2px 8px rgba(251, 191, 36, 0.4)'
            }}
          >
            <Sparkles size={14} fill="#78350f" />
          </div>
        </div>

        {/* Special Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '999px',
            background: 'rgba(244, 63, 94, 0.12)',
            color: '#f43f5e',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '0.5px',
            marginBottom: '10px'
          }}
        >
          <Award size={12} />
          <span>PESAN SPESIAL UNTUK ZAHRA SAYANG</span>
        </div>

        {/* Title */}
        <h2
          style={{
            margin: '0 0 12px 0',
            fontSize: '22px',
            fontWeight: 800,
            color: 'var(--folio-ink)',
            lineHeight: 1.3
          }}
        >
          Semangat Ujiannya yaa Zahra Sayang! 🥰✨
        </h2>

        {/* Sweet Heartfelt Message */}
        <div
          style={{
            fontSize: '13.5px',
            lineHeight: 1.68,
            color: isDark ? '#cbd5e1' : '#475569',
            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.75)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '16px 18px',
            marginBottom: '18px',
            textAlign: 'left'
          }}
        >
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>Bismillahirahmanirrahim.</strong> Zahra sayang, ingat selalu kalau kamu itu pintar, tekun, dan punya potensi yang luar biasa banget.
          </p>
          <p style={{ margin: '0 0 10px 0' }}>
            Jangan gugup yaa, hadapi setiap soal dengan tenang, teliti, dan percaya sama kemampuan diri sendiri. Martin selalu ada di samping kamu buat nemenin, support, dan mendoakan kelancaran Zahra di setiap langkah menuju <strong>PCPM Bank Indonesia</strong>!
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: '#f43f5e' }}>
            You've got this, sayang! Martin selalu bangga dan sayang sama Zahra. Semangat yaa! ❤️🌸
          </p>
        </div>

        {/* Selected Track Indicator */}
        <div
          style={{
            fontSize: '12px',
            color: 'var(--folio-mute)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>Modul yang dipilih:</span>
          <strong style={{ color: 'var(--folio-blue)' }}>{trackTitle}</strong>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button
            onClick={() => {
              soundFx.playCardClick();
              onBack();
            }}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              background: 'var(--surface-chip)',
              color: 'var(--folio-ink)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={15} />
            <span>Ganti Modul</span>
          </button>

          <button
            onClick={() => {
              soundFx.playCardClick();
              onStart();
            }}
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #e11d48 100%)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.4)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="zahra-start-btn"
          >
            <span>Bismillah, Mulai Tes Sekarang!</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
