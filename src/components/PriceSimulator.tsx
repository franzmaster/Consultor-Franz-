import React, { useState, useMemo } from 'react';
import { Calculator, Users, Building2, Sparkles, MessageCircle, Check, ArrowRight, ShieldCheck, HelpCircle, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { AGE_BRACKETS, ODONTO_PRICE_PER_LIFE, CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink, formatBRL, getSimulationWhatsAppMessage } from '../utils/whatsapp';

export const PriceSimulator: React.FC = () => {
  const [planType, setPlanType] = useState<'individual' | 'corporate' | 'odonto'>('corporate');
  const [accommodation, setAccommodation] = useState<'enfermaria' | 'apartamento'>('enfermaria');
  const [copay, setCopay] = useState<'com' | 'sem'>('com');
  const [includeOdonto, setIncludeOdonto] = useState<boolean>(true);

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('');

  // Bracket counts: default to a realistic 2-person family (1 adult 29-33, 1 child 0-18)
  const [counts, setCounts] = useState<Record<string, number>>({
    '0-18': 1,
    '19-23': 0,
    '24-28': 0,
    '29-33': 1,
    '34-38': 0,
    '39-43': 0,
    '44-48': 0,
    '49-53': 0,
    '54-58': 0,
    '59+': 0,
  });

  const [showProposalModal, setShowProposalModal] = useState(false);

  const updateCount = (bracketId: string, delta: number) => {
    setCounts((prev) => {
      const current = prev[bracketId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [bracketId]: next };
    });
  };

  const resetCounts = () => {
    setCounts({
      '0-18': 0,
      '19-23': 0,
      '24-28': 0,
      '29-33': 0,
      '34-38': 0,
      '39-43': 0,
      '44-48': 0,
      '49-53': 0,
      '54-58': 0,
      '59+': 0,
    });
  };

  // Calculations
  const calculation = useMemo(() => {
    let totalLives = 0;
    let baseHealthTotal = 0;
    const bracketDetails: { bracket: typeof AGE_BRACKETS[0]; count: number; unitPrice: number; subtotal: number }[] = [];

    // Coparticipation factor: "Sem Coparticipação" has ~25% higher monthly fee than "Com Coparticipação"
    const copayMultiplier = copay === 'sem' ? 1.25 : 1.0;

    AGE_BRACKETS.forEach((bracket) => {
      const count = counts[bracket.id] || 0;
      if (count > 0) {
        totalLives += count;

        let unitBase = 0;
        if (planType === 'corporate') {
          unitBase = accommodation === 'apartamento' ? bracket.basePriceCorporateApto : bracket.basePriceCorporateEnf;
        } else {
          unitBase = accommodation === 'apartamento' ? bracket.basePriceIndividualApto : bracket.basePriceIndividualEnf;
        }

        const unitFinal = unitBase * copayMultiplier;
        const sub = unitFinal * count;
        baseHealthTotal += sub;

        bracketDetails.push({
          bracket,
          count,
          unitPrice: unitFinal,
          subtotal: sub,
        });
      }
    });

    const odontoTotal = (includeOdonto || planType === 'odonto') ? totalLives * ODONTO_PRICE_PER_LIFE : 0;
    const finalMonthlyTotal = planType === 'odonto' ? (totalLives * ODONTO_PRICE_PER_LIFE) : (baseHealthTotal + odontoTotal);

    // Calculate approximate savings if corporate vs individual
    let estimatedSavings = 0;
    if (planType === 'corporate') {
      let theoreticalIndividual = 0;
      AGE_BRACKETS.forEach((bracket) => {
        const count = counts[bracket.id] || 0;
        if (count > 0) {
          const unit = accommodation === 'apartamento' ? bracket.basePriceIndividualApto : bracket.basePriceIndividualEnf;
          theoreticalIndividual += unit * copayMultiplier * count;
        }
      });
      estimatedSavings = Math.max(0, theoreticalIndividual - baseHealthTotal);
    }

    return {
      totalLives,
      baseHealthTotal,
      odontoTotal,
      finalMonthlyTotal,
      estimatedSavings,
      bracketDetails,
    };
  }, [counts, planType, accommodation, copay, includeOdonto]);

  // Formatted string for WhatsApp breakdown
  const formattedBreakdown = useMemo(() => {
    return calculation.bracketDetails
      .map((item) => `• ${item.count}x (${item.bracket.label}): ${formatBRL(item.subtotal)}`)
      .join('\n');
  }, [calculation.bracketDetails]);

  const handleSendToWhatsApp = () => {
    const message = getSimulationWhatsAppMessage({
      planType,
      accommodation,
      copay,
      includeOdonto,
      totalLives: calculation.totalLives,
      totalMonthly: calculation.finalMonthlyTotal,
      breakdown: formattedBreakdown,
      name: clientName,
      city: clientCity,
    });
    window.open(buildWhatsAppLink(message), '_blank');
  };

  return (
    <section id="simulador" className="py-16 sm:py-24 bg-slate-100/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Simulador de Preços Oficial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Descubra o Valor Exato do Seu Plano Hapvida
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Adicione a quantidade de pessoas por faixa de idade e veja a estimativa mensal em tempo real. Se você tem <strong>CNPJ ou MEI</strong>, selecione a opção Empresarial para garantir até <strong>40% de desconto</strong>.
          </p>
        </div>

        {/* Main Simulator Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (8 cols on lg) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-7">
            {/* Step 1: Type of contract */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">1</span>
                  Tipo de Contratação
                </label>
                {planType === 'corporate' && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Desconto de até 40% ativo
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPlanType('corporate')}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    planType === 'corporate'
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Building2 className={`w-5 h-5 ${planType === 'corporate' ? 'text-blue-700' : 'text-slate-400'}`} />
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white px-1.5 py-0.5 rounded-md">
                      Melhor Preço
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">Empresarial / MEI</div>
                  <div className="text-xs text-slate-500 mt-0.5">A partir de 2 vidas no CNPJ</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanType('individual')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    planType === 'individual'
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Users className={`w-5 h-5 ${planType === 'individual' ? 'text-blue-700' : 'text-slate-400'}`} />
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">Individual / Familiar</div>
                  <div className="text-xs text-slate-500 mt-0.5">Contratação Pessoa Física (CPF)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanType('odonto')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    planType === 'odonto'
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">🦷</span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">Apenas +Odonto</div>
                  <div className="text-xs text-slate-500 mt-0.5">Plano Odontológico exclusivo</div>
                </button>
              </div>
            </div>

            {/* Step 2: Accommodation & Copay (only if health plan selected) */}
            {planType !== 'odonto' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-slate-100">
                {/* Acomodação */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">2</span>
                    Acomodação
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccommodation('enfermaria')}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        accommodation === 'enfermaria'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Enfermaria
                      <span className="block text-[10px] font-normal opacity-80">Quarto Coletivo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccommodation('apartamento')}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        accommodation === 'apartamento'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Apartamento
                      <span className="block text-[10px] font-normal opacity-80">Quarto Privativo</span>
                    </button>
                  </div>
                </div>

                {/* Coparticipação */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">3</span>
                    Coparticipação
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCopay('com')}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        copay === 'com'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Com Coparticipação
                      <span className="block text-[10px] font-normal opacity-80">Mensalidade menor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCopay('sem')}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        copay === 'sem'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Sem Coparticipação
                      <span className="block text-[10px] font-normal opacity-80">Sem taxas por uso</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Optional Odonto Addon toggle (if health plan) */}
            {planType !== 'odonto' && (
              <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-lg shadow-sm">
                    🦷
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      Incluir Hapvida +Odonto Completo
                      <span className="text-[10px] font-extrabold bg-cyan-200 text-cyan-900 px-2 py-0.5 rounded-full">
                        +R$ 29,90/vida
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Urgência 24h, consultas, limpeza, restauração e canal para todos os dependentes.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeOdonto}
                    onChange={(e) => setIncludeOdonto(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            )}

            {/* Step 3: Age Brackets Grid */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">4</span>
                  Quantidade de Pessoas por Idade
                </label>
                <button
                  type="button"
                  onClick={resetCounts}
                  className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Limpar tudo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AGE_BRACKETS.map((bracket) => {
                  const count = counts[bracket.id] || 0;
                  // Base unit estimate for preview
                  let unitEst = 0;
                  if (planType === 'corporate') {
                    unitEst = accommodation === 'apartamento' ? bracket.basePriceCorporateApto : bracket.basePriceCorporateEnf;
                  } else {
                    unitEst = accommodation === 'apartamento' ? bracket.basePriceIndividualApto : bracket.basePriceIndividualEnf;
                  }
                  if (copay === 'sem') unitEst *= 1.25;

                  return (
                    <div
                      key={bracket.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        count > 0 ? 'bg-blue-50/60 border-blue-400' : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800">{bracket.label}</div>
                        <div className="text-[11px] text-slate-500">
                          {planType === 'odonto' ? 'R$ 29,90' : `a partir de ${formatBRL(unitEst)}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateCount(bracket.id, -1)}
                          disabled={count === 0}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-sm shadow-2xs"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-extrabold text-sm text-slate-900">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCount(bracket.id, 1)}
                          className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-2xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Calculation Summary Card (5 cols on lg) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 border-b border-blue-800/70 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    Cotação em Tempo Real
                  </span>
                  <h3 className="text-xl font-black text-white">Resumo da Simulação</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-blue-200 block">Total de Vidas</span>
                  <span className="text-2xl font-black text-white">{calculation.totalLives}</span>
                </div>
              </div>

              {/* Specs Pill List */}
              <div className="space-y-2 mb-6 text-xs text-blue-100">
                <div className="flex items-center justify-between">
                  <span className="text-blue-300">Modalidade:</span>
                  <span className="font-bold text-white">
                    {planType === 'corporate' ? 'Empresarial / MEI (-40%)' : planType === 'odonto' ? 'Odontológico' : 'Individual / Familiar'}
                  </span>
                </div>
                {planType !== 'odonto' && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Acomodação:</span>
                      <span className="font-bold text-white capitalize">{accommodation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Coparticipação:</span>
                      <span className="font-bold text-white">{copay === 'com' ? 'Com Coparticipação' : 'Sem Coparticipação'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300">Odontologia:</span>
                      <span className="font-bold text-white">{includeOdonto ? 'Incluso (+Odonto)' : 'Não inclusa'}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Total Price Highlight */}
              <div className="bg-blue-800/60 border border-blue-700/60 rounded-2xl p-4 mb-6">
                <div className="text-xs text-blue-200 mb-1">Estimativa de Mensalidade Total:</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  {calculation.totalLives === 0 ? 'R$ 0,00' : formatBRL(calculation.finalMonthlyTotal)}
                  <span className="text-xs font-normal text-blue-200 ml-1">/mês</span>
                </div>
                {calculation.estimatedSavings > 0 && (
                  <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Você economiza cerca de {formatBRL(calculation.estimatedSavings)}/mês no CNPJ!
                  </div>
                )}
              </div>

              {/* What is included checklist */}
              <div className="space-y-2 mb-6 text-xs text-blue-100/90 border-t border-blue-800/60 pt-4">
                <div className="font-bold text-white text-xs mb-1">Garantias inclusas no seu plano:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Urgência e Emergência 24h na rede própria</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Telemedicina 24 horas no app Hapvida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Consultas médicas em todas as especialidades</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Exames de imagem e laboratoriais Vida & Imagem</span>
                </div>
              </div>

              {/* Client Info Inputs before sending */}
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Seu Nome (opcional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-blue-900/60 border border-blue-700 text-white placeholder-blue-300 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <input
                  type="text"
                  placeholder="Sua Cidade / Estado (Ex: Fortaleza/CE)"
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  className="w-full bg-blue-900/60 border border-blue-700 text-white placeholder-blue-300 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                disabled={calculation.totalLives === 0}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:pointer-events-none text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Receber Proposta Formal no WhatsApp
              </button>

              <button
                type="button"
                onClick={() => setShowProposalModal(true)}
                disabled={calculation.totalLives === 0}
                className="w-full mt-2 text-xs font-semibold text-blue-200 hover:text-white py-2 flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Visualizar Resumo da Proposta em Tela
              </button>

              <div className="mt-4 text-[11px] text-blue-300/80 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Valores referenciais da tabela vigente Hapvida. Sem compromisso.</span>
              </div>
            </div>

            {/* Quick helper advice */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Dica do Franzé:</strong> Possui plano atual em outra operadora? Você pode pedir redução ou isenção de carências por portabilidade. Fale comigo no WhatsApp para analisar sua carta de permanência!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Visual proposal preview */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <span className="text-xs font-black uppercase text-blue-700 tracking-wider">Hapvida NotreDame</span>
                <h3 className="text-lg font-black text-slate-900">Resumo da Cotação Oficial</h3>
              </div>
              <button
                onClick={() => setShowProposalModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-3 bg-blue-50 rounded-xl space-y-1">
                <p><strong>Consultor Credenciado:</strong> {CONSULTANT_INFO.fullName}</p>
                <p><strong>Contato:</strong> {CONSULTANT_INFO.phone}</p>
                <p><strong>Data da Cotação:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Composição dos Beneficiários:</h4>
                <div className="divide-y divide-slate-100 border rounded-xl overflow-hidden">
                  {calculation.bracketDetails.map((item) => (
                    <div key={item.bracket.id} className="p-2.5 flex justify-between items-center text-xs">
                      <span>{item.count}x ({item.bracket.label})</span>
                      <span className="font-bold text-slate-900">{formatBRL(item.subtotal)}</span>
                    </div>
                  ))}
                  {includeOdonto && (
                    <div className="p-2.5 flex justify-between items-center text-xs bg-cyan-50/50">
                      <span>Odontologia (+Odonto) para {calculation.totalLives} vidas</span>
                      <span className="font-bold text-slate-900">{formatBRL(calculation.odontoTotal)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Mensal Estimado</span>
                  <span className="text-2xl font-black text-amber-400">{formatBRL(calculation.finalMonthlyTotal)}</span>
                </div>
                <div className="text-right text-[11px] text-slate-300">
                  <span>{planType === 'corporate' ? 'CNPJ / MEI' : 'Pessoa Física'}</span>
                  <span className="block font-bold capitalize">{accommodation}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowProposalModal(false);
                    handleSendToWhatsApp();
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Enviar Cotação para WhatsApp do Franzé
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Imprimir ou Salvar em PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
