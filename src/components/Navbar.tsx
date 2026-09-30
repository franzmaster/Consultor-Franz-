import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Clock, Calculator, Sparkles } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink, getGeneralInquiryMessage } from '../utils/whatsapp';

interface NavbarProps {
  onOpenQuickModal: (type: 'pdf' | 'call') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuickModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultWhatsAppLink = buildWhatsAppLink(getGeneralInquiryMessage());

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs sm:text-sm py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-500 text-blue-950 text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> OFERTA 2025/2026
            </span>
            <span className="hidden sm:inline">
              Planos com carência reduzida e até <strong>40% OFF no CNPJ/MEI</strong>.
            </span>
            <span className="sm:hidden text-[11px]">
              Tabela promocional com até <strong>40% OFF</strong>!
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:flex items-center gap-1 text-blue-200 text-xs">
              <Clock className="w-3.5 h-3.5" /> Plantão até 22h
            </span>
            <a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 shadow-sm"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              Chamar Franzé
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Consultant Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="flex flex-col items-center leading-none">
                <span className="text-[10px] font-black tracking-widest text-amber-400">HAP</span>
                <span className="text-base sm:text-lg font-black tracking-tight">VIDA</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight">
                  Consultor Franzé
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-blue-600" /> Oficial
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Corretor Credenciado Hapvida NotreDame
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#simulador" className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 transition-colors">
              <Calculator className="w-4 h-4 text-blue-600" />
              Simular Preços
            </a>
            <a href="#planos" className="hover:text-blue-700 transition-colors">
              Nossos Planos
            </a>
            <a href="#pme" className="hover:text-blue-700 transition-colors flex items-center gap-1">
              Para Empresas / MEI
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">-40%</span>
            </a>
            <a href="#rede" className="hover:text-blue-700 transition-colors">
              Rede Própria
            </a>
            <a href="#carencias" className="hover:text-blue-700 transition-colors">
              Carências
            </a>
            <a href="#depoimentos" className="hover:text-blue-700 transition-colors">
              Depoimentos
            </a>
            <a href="#faq" className="hover:text-blue-700 transition-colors">
              Dúvidas
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenQuickModal('call')}
              className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {CONSULTANT_INFO.phone}
            </button>
            <a
              href="#simulador"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              Cotação Online
            </a>
            <a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <MessageCircle className="w-4 h-4 fill-current" />
              WhatsApp Franzé
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white p-2 rounded-lg"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-700 rounded-lg focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 p-3 bg-blue-50/70 rounded-xl text-xs text-blue-900 mb-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Fale com <strong>Franzé</strong>, consultor oficial Hapvida.</span>
          </div>

          <a
            href="#simulador"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 font-bold text-sm"
          >
            <span className="flex items-center gap-2 text-blue-700">
              <Calculator className="w-4 h-4" /> Simulador de Preços
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Rápido</span>
          </a>

          <a
            href="#planos"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm"
          >
            Planos Individuais e Familiares
          </a>

          <a
            href="#pme"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm"
          >
            <span>Plano Empresarial / MEI</span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">-40% OFF</span>
          </a>

          <a
            href="#rede"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm"
          >
            Hospitais e Rede Própria
          </a>

          <a
            href="#carencias"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm"
          >
            Tabela de Carências
          </a>

          <a
            href="#depoimentos"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm"
          >
            Depoimentos de Clientes
          </a>

          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm"
          >
            Perguntas Frequentes
          </a>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Falar no WhatsApp com Franzé
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickModal('call');
              }}
              className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs"
            >
              <Phone className="w-4 h-4" /> Solicitar Ligação do Franzé
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
