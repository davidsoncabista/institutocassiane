/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AudienceData, PillarData, FAQItem, TestimonialItem } from './types';

export const PILLARS: PillarData[] = [
  {
    id: 'aba',
    title: 'Ciência ABA',
    subtitle: 'Análise do Comportamento Aplicada',
    description: 'Intervenções de base científica voltadas para o autismo infantil, desenvolvimento atípico e independência.',
    longDescription: 'A Análise do Comportamento Aplicada (Ciência ABA) é o padrão-ouro de intervenção para o Transtorno do Espectro Autista (TEA) e outros atrasos de desenvolvimento. Nosso trabalho foca em mapear comportamentos, reduzir crises graves e ensinar habilidades essenciais de comunicação, sociabilidade e autonomia diária com base em análise rigorosa de métricas.',
    points: [
      'Protocolos adaptados ao desenvolvimento infantil individualizado',
      'Foco técnico em autonomia, autocuidados e regulação',
      'Treino parental robusto focado em rotinas do cotidiano',
      'Acompanhamento ético com plano de intervenção por dados reais'
    ],
    icon: 'BrainCircuit'
  },
  {
    id: 'neuropsicologia',
    title: 'Neuropsicologia',
    subtitle: 'Avaliação Cognitiva e Emocional',
    description: 'Investigação aprofundada das funções cerebrais, atenção, memória e comportamento para diagnósticos e laudos precisos.',
    longDescription: 'A Avaliação Neuropsicológica conecta a neurologia e a psicologia para investigar como as funções cognitivas (como memória, atenção, planejamento e linguagem) afetam as emoções e a aprendizagem. Essencial para fundamentar laudos de TDAH, TEA, dificuldades escolares intensas e planejar caminhos específicos de desenvolvimento.',
    points: [
      'Investigação diagnóstica do neurodesenvolvimento de excelência',
      'Mapeamento de forças cognitivas e barreiras de aprendizado',
      'Laudos robustos e direcionamentos escolares práticos',
      'Indicação de terapias ou reabilitação personalizada'
    ],
    icon: 'Activity'
  }
];

