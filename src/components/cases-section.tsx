"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cases, ulcerTypes } from '@/lib/data';
import { Quote } from 'lucide-react';

export function CasesSection() {
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredCases = activeTab === 'all'
    ? cases
    : cases.filter(c => c.typeId === activeTab);

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
                {filteredCases.map(c => (
                  <CarouselItem key={c.id}>
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="grid md:grid-cols-2 gap-8 p-0">
                          <Image
                            src={c.image}
                            alt={`Caso de éxito de ${c.patient}`}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            data-ai-hint="patient recovery"
                          />
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
                ))}
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
