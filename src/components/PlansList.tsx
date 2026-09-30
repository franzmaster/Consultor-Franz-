import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, MessageCircle, ArrowRight, Building2, Users, Info } from 'lucide-react';
import { PLANS, CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink, formatBRL, getGeneralInquiryMessage } from '../utils/whatsapp';
import { PlanOption } from '../types';

export const PlansList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'individual' | 'corporate' | 'odonto'>('all');
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<PlanOption | null>(null);

  const filteredPlans = PLANS.filter((plan) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'individual') return plan.id !== 'plano-pme' && plan.id !== 'hapvida-odonto';
    if (activeCategory === 'corporate') return plan.id === 'plano-pme' || plan.corporateDiscount !== undefined;
    if (activeCategory === 'odonto') return plan.id === 'hapvida-odonto';
    return true;
  });

  return (
    <section id="planos" className="py-16 sm:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Catálogo Oficial de Planos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Escolha o Plano Ideal para a Sua Necessidade
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A Hapvida oferece modalidades feitas sob medida para você, sua família ou empresa. Compare os planos e conte com o <strong>Consultor Franzé</strong> para indicar o mais vantajoso.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                activeCategory === 'all'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos os Planos
            </button>
            <button
              onClick={() => setActiveCategory('individual')}
              className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                activeCategory === 'individual'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Individuais e Familiares
            </button>
            <button
              onClick={() => setActiveCategory('corporate')}
              className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeCategory === 'corporate'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              Empresariais / MEI (-40%)
            </button>
            <button
              onClick={() => setActiveCategory('odonto')}
              className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                activeCategory === 'odonto'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🦷 Só Odontológico
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl border transition-all flex flex-col justify-between relative bg-white overflow-hidden ${
                plan.popular
                  ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/10'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Highlight ribbon */}
              {plan.badge && (
                <div
                  className={`py-1.5 px-4 text-center text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r ${plan.color}`}
                >
                  {plan.badge}
                </div>
              )}

              <div className="p-6 sm:p-7 flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{plan.name}</h3>
                </div>

                <p className="text-xs text-slate-500 min-h-[36px] mb-4">{plan.tagline}</p>

                {/* Price tag */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                  <span className="text-[11px] text-slate-500 font-semibold block">A partir de</span>
                  <div className="text-3xl font-black text-blue-900 tracking-tight">
                    {formatBRL(plan.startingPrice)}
                    <span className="text-xs font-semibold text-slate-500 ml-1">/mês</span>
                  </div>
                  {plan.corporateDiscount && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {plan.corporateDiscount}
                    </span>
                  )}
                </div>

                {/* Scope specs */}
                <div className="space-y-2 mb-5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Cobertura:</span>
                    <span className="font-bold text-slate-800 text-right">{plan.coverage}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Segmentação:</span>
                    <span className="font-bold text-slate-800 text-right">{plan.segmentation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Acomodação:</span>
                    <span className="font-bold text-slate-800">{plan.accommodationOptions.join(' ou ')}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-xs font-bold text-slate-900 block">Destaques do Plano:</span>
                  {plan.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2">
                <a
                  href={buildWhatsAppLink(getGeneralInquiryMessage(plan.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Cotar Este Plano no WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedPlanDetails(plan)}
                  className="w-full text-xs font-bold text-slate-600 hover:text-blue-700 py-2 flex items-center justify-center gap-1 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  Ver Detalhes e Especialidades
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate PME Callout Banner */}
        <div id="pme" className="mt-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                <Building2 className="w-3.5 h-3.5" /> Condição Exclusiva CNPJ / MEI
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Você Tem CNPJ ou é Microempreendedor Individual (MEI)?
              </h3>
              <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl leading-relaxed">
                Contrate com no mínimo <strong>2 vidas</strong> (você + seu cônjuge, filho ou sócio) e tenha até <strong>40% de desconto</strong> permanente em relação à pessoa física, com carências muito mais reduzidas.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-blue-200 pt-2">
                <span>✔ Válido para MEI com +6 meses</span>
                <span>✔ Inclusão de dependentes diretos</span>
                <span>✔ Atendimento VIP pelo Franzé</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={buildWhatsAppLink('Olá Consultor Franzé! Tenho MEI/CNPJ e gostaria de cotar o plano empresarial com até 40% de desconto para 2 ou mais pessoas.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm px-6 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Cotação Expressa CNPJ no WhatsApp
              </a>
              <a
                href="#simulador"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 text-center transition-colors"
              >
                Calcular Economia no Simulador
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Detailed Plan Inspection */}
      {selectedPlanDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <span className="text-xs font-black uppercase text-blue-700 tracking-wider">Hapvida NotreDame</span>
                <h3 className="text-xl font-black text-slate-900">{selectedPlanDetails.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPlanDetails(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <p className="text-slate-600">{selectedPlanDetails.tagline}</p>

              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="text-xs font-bold text-blue-900 block mb-1">Indicado Para:</span>
                <p className="text-xs text-blue-800">{selectedPlanDetails.idealFor}</p>
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block mb-2">
                  Cobertura Completa Inclusa:
                </span>
                <div className="space-y-2">
                  {selectedPlanDetails.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t">
                <a
                  href={buildWhatsAppLink(getGeneralInquiryMessage(selectedPlanDetails.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Tirar Dúvidas Deste Plano com Franzé
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
