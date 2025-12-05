'use server';

/**
 * @fileOverview AI-powered offer description optimizer.
 *
 * - optimizeOfferDescription - A function that suggests improvements to an offer's description.
 * - OptimizeOfferDescriptionInput - The input type for the optimizeOfferDescription function.
 * - OptimizeOfferDescriptionOutput - The return type for the optimizeOfferDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeOfferDescriptionInputSchema = z.object({
  offerDescription: z
    .string()
    .describe('The current description of the offer.'),
});
export type OptimizeOfferDescriptionInput = z.infer<
  typeof OptimizeOfferDescriptionInputSchema
>;

const OptimizeOfferDescriptionOutputSchema = z.object({
  optimizedDescription: z
    .string()
    .describe(
      'The improved description of the offer, designed to increase customer engagement and sales.'
    ),
});
export type OptimizeOfferDescriptionOutput = z.infer<
  typeof OptimizeOfferDescriptionOutputSchema
>;

export async function optimizeOfferDescription(
  input: OptimizeOfferDescriptionInput
): Promise<OptimizeOfferDescriptionOutput> {
  return optimizeOfferDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeOfferDescriptionPrompt',
  input: {schema: OptimizeOfferDescriptionInputSchema},
  output: {schema: OptimizeOfferDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter.

  Your goal is to improve the provided offer description to increase customer engagement and sales.  Make the description more compelling, while keeping the length similar to the original.

  Original Description: {{{offerDescription}}}

  Improved Description: `,
});

const optimizeOfferDescriptionFlow = ai.defineFlow(
  {
    name: 'optimizeOfferDescriptionFlow',
    inputSchema: OptimizeOfferDescriptionInputSchema,
    outputSchema: OptimizeOfferDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
