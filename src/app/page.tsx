import { AppointmentSection } from '@/components/appointment-section';
import { ArticlesSection } from '@/components/articles-section';
import { CasesSection } from '@/components/cases-section';
import { ChatBot } from '@/components/chat-bot';
import { AppFooter } from '@/components/footer';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShieldCheck, Stethoscope, UserCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1">
        <section id="home" className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24 lg:py-32">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-headline">
              Cuidado experto para heridas ulcerosas
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              En Estigma Doc, combinamos experiencia y empatía para ofrecerle el mejor tratamiento y apoyo en su proceso de curación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#appointment">Agendar una Cita</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#articles">Ver Consejos</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://testauth.meapp.com.ar/api/files/pbc_3607937828/8qw05n602r1j11m/estigma_doc1_zph22fu6fb.png"
              alt="Enfermera atendiendo a un paciente"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
              data-ai-hint="nurse patient care"
            />
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-24">
          <div className="container grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-6 bg-background">
              <Stethoscope className="mx-auto h-12 w-12 text-accent" />
              <h3 className="mt-4 text-xl font-bold">Tratamiento Personalizado</h3>
              <p className="mt-2 text-muted-foreground">Planes de cuidado adaptados a sus necesidades específicas.</p>
            </Card>
            <Card className="p-6 bg-background">
              <ShieldCheck className="mx-auto h-12 w-12 text-accent" />
              <h3 className="mt-4 text-xl font-bold">Consejos de Expertos</h3>
              <p className="mt-2 text-muted-foreground">Acceso a artículos y guías para el cuidado en casa.</p>
            </Card>
            <Card className="p-6 bg-background">
              <UserCheck className="mx-auto h-12 w-12 text-accent" />
              <h3 className="mt-4 text-xl font-bold">Soporte Continuo</h3>
              <p className="mt-2 text-muted-foreground">Acompañamiento profesional durante todo el proceso.</p>
            </Card>
          </div>
        </section>

        <section id="articles" className="py-12 md:py-24">
          <ArticlesSection />
        </section>
        
        <section id="cases" className="py-12 md:py-24 bg-secondary">
          <CasesSection />
        </section>
        
        <section id="appointment" className="py-12 md:py-24">
          <AppointmentSection />
        </section>
      </main>
      
      <ChatBot />
      <AppFooter />
    </div>
  );
}
