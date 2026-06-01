import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parnami Pump & Project | Engineering Water Infrastructure Since 1984",
  description: "Industrial plumbing, piping systems, fire protection infrastructure, water management solutions, and large-scale engineering projects across India.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
