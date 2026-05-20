/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AudienceType = 'pacientes' | 'pais' | 'profissionais';

export interface AudienceData {
  id: AudienceType;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  ctaText: string;
  badge: string;
  detailedPoints: {
    title: string;
    description: string;
  }[];
}

export interface PillarData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  points: string[];
  icon: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface AppointmentFormInput {
  fullName: string;
  email: string;
  phone: string;
  modality: AudienceType;
  message: string;
  period: 'manha' | 'tarde' | 'noite';
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  category: AudienceType;
  initials: string;
  location?: string;
}

