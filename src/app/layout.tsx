import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "NBC News Portal",
  description: "A news portal for NBC News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
