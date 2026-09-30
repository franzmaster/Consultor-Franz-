import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, MessageCircle, AlertCircle, FileCheck2 } from 'lucide-react';
import { CARENCIA_COMPARISON } from '../data/hapvidaData';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const CarenciasTable: React.FC = () => {
  return (
    <section id="carencias" className="py-16 sm:py-24 bg-white scroll-mt-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Clock className="w-3.5 h-3.5" />
            Prazos & Transparência
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tabela de Carências: Padrão vs Promoção Especial
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Saiba exatamente quanto tempo leva para utilizar cada serviço. Em campanhas promocionais ativas do <strong>Consultor Franzé</strong> ou através de portabilidade, as carências podem ser reduzidas ou até zeradas.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-extrabold">Procedimento / Cobertura</th>
                  <th className="py-4 px-6 font-bold text-slate-300">Carência Padrão ANS</th>
                  <th className="py-4 px-6 font-black text-amber-400 bg-blue-950">
                    Promoção Franzé*
                  </th>
                  <th className="py-4 px-6 font-black text-emerald-400">
                    Com Portabilidade (Plano Anterior)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {CARENCIA_COMPARISON.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-blue-50/40 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {row.service}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">{row.ansStandard}</td>
                    <td className="py-4 px-6 font-bold text-blue-900 bg-blue-50/60">
                      <span className="inline-flex items-center gap-1.5 text-blue-800 font-extrabold">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        {row.promoFranze}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-700">
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        {row.portability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-200">
            *As campanhas promocionais de redução de carência são válidas por períodos determinados e dependem da modalidade de contratação (individual vs empresarial). Consulte condições vigentes com o consultor.
          </div>
        </div>

        {/* Portability Help Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-emerald-950">
                Já Tem Plano de Saúde Atual? Faça a Portabilidade Sem Carências!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900/80 mt-1 max-w-2xl leading-relaxed">
                Envie sua carta de permanência ou as 3 últimas faturas pagas para o <strong>Consultor Franzé</strong>. Fazemos a análise sem custo para você migrar para a Hapvida mantendo todas as suas carências já cumpridas.
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppLink('Olá Consultor Franzé! Gostaria de fazer uma análise gratuita de portabilidade do meu plano de saúde atual para a Hapvida sem carências.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md shrink-0 flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Avaliar Minha Portabilidade
          </a>
        </div>
      </div>
    </section>
  );
};
