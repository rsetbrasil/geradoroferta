"use client";

import { useEffect, useTransition } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getOptimizedDescription } from "@/lib/actions";
import type { Offer } from "@/lib/types";
import { Loader2, Sparkles } from "lucide-react";
import { DateRangePicker } from "./date-range-picker";
import type { DateRange } from "react-day-picker";

const offerSchema = z.object({
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  price: z.string().min(1, "O preço é obrigatório."),
  discount: z.string().optional(),
  validity: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
});

interface OfferFormProps {
  offer: Offer;
  onOfferChange: (offer: Offer) => void;
}

export function OfferForm({ offer, onOfferChange }: OfferFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<Offer>({
    resolver: zodResolver(offerSchema),
    values: offer,
  });

  const { watch, getValues, setValue } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      onOfferChange(value as Offer);
    });
    return () => subscription.unsubscribe();
  }, [watch, onOfferChange]);

  const handleOptimize = () => {
    const currentDescription = getValues("description");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("description", currentDescription);
      const result = await getOptimizedDescription(formData);

      if (result.data) {
        setValue("description", result.data, {
          shouldValidate: true,
          shouldDirty: true,
        });
        toast({
          title: "Descrição Otimizada",
          description: "A IA sugeriu uma descrição melhorada.",
        });
      }
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Falha na Otimização",
          description: result.error,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Crie Sua Oferta</CardTitle>
        <CardDescription>
          Preencha os detalhes abaixo. A pré-visualização será atualizada
          enquanto você digita.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Produto</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Ex: Pão de Fermentação Natural Fresquinho"
                          {...field}
                          rows={4}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleOptimize}
                          disabled={isPending}
                          className="absolute bottom-2 right-2 gap-2"
                        >
                          {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="h-4 w-4 text-accent" />
                          )}
                          Otimizar
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 8,00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalhe (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: *LIMÃO & FRUTAS VERMELHAS*" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="validity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Período de Validade</FormLabel>
                        <DateRangePicker 
                            date={field.value as DateRange}
                            onDateChange={(range) => field.onChange(range)}
                        />
                    </FormItem>
                )}
              />
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
