import Head from 'next/head';
import Navbar from '@/components/Navbar';
import BackToTopButton from '@/components/BackToTopButton';
import SensitiveImage from '@/components/SensitiveImage';
import { useState, FormEvent } from 'react';
import Slider from "react-slick";

// --- Datos de Ejemplo ---
const exampleTips = [
  {
    id: 1,
    title: 'Mantenga la herida limpia y seca',
    tip: 'Limpie suavemente la herida con solución salina una vez al día. Seque el área circundante con cuidado para prevenir la maceración de la piel.',
    image: 'https://placehold.co/400x300/E6F0F6/005A9C?text=Higiene',
  },
  {
    id: 2,
    title: 'Vigile signos de infección',
    tip: 'Esté atento a enrojecimiento excesivo, hinchazón, pus o mal olor. Si nota alguno de estos signos, consulte a su especialista de inmediato.',
    image: 'https://placehold.co/400x300/E6F0F6/005A9C?text=Vigilancia',
  },
  {
    id: 3,
    title: 'Nutrición adecuada para la cicatrización',
    tip: 'Una dieta rica en proteínas, vitaminas A y C, y zinc es fundamental. Beba abundante agua para mantener la piel hidratada desde adentro.',
    image: 'https://placehold.co/400x300/E6F0F6/005A9C?text=Nutrición',
  },
];

const exampleCases = [
  {
    id: 1,
    title: 'Úlcera venosa en extremidad inferior',
    description: 'Paciente de 72 años con úlcera venosa crónica. Tras 8 semanas de terapia compresiva y cuidados especializados, se logró el cierre completo de la herida.',
    before_image: 'https://placehold.co/400x400/f2f2f2/000000?text=Antes',
    after_image: 'https://placehold.co/400x400/E6F0F6/005A9C?text=Después',
  },
  {
    id: 2,
    title: 'Úlcera por presión en sacro',
    description: 'Paciente encamado de 85 años desarrolló una úlcera por presión de grado III. Con un plan de reposicionamiento y apósitos avanzados, la herida mostró una mejora notable en 6 semanas.',
    before_image: 'https://placehold.co/400x400/f2f2f2/000000?text=Antes',
    after_image: 'https://placehold.co/400x400/E6F0F6/005A9C?text=Después',
  },
  {
    id: 3,
    title: 'Pie diabético',
    description: 'Hombre de 65 años con diabetes tipo 2 presentó una úlcera en el pie. El tratamiento incluyó control glucémico estricto y terapia de descarga, previniendo la amputación.',
    before_image: 'https://placehold.co/400x400/f2f2f2/000000?text=Antes',
    after_image: 'https://placehold.co/400x400/E6F0F6/005A9C?text=Después',
  },
];

export default function HomePage() {
  const [patientName, setPatientName] = useState('');
  const [woundType, setWoundType] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'Enviando...', type: 'info' });
    // ... (código de envío del formulario)
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <Head>
        <title>EstigmaDoc - Cuidado de Heridas Ulcerosas</title>
        <meta name="description" content="Especialistas en el cuidado y tratamiento de heridas ulcerosas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />

      {/* SECCIÓN HOME */}
      <section id="home" className="py-5" style={{ backgroundColor: 'var(--primary-color-light)' }}>
        {/* ... (código de la sección home sin cambios) */}
      </section>

      {/* SECCIÓN CONSEJOS */}
      <section id="tips" className="py-5">
        {/* ... (código de la sección de consejos sin cambios) */}
      </section>

      {/* SECCIÓN CASOS DE ÉXITO */}
      <section id="cases" className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5">Casos de Éxito</h2>
          <Slider {...sliderSettings}>
            {exampleCases.map((caseItem) => (
              <div key={caseItem.id} className="px-md-5">
                <div className="card">
                  <div className="card-header text-center">
                    <h5 className="card-title mb-0">{caseItem.title}</h5>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-4 text-center">
                        <h6>Antes</h6>
                        <SensitiveImage src={caseItem.before_image} alt={`Antes - ${caseItem.title}`} />
                      </div>
                      <div className="col-md-4 text-center">
                        <h6>Después</h6>
                        <SensitiveImage src={caseItem.after_image} alt={`Después - ${caseItem.title}`} />
                      </div>
                      <div className="col-md-4">
                        <p className="card-text">{caseItem.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* SECCIÓN CONTACTO */}
      <section id="contact" className="py-5">
        {/* ... (código de la sección de contacto sin cambios) */}
      </section>

      <footer className="container py-4">
        <p className="text-center text-muted">&copy; 2025 EstigmaDoc. Todos los derechos reservados.</p>
      </footer>

      <BackToTopButton />
    </>
  );
}
