import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Zap, Users, Building2, Sparkles, PhoneCall, Award, BadgeCheck, Lock } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink, getSimulationWhatsAppMessage } from '../utils/whatsapp';

interface HeroProps {
  onOpenQuickModal: (type: 'pdf' | 'call') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuickModal }) => {
  const [leadCategory, setLeadCategory] = useState<'individual' | 'corporate' | 'odonto'>('individual');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [livesCount, setLivesCount] = useState(2);
  const [city, setCity] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const planLabel = leadCategory === 'corporate' ? 'Empresarial / MEI (até 40% OFF)' : leadCategory === 'odonto' ? 'Odontológico' : 'Individual / Familiar';
    const message = `Olá Consultor Franzé! Gostaria de receber a cotação rápida do Plano Hapvida.\n\n👤 Nome: ${name || 'Não informado'}\n📱 WhatsApp: ${whatsapp || 'Contato direto'}\n📍 Cidade: ${city || 'Fortaleza/Região'}\n🏢 Modalidade: ${planLabel}\n👥 Quantidade de Vidas: ${livesCount}\n\nPode me enviar os valores e a tabela atualizada?`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Credibility */}
          <div className="lg:col-span-7 space-y-6">
            {/* Official Credential Seal */}
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3.5 bg-gradient-to-r from-blue-950/95 via-slate-900/95 to-blue-950/95 border-2 border-amber-400/70 rounded-2xl p-2.5 sm:px-4 sm:py-3 shadow-2xl shadow-amber-500/15 backdrop-blur-md relative overflow-hidden group hover:border-amber-400 transition-all">
              {/* Shimmer effect */}
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="flex items-center gap-3">
                {/* Gold Seal Emblem */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-blue-950 shadow-md shadow-amber-500/30 shrink-0 ring-2 ring-amber-300/40">
                  <Award className="w-6 h-6 stroke-[2.5]" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                </div>

                {/* Seal Details */}
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-black tracking-wide uppercase text-amber-300 flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4 text-amber-400 inline" />
                      Consultor Credenciado Hapvida
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Certificação Oficial 2025/2026
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-blue-200/90 font-medium mt-0.5">
                    <span>Corretor Franzé</span>
                    <span className="text-blue-400">•</span>
                    <span className="text-amber-200/90 font-semibold">{CONSULTANT_INFO.registration}</span>
                    <span className="text-blue-400">•</span>
                    <span className="text-emerald-300 flex items-center gap-0.5">
                      <Lock className="w-3 h-3" /> Contrato Direto c/ Operadora
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15]">
              O Seu Plano de Saúde <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Hapvida</span> com a Melhor Condição do Mercado
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal max-w-2xl">
              Fale direto com o <strong>Consultor Franzé</strong> e tenha atendimento humanizado, sem robôs. Economize até <strong>40% no CNPJ ou MEI</strong>, aproveite carências promocionais e conte com a maior rede própria de saúde do Brasil.
            </p>

            {/* Quick Benefits Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Carência Zero p/ consultas (promocional)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Até 40% OFF a partir de 2 vidas (MEI/CNPJ)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Telemedicina 24h sem sair de casa</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Assessoria completa do início ao pós-venda</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#simulador"
                className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-black text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-5 h-5 fill-current" />
                Simular Meu Plano Agora
              </a>

              <a
                href={buildWhatsAppLink('Olá Consultor Franzé! Vi seu site e gostaria de uma simulação rápida de plano Hapvida para mim/minha família.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Falar com Franzé no WhatsApp
              </a>
            </div>

            {/* Trust Stat Bar */}
            <div className="pt-4 border-t border-blue-800/60 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-blue-200/80">
              <div>
                <span className="block text-white font-extrabold text-base sm:text-lg">+3.800</span>
                <span>Vidas Atendidas</span>
              </div>
              <div className="h-8 w-px bg-blue-800"></div>
              <div>
                <span className="block text-white font-extrabold text-base sm:text-lg">12 Anos</span>
                <span>De Experiência Hapvida</span>
              </div>
              <div className="h-8 w-px bg-blue-800"></div>
              <div>
                <span className="block text-white font-extrabold text-base sm:text-lg">⭐ 4.9 / 5.0</span>
                <span>Avaliação dos Clientes</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Express Quote Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-blue-950/60 border border-slate-100 relative">
              {/* Highlight ribbon */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Cotação Rápida em 30s
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Receba a Tabela de Preços no WhatsApp
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Valores atualizados 2025/2026 direto com o <strong>Consultor Franzé</strong>.
                </p>
              </div>

              {/* Category Segment Selector */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLeadCategory('individual')}
                  className={`py-2 px-1 rounded-lg text-center transition-all ${
                    leadCategory === 'individual'
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 mx-auto mb-0.5" />
                  Individual/Família
                </button>
                <button
                  type="button"
                  onClick={() => setLeadCategory('corporate')}
                  className={`py-2 px-1 rounded-lg text-center transition-all ${
                    leadCategory === 'corporate'
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 mx-auto mb-0.5 text-emerald-300" />
                  CNPJ / MEI (-40%)
                </button>
                <button
                  type="button"
                  onClick={() => setLeadCategory('odonto')}
                  className={`py-2 px-1 rounded-lg text-center transition-all ${
                    leadCategory === 'odonto'
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="block text-xs">🦷</span>
                  Odontológico
                </button>
              </div>

              <form onSubmit={handleHeroSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp (com DDD)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 90000-0000"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cidade / Estado
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Fortaleza/CE"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Quantidade de Vidas
                    </label>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setLivesCount(Math.max(1, livesCount - 1))}
                        className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-base"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-sm text-slate-800">
                        {livesCount} {livesCount === 1 ? 'vida' : 'vidas'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLivesCount(livesCount + 1)}
                        className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-base"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {leadCategory === 'corporate' && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ótima escolha! No CNPJ/MEI o valor da mensalidade cai até 40%.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Ver Valores & Chamar no WhatsApp
                </button>
              </form>

              {/* Extra micro-actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  onClick={() => onOpenQuickModal('call')}
                  className="hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  Prefere que o Franzé ligue?
                </button>
                <a href="#simulador" className="text-blue-700 font-semibold flex items-center gap-0.5 hover:underline">
                  Simulador Avançado <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
