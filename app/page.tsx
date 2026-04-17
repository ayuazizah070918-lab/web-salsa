"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Calculator, 
  Gamepad2, 
  Search, 
  Heart, 
  ArrowLeft,
  Send,
  Plus,
  Eraser,
  Quote,
  RefreshCw
} from 'lucide-react';

// --- KOMPONEN UTAMA ---

export default function YudiSalsaWeb() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  
  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'yudisalsa' && pw === '30102007') {
      setIsLoggedIn(true);
    } else {
      alert('ID atau Password salah, Yudi/Salsa!');
    }
  };

  const touchClass = "active:scale-95 transition-transform duration-100 cursor-pointer";

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans p-4">
        <div className="w-full max-w-[400px] aspect-[9/16] bg-white rounded-[2.5rem] p-8 flex flex-col justify-center shadow-2xl border-4 border-pink-100">
          <div className="text-center mb-10">
            <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Heart className="w-10 h-10 text-pink-500 animate-bounce" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Yudi & Salsa</h1>
            <p className="text-slate-400 italic text-xs mt-1 uppercase tracking-widest">Private Access Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" placeholder="ID" 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-pink-300 transition-all text-slate-700 shadow-inner"
              value={id} onChange={(e) => setId(e.target.value)}
            />
            <input 
              type="password" placeholder="Password" 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-pink-300 transition-all text-slate-700 shadow-inner"
              value={pw} onChange={(e) => setPw(e.target.value)}
            />
            <button type="submit" className={`w-full bg-pink-500 text-white p-4 rounded-2xl font-bold shadow-lg shadow-pink-200 ${touchClass}`}>
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="relative w-full max-w-[430px] h-screen md:h-[90vh] bg-slate-50 shadow-2xl overflow-hidden md:rounded-[3rem] border-slate-800 flex flex-col">
        
        {/* Header */}
        <div className="bg-white border-b p-5 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            {currentPage !== 'home' && (
              <button onClick={() => setCurrentPage('home')} className={`p-2 bg-slate-100 rounded-full ${touchClass}`}>
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
            )}
            <h2 className="font-bold text-slate-800 capitalize tracking-tight">
              {currentPage === 'home' ? 'Beranda Salsa ❤️' : currentPage.replace('-', ' ')}
            </h2>
          </div>
          <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center">
             <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="flex-1 overflow-y-auto pb-10 custom-scrollbar">
          {currentPage === 'home' && <HomeMenu setPage={setCurrentPage} />}
          {currentPage === 'chat' && <PrivateChat />}
          {currentPage === 'konter' && <KonterCalc />}
          {currentPage === 'game-foto' && <PhotoEditor />}
          {currentPage === 'search' && <AISearch />}
          {currentPage === 'game-ringan' && <MiniGames />}
        </div>
      </div>
    </div>
  );
}

// --- SUB-HALAMAN ---

