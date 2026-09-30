import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  // Show small hint bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const text = quickMsg.trim() || 'Olá Consultor Franzé! Gostaria de uma cotação do plano de saúde Hapvida.';
    window.open(buildWhatsAppLink(text), '_blank');
    setIsOpen(false);
    setQuickMsg('');
  };

  const quickTemplates = [
    'Quero uma simulação com desconto MEI',
    'Como funciona a carência zero?',
    'Tabela de preços para família',
    'Quero incluir o plano odontológico',
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-700 border-2 border-amber-400 flex items-center justify-center font-black text-xs text-white">
                  FZ
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></span>
              </div>
              <div>
                <div className="font-extrabold text-sm flex items-center gap-1">
                  {CONSULTANT_INFO.fullName}
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-[11px] text-blue-200">Online no WhatsApp agora</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs text-slate-700 shadow-2xs">
              <p>
                Olá! 👋 Sou o <strong>Franzé</strong>, consultor credenciado da Hapvida. Como posso te ajudar hoje a economizar no seu plano de saúde?
              </p>
            </div>

            {/* Quick buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                Sugestões Rápidas:
              </span>
              {quickTemplates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    window.open(buildWhatsAppLink(`Olá Consultor Franzé! ${template}. Pode me atender?`), '_blank');
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-xs bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium p-2 rounded-xl border border-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>{template}</span>
                  <Send className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>

            {/* Direct input */}
            <form onSubmit={handleSendCustom} className="pt-1 flex gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                className="flex-1 bg-white border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow-xs transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Prompt Bubble before clicking */}
      {!isOpen && hasPrompted && (
        <div
          onClick={() => setIsOpen(true)}
          className="mb-2 bg-white text-slate-800 text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-all max-w-[240px] animate-bounce"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="truncate">Franzé está online no WhatsApp!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHasPrompted(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-auto"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir WhatsApp com Consultor Franzé"
        className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
      >
        <span className="absolute -top-1 -right-1 bg-amber-400 text-blue-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          1
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
