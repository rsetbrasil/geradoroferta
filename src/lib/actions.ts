'use server';

import { optimizeOfferDescription } from "@/ai/flows/optimize-offer-description";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(10, { message: 'Please provide a longer description (at least 10 characters).' }),
});

export async function getOptimizedDescription(formData: FormData) {
  const validatedFields = schema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.description?.[0] || 'Invalid input.',
      data: null,
    };
  }

  try {
    const result = await optimizeOfferDescription({ offerDescription: validatedFields.data.description });
    if (!result.optimizedDescription) {
      throw new Error("AI did not return a description.");
    }
    return {
      error: null,
      data: result.optimizedDescription,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to optimize description. Please try again later.',
      data: null,
    };
  }
}
