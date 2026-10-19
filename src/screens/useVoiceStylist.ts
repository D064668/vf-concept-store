'use client';
// useVoiceStylist.ts — voice recognition and speech synthesis for the Living Stylist (Home V2).
// ------------------------------------------------------------------
// Inspired by Ayra's living agent:
//   • Listen: Web Speech API (webkitSpeechRecognition) listens to the user's voice.
//   • Speak: window.speechSynthesis plays natural spoken answers aloud.
//   • States: 'idle' | 'listening' | 'thinking' | 'speaking'
// ------------------------------------------------------------------
import { useCallback, useEffect, useRef, useState } from 'react';
import { stylistReply, type StylistReply } from '@/data/stylist';

export type VoiceStatus = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface VoiceExchange {
  id: number;
  question: string;
  reply: StylistReply;
  timestamp: number;
}

export function useVoiceStylist(options?: { onTranscript?: (text: string) => void }) {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [activeExchange, setActiveExchange] = useState<VoiceExchange | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isSpeakingRef = useRef(false);
  const exchangeIdRef = useRef(1);
  const onTranscriptRef = useRef(options?.onTranscript);
  onTranscriptRef.current = options?.onTranscript;

  // Initialize browser speech capabilities on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    synthRef.current = window.speechSynthesis || null;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      setIsSupported(true);
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setStatus('listening');
        setTranscript('');
      };

      rec.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        // If recognition detected the final sentence
        if (event.results[0]?.isFinal && currentTranscript.trim()) {
          const finalWords = currentTranscript.trim();
          setTranscript('');
          setStatus('idle');
          if (onTranscriptRef.current) {
            onTranscriptRef.current(finalWords);
          } else {
            handleUserQuery(finalWords);
          }
        }
      };

      rec.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error);
        if (e.error !== 'no-speech') {
          setStatus('idle');
        }
      };

      rec.onend = () => {
        // If we were listening and got no final result yet, process whatever transcript we have
        setStatus((prev) => (prev === 'listening' ? 'idle' : prev));
      };

      recognitionRef.current = rec;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (fallbackTimerRef.current) {
        clearInterval(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
      if (synthRef.current) {
        try {
          synthRef.current.cancel();
        } catch {}
      }
    };
  }, []);

  // Speak text aloud using natural voice
  const speakText = useCallback(
    (text: string, onDone?: () => void) => {
      if (typeof window === 'undefined' || !synthRef.current) {
        onDone?.();
        return;
      }

      // Cancel any ongoing speech
      synthRef.current.cancel();

      if (isMuted) {
        onDone?.();
        return;
      }

      // Clean speech text (strip symbols, URLs, excess punctuation)
      const clean = text.replace(/[*_#`~]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(clean);

      // Pick a warm, natural English voice if available
      const voices = synthRef.current.getVoices();
      const preferredVoice =
        voices.find(
          (v) =>
            (v.name.includes('Samantha') ||
              v.name.includes('Karen') ||
              v.name.includes('Serena') ||
              v.name.includes('Victoria') ||
              v.name.includes('Daniel') ||
              v.name.includes('Google US English') ||
              v.name.includes('Natural')) &&
            v.lang.startsWith('en')
        ) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0];

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1.02; // Warm, friendly cadence
      utterance.rate = 1.0;

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setStatus('speaking');
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setStatus('idle');
        onDone?.();
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        setStatus('idle');
        onDone?.();
      };

      synthRef.current.speak(utterance);
    },
    [isMuted]
  );

  const fallbackTimerRef = useRef<any>(null);

  // Stop current speech or listening immediately
  const stopAll = useCallback(() => {
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch {}
      isSpeakingRef.current = false;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setTranscript('');
    setStatus('idle');
  }, []);

  // Handle a user question (from voice, tap, or typing)
  const handleUserQuery = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      stopAll();

      setStatus('thinking');
      setTranscript(query);

      // Simulate a brief thoughtful pause (400ms) before the stylist answers
      setTimeout(() => {
        const reply = stylistReply(query);
        const exchange: VoiceExchange = {
          id: ++exchangeIdRef.current,
          question: query,
          reply,
          timestamp: Date.now(),
        };
        setActiveExchange(exchange);

        // Speak the reply aloud
        speakText(reply.text);
      }, 420);
    },
    [speakText, stopAll]
  );

  const fallbackVoiceInput = useCallback(() => {
    if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
    setStatus('listening');
    setTranscript('');
    const demoQuery = 'What should I wear on Saturday?';
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setTranscript(demoQuery.slice(0, i));
      if (i >= demoQuery.length) {
        clearInterval(interval);
        fallbackTimerRef.current = null;
        setTimeout(() => {
          setStatus('idle');
          setTranscript('');
          if (onTranscriptRef.current) {
            onTranscriptRef.current(demoQuery);
          } else {
            handleUserQuery(demoQuery);
          }
        }, 350);
      }
    }, 45);
    fallbackTimerRef.current = interval;
  }, [handleUserQuery]);

  // Start voice input
  const startListening = useCallback(() => {
    if (status === 'listening') {
      stopAll();
      return;
    }

    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch {}
      isSpeakingRef.current = false;
    }
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    setStatus('listening');
    setTranscript('');

    if (recognitionRef.current && isSupported) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Could not start recognition:', err);
        fallbackVoiceInput();
      }
    } else {
      fallbackVoiceInput();
    }
  }, [status, isSupported, stopAll, fallbackVoiceInput]);

  // Toggle audio mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next && synthRef.current) {
        synthRef.current.cancel();
        if (status === 'speaking') setStatus('idle');
      }
      return next;
    });
  }, [status]);

  return {
    status,
    transcript,
    activeExchange,
    isMuted,
    isSupported,
    startListening,
    handleUserQuery,
    speakText,
    stopAll,
    toggleMute,
  };
}
