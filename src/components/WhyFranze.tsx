import React from 'react';
import { UserCheck, ShieldCheck, HeartHandshake, Zap, Clock, CheckCircle2, MessageCircle, FileSignature, Smartphone, Award } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const WhyFranze: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-800/80 border border-blue-600/50 text-blue-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Por Que Escolher o Consultor Franzé?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Consultoria Humana, Ágil e Sem Letras Miúdas
          </h2>
          <p className="mt-3 text-base text-blue-100/80">
            Contratar um plano de saúde é uma decisão séria para a sua família ou empresa. Com o <strong>Franzé</strong>, você tem um corretor parceiro que te atende pelo nome e resolve de verdade.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-white mb-2">Atendimento Direto</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nada de esperar horas em URA telefônica ou robôs que não entendem o que você precisa. Fale direto com o Franzé pelo WhatsApp.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-white mb-2">Implantação Expressa</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cadastro da proposta direto no sistema operacional da Hapvida. Seu plano é ativado em até 24/48 horas com carteirinha no app.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-4 shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-white mb-2">Pós-Venda Permanente</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nosso relacionamento não acaba quando você assina o contrato. Precisou de 2ª via de boleto, inclusão de dependente ou ajuda em guias? O Franzé te ajuda.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-white mb-2">100% Seguro & Credenciado</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Corretor com registro e credenciamento oficial Hapvida NotreDame Intermédica. Processo transparente com assinatura digital com validade jurídica.
            </p>
          </div>
        </div>

        {/* Process Step by Step */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 sm:p-10 mb-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Passo a Passo</span>
            <h3 className="text-2xl font-black text-white">Como Funciona a Contratação Digital</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                1
              </div>
              <h4 className="font-bold text-sm text-white">Cotação & Simulação</h4>
              <p className="text-xs text-slate-300">
                Você escolhe o plano no simulador ou tira dúvidas com o Franzé no WhatsApp.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                2
              </div>
              <h4 className="font-bold text-sm text-white">Envio de Documentos</h4>
              <p className="text-xs text-slate-300">
                Fotos do RG, CPF, comprovante de residência e dados de dependentes enviadas de forma 100% segura.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Assinatura Digital</h4>
              <p className="text-xs text-slate-300">
                A Hapvida envia um link oficial por SMS ou e-mail para você assinar com 1 toque na tela do celular.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black flex items-center justify-center text-sm shadow-md">
                4
              </div>
              <h4 className="font-bold text-sm text-white">Carteirinha & App</h4>
              <p className="text-xs text-slate-300">
                Plano ativo! Você já baixa o App Hapvida e acessa a carteirinha virtual e a telemedicina.
              </p>
            </div>
          </div>
        </div>

        {/* Consultant Profile Callout */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 border border-blue-700/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 border-2 border-amber-400 flex items-center justify-center text-2xl font-black text-white shadow-lg shrink-0">
              FZ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-black text-white">{CONSULTANT_INFO.fullName}</h4>
                <span className="text-[10px] font-bold bg-amber-400 text-blue-950 px-2 py-0.5 rounded-full">
                  Plantão Aberto
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">{CONSULTANT_INFO.role}</p>
              <p className="text-[11px] text-blue-300/80">{CONSULTANT_INFO.registration} • {CONSULTANT_INFO.operatingHours}</p>
            </div>
          </div>

          <a
            href={buildWhatsAppLink('Olá Consultor Franzé! Gostaria de conversar com você sobre as opções de planos de saúde Hapvida.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 shrink-0 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Iniciar Atendimento no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
