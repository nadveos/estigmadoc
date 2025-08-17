// The AI flow for chatbot appointment requests.
//
// - chatbotAppointmentRequest - A function that handles the chatbot appointment request process.
// - ChatbotAppointmentRequestInput - The input type for the chatbotAppointmentRequest function.
// - ChatbotAppointmentRequestOutput - The return type for the chatbotAppointmentRequest function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAppointmentRequestInputSchema = z.object({
  query: z.string().describe('The user query requesting an appointment.'),
});

export type ChatbotAppointmentRequestInput = z.infer<typeof ChatbotAppointmentRequestInputSchema>;

const ChatbotAppointmentRequestOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});

export type ChatbotAppointmentRequestOutput = z.infer<typeof ChatbotAppointmentRequestOutputSchema>;

const scheduleAppointmentTool = ai.defineTool({
  name: 'scheduleAppointment',
  description: 'Schedules an appointment for the user.',
  inputSchema: z.object({
    dateTime: z.string().describe('The date and time for the appointment.'),
    patientDetails: z.string().describe('The patient details to pass to scheduling system.'),
  }),
  outputSchema: z.string().describe('Confirmation message of scheduled appointment.'),
  async impl(input) {
    // In a real application, this would integrate with a scheduling system.
    return `Appointment scheduled for ${input.dateTime} with patient details: ${input.patientDetails}`;
  },
});

const prompt = ai.definePrompt({
  name: 'chatbotAppointmentPrompt',
  tools: [scheduleAppointmentTool],
  input: {
    schema: ChatbotAppointmentRequestInputSchema,
  },
  output: {
    schema: ChatbotAppointmentRequestOutputSchema,
  },
  prompt: `You are a chatbot that helps users schedule appointments. Use the scheduleAppointment tool if the user asks to schedule an appointment. If the user is asking a question, answer the question.

User Query: {{{query}}}`,
});


const chatbotAppointmentRequestFlow = ai.defineFlow(
  {
    name: 'chatbotAppointmentRequestFlow',
    inputSchema: ChatbotAppointmentRequestInputSchema,
    outputSchema: ChatbotAppointmentRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function chatbotAppointmentRequest(input: ChatbotAppointmentRequestInput): Promise<ChatbotAppointmentRequestOutput> {
  return chatbotAppointmentRequestFlow(input);
}
