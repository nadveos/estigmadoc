"use server";

import { z } from "zod";
import { getAuthenticatedPocketBase } from "@/lib/pocketbase";

const appointmentSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().optional(),
  isHandled: z.boolean().optional(), // For spam prevention
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export async function submitAppointment(data: AppointmentInput) {
  try {
    const validatedData = appointmentSchema.parse(data);
    const pb = await getAuthenticatedPocketBase();
    const record = await pb.collection("appointments").create(validatedData);
    return { success: true, data: record };
  } catch (error: any) {
    console.error("Error submitting appointment:", error);
    
    // Check if the error is a PocketBase error and has response data
    if (error.isAbort && error.originalError && error.originalError.response) {
        const response = error.originalError.response;
        const message = response.message || "An error occurred with PocketBase.";
        return { success: false, error: { message, issues: response.data } };
    }
    
    if (error instanceof z.ZodError) {
      return { success: false, error: { message: "Validation failed", issues: error.errors } };
    }
    
    return { success: false, error: { message: error.message || "An unexpected error occurred." } };
  }
}