function HomeMenu({ setPage }: { setPage: (p: string) => void }) {
  const menuItems = [
    { id: 'chat', label: 'Private Chat', icon: MessageCircle, color: 'bg-blue-500' },
    { id: 'konter', label: 'Alat Konter', icon: Calculator, color: 'bg-emerald-500' },
    { id: 'game-foto', label: 'Coret Foto', icon: Gamepad2, color: 'bg-purple-500' },
    { id: 'search', label: 'Smart Search', icon: Search, color: 'bg-orange-500' },
    { id: 'game-ringan', label: 'Hiburan', icon: Heart, color: 'bg-pink-500' },
  ];

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {menuItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => setPage(item.id)}
          className={`flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white shadow-sm border border-slate-100 active:scale-95 transition-all hover:shadow-md`}
        >
          <div className={`${item.color} p-4 rounded-2xl mb-3 text-white shadow-lg`}>
            <item.icon size={24} />
          </div>
          <span className="font-bold text-slate-700 text-xs uppercase tracking-wide">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function PrivateChat() {
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if(!input) return;
    setMessages([...messages, {sender: 'user', text: input}]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="bg-blue-50 p-3 rounded-2xl text-[10px] text-blue-500 text-center font-bold uppercase tracking-[0.2em] mb-4">
          Chat terhapus otomatis jika refresh
        </div>
        {messages.map((m, i) => (
          <div key={i} className="flex flex-col items-end animate-in slide-in-from-right-2">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[85%] shadow-md text-sm leading-relaxed">
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-white border-t flex gap-2">
        <input 
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && send()}
          placeholder="Ketik pesan..." className="flex-1 bg-slate-100 p-4 rounded-2xl outline-none text-sm shadow-inner"
        />
        <button onClick={send} className="bg-blue-500 text-white p-4 rounded-2xl shadow-lg active:scale-90 transition-transform">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

function KonterCalc() {
  const [data, setData] = useState({ voucher: 0, chip: 0, modalChip: 0, cashIn: 0, cashOut: 0 });
  
  useEffect(() => {
    const saved = localStorage.getItem('salsa_konter_data');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const update = (key: string, val: number) => {
    const newData = { ...data, [key]: val };
    setData(newData);
    localStorage.setItem('salsa_konter_data', JSON.stringify(newData));
  };

  const untungChip = data.chip - data.modalChip;

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] text-white shadow-xl">
        <p className="text-[10px] opacity-80 uppercase tracking-widest font-black">Estimasi Laba Chip</p>
        <h3 className="text-3xl font-black mt-1">Rp {untungChip.toLocaleString()}</h3>
      </div>
      
      <div className="space-y-3">
        {[
          { label: 'Voucher Terjual', key: 'voucher', icon: '🎫' },
          { label: 'Hasil Jual Chip', key: 'chip', icon: '💰' },
          { label: 'Modal Chip', key: 'modalChip', icon: '📉' },
          { label: 'Uang Masuk (Cash)', key: 'cashIn', icon: '📥' },
          { label: 'Transfer Keluar', key: 'cashOut', icon: '📤' },
        ].map((item) => (
          <div key={item.key} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{item.label}</span>
            </div>
            <input 
              type="number" 
              className="w-28 text-right font-black text-slate-800 outline-none bg-slate-50 p-2 rounded-lg"
              value={data[item.key as keyof typeof data]}
              onChange={(e) => update(item.key, parseInt(e.target.value) || 0)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx?.clearRect(0, 0, 350, 450);
        ctx?.drawImage(img, 0, 0, 350, 450);
      };
      img.src = image;
    }
  }, [image]);

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    if (ctx) {
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {!image ? (
        <label className="w-full aspect-[3/4] border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-slate-50 transition-all group">
          <Plus size={40} className="text-slate-300 group-hover:text-pink-400 transition-colors" />
          <span className="text-slate-400 text-[10px] font-bold uppercase mt-2">Upload Foto Salsa</span>
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      ) : (
        <div className="w-full space-y-4">
          <canvas 
            ref={canvasRef} width={350} height={450} 
            className="w-full bg-white rounded-[2rem] shadow-2xl touch-none border-4 border-white"
            onMouseDown={startDrawing} onTouchStart={startDrawing}
            onMouseMove={draw} onTouchMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          />
          <div className="flex gap-2">
            <button onClick={() => setImage(null)} className="flex-1 bg-slate-800 text-white p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2">
              <Plus className="rotate-45" size={16} /> Ganti Foto
            </button>
            <button onClick={() => {
              const ctx = canvasRef.current?.getContext('2d');
              if(ctx && image) {
                const img = new Image();
                img.onload = () => { ctx.clearRect(0,0,350,450); ctx.drawImage(img,0,0,350,450); };
                img.src = image;
              }
            }} className="bg-pink-500 text-white p-4 rounded-2xl font-bold text-xs">
              <Eraser size={20}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AISearch() {
  return (
    <div className="h-full flex flex-col p-4 bg-slate-50">
      <div className="flex bg-white p-4 rounded-2xl mb-4 items-center gap-3 border shadow-sm">
        <Search className="text-slate-400" size={18} />
        <input placeholder="Cari info voucher/chip..." className="bg-transparent outline-none flex-1 text-sm font-medium" />
      </div>
      <div className="flex-1 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-white">
        <iframe 
          src="https://www.google.com/search?igu=1" 
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}

function MiniGames() {
  const quotes = [
    "Salsa, kamu adalah alasan Yudi semangat kerja! ❤️",
    "Jangan pusing soal konter, rejeki udah ada yang atur sayang.",
    "Semangat hari ini, ada Yudi yang selalu dukung kamu.",
    "Kamu lebih berharga dari ribuan voucher pulsa mana pun!",
  ];
  const [quote, setQuote] = useState(quotes[0]);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 rounded-[2.5rem] relative overflow-hidden shadow-xl text-center">
        <Quote className="absolute -top-2 -left-2 text-white/10 w-24 h-24 rotate-12" />
        <p className="relative z-10 text-white font-bold italic text-lg leading-relaxed">"{quote}"</p>
        <button 
          onClick={() => setQuote(quotes[Math.floor(Math.random()*quotes.length)])}
          className="mt-6 mx-auto bg-white/20 hover:bg-white/30 p-4 rounded-full transition-all active:scale-90"
        >
          <RefreshCw className="text-white" size={20} />
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <h4 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-4">Tebak Kata</h4>
        <p className="text-sm text-slate-500 mb-6 font-medium">Clue: Orang tersayang Salsa sekarang?</p>
        <div className="flex justify-center gap-3">
          {['Y','U','D','I'].map((l, i) => (
            <div key={i} className="w-12 h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-200 text-xl">?</div>
          ))}
        </div>
      </div>
    </div>
  );
}

