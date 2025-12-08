"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { Howl } from "howler";

type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
};

type AudioContextType = {
  current?: Track;
  playing: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
  volume: number;
  playTrack: (t: Track) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  queue: Track[];
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioPlayerProvider");
  return ctx;
}

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const howlRef = useRef<Howl | null>(null);
  const animationRef = useRef<number | null>(null);
  const [current, setCurrent] = useState<Track | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [queue, setQueue] = useState<Track[]>([]);

  // Load last played from localStorage
  useEffect(() => {
    try {
      const savedVolume = localStorage.getItem("dna-volume");
      const savedMuted = localStorage.getItem("dna-muted");
      
      if (savedVolume) setVolumeState(parseFloat(savedVolume));
      if (savedMuted) setMuted(savedMuted === "true");
      
      // Don't auto-load the last track on mount - only show player when user plays something
    } catch (e) {
      console.warn("Failed to load saved audio state:", e);
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    if (current) {
      localStorage.setItem("dna-last-track", JSON.stringify(current));
    }
  }, [current]);

  useEffect(() => {
    localStorage.setItem("dna-volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("dna-muted", muted.toString());
  }, [muted]);

  const updateTime = useCallback(() => {
    if (howlRef.current && playing) {
      setCurrentTime(howlRef.current.seek() as number);
      animationRef.current = requestAnimationFrame(updateTime);
    }
  }, [playing]);

  useEffect(() => {
    if (playing) {
      animationRef.current = requestAnimationFrame(updateTime);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [playing, updateTime]);

  const playTrack = useCallback((t: Track) => {
    if (howlRef.current) {
      howlRef.current.unload();
    }

    const sound = new Howl({
      src: [t.src],
      html5: true,
      volume: volume,
      mute: muted,
      onload: () => {
        setDuration(sound.duration());
      },
      onplay: () => {
        setPlaying(true);
      },
      onpause: () => {
        setPlaying(false);
      },
      onend: () => {
        setPlaying(false);
        // Auto-play next track
        const currentIndex = queue.findIndex(track => track.id === t.id);
        if (currentIndex >= 0 && currentIndex < queue.length - 1) {
          playTrack(queue[currentIndex + 1]);
        }
      },
      onloaderror: () => {
        console.error("Howler load error");
        setPlaying(false);
      },
      onplayerror: () => {
        console.error("Howler play error");
        setPlaying(false);
      }
    });

    howlRef.current = sound;
    setCurrent(t);
    setCurrentTime(0);
    sound.play();

    // Add to queue if not exists
    setQueue(prev => {
      if (!prev.find(track => track.id === t.id)) {
        return [...prev, t];
      }
      return prev;
    });
  }, [volume, muted, queue]);

  const togglePlay = useCallback(() => {
    if (!howlRef.current) return;
    if (playing) {
      howlRef.current.pause();
      setPlaying(false);
    } else {
      howlRef.current.play();
      setPlaying(true);
    }
  }, [playing]);

  const seekTo = useCallback((time: number) => {
    if (!howlRef.current) return;
    howlRef.current.seek(Math.max(0, Math.min(time, duration || 0)));
    setCurrentTime(howlRef.current.seek() as number);
  }, [duration]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const newMuted = !m;
      if (howlRef.current) {
        howlRef.current.mute(newMuted);
      }
      return newMuted;
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    const newVolume = Math.max(0, Math.min(1, v));
    setVolumeState(newVolume);
    if (howlRef.current) {
      howlRef.current.volume(newVolume);
    }
  }, []);

  const nextTrack = useCallback(() => {
    if (!current) return;
    const currentIndex = queue.findIndex(t => t.id === current.id);
    if (currentIndex >= 0 && currentIndex < queue.length - 1) {
      playTrack(queue[currentIndex + 1]);
    }
  }, [current, queue, playTrack]);

  const prevTrack = useCallback(() => {
    if (!current) return;
    const currentIndex = queue.findIndex(t => t.id === current.id);
    if (currentIndex > 0) {
      playTrack(queue[currentIndex - 1]);
    }
  }, [current, queue, playTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        current,
        playing,
        currentTime,
        duration,
        muted,
        volume,
        playTrack,
        togglePlay,
        seekTo,
        toggleMute,
        setVolume,
        nextTrack,
        prevTrack,
        queue,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
