import type { LucideIcon } from 'lucide-react';
import { Bed, Footprints, Wind } from 'lucide-react';

export interface UlcerType {
  id: string;
  name: string;
  Icon: LucideIcon;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  typeId: string;
}

export interface Case {
  id: string;
  testimonial: string;
  patient: string;
  image: string;
  typeId: string;
}

export const ulcerTypes: UlcerType[] = [
  {
    id: 'pressure',
    name: 'Úlceras por Presión',
    Icon: Bed,
  },
  {
    id: 'diabetic',
    name: 'Pie Diabético',
    Icon: Footprints,
  },
  {
    id: 'venous',
    name: 'Úlceras Venosas',
    Icon: Wind,
  },
];

export const articles: Article[] = [
  {
    id: 'pressure-1',
    title: 'Movilización y Cambios Posturales',
    excerpt: 'La clave para prevenir las úlceras por presión es el cambio de posición frecuente para aliviar la presión sobre la piel.',
    image: 'https://testauth.meapp.com.ar/api/files/pbc_3607937828/1vf0r7y3mhs06yg/ulcera_presion_coxis_k6a04uppf8.png?token=',
    typeId: 'pressure',
  },
  {
    id: 'pressure-2',
    title: 'Cuidado de la Piel y Nutrición',
    excerpt: 'Mantener la piel limpia, seca y bien hidratada es fundamental. Una buena nutrición también promueve la curación.',
    image: 'https://testauth.meapp.com.ar/api/files/pbc_3607937828/64g66g3eveyh99e/ulcera_presion_pie_joufqw1adb.png?token=',
    typeId: 'pressure',
  },
  {
    id: 'diabetic-1',
    title: 'Inspección Diaria de los Pies',
    excerpt: 'Revise sus pies todos los días en busca de cortes, ampollas, enrojecimiento o hinchazón. Use un espejo si es necesario.',
    image: 'https://testauth.meapp.com.ar/api/files/pbc_3607937828/12yi45a560w6101/ulcera_pie_diab_2_969y4ldiiu.png?token=',
    typeId: 'diabetic',
  },
  {
    id: 'diabetic-2',
    title: 'Calzado Adecuado y Control Glucémico',
    excerpt: 'Use zapatos cómodos que no aprieten. Mantener un buen control del azúcar en sangre es vital para la salud de sus pies.',
    image: 'https://testauth.meapp.com.ar/api/files/pbc_3607937828/43su8ix3gmat870/ulcera_pie_diab_1_afy2yunb3z.png?token=',
    typeId: 'diabetic',
  },
  {
    id: 'venous-1',
    title: 'Terapia de Compresión',
    excerpt: 'El uso de medias o vendajes de compresión ayuda a mejorar el flujo sanguíneo y reducir la hinchazón en las piernas.',
    image: 'https://testauth.meapp.com.ar/api/files/pbc_3607937828/iia2e1w933b27tx/ulcera_venosa_2_9pkl8kizu2.png?token=',
    typeId: 'venous',
  },
  {
    id: 'venous-2',
    title: 'Elevación de Piernas y Ejercicio',
    excerpt: 'Elevar las piernas por encima del nivel del corazón varias veces al día y caminar regularmente puede mejorar la circulación.',
    image: 'https://testauth.meapp.com.ar/api/files/pbc_3607937828/4d09409hke0f770/ulcera_venosa_1_ypl41xq4cz.png?token=',
    typeId: 'venous',
  },
];

export const cases: Case[] = [
  {
    id: 'case-1',
    testimonial: '“El equipo de UlcerAid fue increíblemente profesional y atento. Mi úlcera por presión sanó mucho más rápido de lo que esperaba gracias a su cuidado constante y sus consejos.”',
    patient: 'Carlos M.',
    image: 'https://placehold.co/800x600.png',
    typeId: 'pressure',
  },
  {
    id: 'case-2',
    testimonial: '“Como diabético, el cuidado de mis pies es mi máxima prioridad. El tratamiento y la educación que recibí me han ayudado a evitar complicaciones graves. Estoy muy agradecido.”',
    patient: 'Luisa F.',
    image: 'https://placehold.co/800x600.png',
    typeId: 'diabetic',
  },
  {
    id: 'case-3',
    testimonial: '“Luché con una úlcera venosa durante meses. El enfoque integral, combinando terapia de compresión y cambios en el estilo de vida, marcó una gran diferencia. ¡Mi pierna está sanada!”',
    patient: 'Jorge G.',
    image: 'https://placehold.co/800x600.png',
    typeId: 'venous',
  },
    {
    id: 'case-4',
    testimonial: '“La atención domiciliaria fue un salvavidas. No tener que desplazarme para recibir tratamiento de alta calidad hizo que todo el proceso fuera mucho menos estresante.”',
    patient: 'Ana P.',
    image: 'https://placehold.co/800x600.png',
    typeId: 'pressure',
  },
];
