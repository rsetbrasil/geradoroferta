"use client";

import { useEffect, useTransition, useRef } from "react";
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
import { Loader2, Sparkles, Upload } from "lucide-react";
import { DateRangePicker } from "./date-range-picker";
import type { DateRange } from "react-day-picker";
import { Slider } from "./ui/slider";

const offerSchema = z.object({
  headlineText: z.string().optional(),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  subDescription: z.string().optional(),
  price: z.string().min(1, "O preço é obrigatório."),
  discount: z.string().optional(),
  unit: z.string().optional(),
  validity: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  logoUrl: z.string().optional(),
  productImageUrl: z.string().optional(),
  fontSize: z.number().optional(),
});

interface OfferFormProps {
  offer: Offer;
  onOfferChange: (offer: Offer) => void;
}

export function OfferForm({ offer, onOfferChange }: OfferFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "productImageUrl"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(field, reader.result as string, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
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
                name="headlineText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Oferta (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: SUPER OFERTA!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              
              <FormField
                control={form.control}
                name="subDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subdescrição (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Leve 3, Pague 2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <Input
                          placeholder="Ex: *LIMÃO & FRUTAS VERMELHAS*"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: UND" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho da Fonte ({field.value}%)</FormLabel>
                    <FormControl>
                        <Slider
                            defaultValue={[field.value || 100]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={200}
                            step={1}
                        />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Logo da Empresa</FormLabel>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Carregar Logo
                    </Button>
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={(e) => handleImageUpload(e, "logoUrl")}
                      accept="image/png, image/jpeg, image/svg+xml"
                      className="hidden"
                    />
                    {watch("logoUrl") && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setValue("logoUrl", undefined, { shouldDirty: true })
                        }
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>Imagem do Produto</FormLabel>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => productInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Carregar Imagem
                    </Button>
                    <input
                      type="file"
                      ref={productInputRef}
                      onChange={(e) => handleImageUpload(e, "productImageUrl")}
                      accept="image/png, image/jpeg, image/svg+xml"
                      className="hidden"
                    />
                    {watch("productImageUrl") && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setValue("productImageUrl", undefined, {
                            shouldDirty: true,
                          })
                        }
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
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
