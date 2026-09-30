import React from 'react';
import { ShieldCheck, Phone, Mail, Clock, MapPin, MessageCircle, Heart, Lock } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/hapvidaData';
import { buildWhatsAppLink, getGeneralInquiryMessage } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Identity Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600 flex items-center justify-center text-white shadow-md">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[9px] font-black tracking-widest text-amber-400">HAP</span>
                  <span className="text-sm font-black">VIDA</span>
                </div>
              </div>
              <div>
                <span className="font-extrabold text-white text-base block">Consultor Franzé</span>
                <span className="text-[11px] text-slate-400">Corretor Oficial Autorizado</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Atendimento especializado e consultivo na contratação dos melhores planos de saúde e odontológicos da <strong>Hapvida NotreDame Intermédica</strong> para indivíduos, famílias e empresas.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-blue-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{CONSULTANT_INFO.registration}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Navegação Rápida</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#simulador" className="hover:text-white transition-colors">
                  Simulador de Preços Online
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-white transition-colors">
                  Nosso Plano Hapvida
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-white transition-colors">
                  Plano Mix & Pleno
                </a>
              </li>
              <li>
                <a href="#pme" className="hover:text-white transition-colors text-emerald-400 font-bold">
                  Plano PME / MEI (Até 40% OFF)
                </a>
              </li>
              <li>
                <a href="#rede" className="hover:text-white transition-colors">
                  Hospitais e Rede Própria
                </a>
              </li>
              <li>
                <a href="#carencias" className="hover:text-white transition-colors">
                  Tabela de Carências e Portabilidade
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Canais de Atendimento</h4>
            <div className="space-y-2 text-xs">
              <a
                href={buildWhatsAppLink(getGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {CONSULTANT_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Ligação: {CONSULTANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{CONSULTANT_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{CONSULTANT_INFO.operatingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{CONSULTANT_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Trust and Security */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Segurança & Conformidade</h4>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ambiente Seguro 256-bit</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Seus dados cadastrais são tratados com estrita privacidade e segurança, em total observância à Lei Geral de Proteção de Dados (LGPD nº 13.709/2018).
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory disclaimer */}
        <div className="pt-8 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>Aviso Legal & Regulatório:</strong> Este website é de propriedade e gestão exclusiva do <strong>Consultor Franzé</strong>, corretor e consultor autorizado e credenciado para comercialização e assessoria de planos de saúde e odontológicos da operadora Hapvida NotreDame Intermédica. Todas as coberturas, procedimentos, carências e acomodações seguem o Rol de Procedimentos da Agência Nacional de Saúde Suplementar (ANS) e as cláusulas do contrato oficial da operadora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 text-slate-400">
            <div>
              © {new Date().getFullYear()} Consultor Franzé Hapvida. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              Desenvolvido com excelência para proporcionar a melhor experiência de contratação.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
