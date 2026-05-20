/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Activity, 
  Heart, 
  Calendar, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Compass, 
  Users, 
  BookOpen, 
  Menu, 
  X, 
  CheckCircle, 
  Lock, 
  Globe, 
  Award,
  Send,
  Sliders,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PILLARS, AUDIENCES, FAQS, COGNITIVE_RIGIDITY_RESOURCES, TESTIMONIALS } from './data';
import { AudienceType, AppointmentFormInput } from './types';

export default function App() {
  // Mobile navigation trigger
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Selection states for tabs
  const [activeAudience, setActiveAudience] = useState<AudienceType>('pacientes');
  const [selectedPillarId, setSelectedPillarId] = useState<string>('aba');
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  // Active item for Cognitive Rigidity Ways
  const [activeFlexStep, setActiveFlexStep] = useState<number>(0);

  // Testimonials Selection State
  const [testimonialCategory, setTestimonialCategory] = useState<'all' | AudienceType>('all');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);


  // Recommendation Quiz States
  const [recommendationStep, setRecommendationStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    objective: '',
    profile: ''
  });
  const [quizResult, setQuizResult] = useState<AudienceType | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState<AppointmentFormInput>({
    fullName: '',
    email: '',
    phone: '',
    modality: 'pacientes',
    message: '',
    period: 'manha'
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Pre-booking calendar simulator
  const [selectedHeroDate, setSelectedHeroDate] = useState<string>('Amanhã');
  const [selectedHeroTime, setSelectedHeroTime] = useState<string>('14:00');

  // Simulated metrics
  const trustMetrics = [
    { value: '+5.200h', label: 'De Atendimento Digital', detail: 'Sessões conduzidas com ética e sigilo' },
    { value: '100%', label: 'Online e Seguro', detail: 'Criptografia e sigilo profissional' },
    { value: 'e-Psi', label: 'CFP Homologado', detail: 'Autorização homologada ativa' },
    { value: '+85%', label: 'Autonomia Real', detail: 'Evolução de pacientes documentada' }
  ];

  const currentAudience = AUDIENCES.find(aud => aud.id === activeAudience) || AUDIENCES[0];
  const currentPillar = PILLARS.find(p => p.id === selectedPillarId) || PILLARS[0];

  const filteredTestimonials = TESTIMONIALS.filter(t => 
    testimonialCategory === 'all' ? true : t.category === testimonialCategory
  );
  
  const activeTestimonial = filteredTestimonials[currentTestimonialIndex] || filteredTestimonials[0] || TESTIMONIALS[0];

  const handleTestimonialCategoryChange = (cat: 'all' | AudienceType) => {
    setTestimonialCategory(cat);
    setCurrentTestimonialIndex(0);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(prev => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(prev => 
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };


  const handleQuizAnswer = (key: 'objective' | 'profile', value: string) => {
    const updated = { ...quizAnswers, [key]: value };
    setQuizAnswers(updated);

    if (key === 'objective') {
      setRecommendationStep(2);
    } else if (key === 'profile') {
      let result: AudienceType = 'pacientes';
      if (updated.objective === 'formation' || updated.profile === 'professional') {
        result = 'profissionais';
      } else if (updated.objective === 'child' || updated.profile === 'family') {
        result = 'pais';
      } else {
        result = 'pacientes';
      }
      setQuizResult(result);
      setRecommendationStep(3);
    }
  };

  const resetQuiz = () => {
    setRecommendationStep(1);
    setQuizAnswers({ objective: '', profile: '' });
    setQuizResult(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert('Por favor, preencha os campos obrigatórios (Nome, E-mail e Telefone).');
      return;
    }
    
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      modality: 'pacientes',
      message: '',
      period: 'manha'
    });
    setFormSuccess(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark font-sans selection:bg-brand-green-light selection:text-brand-green-dark relative overflow-x-hidden">
      
      {/* GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-bg/90 border-b border-stone-200/60 transition-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 bg-brand-green rounded-full flex items-center justify-center shadow-md shadow-brand-green/20 transition-transform hover:scale-105">
              <span className="text-white font-serif text-2xl font-semibold italic">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-navy font-serif">Instituto Cassiane Coelho</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-green font-semibold font-mono">Saúde Mental & Neuropsicologia</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-brand-muted">
            <button onClick={() => scrollToSection('sobre')} className="hover:text-brand-green transition-colors cursor-pointer py-1">O Instituto</button>
            <button onClick={() => scrollToSection('pilares')} className="hover:text-brand-green transition-colors cursor-pointer py-1">Pilares Técnicos</button>
            <button onClick={() => scrollToSection('publicos')} className="hover:text-brand-green transition-colors cursor-pointer py-1">Caminhos de Cuidado</button>
            <button onClick={() => scrollToSection('flexibilidade')} className="hover:text-brand-green transition-colors cursor-pointer py-1">Rigidez Cognitiva</button>
            <button onClick={() => scrollToSection('depoimentos')} className="hover:text-brand-green transition-colors cursor-pointer py-1">Depoimentos</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-brand-green transition-colors cursor-pointer py-1">Dúvidas</button>
          </nav>

          {/* Master Call To Action */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('agendar')} 
              className="px-6 py-2.5 bg-brand-terracotta text-white rounded-full text-sm font-semibold shadow-lg shadow-brand-terracotta/10 hover:bg-brand-terracotta-dark hover:shadow-xl hover:shadow-brand-terracotta/20 transition-all cursor-pointer"
            >
              Agendar Consulta
            </button>
          </div>

          {/* Mobile Navigation Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2D3436] hover:bg-brand-green-light transition-colors"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-brand-bg border-t border-stone-200/80 px-4 py-6 flex flex-col gap-4 shadow-inner"
              id="mobile-navigation-drawer"
            >
              <button 
                onClick={() => scrollToSection('sobre')} 
                className="text-left py-2.5 text-base font-semibold text-brand-dark hover:text-brand-green border-b border-stone-100"
              >
                O Instituto
              </button>
              <button 
                onClick={() => scrollToSection('pilares')} 
                className="text-left py-2.5 text-base font-semibold text-brand-dark hover:text-brand-green border-b border-stone-100"
              >
                Pilares Técnicos
              </button>
              <button 
                onClick={() => scrollToSection('publicos')} 
                className="text-left py-2.5 text-base font-semibold text-brand-dark hover:text-brand-green border-b border-stone-100"
              >
                Caminhos de Cuidado
              </button>
              <button 
                onClick={() => scrollToSection('flexibilidade')} 
                className="text-left py-2.5 text-base font-semibold text-brand-dark hover:text-brand-green border-b border-stone-100"
              >
                Rigidez Cognitiva
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')} 
                className="text-left py-2.5 text-base font-semibold text-brand-dark hover:text-brand-green border-b border-stone-100"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-left py-2.5 text-base font-semibold text-brand-dark hover:text-brand-green border-b border-stone-100"
              >
                Dúvidas Frequentes
              </button>
              
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => scrollToSection('agendar')} 
                  className="w-full text-center py-3 bg-brand-terracotta hover:bg-brand-terracotta-dark text-white rounded-full text-sm font-semibold shadow-md transition-colors"
                >
                  Solicitar Agendamento
                </button>
                <a 
                  href="https://wa.me/5591985907125" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full text-center py-3 border border-stone-300 text-brand-green bg-white rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-50"
                >
                  <MessageCircle className="w-4 h-4 text-brand-green" />
                  WhatsApp Central
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* COMPLIANCE MINI BANNER */}
      <div className="bg-brand-green text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-brand-ochre shrink-0" />
            <span><strong>e-Psi Ativo SP:</strong> Atendimento psicológico digital regulamentado pelo Conselho Federal de Psicologia para todo o Brasil.</span>
          </div>
          <button onClick={() => scrollToSection('agendar')} className="font-semibold text-brand-ochre hover:underline cursor-pointer">
            Consultar triagem de vagas →
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-16 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Subtle Ambient Background Elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-green-light/30 filter blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-brand-terracotta-light/40 filter blur-2xl -z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline Copy Block */}
          <div className="lg:col-span-7 flex flex-col pr-0 lg:pr-8">
            
            <div className="inline-flex max-w-fit items-center gap-2 px-3.5 py-1.5 bg-brand-green-light text-brand-green-dark rounded-full text-[11px] font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3 text-brand-green" /> Atendimento Online de Alta Evidência
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-navy leading-[1.12] mb-6 italic">
              Cuidado que conecta, <br />
              <span className="not-italic font-sans font-bold text-brand-green block sm:inline">onde você estiver.</span>
            </h1>

            <p className="text-lg text-brand-muted leading-relaxed mb-6 max-w-xl">
              Transformamos trajetórias de vida através de cuidados éticos em <strong>Neuropsicologia</strong> e <strong>Ciência ABA</strong>. Desenvolvemos trajetórias personalizadas unindo a eficácia científica ao calor humano essencial no espaço digital.
            </p>

            {/* SERVICES OFFERED - DIRECTLY CONNECTED ABOVE THE FOLD */}
            <div className="mb-8" id="servicos-topo">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green font-mono block mb-3">
                Serviços Oferecidos • Atendimento Online Seguro
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Terapia */}
                <div 
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      modality: 'pacientes',
                      message: 'Olá! Gostaria de agendar uma Sessão de Terapia Online.'
                    }));
                    scrollToSection('agendar');
                  }}
                  className="bg-white p-4 rounded-2xl border border-stone-200/80 hover:border-brand-green hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all flex flex-col justify-between group"
                  id="topo-servico-terapia"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-brand-navy tracking-tight group-hover:text-brand-green transition-colors">Sessão de Terapia</h4>
                    </div>
                    <p className="text-[11px] text-brand-muted leading-relaxed">
                      Um espaço seguro e acolhedor para se conhecer, elaborar e transformar com sigilo.
                    </p>
                  </div>
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider mt-3 block">
                    Agendar Sessão →
                  </span>
                </div>

                {/* Supervisão */}
                <div 
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      modality: 'profissionais',
                      message: 'Olá! Tenho interesse em realizar Supervisão de Casos Clínicos voltados ao autismo infantil.'
                    }));
                    scrollToSection('agendar');
                  }}
                  className="bg-white p-4 rounded-2xl border border-stone-200/80 hover:border-brand-green hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all flex flex-col justify-between group"
                  id="topo-servico-supervisao"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                        <Users className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-brand-navy tracking-tight group-hover:text-brand-green transition-colors">Supervisão de Casos</h4>
                    </div>
                    <p className="text-[11px] text-brand-muted leading-relaxed">
                      Mentoria e apoio técnico especializado para psicólogos no atendimento de autismo infantil.
                    </p>
                  </div>
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider mt-3 block">
                    Agendar Supervisão →
                  </span>
                </div>

                {/* Orientação Parental */}
                <div 
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      modality: 'pais',
                      message: 'Olá! Gostaria de receber Orientação Parental para estruturar melhor a rotina e o comportamento em casa.'
                    }));
                    scrollToSection('agendar');
                  }}
                  className="bg-white p-4 rounded-2xl border border-stone-200/80 hover:border-brand-green hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all flex flex-col justify-between group"
                  id="topo-servico-orientacao"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                        <Compass className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-brand-navy tracking-tight group-hover:text-brand-green transition-colors">Orientação Parental</h4>
                    </div>
                    <p className="text-[11px] text-brand-muted leading-relaxed">
                      Apoio e estratégias aplicadas para pais na construção de relações mais saudáveis e rotinas estáveis.
                    </p>
                  </div>
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider mt-3 block">
                    Solicitar Apoio →
                  </span>
                </div>

              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10">
              <button 
                onClick={() => scrollToSection('agendar')} 
                className="px-8 py-4 bg-brand-terracotta text-white rounded-full text-base font-semibold shadow-xl shadow-brand-terracotta/20 hover:bg-brand-terracotta-dark hover:-translate-y-0.5 transition-all text-center cursor-pointer flex items-center justify-center gap-2 group"
              >
                Fazer Acolhimento
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => scrollToSection('sobre')} 
                className="px-8 py-4 bg-white border border-stone-300 text-brand-dark rounded-full text-base font-semibold hover:border-brand-green hover:bg-stone-50 transition-colors text-center cursor-pointer"
              >
                Conhecer o Instituto
              </button>
            </div>

            {/* Quick trust flags */}
            <div className="grid grid-cols-3 gap-4 xl:gap-6 pt-6 border-t border-stone-200">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wide">Privacidade</h4>
                  <p className="text-[11px] text-brand-muted leading-tight">Plataforma médica criptografada</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wide">Padrão Ouro</h4>
                  <p className="text-[11px] text-brand-muted leading-tight">Terapia baseada em evidências</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wide">Sem Fronteiras</h4>
                  <p className="text-[11px] text-brand-muted leading-tight">Clientes em diversos países</p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Scheduling Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            
            <div className="w-full max-w-sm bg-white rounded-3xl border border-stone-200/80 p-6 shadow-xl relative z-10" id="agenda-hero-card">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-muted block">Agenda Disponível</span>
                    <span className="text-sm font-bold text-brand-navy">Triagem de Vagas</span>
                  </div>
                </div>
                <span className="text-[10px] bg-brand-green-light text-brand-green font-semibold uppercase px-2.5 py-1 rounded-full">
                  Online
                </span>
              </div>

              {/* Day selector */}
              <p className="text-xs font-semibold text-brand-muted mb-3">1. Selecione o dia sugerido para contato:</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Hoje', val: 'Hoje' },
                  { label: 'Amanhã', val: 'Amanhã' },
                  { label: 'Segunda-feira', val: 'Segunda-feira' }
                ].map(day => (
                  <button
                    key={day.val}
                    onClick={() => setSelectedHeroDate(day.val)}
                    id={`hero-day-${day.val.toLowerCase()}`}
                    className={`py-2 px-3 text-xs font-medium rounded-xl transition-custom text-center cursor-pointer ${
                      selectedHeroDate === day.val 
                        ? 'bg-brand-green text-white shadow-md' 
                        : 'bg-stone-50 text-brand-dark hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              {/* Hour selector */}
              <p className="text-xs font-semibold text-brand-muted mb-3">2. Período sugerido para retorno:</p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {['09:00', '11:30', '14:00', '16:30'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedHeroTime(time)}
                    id={`hero-time-${time.replace(':', '')}`}
                    className={`py-2 text-xs font-medium rounded-xl transition-custom text-center cursor-pointer ${
                      selectedHeroTime === time 
                        ? 'bg-brand-green text-white shadow-md' 
                        : 'bg-stone-50 text-brand-dark hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Dynamic feedback display */}
              <div className="p-4 bg-brand-bg rounded-2xl border border-stone-200/60 mb-6 text-xs text-brand-muted leading-relaxed">
                <span className="font-semibold text-brand-navy block mb-1">Solicitação Pré-agendada</span>
                Entraremos em contato com você <strong>{selectedHeroDate}</strong> por volta de <strong>{selectedHeroTime}</strong> via WhatsApp para prosseguir com o acolhimento formal.
              </div>

              {/* Live Action button syncing to the contact section */}
              <button 
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    message: `Gostaria de agendar triagem no horário sugerido (${selectedHeroDate} às ${selectedHeroTime}).`
                  }));
                  scrollToSection('agendar');
                }}
                id="hero-book-shortcut"
                className="w-full py-3 bg-brand-terracotta hover:bg-brand-terracotta-dark text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide shadow-md"
              >
                Garantir Este Horário <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Rotated technical focus sticker card */}
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-64 bg-brand-navy rounded-[32px] p-6 text-white shadow-2xl hidden xl:block -rotate-3 z-0">
              <span className="text-[9px] uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full inline-block mb-3 font-semibold text-brand-ochre">Metodologia Clínica</span>
              <h4 className="text-lg font-serif italic mb-2">Comportamento Científico</h4>
              <p className="text-xs text-stone-200/90 leading-relaxed mb-4">Integrando métricas de evolução, análise funcional e plano de intervenção para real progresso cotidiano.</p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <div className="w-5 h-5 rounded-full bg-brand-ochre flex items-center justify-center text-brand-navy text-[10px] font-bold">✓</div>
                <span className="text-[10px] text-white font-medium">Intervenções Baseadas em Dados</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* AUTHORITY METRICS */}
      <section className="bg-white border-y border-stone-200 py-10" id="metrics-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-start">
            {trustMetrics.map((met, index) => (
              <div key={index} className="flex flex-col text-center items-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-brand-green font-serif tracking-tight">{met.value}</span>
                <span className="text-xs font-semibold text-brand-dark mt-1.5">{met.label}</span>
                <span className="text-[11px] text-brand-muted mt-0.5 max-w-[170px] leading-relaxed">{met.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTO SECTION */}
      <section id="sobre" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Logo badge / Founders card */}
          <div className="lg:col-span-5 group relative">
            <div className="absolute inset-0 bg-brand-green-light rounded-[40px] transform rotate-2 group-hover:rotate-1 transition-transform -z-10"></div>
            <div className="bg-white rounded-[40px] border border-stone-200/80 p-8 sm:p-10 shadow-xl relative transform -rotate-1 group-hover:rotate-0 transition-transform">
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-green-light flex items-center justify-center text-brand-green">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy font-serif">Instituto Cassiane Coelho</h3>
                  <p className="text-xs text-brand-green font-semibold font-mono">Esp. Cassiane Coelho</p>
                </div>
              </div>

              <blockquote className="text-brand-dark italic text-base leading-relaxed mb-6">
                "Nosso propósito é conectar o rigor da ciência internacional ao calor do acolhimento. A distância online não é uma barreira, mas sim uma janela que amplia o acesso a cuidados de saúde mental e neurodesenvolvimento de alta qualidade."
              </blockquote>

              <div className="border-t border-stone-100 pt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-navy">CRP 10/09478</p>
                  <p className="text-[10px] text-brand-muted">Especialista e Supervisora Ética</p>
                </div>
                <div className="px-3 py-1 bg-brand-green-light text-brand-green-dark border border-brand-green/20 rounded-full text-[10px] font-mono font-bold">
                  Fundadora
                </div>
              </div>

            </div>
          </div>

          {/* Text descriptions */}
          <div className="lg:col-span-7">
            
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-mono block mb-3">Terapia de Primeira Linha</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy leading-tight mb-6">
              Acolhimento humanizado, <span className="text-brand-green italic">com base na excelência científica</span>.
            </h2>
            
            <p className="text-base text-brand-muted leading-relaxed mb-6">
              O <strong>Instituto Cassiane Coelho</strong> é uma clínica digital estruturada para democratizar abordagens clínicas de padrão-ouro. Entendemos que enfrentar desafios de saúde mental ou de desenvolvimento exige um canal de suporte ágil, seguro e despido de estresse burocrático.
            </p>
            
            <p className="text-base text-brand-muted leading-relaxed mb-8">
              Nossos profissionais operam sob coordenação psicoterapêutica rígida, oferecendo planos baseados na <strong>Ciência ABA</strong> e na <strong>Neuropsicologia</strong> para crianças, adolescentes, adultos e idosos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-navy">Atendimento Flexível</h4>
                  <p className="text-xs text-brand-muted">Encontros no sigilo do seu lar, no horário que melhor conciliar com sua rotina.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-navy">Mapeamento Visível</h4>
                  <p className="text-xs text-brand-muted">Métricas claras de progresso que ajudam na visualização real do desenvolvimento.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TECHNICAL PILLARS SECTION */}
      <section id="pilares" className="py-20 lg:py-28 bg-[#FAF6F0] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-mono block mb-3">Ciência Baseada em Resultados</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy leading-tight mb-4">
              Nossos Pilares de Atuação
            </h2>
            <p className="text-base text-brand-muted">
              Fundamentamos nossa atuação clínica em áreas estruturadas de alta resolutividade para diagnósticos cuidadosos e modificações comportamentais sólidas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector col */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {PILLARS.map(pillar => {
                const isSelected = selectedPillarId === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setSelectedPillarId(pillar.id)}
                    id={`pillar-select-${pillar.id}`}
                    className={`p-6 rounded-2xl border transition-custom cursor-pointer text-left relative ${
                      isSelected
                        ? 'bg-white border-brand-green shadow-md translate-x-2'
                        : 'bg-white/60 hover:bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-brand-green text-white' : 'bg-brand-green-light text-brand-green'
                      }`}>
                        {pillar.id === 'aba' ? <BrainCircuit className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] tracking-wider uppercase text-stone-400 block font-bold font-mono">Área Técnica</span>
                        <h3 className="text-lg font-bold text-brand-navy tracking-tight">{pillar.title}</h3>
                      </div>
                      <div className={`text-stone-300 transition-transform ${isSelected ? 'translate-x-1 text-brand-green animate-pulse' : ''}`}>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-xs text-brand-muted mt-3 line-clamp-2">{pillar.description}</p>
                  </button>
                );
              })}

              {/* Safe guidance mini-card */}
              <div className="p-5 bg-brand-green-light/50 rounded-2xl border border-brand-green/20 mt-4 flex items-start gap-3">
                <Heart className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <p className="text-xs text-brand-dark leading-relaxed">
                  Ambas as abordagens seguem rigorosamente as condutas de comitês internacionais de análise e a legislação nacional de psicologia do CFP.
                </p>
              </div>
            </div>

            {/* Right detailed display card with sliding layout */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-10 shadow-lg relative min-h-[480px] flex flex-col justify-between" id="pillar-content-card">
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100 mb-6">
                  <div>
                    <span className="text-[10px] bg-brand-green-light text-brand-green-dark font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {currentPillar.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-brand-navy mt-2 font-bold">{currentPillar.title}</h3>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-brand-bg border border-stone-100 hidden sm:flex items-center justify-center text-brand-green shrink-0">
                    {currentPillar.id === 'aba' ? <BrainCircuit className="w-8 h-8" /> : <Activity className="w-8 h-8" />}
                  </div>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  {currentPillar.longDescription}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-3 font-mono">Linhas Práticas de Desenvolvimento:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {currentPillar.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-brand-dark">
                      <div className="w-4 h-4 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span className="text-[11px] text-brand-muted font-mono">CFP SP Ativo: CRP 10/09478</span>
                </div>
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      message: `Gostaria de agendar triagem com foco especial na área de ${currentPillar.title}.`
                    }));
                    scrollToSection('agendar');
                  }}
                  id={`pillar-cta-${currentPillar.id}`}
                  className="px-5 py-2.5 bg-brand-terracotta hover:bg-brand-terracotta-dark text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Solicitar Consulta Desta Área
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* AUDIENCE PATHS SECTION */}
      <section id="publicos" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-mono block mb-3">Linhas de Cuidado</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy leading-tight mb-4 font-bold">
            Caminhos de Transformação
          </h2>
          <p className="text-sm text-brand-muted">
            Encontre o suporte correto adaptado para o seu momento de vida, para o desenvolvimento de seu filho, ou para seu crescimento profissional.
          </p>

          {/* Dynamic Tab Switcher */}
          <div className="flex justify-center p-1.5 bg-white border border-stone-200 rounded-full max-w-md mx-auto mt-8 shadow-sm">
            {[
              { id: 'pacientes', label: 'Pacientes', icon: Users },
              { id: 'pais', label: 'Pais / Família', icon: Heart },
              { id: 'profissionais', label: 'Profissionais', icon: BookOpen }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeAudience === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAudience(tab.id as AudienceType)}
                  id={`tab-select-${tab.id}`}
                  className={`flex-1 py-3 px-2 sm:px-4 text-xs font-bold rounded-full transition-custom flex items-center justify-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-brand-green text-white shadow-sm' 
                      : 'text-brand-muted hover:text-brand-green hover:bg-stone-50'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Card - REQ 4: Subtle hover scale and shadow added using Framer Motion */}
        <motion.div 
          whileHover={{ scale: 1.012, boxShadow: "0 25px 45px -12px rgba(64, 139, 119, 0.16)" }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[32px] border border-stone-200/80 p-8 lg:p-12 shadow-xl relative"
          id="audiences-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Content side */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green-light text-brand-green-dark rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                {currentAudience.tag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy leading-tight mb-3">
                {currentAudience.title}
              </h3>
              <p className="text-sm italic text-brand-green font-semibold tracking-wide mb-4 font-mono">
                {currentAudience.subtitle}
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {currentAudience.description}
              </p>

              {/* Detailed Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-stone-100">
                {currentAudience.detailedPoints.map((dp, i) => (
                  <div key={i} className="p-4 bg-brand-bg border border-stone-200/40 rounded-2xl">
                    <span className="text-xs font-bold text-brand-navy block mb-1">{dp.title}</span>
                    <p className="text-xs text-brand-muted leading-snug">{dp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist Accent side with Terracotta CTA */}
            <div className="lg:col-span-5 bg-brand-green text-white rounded-[24px] p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[360px]" id="audiences-cta-block">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-brand-ochre font-mono block mb-4">
                  O que está incluso no cuidado:
                </span>
                
                <ul className="space-y-4">
                  {currentAudience.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                        <Check className="w-3 h-3 text-brand-ochre" />
                      </div>
                      <span className="text-white/90 leading-relaxed font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/20">
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      modality: currentAudience.id,
                      message: `Encontrei meu perfil de atendimento na aba de "${currentAudience.title}".`
                    }));
                    scrollToSection('agendar');
                  }}
                  id={`audience-cta-${currentAudience.id}`}
                  className="w-full py-3.5 bg-brand-terracotta text-white hover:bg-brand-terracotta-dark rounded-xl text-xs font-bold tracking-wide uppercase transition-colors text-center cursor-pointer shadow-md"
                >
                  {currentAudience.ctaText}
                </button>
              </div>
            </div>

          </div>
        </motion.div>

      </section>

      {/* FLYERS INSIGHT MODULE: COGNITIVE RIGIDITY SECTION */}
      <section id="flexibilidade" className="py-20 lg:py-28 bg-[#FAF6F0] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-mono block mb-3">Recurso do Material Informativo</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy font-bold leading-tight">
                Entendendo a Rigidez Cognitiva
              </h2>
              <p className="text-sm text-brand-muted mt-4 leading-relaxed">
                {COGNITIVE_RIGIDITY_RESOURCES.definition} Muito prevalente em atrasos do desenvolvimento, autismo atípico e transtornos de ansiedade persistentes.
              </p>
            </div>
            
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
              <h3 className="text-xs font-bold text-brand-navy uppercase font-mono tracking-wider mb-4 text-brand-terracotta">
                Principais Impactos Práticos:
              </h3>
              <ul className="space-y-2.5">
                {COGNITIVE_RIGIDITY_RESOURCES.consequences.map((cons, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs text-brand-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0 mt-1.5"></span>
                    <span>{cons}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Steps Section to develop Flexibility */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-lg p-6 sm:p-10">
            <h3 className="text-lg font-serif font-bold text-brand-navy mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-green" /> Como Desenvolver a Flexibilidade Cognitiva com Suporte Clínico:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Stepper column selectors */}
              <div className="md:col-span-5 flex flex-col gap-2.5">
                {COGNITIVE_RIGIDITY_RESOURCES.howToDevelop.map((step, idx) => {
                  const isActive = activeFlexStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveFlexStep(idx)}
                      id={`flexibility-select-${idx}`}
                      className={`p-4 rounded-xl text-left border transition-custom cursor-pointer flex items-center gap-4 ${
                        isActive 
                          ? 'border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm' 
                          : 'border-stone-100 hover:bg-stone-50 text-brand-muted'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isActive ? 'bg-brand-green text-white' : 'bg-stone-200/80 text-stone-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold leading-tight">{step.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Stepper display board */}
              <div className="md:col-span-7 bg-brand-bg rounded-2xl border border-stone-200 p-6 flex flex-col justify-between" id="flexibility-display-board">
                <div>
                  <span className="text-[10px] bg-brand-ochre text-brand-navy px-2.5 py-1 rounded-full uppercase tracking-wider font-bold mb-4 inline-block font-mono">
                    Estratégia {activeFlexStep + 1}
                  </span>
                  <h4 className="text-base font-bold text-brand-navy mb-2">
                    {COGNITIVE_RIGIDITY_RESOURCES.howToDevelop[activeFlexStep].title}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {COGNITIVE_RIGIDITY_RESOURCES.howToDevelop[activeFlexStep].desc} Praticar isso conscientemente reduz o estresse mental, ajudando a dissolver conflitos severos e ansiedade contínua.
                  </p>
                </div>

                <div className="border-t border-stone-200/50 pt-4 mt-6 text-xs italic text-brand-muted leading-relaxed">
                  "O objetivo terapêutico não é retirar a rotina, mas ensinar a mente a lidar com imprevistos cotidianos com maior naturalidade."
                </div>
              </div>

            </div>

            <div className="mt-8 p-4 bg-brand-green-light rounded-2xl text-center text-xs text-brand-green-dark font-medium italic border border-brand-green/10">
              {COGNITIVE_RIGIDITY_RESOURCES.quote}
            </div>
          </div>

        </div>
      </section>

      {/* CHANNELS SUGGESTION QUIZ */}
      <section className="py-16 bg-white border-b border-stone-250">
        <div className="max-w-3xl mx-auto px-4 text-center">
          
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green-light text-brand-green mb-4">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-serif text-brand-navy font-bold mb-2">Qual seu ponto de partida ideal?</h2>
          <p className="text-xs text-brand-muted mb-8 max-w-md mx-auto">
            Responda 2 perguntas simples abaixo e nosso sistema recomendará a modalidade de cuidado adequada ao seu contexto.
          </p>

          <div className="bg-brand-bg rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm text-left transition-all">
            
            {/* Step 1: Objective */}
            {recommendationStep === 1 && (
              <div id="quiz-step-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-stone-400 font-mono font-bold">PASSO 1 DE 2</span>
                  <span className="text-xs font-semibold text-brand-green">Modalidade</span>
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-4">O que melhor descreve o seu objetivo principal hoje?</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => handleQuizAnswer('objective', 'self')}
                    id="quiz-btn-objective-self"
                    className="p-4 border border-stone-200 hover:border-brand-green hover:bg-white rounded-xl text-xs text-left font-medium transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span>Psicoterapia individualizada ou avaliação neuropsicológica própria</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer('objective', 'child')}
                    id="quiz-btn-objective-child"
                    className="p-4 border border-stone-200 hover:border-brand-green hover:bg-white rounded-xl text-xs text-left font-medium transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span>Entender e atuar no comportamento, atraso de fala ou autismo de um familiar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer('objective', 'formation')}
                    id="quiz-btn-objective-format"
                    className="p-4 border border-stone-200 hover:border-brand-green hover:bg-white rounded-xl text-xs text-left font-medium transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span>Obter supervisão de casos clínicos em ABA ou Neuropsicologia</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Profile */}
            {recommendationStep === 2 && (
              <div id="quiz-step-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-stone-400 font-mono font-bold">PASSO 2 DE 2</span>
                  <button onClick={() => setRecommendationStep(1)} className="text-xs font-semibold text-brand-green hover:underline">Voltar</button>
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-4">Quem participará diretamente das orientações ou sessões?</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => handleQuizAnswer('profile', 'individual')}
                    id="quiz-btn-profile-indiv"
                    className="p-4 border border-stone-200 hover:border-brand-green hover:bg-white rounded-xl text-xs text-left font-medium transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span>Eu mesmo(a) (Idade superior a 16 anos)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer('profile', 'family')}
                    id="quiz-btn-profile-fam"
                    className="p-4 border border-stone-200 hover:border-brand-green hover:bg-white rounded-xl text-xs text-left font-medium transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span>Uma criança (através de suporte indireto dado pelos pais)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer('profile', 'professional')}
                    id="quiz-btn-profile-prof"
                    className="p-4 border border-stone-200 hover:border-brand-green hover:bg-white rounded-xl text-xs text-left font-medium transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span>Sou psicólogo(a) ou terapeuta em busca de mentoria especializada</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Result */}
            {recommendationStep === 3 && quizResult && (
              <div className="text-center py-4" id="quiz-results-panel">
                <div className="w-12 h-12 rounded-full bg-brand-green-light text-brand-green flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">Direcionamento Recomendado</h3>
                <p className="text-xs text-brand-muted mt-1 mb-6 max-w-sm mx-auto">
                  A linha de cuidado do Instituto Cassiane Coelho que melhor se adequa ao seu perfil é:
                </p>

                <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6 max-w-sm mx-auto text-left shadow-sm">
                  <span className="text-[9px] font-bold text-brand-green uppercase bg-brand-green-light px-2.5 py-1 rounded-full inline-block mb-2 font-mono">
                    {quizResult === 'pacientes' ? 'Atendimento Individual' : quizResult === 'pais' ? 'Orientação Parental' : 'Supervisão de Casos'}
                  </span>
                  <h4 className="text-sm font-bold text-brand-navy mb-1">
                    {quizResult === 'pacientes' && 'Psicoterapia Individual Online'}
                    {quizResult === 'pais' && 'Treino Familiar & Manejo ABA'}
                    {quizResult === 'profissionais' && 'Mentoria Técnica e Supervisão'}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {quizResult === 'pacientes' && 'Apropriado para adolescentes e adultos, focado em autoconhecimento, regulação emocional ativa e saúde geral.'}
                    {quizResult === 'pais' && 'Atendimento estratégico para capacitar cuidadores a manejar rotinas e criar conexões reais e saudáveis.'}
                    {quizResult === 'profissionais' && 'Espaço focado em protocolos de desenvolvimento (VB-MAPP, ESDM), elaboração de planos diagnósticos e ética.'}
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <button 
                    onClick={resetQuiz}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-xs hover:bg-stone-50 transition-colors font-medium cursor-pointer"
                  >
                    Refazer Guia
                  </button>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        modality: quizResult,
                        message: `Olá! Fiz o guia rápido em seu site e obtive a recomendação para o plano de "${quizResult === 'pacientes' ? 'Psicoterapia' : quizResult === 'pais' ? 'Orientação Parental' : 'Supervisão'}"`
                      }));
                      scrollToSection('agendar');
                    }}
                    className="px-5 py-2 bg-brand-terracotta hover:bg-brand-terracotta-dark text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    Iniciar Triagem Desta Linha
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* TESTIMONIAL SLIDER SECTION */}
      <section id="depoimentos" className="py-20 lg:py-28 bg-[#FAF6F0] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-mono block mb-3">
              Credibilidade & Resultados
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy font-bold leading-tight mb-4">
              O que dizem sobre nosso acolhimento
            </h2>
            <p className="text-sm text-brand-muted max-w-2xl mx-auto">
              A evolução e bem-estar de nossos pacientes, a parceria e progresso real com suas famílias e a mentoria ética de psicólogos parceiros demonstrados na prática.
            </p>

            {/* Testimonial Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'Todos os Depoimentos' },
                { id: 'pacientes', label: 'Terapia Individual' },
                { id: 'pais', label: 'Orientação & Treino de Pais' },
                { id: 'profissionais', label: 'Supervisão Técnica' }
              ].map(cat => {
                const isActive = testimonialCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleTestimonialCategoryChange(cat.id as 'all' | AudienceType)}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-brand-green text-white shadow-md' 
                        : 'bg-white text-brand-muted hover:text-brand-green border border-stone-200 shadow-sm'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider Container with interactive sliding effects */}
          <div className="max-w-4xl mx-auto">
            
            <div className="relative bg-white rounded-[32px] border border-stone-200/80 p-8 sm:p-12 shadow-xl overflow-hidden min-h-[300px] flex flex-col justify-between">
              
              {/* Elegant Quote and Stars Header */}
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="text-brand-green-light">
                  <Quote className="w-12 h-12 text-brand-green/10 fill-brand-green/5 animate-pulse" />
                </div>
                <div className="flex gap-1">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-ochre fill-brand-ochre" />
                  ))}
                </div>
              </div>

              {/* Slider Content with sliding effect in Framer Motion */}
              <div className="flex-1 mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTestimonial.id}-${testimonialCategory}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="focus:outline-none"
                  >
                    <p className="text-base sm:text-lg text-brand-dark leading-relaxed italic font-serif">
                      "{activeTestimonial.text}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Client Info details aligned elegantly */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-stone-100">
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green font-bold text-sm select-none shadow-sm">
                    {activeTestimonial.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">{activeTestimonial.name}</h4>
                    <p className="text-xs text-brand-muted">{activeTestimonial.role}</p>
                    {activeTestimonial.location && (
                      <span className="text-[10px] text-brand-green font-mono font-bold uppercase mt-0.5 block">
                        {activeTestimonial.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Left/Right controls */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    onClick={handlePrevTestimonial}
                    className="w-10 h-10 rounded-full border border-stone-200 bg-white text-brand-navy flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all shadow-sm cursor-pointer disabled:opacity-40"
                    aria-label="Depoimento Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="w-10 h-10 rounded-full border border-stone-200 bg-white text-brand-navy flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all shadow-sm cursor-pointer disabled:opacity-40"
                    aria-label="Próximo Depoimento"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {filteredTestimonials.map((testimonial, idx) => {
                const isActive = currentTestimonialIndex === idx;
                return (
                  <button
                    key={testimonial.id}
                    onClick={() => setCurrentTestimonialIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? 'w-6 bg-brand-green' : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Ir para depoimento ${idx + 1}`}
                  />
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* FORM REGISTRATION */}
      <section id="agendar" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Instructions and process */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-mono block mb-3">Primeiro Contato</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy leading-tight mb-6 font-bold">
              Inicie seu cuidado com o Instituto
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed mb-8">
              Preencha suas informações para que nossa assessora de acolhimento analise o seu caso e faça a triagem adequada de profissional.
            </p>

            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-brand-green shrink-0 font-bold font-mono">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy">Preenchimento Simples</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Insira seus dados confidenciais e objetivos iniciais na caixa lateral de pré-agendamento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-brand-green shrink-0 font-bold font-mono">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy">Assessoria de Acolhimento</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Sua solicitação é recebida por um atendente treinado em bem-estar que chamará você de forma cuidadosa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-brand-green shrink-0 font-bold font-mono">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-navy">Início do Processo</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Sua sessão inicial é marcada e você recebe os manuais introdutórios em formato digital.
                  </p>
                </div>
              </div>

            </div>

            <div className="p-5 bg-white border border-stone-200/85 rounded-2xl mt-10 flex items-center gap-3">
              <Lock className="w-5 h-5 text-stone-400 shrink-0" />
              <p className="text-[11px] text-brand-muted leading-tight">
                Seus dados confidenciais são preservados segundo as regras do CFP (CRP 10) e em estrito cumprimento da LGPD.
              </p>
            </div>

          </div>

          {/* Interactive Form Block */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-10 shadow-xl relative" id="contact-form-container">
            
            {formSuccess ? (
              <div className="text-center py-12 animate-fadeIn" id="form-success-box">
                <div className="w-16 h-16 rounded-full bg-brand-green-light text-brand-green flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-brand-navy font-bold mb-3">Solicitação Recebida!</h3>
                <p className="text-sm text-brand-muted max-w-md mx-auto mb-8 leading-relaxed">
                  Obrigado pelo contato. Nosso acolhimento de triagem iniciará a sua análise e chamará seu número via WhatsApp nas próximas <strong>2 horas úteis</strong>.
                </p>

                <div className="bg-brand-bg rounded-2xl border border-stone-200 p-5 max-w-sm mx-auto text-left mb-8 text-xs text-brand-muted">
                  <p className="mb-2"><strong>Paciente/Nome:</strong> {formData.fullName}</p>
                  <p className="mb-2"><strong>Plano Solicitado:</strong> {
                    formData.modality === 'pacientes' ? 'Psicoterapia Individual' : formData.modality === 'pais' ? 'Orientação Parental' : 'Supervisão Técnica'
                  }</p>
                  <p className="mb-2"><strong>Turno Preferencial:</strong> {
                    formData.period === 'manha' ? 'Manhã (08h às 12h)' : formData.period === 'tarde' ? 'Tarde (12h às 18h)' : 'Noite (18h às 21h)'
                  }</p>
                  <p className="text-[10px] text-stone-400 font-mono mt-3">Código de Triagem: PR-{(Math.random() * 100000).toFixed(0)}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetForm}
                    id="form-success-reset"
                    className="px-6 py-2.5 border border-stone-300 text-xs font-semibold text-brand-dark hover:bg-stone-50 rounded-xl transition-colors cursor-pointer"
                  >
                    Modificar Dados
                  </button>
                  <a
                    href="https://wa.me/5591985907125"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 bg-brand-terracotta text-white text-xs font-semibold rounded-xl hover:bg-brand-terracotta-dark transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <MessageCircle className="w-4 h-4" /> Acelerar Retorno por WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} id="contact-form">
                
                <h3 className="text-xl font-bold font-serif text-brand-navy pb-4 border-b border-stone-100 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-green" /> Solicitar Triagem de Vaga
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2" htmlFor="fullName">
                      Nome Completo *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ex: Clara de Souza Pinto"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-green transition-colors bg-brand-bg text-brand-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2" htmlFor="phone">
                      WhatsApp com DDD *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ex: (91) 98590-7125"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-green transition-colors bg-brand-bg text-brand-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2" htmlFor="email">
                      Seu E-mail *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ex: clara@gmail.com"
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-green transition-colors bg-brand-bg text-brand-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2" htmlFor="modality">
                      Opção de Interesse
                    </label>
                    <select
                      id="modality"
                      name="modality"
                      value={formData.modality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-green transition-colors bg-brand-bg text-brand-dark"
                    >
                      <option value="pacientes">Psicoterapia Individual (Adulto/Adolescente)</option>
                      <option value="pais">Treino Familiar & Orientação de Pais</option>
                      <option value="profissionais">Supervisão de Casos e Consultoria Clínica</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                    Turno sugerido para o acolhimento
                  </label>
                  <div className="grid grid-cols-3 gap-3 font-medium">
                    {[
                      { val: 'manha', label: 'Manhã', text: '08h às 12h' },
                      { val: 'tarde', label: 'Tarde', text: '12h às 18h' },
                      { val: 'noite', label: 'Noite', text: '18h às 21h' }
                    ].map(period => (
                      <label 
                        key={period.val}
                        className={`border rounded-xl p-3 flex flex-col text-center items-center justify-center cursor-pointer transition-colors ${
                          formData.period === period.val 
                            ? 'border-brand-green bg-brand-green-light text-brand-green-dark' 
                            : 'border-stone-200 hover:bg-stone-50 text-brand-muted'
                        }`}
                      >
                        <input
                          type="radio"
                          name="period"
                          value={period.val}
                          checked={formData.period === period.val}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="text-xs font-bold">{period.label}</span>
                        <span className="text-[10px] opacity-80 mt-0.5">{period.text}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2" htmlFor="message">
                    Como o Instituto Cassiane Coelho pode ajudar você?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Nos descreva brevemente os objetivos com o atendimento ou as metas de evolução..."
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-green transition-colors bg-brand-bg text-brand-dark resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-brand-terracotta text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-terracotta-dark transition-colors disabled:bg-stone-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {formLoading ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" /> Processando dados...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Enviar Solicitação de Triagem
                    </>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <span className="text-[10.5px] text-stone-400">Suas comunicações digitais são salvas e transmitidas sob sigilo total de atendimento em saúde.</span>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="py-20 lg:py-28 bg-[#FAF6F0] border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest font-mono block mb-3">Dúvidas Frequentes</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy font-bold">Esclarecimentos Legais e Clínicos</h2>
            <p className="text-sm text-brand-muted mt-3">Tudo o que você precisa saber sobre as terapias baseadas em ABA e o acolhimento online.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map(faq => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-stone-50 cursor-pointer"
                  >
                    <span className="font-serif font-semibold text-sm sm:text-base text-brand-navy">{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="p-6 pt-0 border-t border-stone-100 text-xs sm:text-sm text-brand-muted leading-relaxed bg-[#FAF9F5]"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick doubts helper banner */}
          <div className="mt-12 text-center p-6 bg-white border border-stone-200 rounded-2xl max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs font-bold text-brand-navy">Ainda restou alguma dúvida específica?</p>
              <p className="text-[11px] text-brand-muted">Fale diretamente com nossa assessoria comercial e clínica instantaneamente.</p>
            </div>
            <a
              href="https://wa.me/5591985907125"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-brand-green text-white font-bold rounded-xl text-xs hover:bg-brand-green-dark transition-colors flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-3.5 h-3.5 animate-bounce" /> Contatar Assessoria
            </a>
          </div>

        </div>
      </section>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-white border-t border-stone-200">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-sm italic font-semibold">C</span>
              </div>
              <span className="text-lg font-bold font-serif text-brand-navy">Instituto Cassiane Coelho</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed max-w-xs">
              Acolhimento clínico humanizado, modificação comportamental estruturada por metas de desenvolvimento e laudos técnicos robustos.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] font-mono text-brand-green-dark bg-brand-green-light px-2.5 py-1 rounded-full font-bold">CRP Clínico 10/09478 SP</span>
              <span className="text-[10px] font-mono text-brand-green-dark bg-brand-green-light px-2.5 py-1 rounded-full font-bold">Cadastro e-Psi</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-4 font-mono">Pilares Clínicos</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><button onClick={() => { setSelectedPillarId('aba'); scrollToSection('pilares'); }} className="hover:text-brand-green cursor-pointer text-left">Análise do Comportamento (ABA)</button></li>
              <li><button onClick={() => { setSelectedPillarId('neuropsicologia'); scrollToSection('pilares'); }} className="hover:text-brand-green cursor-pointer text-left">Mapeamento Neuropsicológico</button></li>
              <li><button onClick={() => scrollToSection('sobre')} className="hover:text-brand-green cursor-pointer text-left">Clínica Online e Acolhimento</button></li>
              <li><button onClick={() => scrollToSection('flexibilidade')} className="hover:text-brand-green cursor-pointer text-left">Rigidez e Flexibilização Cognitiva</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-4 font-mono">Canais de Cuidado</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><button onClick={() => { setActiveAudience('pacientes'); scrollToSection('publicos'); }} className="hover:text-brand-green cursor-pointer text-left">Para Pacientes</button></li>
              <li><button onClick={() => { setActiveAudience('pais'); scrollToSection('publicos'); }} className="hover:text-brand-green cursor-pointer text-left">Suporte a Pais & Famílias</button></li>
              <li><button onClick={() => { setActiveAudience('profissionais'); scrollToSection('publicos'); }} className="hover:text-brand-green cursor-pointer text-left">Orientação para Psicólogos</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-brand-green cursor-pointer text-left">Dúvidas Frequentes (FAQ)</button></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-4 font-mono">Contato de Triagem</h4>
            <p className="text-xs text-brand-dark mb-2 leading-relaxed">Fale diretamente com nossa assessoria administrativa e comercial:</p>
            <p className="text-xs text-brand-green font-bold mb-4 font-mono">contato@institutocassianecoelho.com.br</p>
            <p className="text-xs text-brand-dark font-bold font-mono">WhatsApp Clínico: (91) 98590-7125</p>
          </div>

        </div>

        {/* Legal copy and social icons */}
        <div className="border-t border-stone-200 py-6 bg-brand-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] text-brand-muted font-medium uppercase tracking-wider font-mono">
              <span>Esp. Cassiane Coelho - CRP 10/09478 SP</span>
              <span>•</span>
              <span>São Paulo / Brasil</span>
              <span>•</span>
              <span>Atendimento em todo o mundo</span>
            </div>

            <div className="flex items-center gap-6">
              
              <div className="flex gap-2">
                <a 
                  href="https://instagram.com/cassianecoelhopsi" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-stone-200 hover:border-brand-green hover:bg-brand-green-light flex items-center justify-center text-xs text-brand-green font-bold font-mono cursor-pointer transition-colors"
                  title="Instagram"
                >
                  IG
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-stone-200 hover:border-brand-green hover:bg-brand-green-light flex items-center justify-center text-xs text-brand-green font-bold font-mono cursor-pointer transition-colors"
                  title="LinkedIn"
                >
                  LK
                </a>
                <a 
                  href="https://wa.me/5591985907125" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-stone-200 hover:border-brand-green hover:bg-brand-green-light flex items-center justify-center text-xs text-brand-green font-bold font-mono cursor-pointer transition-colors"
                  title="WhatsApp"
                >
                  WA
                </a>
              </div>

              <span className="text-[10px] text-stone-400 font-mono italic">
                © {new Date().getFullYear()} Instituto Cassiane Coelho. Todos os direitos reservados.
              </span>

            </div>

          </div>
        </div>

      </footer>

      {/* FLOATING CONVERSION WHATSAPP BUTTON */}
      <a
        href="https://wa.me/5591985907125"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20ba59] hover:scale-105 transition-all text-center flex items-center justify-center group"
        title="Fale direto por WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-6 h-6 shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          Falar com Triagem
        </span>
      </a>

    </div>
  );
}
