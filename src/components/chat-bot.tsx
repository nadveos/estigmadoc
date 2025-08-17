"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, User, Bot, Loader2 } from "lucide-react";
import { askChatbot } from "@/ai/flows/chatbot-flow";
import { chatbotAppointmentRequest } from "@/ai/flows/chatbot-appointment-flow";
import { cn } from "@/lib/utils";
import { Stethoscope } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaViewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaViewport.current) {
      scrollAreaViewport.current.scrollTo({
        top: scrollAreaViewport.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages([
        { id: 'intro', text: '¡Hola! Soy el asistente virtual de UlcerAid. ¿Cómo puedo ayudarte hoy? Puedes preguntarme sobre el cuidado de heridas o solicitar agendar una cita.', sender: 'bot' }
    ]);
  }, []);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: `user-${Date.now()}`, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const lowerCaseInput = input.toLowerCase();
      const appointmentKeywords = ['turno', 'cita', 'agendar', 'schedule', 'appointment', 'consulta'];
      const isAppointmentRequest = appointmentKeywords.some(keyword => lowerCaseInput.includes(keyword));

      let botResponseText: string;

      if (isAppointmentRequest) {
        const response = await chatbotAppointmentRequest({ query: input });
        botResponseText = response.response;
      } else {
        const response = await askChatbot({ question: input });
        botResponseText = response.answer;
      }
      
      const botMessage: Message = { id: `bot-${Date.now()}`, text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error communicating with AI:", error);
      const errorMessage: Message = { id: `err-${Date.now()}`, text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90"
          size="icon"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Stethoscope className="text-accent" />
            Asistente Virtual UlcerAid
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1" viewportRef={scrollAreaViewport}>
            <div className="p-4 space-y-6">
            {messages.map(message => (
                <div key={message.id} className={cn("flex items-start gap-3", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                {message.sender === 'bot' && (
                    <Avatar className="w-8 h-8 border-2 border-accent">
                        <AvatarFallback className="bg-accent text-accent-foreground">
                            <Bot className="w-5 h-5" />
                        </AvatarFallback>
                    </Avatar>
                )}
                <div className={cn("max-w-[75%] rounded-2xl px-4 py-2", message.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none')}>
                    <p className="text-sm">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            <User className="w-5 h-5" />
                        </AvatarFallback>
                    </Avatar>
                )}
                </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                     <Avatar className="w-8 h-8 border-2 border-accent">
                        <AvatarFallback className="bg-accent text-accent-foreground">
                            <Bot className="w-5 h-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[75%] rounded-2xl px-4 py-2 bg-secondary text-secondary-foreground rounded-bl-none">
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <p className="text-sm italic">Escribiendo...</p>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
