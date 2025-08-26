"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cases, ulcerTypes } from '@/lib/data';
import { Quote, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CasesSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [revealedCases, setRevealedCases] = useState<string[]>([]);
  
  const filteredCases = activeTab === 'all'
    ? cases
    : cases.filter(c => c.typeId === activeTab);

  const toggleReveal = (caseId: string) => {
    setRevealedCases(prev => 
      prev.includes(caseId) ? prev.filter(id => id !== caseId) : [...prev, caseId]
    );
  };
    
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Casos de Éxito</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Historias reales de pacientes que han confiado en nuestro cuidado y han recuperado su calidad de vida.
        </p>
      </div>
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto max-w-2xl h-auto">
          <TabsTrigger value="all">Todos</TabsTrigger>
          {ulcerTypes.map(type => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-8">
          {filteredCases.length > 0 ? (
            <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {filteredCases.map(c => {
                  const isRevealed = revealedCases.includes(c.id);
                  return (
                    <CarouselItem key={c.id}>
                      <div className="p-1">
                        <Card className="overflow-hidden">
                          <CardContent className="grid md:grid-cols-2 gap-8 p-0">
                            <div className="relative w-full h-full min-h-[300px]">
                              <Image
                                src={c.image}
                                alt={`Caso de éxito de ${c.patient}`}
                                layout="fill"
                                className={`object-cover transition-all duration-300 ${isRevealed ? 'blur-none' : 'blur-lg'}`}
                                data-ai-hint="patient recovery"
                              />
                                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300" style={{ opacity: isRevealed ? 0 : 1 }}>
                                    <p className="text-white font-semibold mb-4">La siguiente imagen puede ser sensible.</p>
                                    <Button onClick={() => toggleReveal(c.id)} variant="secondary">
                                        <Eye className="mr-2" />
                                        Mostrar Imagen
                                    </Button>
                                </div>
                                {isRevealed && (
                                    <Button onClick={() => toggleReveal(c.id)} variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white hover:text-white">
                                        <EyeOff />
                                    </Button>
                                )}
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                              <Quote className="w-10 h-10 text-primary mb-4" />
                              <blockquote className="text-lg italic text-foreground/80">
                                {c.testimonial}
                              </blockquote>
                              <p className="mt-4 font-bold text-right text-accent">— {c.patient}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>No hay casos de éxito en esta categoría por el momento.</p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
