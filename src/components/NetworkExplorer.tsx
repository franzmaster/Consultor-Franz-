import React, { useState } from 'react';
import { Building2, Search, MapPin, Activity, Stethoscope, Video, ShieldCheck, MessageCircle } from 'lucide-react';
import { NETWORK_FACILITIES, CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink } from '../utils/whatsapp';

export const NetworkExplorer: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFacilities = NETWORK_FACILITIES.filter((f) => {
    const matchesType = selectedType === 'all' || f.type === selectedType;
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.services.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <section id="rede" className="py-16 sm:py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Infraestrutura Própria Exclusiva
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A Maior Rede Própria de Atendimento de Saúde do Brasil
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A Hapvida opera no modelo verticalizado: hospitais, maternidades, prontos-atendimentos e laboratórios próprios. Menos filas, liberação rápida e médicos de plantão 24 horas por dia.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por hospital, clínica, cidade ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto shrink-0 justify-center">
              <button
                onClick={() => setSelectedType('all')}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
                  selectedType === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedType('hospital')}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
                  selectedType === 'hospital' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Hospitais & Maternidades
              </button>
              <button
                onClick={() => setSelectedType('hapclinica')}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
                  selectedType === 'hapclinica' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                HAPClínicas
              </button>
              <button
                onClick={() => setSelectedType('vida-imagem')}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
                  selectedType === 'vida-imagem' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Vida & Imagem
              </button>
              <button
                onClick={() => setSelectedType('telemedicina')}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
                  selectedType === 'telemedicina' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Telemedicina
              </button>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                    {facility.type === 'hospital'
                      ? 'Hospital / Maternidade'
                      : facility.type === 'vida-imagem'
                      ? 'Diagnóstico & Imagem'
                      : facility.type === 'hapclinica'
                      ? 'HAPClínica'
                      : 'Atendimento Digital'}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    {facility.city}/{facility.state}
                  </span>
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-1 leading-snug">
                  {facility.name}
                </h3>

                <p className="text-xs text-slate-500 mb-3">{facility.address}</p>

                <div className="p-3 bg-blue-50/70 rounded-2xl mb-4 border border-blue-100">
                  <div className="text-[11px] font-bold text-blue-900 mb-1">Destaque da Unidade:</div>
                  <div className="text-xs text-blue-800">{facility.highlight}</div>
                </div>

                {/* Services tags */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Serviços e Especialidades:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {facility.services.map((serv, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg"
                      >
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card CTA */}
              <a
                href={buildWhatsAppLink(`Olá Franzé! Gostaria de saber mais sobre o atendimento do plano Hapvida na unidade: ${facility.name} em ${facility.city}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-3 border-t border-slate-100 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Consultar cobertura desta unidade com Franzé
              </a>
            </div>
          ))}
        </div>

        {/* Telemedicine Feature Box */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-slate-900">
                Pronto Atendimento Virtual e Telemedicina 24 Horas
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Consulte com médico clínico ou pediatra de qualquer lugar, direto pelo celular. Receitas digitais, atestados e pedidos de exames válidos em todo o território nacional.
              </p>
            </div>
          </div>
          <a
            href={buildWhatsAppLink('Olá Consultor Franzé! Como funciona a telemedicina no aplicativo da Hapvida? Já fica disponível logo após a contratação?')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shrink-0 transition-colors"
          >
            Saber Mais no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
