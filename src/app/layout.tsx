import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductDrawer } from "@/components/marketing/ProductDrawer";
import "mapbox-gl/dist/mapbox-gl.css"; // Kluczowy import dla map
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MapStory - Twoje wspomnienia na mapie",
    template: "%s | MapStory",
  },
  description:
    "Intuicyjny, polski kreator personalizowanej sztuki ściennej w stylu Modern Vintage. Zaprojektuj unikalny plakat z mapą Twojego ulubionego miejsca.",
  keywords: [
    "plakat z mapą",
    "personalizowany plakat",
    "MapStory",
    "mapa na ścianę",
    "prezent",
    "vintage mapa",
  ],
  openGraph: {
    title: "MapStory - Twoje wspomnienia na mapie",
    description:
      "Zaprojektuj unikalny plakat w stylu Modern Vintage. Połącz precyzję kartografii z emocjami wspomnień.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased selection:bg-vintage-primary selection:text-white`}
      >
        <div className="min-h-screen flex flex-col bg-vintage-bg">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
          <ProductDrawer />
        </div>
      </body>
    </html>
  );
}
