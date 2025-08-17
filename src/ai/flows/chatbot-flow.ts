'use server';
/**
 * @fileOverview An AI-powered chatbot for answering general questions about ulcer care.
 *
 * - askChatbot - A function that handles user questions and returns chatbot responses.
 * - ChatbotInput - The input type for the askChatbot function.
 * - ChatbotOutput - The return type for the askChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  question: z.string().describe('The user question about ulcer care.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot answer to the user question.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const knowledgeBaseTool = ai.defineTool({
  name: 'knowledgeBaseTool',
  description: 'Retrieves information from the ulcer care knowledge base to answer user questions.',
  inputSchema: z.object({
    query: z.string().describe('The user query to search the knowledge base for.'),
  }),
  outputSchema: z.string().describe('Relevant information from the knowledge base.'),
}, async (input) => {
  // Placeholder implementation: Replace with actual knowledge base retrieval logic
  // This is just a mock implementation that returns a canned response.
  return `Information from knowledge base: Ulcer care involves keeping the area clean and bandaged.  Consult your doctor for personalized medical advice.`
});

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  tools: [knowledgeBaseTool],
  system: `You are a helpful chatbot assistant specialized in providing information and advice about ulcer care.
  Use the knowledgeBaseTool to retrieve relevant information if the user's question requires specific knowledge about ulcer treatment or care.
  If the question is general and doesn't require specific knowledge, answer it directly.
  Keep your answers concise and easy to understand.
`,
  prompt: `User question: {{{question}}}`,  
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await chatbotPrompt(input);
    return output!;
  }
);
