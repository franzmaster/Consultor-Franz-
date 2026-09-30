import React, { useState } from 'react';
import { X, PhoneCall, FileText, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface QuickContactModalProps {
  isOpen: boolean;
  type: 'call' | 'pdf';
  onClose: () => void;
}

export const QuickContactModal: React.FC<QuickContactModalProps> = ({ isOpen, type, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timePreference, setTimePreference] = useState('Agora mesmo');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let message = '';
    if (type === 'call') {
      message = `Olá Consultor Franzé! Solicitei uma ligação pelo site:\n\n👤 Nome: ${name}\n📱 Telefone: ${phone}\n⏰ Preferência de Horário: ${timePreference}\n\nPode me ligar para conversarmos sobre o plano Hapvida?`;
    } else {
      message = `Olá Consultor Franzé! Gostaria de receber a Tabela Oficial em PDF com os preços e rede Hapvida no meu WhatsApp:\n\n👤 Nome: ${name}\n📱 WhatsApp: ${phone}\n\nObrigado!`;
    }
    setSubmitted(true);
    setTimeout(() => {
      window.open(buildWhatsAppLink(message), '_blank');
      onClose();
      setSubmitted(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            {type === 'call' ? <PhoneCall className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-[11px] font-black uppercase text-blue-700 tracking-wider">
              Consultor Franzé Hapvida
            </span>
            <h3 className="text-lg font-black text-slate-900 leading-snug">
              {type === 'call' ? 'Solicitar Ligação Imediata' : 'Receber Tabela em PDF'}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-5">
          {type === 'call'
            ? 'Deixe seu contato e o Franzé entrará em contato com você para tirar todas as dúvidas sem burocracia.'
            : 'Receba a tabela completa e detalhada de preços no seu WhatsApp em segundos.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome</label>
            <input
              type="text"
              required
              placeholder="Ex: Maria Fernandes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Telefone</label>
            <input
              type="tel"
              required
              placeholder="(11) 90000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {type === 'call' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Melhor Horário para Contato</label>
              <select
                value={timePreference}
                onChange={(e) => setTimePreference(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="Agora mesmo">Agora mesmo (plantão)</option>
                <option value="Pela manhã (08h às 12h)">Pela manhã (08h às 12h)</option>
                <option value="Pela tarde (12h às 18h)">Pela tarde (12h às 18h)</option>
                <option value="Pela noite (18h às 21h)">Pela noite (18h às 21h)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={submitted}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all mt-4"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            {submitted ? 'Abrindo WhatsApp...' : type === 'call' ? 'Confirmar Pedido de Ligação' : 'Receber Tabela no WhatsApp'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Seus dados estão protegidos em conformidade com a LGPD.</span>
        </div>
      </div>
    </div>
  );
};
