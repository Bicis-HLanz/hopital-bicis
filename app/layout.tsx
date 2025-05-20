import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Hospital de Bicis",
  description: "Aplicación web para alquilar bicicletas y gestionar reservas en el Hospital de Bicicletas.",
  keywords: ["bicicletas", "alquiler", "reservas", "hospital de bicis","Granada", "bicicletas en Granada", "IES Hermenegildo Lanz"],
  openGraph: {
    title: "Hospital de Bicis",
    description: "Alquila bicicletas y gestiona tus reservas fácilmente.",
    //url: "https://hospitaldebicis.com",
    siteName: "Hospital de Bicis",
    locale: "es_ES",
    type: "website",
    /*images: [
      {
        url: "/og-image.png", // Cambia por la ruta real de tu imagen
        width: 1200,
        height: 630,
        alt: "Hospital de Bicis",
      },
    ],*/
  }
};

export const viewport: Viewport = {
  themeColor: '#FFB669',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}