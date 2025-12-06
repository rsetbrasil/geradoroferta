
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
    description: "Product Name",
    price: "100",
    discount: "50%",
    validity: { from: undefined, to: undefined },
  });

  useEffect(() => {
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + 7);
    setMockOffer(prev => ({ ...prev, validity: { from: fromDate, to: toDate } }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Choose a Template</CardTitle>
        <CardDescription>
          Select a layout for your printed offer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="pointer-events-none bg-white aspect-[3/4] overflow-hidden"
                style={{ transform: "scale(0.25)", transformOrigin: "top left", height: '180px', width: '135px' }}
              >
                <template.component offer={mockOffer} />
              </div>
              <p className="text-sm font-medium text-center mt-2">{template.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
