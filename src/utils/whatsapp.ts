import { CONSULTANT_INFO } from '../data/hapvidaData';

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONSULTANT_INFO.phoneRaw}?text=${encoded}`;
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function getGeneralInquiryMessage(planName?: string): string {
  if (planName) {
    return `Olá Consultor Franzé! Vi seu site e gostaria de mais informações e cotação sobre o plano *${planName}*. Pode me atender?`;
  }
  return `Olá Consultor Franzé! Gostaria de receber uma tabela de preços atualizada dos Planos Hapvida e tirar algumas dúvidas. Pode me atender?`;
}

export function getSimulationWhatsAppMessage(data: {
  planType: string;
  accommodation: string;
  copay: string;
  includeOdonto: boolean;
  totalLives: number;
  totalMonthly: number;
  breakdown: string;
  name?: string;
  city?: string;
}): string {
  const planTypeStr = data.planType === 'corporate' ? 'Empresarial / MEI (Desconto especial)' : data.planType === 'odonto' ? 'Apenas Odontológico' : 'Individual / Familiar';
  const acomodacaoStr = data.accommodation === 'apartamento' ? 'Apartamento (Quarto Individual)' : 'Enfermaria (Quarto Coletivo)';
  const copayStr = data.copay === 'com' ? 'Com Coparticipação (Mensalidade reduzida)' : 'Sem Coparticipação';

  let msg = `🏥 *Simulação de Plano Hapvida - Consultor Franzé*\n\n`;
  if (data.name) msg += `👤 *Nome:* ${data.name}\n`;
  if (data.city) msg += `📍 *Cidade:* ${data.city}\n`;
  msg += `📋 *Modalidade:* ${planTypeStr}\n`;
  msg += `🛏️ *Acomodação:* ${acomodacaoStr}\n`;
  msg += `💳 *Coparticipação:* ${copayStr}\n`;
  msg += `🦷 *Odontologia Inclusa:* ${data.includeOdonto ? 'Sim (+Odonto)' : 'Não'}\n`;
  msg += `👥 *Total de Vidas:* ${data.totalLives}\n`;
  if (data.breakdown) {
    msg += `📊 *Faixas Etárias:*\n${data.breakdown}\n`;
  }
  msg += `💰 *Valor Estimado:* ${formatBRL(data.totalMonthly)}/mês\n\n`;
  msg += `Gostaria de conferir a tabela completa e formalizar essa cotação com você, Franzé!`;

  return msg;
}
