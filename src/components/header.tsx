import { Logo } from "@/components/icons";

export function Header() {
  return (
    <header className="no-print bg-card border-b sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <h1 className="text-xl font-headline font-bold text-gray-800">OfferPrint</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