export const AUDIENCES: AudienceData[] = [
  {
    id: 'pacientes',
    tag: 'SESSÃO DE TERAPIA',
    title: 'Psicoterapia Individual Online',
    subtitle: 'Um espaço seguro e acolhedor para você se conhecer, elaborar e transformar.',
    description: 'Atendimento clínico focado em adolescentes, adultos e idosos. Desenvolvemos estratégias cientificamente fundamentadas para lidar com ansiedade, depressão, transições complexas e o autoconhecimento emancipado de forma flexível no seu computador ou celular.',
    benefits: [
      'Visualização real de progresso e acolhimento focado nas suas dores',
      'Atendimento 100% online com absoluta discrição e sigilo ético',
      'Flexibilidade de horários para conciliar com sua rotina de vida',
      'Apoio emocional sem necessidade de custos ou perdas com trânsito'
    ],
    ctaText: 'Agendar Sessão de Terapia',
    badge: 'Terapia Individual',
    detailedPoints: [
      {
        title: 'Acolhimento & Escuta Ativa',
        description: 'Espaço livre de julgamentos, inteiramente pautado por abordagens de eficácia comprovada.'
      },
      {
        title: 'Estratégias de Mudança',
        description: 'Construa repertórios de enfrentamento para as demandas do cotidiano profissional e pessoal.'
      }
    ]
  },
  {
    id: 'pais',
    tag: 'ORIENTAÇÃO PARENTAL',
    title: 'Suporte, Orientação e Treino Familiar',
    subtitle: 'Apoio para mães, pais e responsáveis na construção de relações mais saudáveis, respeitosas e conscientes.',
    description: 'Voltado para famílias que lidam com desafios no desenvolvimento infantil, atrasos de fala ou diagnóstico de autismo. Capacitamos os cuidadores com estratégias práticas da Ciência ABA para atuar diretamente no ambiente que a criança mais convive.',
    benefits: [
      'Treino prático online focado no desenvolvimento de fala e autonomia',
      'Análise de vídeos e dinâmicas familiares em tempo real',
      'Redução do estresse e sobrecarga parental com rotinas estruturadas',
      'Estratégias humanizadas para diminuição de crises e birras profundas'
    ],
    ctaText: 'Solicitar Orientação Parental',
    badge: 'Orientação Parental',
    detailedPoints: [
      {
        title: 'Construção de Conexão Real',
        description: 'Comunicação respeitosa com foco em desenvolvimento emocional infanto-juvenil saudável.'
      },
      {
        title: 'Práticas de Manejo Baseadas em ABA',
        description: 'Capacite-se para ser a mudança estrutural na vida diária de seus filhos de maneira segura.'
      }
    ]
  },
  {
    id: 'profissionais',
    tag: 'SUPERVISÃO DE CASOS CLÍNICOS',
    title: 'Mentoria & Supervisão Técnica para Psicólogos',
    subtitle: 'Supervisão online para psicólogos(as) que atendem autismo infantil e buscam fortalecer sua prática clínica.',
    description: 'Espaço de formação contínua, acolhimento ético e aprimoramento técnico. Perfeito para terapeutas e analistas do comportamento que buscam segurança na aplicação de protocolos e refinamento da conceituação de seus casos.',
    benefits: [
      'Estudos detalhados de casos clínicos reais com absoluto sigilo profissional',
      'Orientação sobre elaboração de relatórios, laudos e metas comportamentais',
      'Apoio técnico especializado para aplicação de protocolos (VB-MAPP, AFLS, ESDM)',
      'Mentoria sobre posicionamento profissional de impacto ético e de negócios'
    ],
    ctaText: 'Agendar Supervisão de Caso',
    badge: 'Supervisão Clínica',
    detailedPoints: [
      {
        title: 'Fortalecimento de Prática Clínica',
        description: 'Direcionamentos práticos, com segurança ética para melhorar desfechos de intervenção.'
      },
      {
        title: 'Discussão de Alta Complexidade',
        description: 'Refinamento do seu olhar diagnóstico com auxílio de uma especialista experiente.'
      }
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'Como funciona o atendimento online? Perde o acolhimento do olho no olho?',
    answer: 'De forma alguma. O atendimento online mantém o mesmo rigor ético, acolhimento integral e escuta ativa do consultório físico. Ele é feito através de videochamadas seguras e criptografadas. Com o nosso acolhimento focado nas suas características, você recebe o suporte necessário exatamente onde estiver, otimizando seu tempo e garantindo seu bem-estar.'
  },
  {
    id: 2,
    question: 'A orientação de pais serve apenas para casos de autismo?',
    answer: 'Não. A Orientação Parental serve para qualquer família que sinta necessidade de construir relações mais respeitosas, resolver conflitos diários de comportamento ou rotina, e apoiar o desenvolvimento global da infância, embora usemos ferramentas validadas científicas da Ciência ABA para crianças atípicas ou com suspeita diagnóstica.'
  },
  {
    id: 3,
    question: 'O Instituto atende por convênio/plano de saúde?',
    answer: 'Atendemos de forma particular e fornecemos recibos estruturados com todos os códigos técnicos (CRP 10/09478) e relatórios necessários para que você possa dar entrada no pedido de reembolso integral ou parcial junto ao seu plano de saúde, conforme as regras vigentes do seu contrato.'
  },
  {
    id: 4,
    question: 'O que é a Supervisão de Casos e quem pode se inscrever?',
    answer: 'A Supervisão é voltada para psicólogos(as) formados ou em formação final que atendem casos infantis, autismo e neurodesenvolvimento. É um espaço para discutir a conceituação de casos de forma técnica, ética e prática para estruturar condutas terapêuticas seguras.'
  }
];

export interface RigidezItem {
  title: string;
  description: string;
  icon: string;
}

export const COGNITIVE_RIGIDITY_RESOURCES = {
  definition: 'A Rigidez Cognitiva é a dificuldade de flexibilizar o pensamento e adaptar-se a novas situações, ideias ou mudanças que surgem na rotina das pessoas.',
  consequences: [
    'Resistência profunda a mudanças cotidianas',
    'Sofrimento excessivo ou desnecessário por imprevistos',
    'Dificuldades severas na construção de relacionamentos',
    'Crises de ansiedade e acúmulo de estresse mental'
  ],
  examples: [
    'Grande dificuldade em aceitar opiniões ou visões diferentes das suas',
    'Apego excessivo ou dependência de rotinas excessivamente rígidas',
    'Pensar recorrentemente que "só existe uma forma correta de fazer as coisas"',
    'Sentir conforto apenas no que já é extremamente familiar, rejeitando novidades'
  ],
  howToDevelop: [
    { title: 'Questione pensamentos automáticos', desc: 'Pergunte-se: existem outras explicações plausíveis para esta situação?' },
    { title: 'Explore novas perspectivas', desc: 'Tente enxergar a decisão sob o olhar de outra pessoa sem julgá-la.' },
    { title: 'Pratique pequenas mudanças diárias', desc: 'Mude caminhos simples, experimente novos pratos e quebre micro-rotinas.' },
    { title: 'Seja gentil consigo mesmo', desc: 'Respeite seu tempo e lembre-se: flexibilizar não é perder convicções.' }
  ],
  quote: 'Lembre-se: Flexibilizar o pensamento não é perder suas convicções, mas sim abrir espaço para crescer com leveza.'
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Mãe do Leo (6 anos, diagnóstico de TEA)",
    text: "O treino de pais baseado na Ciência ABA mudou nossa dinâmica doméstica. O Leo reduziu drasticamente as crises diante de imprevistos porque aprendemos a estruturar a rotina de forma flexível e previsível. O atendimento online do Instituto é sensacional e muito acolhedor.",
    rating: 5,
    category: "pais",
    initials: "MS",
    location: "Belém, PA"
  },
  {
    id: 2,
    name: "Dr. André Santos",
    role: "Psicólogo Clínico",
    text: "A supervisão técnica de casos com a Cassiane foi um divisor de águas na minha prática profissional. A segurança que sinto hoje para aplicar os protocolos de desenvolvimento e estruturar os dados me permitiu entregar resultados reais de autonomia para meus pacientes.",
    rating: 5,
    category: "profissionais",
    initials: "AS",
    location: "São Paulo, SP"
  },
  {
    id: 3,
    name: "Camila Rodrigues",
    role: "Paciente de Psicoterapia Individual",
    text: "Iniciar a terapia digital no Instituto me trouxe uma liberdade enorme. No começo pensei que a tela fria traria distância, mas o nível de escuta e acolhimento humano que recebo em cada sessão de flexibilidade cognitiva desmistificou qualquer dúvida técnica.",
    rating: 5,
    category: "pacientes",
    initials: "CR",
    location: "Belo Horizonte, MG"
  },
  {
    id: 4,
    name: "Thiago Vasconcelos",
    role: "Pai da Sofia (8 anos)",
    text: "O processo de Avaliação Neuropsicológica foi extremamente detalhado. O laudo clínico que recebemos nos deu caminhos claros para a coordenação pedagógica da escola adaptar as atividades da Sofia. O atendimento foi impecável do início ao fim.",
    rating: 5,
    category: "pais",
    initials: "TV",
    location: "Ananindeua, PA"
  },
  {
    id: 5,
    name: "Beatriz Nogueira",
    role: "Psicóloga e Pesquisadora",
    text: "As discussões de alta complexidade ajudam a construir um olhar analítico e ético insubstituível. Recomendo de olhos fechados tanto a mentoria quanto as linhas de aprimoramento que o Instituto disponibiliza no modelo digital.",
    rating: 5,
    category: "profissionais",
    initials: "BN",
    location: "Curitiba, PR"
  }
];

