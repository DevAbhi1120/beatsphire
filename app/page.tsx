"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useInView,
  PanInfo,
} from "framer-motion";
import {
  Play,
  Heart,
  X,
  Mic2,
  Radio,
  Zap,
  Globe,
  Shield,
  Music,
  MessageCircle,
  DollarSign,
  Activity,
  Headphones,
  Sparkles,
  Layers,
  Users,
  ArrowRight,
  Award,
  Disc,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Brain,
  Network,
  Star,
  Flame,
} from "lucide-react";
import g1 from "@/assets/images/g1.jpg";
import g2 from "@/assets/images/g2.jpg";
import g3 from "@/assets/images/g3.jpg";
import g4 from "@/assets/images/g4.avif";
import Image from "next/image";

const Section = ({
  children,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <section
      id={id}
      className={`relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  );
};

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 shadow-2xl shadow-black/50 ${className}`}
  >
    {children}
  </div>
);

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const AudioWaveform = ({ active = false, color = "bg-fuchsia-500" }) => (
  <div className="flex items-end gap-1 h-8">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={
          active ? { height: ["20%", "100%", "40%", "80%"] } : { height: "20%" }
        }
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.05,
          repeatType: "mirror",
          ease: "linear",
        }}
        className={`w-1 rounded-full ${color}`}
      />
    ))}
  </div>
);

