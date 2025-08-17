"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { articles, ulcerTypes } from '@/lib/data';

export function ArticlesSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredArticles = activeTab === 'all'
    ? articles
    : articles.filter(article => article.typeId === activeTab);

  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Artículos y Consejos</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Información valiosa para el cuidado y la prevención, elaborada por nuestros expertos.
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map(article => (
                <Card key={article.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="p-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                      data-ai-hint="medical care abstract"
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <CardTitle className="text-xl font-bold mb-2">{article.title}</CardTitle>
                    <p className="text-muted-foreground flex-1">{article.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredArticles.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No hay artículos en esta categoría por el momento.</p>
                </div>
            )}
        </div>
      </Tabs>
    </div>
  );
}
