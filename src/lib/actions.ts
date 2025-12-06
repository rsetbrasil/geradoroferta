'use server';

import { optimizeOfferDescription } from "@/ai/flows/optimize-offer-description";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(10, { message: 'Forneça uma descrição mais longa (pelo menos 10 caracteres).' }),
});

export async function getOptimizedDescription(formData: FormData) {
  const validatedFields = schema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.description?.[0] || 'Entrada inválida.',
      data: null,
    };
  }

  try {
    const result = await optimizeOfferDescription({ offerDescription: validatedFields.data.description });
    if (!result.optimizedDescription) {
      throw new Error("A IA não retornou uma descrição.");
    }
    return {
      error: null,
      data: result.optimizedDescription,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Falha ao otimizar a descrição. Por favor, tente novamente mais tarde.',
      data: null,
    };
  }
}
