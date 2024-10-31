import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
      <BackgroundBeamsWithCollision className="absolute inset-0 z-0 min-h-screen bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-700" >
          {children}
      </BackgroundBeamsWithCollision>
  );
}