const AudioFeatureCard = ({
  feature,
  index,
}: {
  feature: any;
  index: number;
}) => {
  return (
    <motion.div
      className="min-w-[300px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group cursor-grab active:cursor-grabbing border border-white/5 bg-slate-900/40 backdrop-blur-xl"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
      />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -100], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i,
            }}
            className={`absolute bottom-0 left-[${
              20 + i * 30
            }%] w-1 h-1 bg-white rounded-full`}
          />
        ))}
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">
            {feature.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {feature.desc}
          </p>
        </div>

        <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {feature.status}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${feature.activeColor} shadow-[0_0_8px_currentColor]`}
            />
          </div>
          <div className="h-16 flex items-center justify-center gap-1">
            {feature.id === "dj" && (
              <AudioWaveform active={true} color="bg-cyan-400" />
            )}
            {feature.id === "safe" && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="border border-rose-500/50 rounded-full p-2"
              >
                <Shield className="w-6 h-6 text-rose-500" />
              </motion.div>
            )}
            {feature.id === "mood" && (
              <div className="flex gap-2">
                <motion.div
                  animate={{ height: [10, 30, 10] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 bg-violet-500 rounded-full"
                />
                <motion.div
                  animate={{ height: [15, 40, 15] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 bg-fuchsia-500 rounded-full"
                />
                <motion.div
                  animate={{ height: [10, 30, 10] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 bg-cyan-500 rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IntelligentAudioSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, []);

  const features = [
    {
      id: "dj",
      title: "AI DJ Companion",
      desc: "A personal host that intros tracks, reads the room, and seamlessly mixes your queue.",
      icon: Disc,
      gradient: "from-cyan-500 to-blue-900",
      activeColor: "bg-cyan-400",
      status: "Mixing Live",
    },
    {
      id: "mood",
      title: "Emotional Resonance",
      desc: "Algorithms that detect your mood via listening habits and adapt the vibe instantly.",
      icon: Activity,
      gradient: "from-violet-500 to-purple-900",
      activeColor: "bg-violet-400",
      status: "Analyzing DNA",
    },
    {
      id: "safe",
      title: "VibeGuard Safety",
      desc: "Real-time voice modulation and content filtering to keep communities toxic-free.",
      icon: Shield,
      gradient: "from-rose-500 to-red-900",
      activeColor: "bg-rose-400",
      status: "Protected",
    },
    {
      id: "spatial",
      title: "Spatial Audio Rooms",
      desc: "3D audio positioning in chat rooms. Hear friends from the direction they sit.",
      icon: Headphones,
      gradient: "from-emerald-500 to-green-900",
      activeColor: "bg-emerald-400",
      status: "Binaural On",
    },
    {
      id: "remix",
      title: "Instant Remix",
      desc: "Drag and drop stems to create custom versions of tracks instantly.",
      icon: Layers,
      gradient: "from-amber-500 to-orange-900",
      activeColor: "bg-amber-400",
      status: "Stem Split",
    },
  ];

  return (
    <Section className="py-32 overflow-hidden">
      <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              System Intelligence v2.0
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold max-w-2xl">
            Audio that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Thinks & Feels.
            </span>
          </h2>
        </div>
        <p className="text-slate-400 max-w-md text-right hidden md:block">
          Swipe to explore the neural engine powering the next generation of
          social sound.
        </p>
      </div>

      <motion.div
        ref={carouselRef}
        className="cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-6"
        >
          {features.map((feature, i) => (
            <AudioFeatureCard key={i} feature={feature} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
};

const CreatorLevel = ({
  level,
  isActive,
  onClick,
}: {
  level: any;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center gap-4 group transition-all duration-300 ${
      isActive ? "flex-[2]" : "flex-1"
    }`}
  >
    <div
      className={`absolute top-6 left-1/2 w-full h-[2px] -z-10 ${
        isActive
          ? "bg-gradient-to-r from-fuchsia-600 to-violet-600"
          : "bg-slate-800"
      }`}
      style={{ display: level.id === 5 ? "none" : "block" }}
    />

    <div
      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-10 ${
        isActive
          ? "bg-fuchsia-600 border-fuchsia-400 scale-125 shadow-[0_0_30px_rgba(217,70,239,0.5)]"
          : "bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500"
      }`}
    >
      <level.icon className="w-5 h-5" />
    </div>

    <div
      className={`text-center transition-all duration-300 ${
        isActive
          ? "opacity-100 translate-y-0"
          : "opacity-50 group-hover:opacity-80"
      }`}
    >
      <p
        className={`text-sm font-bold uppercase tracking-wider ${
          isActive ? "text-white" : "text-slate-500"
        }`}
      >
        {level.label}
      </p>
    </div>
  </button>
);

const CreatorEvolutionSection = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  const levels = [
    {
      id: 1,
      label: "Listener",
      icon: Headphones,
      color: "text-slate-400",
      earnings: "$0",
      perks: ["Ad-free Listening", "High Fidelity Audio"],
    },
    {
      id: 2,
      label: "Curator",
      icon: Disc,
      color: "text-cyan-400",
      earnings: "$50-200",
      perks: ["Public Playlists", "Tastemaker Badge", "Tips enabled"],
    },
    {
      id: 3,
      label: "Performer",
      icon: Mic2,
      color: "text-violet-400",
      earnings: "$1k-5k",
      perks: ["Live Rooms", "Ticketed Events", "Fan Subscriptions"],
    },
    {
      id: 4,
      label: "Creator",
      icon: Zap,
      color: "text-fuchsia-400",
      earnings: "$10k+",
      perks: ["Merch Store", "Brand Deals", "Creator Fund"],
    },
    {
      id: 5,
      label: "Legend",
      icon: Award,
      color: "text-amber-400",
      earnings: "Unlimited",
      perks: ["Equity", "Global Reach", "Legacy Status"],
    },
  ];

  return (
    <Section className="bg-gradient-to-b from-slate-950 to-slate-900/50">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          From Listener to Legend.
        </h2>
        <p className="text-slate-400 text-lg">
          BeatSphire isn't just an app; it's a career path. Level up your profile,
          unlock monetization tools, and build your empire.
        </p>
      </div>

      <div className="flex justify-between max-w-5xl mx-auto mb-16 px-4">
        {levels.map((level) => (
          <CreatorLevel
            key={level.id}
            level={level}
            isActive={activeLevel === level.id}
            onClick={() => setActiveLevel(level.id)}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div
              className={`absolute top-0 right-0 w-[500px] h-[500px] opacity-20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 bg-gradient-to-br ${
                activeLevel === 5
                  ? "from-amber-500 to-yellow-600"
                  : "from-violet-600 to-fuchsia-600"
              }`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-mono text-white">
                    LEVEL {activeLevel}
                  </span>
                  <h3 className="text-3xl font-bold text-white">
                    {levels[activeLevel - 1].label}
                  </h3>
                </div>

                <div className="space-y-4 mb-8">
                  {levels[activeLevel - 1].perks.map((perk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      {perk}
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="p-3 bg-fuchsia-500/20 rounded-xl">
                    <DollarSign className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      Est. Monthly Earnings
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {levels[activeLevel - 1].earnings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 rounded-2xl border border-white/10 p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-bold text-slate-300">
                    Audience Growth
                  </p>
                  <MoreHorizontal className="text-slate-600 w-4 h-4" />
                </div>

                <div className="h-32 flex items-end justify-between gap-2 px-2">
                  {[...Array(12)].map((_, i) => {
                    const height = Math.random() * (activeLevel * 20) + 10;
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.min(height, 100)}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className={`w-full rounded-t-sm ${
                          i % 2 === 0 ? "bg-slate-700" : "bg-fuchsia-600"
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-slate-500">Profile Views</p>
                    <p className="text-lg font-bold text-white">
                      {(activeLevel * 1240).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-slate-500">Engagement</p>
                    <p className="text-lg font-bold text-green-400">
                      +{activeLevel * 4.2}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
};

const StoryCard = ({
  type,
  user,
  song,
  index,
}: {
  type: "music" | "poll" | "video";
  user: string;
  song: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
    >
      <Image
        src={index === 0 ? g4 : index === 1 ? g4 : g4}
        alt="Story"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
          >
            {bar === 1 && isHovered && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-white"
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute top-8 left-4 flex items-center gap-2 z-20">
        <div
          className={`w-8 h-8 rounded-full border-2 ${
            isHovered ? "border-fuchsia-500 p-0.5" : "border-white"
          }`}
        >
          <div className="w-full h-full bg-slate-400 rounded-full overflow-hidden">
            <img
              src={`https://i.pravatar.cc/100?img=${index + 10}`}
              alt="avatar"
            />
          </div>
        </div>
        <span className="text-xs font-bold text-white shadow-black drop-shadow-md">
          @{user}
        </span>
        <span className="text-xs text-slate-300">• 2h</span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        {type === "music" && (
          <motion.div
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-3 mb-4 border border-white/20 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-fuchsia-600 rounded flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-white">{song}</p>
              <p className="text-xs text-slate-300">New Release</p>
            </div>
            <AudioWaveform active={isHovered} color="bg-white" />
          </motion.div>
        )}

        {type === "poll" && (
          <div className="mb-4 space-y-2">
            <div className="bg-white text-black p-3 rounded-xl text-center font-bold text-sm shadow-lg transform -rotate-1">
              Which track drops harder? 🔥
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-900/80 backdrop-blur text-white py-2 rounded-lg text-xs hover:bg-fuchsia-600 transition-colors">
                Side A
              </button>
              <button className="flex-1 bg-slate-900/80 backdrop-blur text-white py-2 rounded-lg text-xs hover:bg-cyan-600 transition-colors">
                Side B
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex-1 h-10 bg-black/40 backdrop-blur-md rounded-full border border-white/10 px-4 flex items-center text-slate-400 text-sm">
            Send a vibe...
          </div>
          <div className="flex gap-3 ml-3">
            <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
              <Heart
                className={`w-6 h-6 ${
                  isHovered
                    ? "text-rose-500 fill-rose-500 scale-110"
                    : "text-white"
                } transition-all`}
              />
            </button>
            <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
              <Share2 className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InteractiveStoriesSection = () => {
  return (
    <Section className="bg-slate-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
              <Activity className="w-3 h-3 text-rose-400" />
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                Beat-Synced Social
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Stories That{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                Bump.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              A social feed where every post has a soundtrack. React with audio
              snippets, vote on next tracks, and experience full-screen
              immersion with haptic-visual feedback.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Visuals automatically sync to the beat",
                "Interactive polls for next song choices",
                "Remix friends' stories instantly",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-rose-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
              View Live Demo <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 relative">
          <div className="absolute -inset-10 bg-gradient-to-tr from-rose-600/20 to-violet-600/20 blur-[60px] rounded-full pointer-events-none" />

          <div className="space-y-4 pt-12">
            <StoryCard
              type="music"
              user="dj_mist"
              song="Midnight City (Remix)"
              index={0}
            />
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase text-slate-400">
                  Trending Now
                </span>
              </div>
              <p className="font-bold text-white">#SynthWaveSummer</p>
              <p className="text-xs text-slate-500">24k drops this hour</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-fuchsia-600 to-violet-700 p-6 rounded-3xl text-white flex flex-col justify-between h-[140px]">
              <Music className="w-8 h-8 opacity-50" />
              <div>
                <p className="text-2xl font-bold">100M+</p>
                <p className="text-xs opacity-80">Licensed Tracks</p>
              </div>
            </div>
            <StoryCard
              type="poll"
              user="sarah_vibe"
              song="Poll: Next Song?"
              index={1}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const ProfileCard = ({
  profile,
  zIndex,
  scale,
  y,
  onSwipe,
}: {
  profile: any;
  zIndex: number;
  scale: number;
  y: number;
  onSwipe: (direction: "left" | "right") => void;
}) => {
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 120;
    if (Math.abs(info.offset.x) > threshold) {
      setExitX(info.offset.x > 0 ? 1000 : -1000);
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
      style={{ zIndex }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ scale, y, x: exitX }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.2 },
        y: { duration: 0.2 },
      }}
      whileDrag={{ scale: 1.05 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
      <Image
        src={profile.image}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Swipe Overlays */}
      <motion.div
        className="absolute top-12 left-12 z-20 pointer-events-none"
        animate={{ opacity: exitX < -100 ? 1 : 0 }}
      >
        <div className="px-10 py-5 bg-rose-600/90 rounded-full text-white text-5xl font-bold rotate-[-30deg]">
          NOPE
        </div>
      </motion.div>
      <motion.div
        className="absolute top-12 right-12 z-20 pointer-events-none"
        animate={{ opacity: exitX > 100 ? 1 : 0 }}
      >
        <div className="px-10 py-5 bg-green-600/90 rounded-full text-white text-5xl font-bold rotate-[30deg]">
          LIKE
        </div>
      </motion.div>

      <div className="relative z-20 p-8 h-full flex flex-col justify-end">
        <div>
          <h3 className="text-4xl font-bold text-white mb-2">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-lg text-slate-200 mb-4">{profile.bio}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {profile.genres.map((genre: string, i: number) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm border border-white/20"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8">
          <button className="p-5 bg-white/10 backdrop-blur-md rounded-full text-rose-500 hover:bg-rose-600/30 transition-all">
            <X className="w-10 h-10" />
          </button>
          <button className="p-7 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-2xl shadow-fuchsia-600/50">
            <Play className="w-12 h-12 text-white fill-current" />
          </button>
          <button className="p-5 bg-white/10 backdrop-blur-md rounded-full text-green-500 hover:bg-green-600/30 transition-all">
            <Heart className="w-10 h-10 fill-current" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const LoveAtFirstListenSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const profiles = [
    {
      id: 1,
      name: "Sarah",
      age: 24,
      bio: "Neo-Soul & chill nights 🌙",
      image: g1,
      genres: ["Neo-Soul", "Vinyl Collector", "Lo-Fi"],
    },
    {
      id: 2,
      name: "Alex",
      age: 27,
      bio: "Techno head. Rave till dawn 🎧",
      image: g2,
      genres: ["Techno", "House", "Festival Goer"],
    },
    {
      id: 3,
      name: "Jordan",
      age: 22,
      bio: "Indie folk & coffee shops ☕",
      image: g3,
      genres: ["Indie Folk", "Acoustic", "Singer-Songwriter"],
    },
    {
      id: 4,
      name: "Maya",
      age: 26,
      bio: "Jazz fusion & late night drives 🌃",
      image: g1,
      genres: ["Jazz", "Fusion", "Saxophone"],
    },
  ];

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3);

  return (
    <Section className="bg-gradient-to-b from-slate-950 to-violet-950/30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text on Left */}
        <div className="order-2 lg:order-1">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span className="text-sm font-bold text-rose-400 uppercase tracking-widest">
                Vibe Check Dating
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Love at First Listen.
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-lg">
              Skip the small talk. Our AI analyzes lyrical themes, BPM
              preferences, and emotional resonance to pair you with people who
              literally move at your tempo.
            </p>

            <ul className="space-y-5 mb-12">
              {[
                "98% more meaningful connections",
                "Instant anthem sharing on match",
                "Mood-based compatibility scoring",
                "Real-time vibe checks before chat",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-300">
                  <Star className="w-6 h-6 text-rose-400" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <button className="px-10 py-5 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform flex items-center gap-4 shadow-2xl shadow-fuchsia-600/50">
              Start Matching Now <Flame className="w-6 h-6" />
            </button>
          </FadeIn>
        </div>

        {/* Swipe Cards on Right */}
        <div className="order-1 lg:order-2 relative h-[600px] md:h-[760px] flex items-center justify-center">
          <div className="relative w-full max-w-md h-full">
            {visibleProfiles.length > 0 ? (
              visibleProfiles.map((profile, idx) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  zIndex={visibleProfiles.length - idx}
                  scale={1 - idx * 0.04}
                  y={idx * 30}
                  onSwipe={handleSwipe}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Music className="w-20 h-20 text-slate-600 mb-6" />
                <h3 className="text-3xl font-bold text-slate-400 mb-4">
                  No more matches right now
                </h3>
                <p className="text-lg text-slate-500">
                  Check back soon for more vibes 🎧
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default function BeatSphireLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main
      ref={containerRef}
      className="bg-slate-950 min-h-screen text-slate-200 selection:bg-fuchsia-500/30 selection:text-fuchsia-200 font-sans overflow-x-hidden"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-40 px-6 py-6 backdrop-blur-md bg-slate-950/70 border-b border-white/5">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
              <Music className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              BeatSphire
            </span>
          </div>
          <button
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm font-medium group"
            onClick={() => (window.location.href = "/admin/login")}
          >
            Creator Login{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-[1920px] relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[100px]"
            />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
                </span>
                <span className="text-sm font-medium tracking-wide text-fuchsia-200">
                  The Future of Social Audio
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-8">
                Resonate with <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  The World.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                Connect, date, create, and earn through the universal language
                of music. One AI-powered super-app. Infinite frequencies.
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-slate-100 transition-all flex items-center gap-4 shadow-2xl">
                  Download Beta <ArrowRight className="w-6 h-6" />
                </button>
                <button className="px-10 py-5 rounded-full border border-white/20 hover:bg-white/10 transition-all font-medium text-xl flex items-center gap-4 backdrop-blur-sm">
                  <Play className="w-6 h-6 fill-current" /> Watch The Vibe
                </button>
              </div>
            </FadeIn>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
          >
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-slate-400 rounded-full" />
            </div>
          </motion.div>
        </section>

        <IntelligentAudioSection />

        <Section className="bg-gradient-to-b from-transparent to-violet-950/20">
          {/* Emotional DNA Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-[80px] opacity-20 rounded-full" />
                <GlassCard className="relative z-10 overflow-hidden p-0 border-0">
                  <div className="h-[400px] w-full bg-slate-900 flex items-center justify-center relative">
                    <div className="flex items-center gap-2 h-32">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ["20%", "80%", "30%"] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.1,
                            repeatType: "reverse",
                          }}
                          className="w-4 bg-gradient-to-t from-violet-500 to-fuchsia-500 rounded-full"
                        />
                      ))}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs font-mono text-fuchsia-400 mb-1">
                            SONIC DNA ANALYSIS
                          </p>
                          <h4 className="text-xl font-bold">
                            Melancholic Lo-Fi & Jazz
                          </h4>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">94%</p>
                          <p className="text-xs text-slate-500">Uniqueness</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </FadeIn>

            <FadeIn>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                You Are What <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  You Listen To.
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Traditional profiles are flat. BeatSphire generates your{" "}
                <strong>Emotional DNA</strong> based on your listening habits —
                matching you with people who feel the same frequency.
              </p>
              <ul className="space-y-5">
                {[
                  "Mood-based compatibility scoring",
                  "Real-time vibe checks",
                  "Musical astrology & personality insights",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-slate-400"
                  >
                    <Zap className="w-6 h-6 text-fuchsia-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Section>

        {/* Fixed Love at First Listen Section */}
        <LoveAtFirstListenSection />

        <InteractiveStoriesSection />

        <CreatorEvolutionSection />

        {/* Rest of sections remain unchanged */}
        <Section className="bg-gradient-to-b from-slate-950 to-cyan-950/20">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <Radio className="w-3 h-3 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Global Discovery
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Music <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Across Borders.
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Explore trending tracks from Tokyo nightlife, Berlin
                underground, Lagos Afrobeats, and Seoul K-pop scenes — all in
                real-time.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {["Tokyo", "Berlin", "Lagos", "Seoul"].map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-3xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <Globe className="w-16 h-16 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{city}</h3>
                    <p className="text-sm text-slate-300">
                      +{1240 + i * 300} listening now
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section className="py-32">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
            {/* Neural Network Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
              {/* Connecting Lines */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="absolute bg-cyan-400/30 w-full h-px"
                  style={{
                    left: 0,
                    top: `${20 + i * 15}%`,
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-cyan-900/30 text-cyan-400 rounded text-xs font-mono mb-6 border border-cyan-500/20">
                  SYSTEM: MELO_AI_V1.0
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Powered by Intelligent Audio.
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Our proprietary AI doesn't just recommend songs; it acts as
                  your personal DJ, safety moderator, and dating wingman. It
                  filters out toxicity and amplifies the vibe. Trained on
                  billions of audio interactions, it evolves with every listen.
                </p>
                <ul className="space-y-4 font-mono text-sm text-cyan-200/70">
                  <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Activity className="w-4 h-4" />
                    </motion.div>
                    Real-time BPM Matching & Auto-Transitions
                  </motion.li>
                  <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Shield className="w-4 h-4" />
                    </motion.div>
                    Voice-Print Verification & Toxicity Filtering
                  </motion.li>
                  <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Radio className="w-4 h-4" />
                    </motion.div>
                    Context-Aware Autoplay with Neural Predictions
                  </motion.li>
                  <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 180, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Brain className="w-4 h-4" />
                    </motion.div>
                    Emotional DNA Analysis for Personalized Vibes
                  </motion.li>
                  <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Network className="w-4 h-4" />
                    </motion.div>
                    Decentralized Audio Remix Engine
                  </motion.li>
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-square bg-slate-950 rounded-full border border-cyan-500/20 flex items-center justify-center relative overflow-hidden">
                  {/* Enhanced AI Core with Neural Nodes */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 border border-dashed border-cyan-500/30 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-cyan-500 rounded-full blur-[50px] opacity-40"
                  />
                  {/* Orbiting Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{
                        rotate: 360,
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                    />
                  ))}
                  {/* Inner Neural Core */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Headphones className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                    </motion.div>
                    <motion.p
                      className="font-bold text-white"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Melo<span className="text-cyan-400">AI</span>
                    </motion.p>
                    {/* Data Flow Lines */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-px h-20 bg-cyan-400/50"
                          style={{
                            transformOrigin: "top",
                            rotate: `${i * 90}deg`,
                          }}
                          animate={{ scaleY: [0, 1, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.25,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <section className="relative py-32 text-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fuchsia-900/20" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-6xl md:text-8xl font-bold mb-10 tracking-tight">
                Don't Miss The <br />
                <span className="text-fuchsia-500">Drop.</span>
              </h2>
              <p className="text-2xl text-slate-300 mb-12">
                Join 500,000+ users on the waitlist. Get 3 months of Premium
                free.
              </p>

              <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white text-lg focus:outline-none focus:border-fuchsia-500 transition-all backdrop-blur-md"
                />
                <button className="px-12 py-5 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xl transition-all shadow-2xl shadow-fuchsia-600/50 flex items-center justify-center gap-3">
                  Join Waitlist <Sparkles className="w-6 h-6" />
                </button>
              </form>
            </FadeIn>
          </div>
        </section>

        <footer className="border-t border-white/5 bg-black py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <Music className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white">BeatSphire</span>
            </div>

            <div className="flex gap-10 text-slate-400">
              {["Manifesto", "Careers", "Creators", "Safety", "Press"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            <div className="text-sm text-slate-600">© 2025 BeatSphire Inc.</div>
          </div>
        </footer>
      </div>
    </main>
  );
}
