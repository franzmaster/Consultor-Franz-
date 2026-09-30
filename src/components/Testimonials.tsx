import React from 'react';
import { Star, ShieldCheck, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Depoimentos de Clientes Reais
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Veja o Que Dizem Quem Já Contratou com o Franzé
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Mais de 3.800 clientes atendidos com nota <strong>4.9/5 estrelas</strong>. A satisfação e a tranquilidade da sua família em primeiro lugar.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-1">5.0</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                {t.savings && (
                  <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md mb-2">
                    {t.savings}
                  </div>
                )}
                <div className="font-extrabold text-slate-900 text-sm">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role} • {t.city}</div>
                <div className="text-[10px] text-blue-700 font-semibold mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-600" /> Plano: {t.plan}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">Quer ver mais referências ou tirar dúvidas?</div>
              <div className="text-xs text-slate-500">O Franzé te atende agora mesmo no WhatsApp com total transparência.</div>
            </div>
          </div>

          <a
            href={buildWhatsAppLink('Olá Consultor Franzé! Vi os depoimentos no site e gostaria de saber qual plano melhor se adapta à minha família.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-sm shrink-0 transition-colors"
          >
            Falar com Franzé Agora
          </a>
        </div>
      </div>
    </section>
  );
};
