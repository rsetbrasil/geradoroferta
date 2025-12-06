"use client";

import { useState, useEffect } from "react";
import type { Offer, Template } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: string;
  onSelectTemplate: (id: string) => void;
}

export function TemplateSelector({
  templates,
  selectedTemplateId,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const [mockOffer, setMockOffer] = useState<Offer>({
    description: "Nome do Produto",
    price: "8,00",
    discount: "50% OFF",
    validity: { from: undefined, to: undefined },
  });

  // Set initial date on client to avoid hydration errors
  useEffect(() => {
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + 7);
    setMockOffer(prev => ({ ...prev, validity: { from: fromDate, to: toDate } }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Escolha um Modelo</CardTitle>
        <CardDescription>
          Selecione um layout para sua oferta impressa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={cn(
                "cursor-pointer rounded-lg border-2 p-2 transition-all hover:border-primary",
                selectedTemplateId === template.id
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border"
              )}
            >
              <div
                className="pointer-events-none bg-white aspect-[210/297] w-full overflow-hidden"
              >
                <div style={{ transform: "scale(0.25)", transformOrigin: "top left", width: '400%', height: '400%' }}>
                  <template.component offer={mockOffer} />
                </div>
              </div>
              <p className="text-sm font-medium text-center mt-2">{template.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
