"use server";

import { z } from "zod";
import { getAuthenticatedPocketBase } from "@/lib/pocketbase";

const appointmentSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor ingrese un correo válido." }),
  phone: z.string().min(8, { message: "Por favor ingrese un número de teléfono válido." }),
  message: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export async function submitAppointment(data: AppointmentInput) {
  try {
    const validatedData = appointmentSchema.parse(data);
    const pb = await getAuthenticatedPocketBase();
    const record = await pb.collection("appointments").create(validatedData);
    return { success: true, data: record };
  } catch (error) {
    console.error("Error submitting appointment:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: { message: "Validation failed", issues: error.errors } };
    }
    return { success: false, error: { message: "An unexpected error occurred." } };
  }
}
