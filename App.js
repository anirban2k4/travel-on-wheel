import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <motion.div animate={{ x: pos.x - 16, y: pos.y - 16 }} className="fixed w-8 h-8 border border-[#C5A059] rounded-full pointer-events-none z-[9999]" />;
};

const CinematicCarousel = () => {
  const slides = [
    { id: 1, title: "The Silent Peaks", location: "Ladakh", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070" },
    { id: 2, title: "Golden Dust Roads", location: "Rajasthan", image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2070" }
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} className="absolute inset-0">
          <motion.div initial={{ scale: 1 }} animate={{ scale: 1.1 }} transition={{ duration: 8 }} className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${slides[index].image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
          <div className="absolute bottom-20 left-20">
            <p className="text-[#C5A059] tracking-[0.3em] text-xs uppercase mb-2">{slides[index].location}</p>
            <h1 className="text-6xl font-light italic">{slides[index].title}</h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const TheLensAI = () => {
  const [advice, setAdvice] = useState(null);
  return (
    <div className="py-20 px-10 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto border border-white/5 p-12">
        <h2 className="text-[#C5A059] italic text-3xl mb-8">The Lens AI</h2>
        <div className="flex gap-4 mb-10">
          <input className="bg-transparent border-b border-white/20 flex-1 outline-none text-white" placeholder="Destination..." />
          <button onClick={() => setAdvice({ settings: "f/8, ISO 100", composition: "Leading Lines" })} className="bg-[#C5A059] text-black px-6 py-2 text-xs uppercase font-bold">Analyze</button>
        </div>
        {advice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-10 text-white">
            <div><p className="text-xs text-white/40 uppercase tracking-widest">Settings</p><p className="text-xl">{advice.settings}</p></div>
            <div><p className="text-xs text-white/40 uppercase tracking-widest">Composition</p><p className="text-xl italic">"{advice.composition}"</p></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const AperTripAI = () => {
  const [dist, setDist] = useState(0);
  const cost = Math.round((dist / 12) * 92 * 1.15);
  return (
    <div className="py-20 px-10 bg-black text-white">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-20">
        <div className="flex-1">
          <h2 className="text-3xl mb-6 italic">AperTrip <span className="text-[#C5A059]">AI</span></h2>
          <input type="number" placeholder="KM" className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-white" onChange={(e) => setDist(e.target.value)} />
        </div>
        <div className="flex-1 bg-white/5 p-10">
          <p className="text-xs text-white/40 uppercase mb-2">Expedition Cost</p>
          <h3 className="text-5xl text-[#C5A059]">₹{cost}</h3>
          <p className="text-[10px] mt-4 italic text-white/20">*Includes 15% photography scouting buffer</p>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  return (
    <main className="bg-black min-h-screen">
      <CustomCursor />
      <nav className="fixed top-0 w-full z-[60] p-10 flex justify-between items-center text-white">
        <div className="tracking-[0.8em] text-[10px] uppercase font-bold">TRAVEL ON WHEEL</div>
        <div className="text-white/40 text-[9px] tracking-widest uppercase">Dev by Anirban Basu</div>
      </nav>
      <section className="h-screen"><CinematicCarousel /></section>
      <TheLensAI />
      <AperTripAI />
      <footer className="py-24 text-center border-t border-white/5 text-white">
        <h2 className="text-2xl italic tracking-widest mb-4">Travel On Wheel</h2>
        <p className="text-[9px] text-white/30 tracking-[0.5em] uppercase">Designed & Engineered by Anirban Basu</p>
      </footer>
    </main>
  );
}
