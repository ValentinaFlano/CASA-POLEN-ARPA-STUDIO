import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import { Encabezado } from "@/components/layout/Encabezado";
import { PiePagina } from "@/components/layout/PiePagina";
import { WhatsappFlotante } from "@/components/layout/WhatsappFlotante";
import { MovimientoProvider } from "@/components/motion/MovimientoProvider";
import { getAjustes } from "@/lib/content";
import "./globals.css";

// Equivalente web libre de Myriad Pro, la tipografía de la marca.
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const ajustes = await getAjustes();
  return {
    metadataBase: new URL(ajustes.url),
    title: {
      default: `${ajustes.nombre} · ${ajustes.eslogan}`,
      template: `%s · ${ajustes.nombre}`,
    },
    description: ajustes.descripcion,
    openGraph: {
      type: "website",
      locale: "es_CL",
      siteName: ajustes.nombre,
      images: [{ url: "/demo/hero.jpg", alt: ajustes.eslogan }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f5f4ef",
};

export default async function RootLayout({ children, modal }: LayoutProps<"/">) {
  const ajustes = await getAjustes();

  return (
    <html lang="es-CL" className={`${sourceSans.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <MovimientoProvider>
          <Encabezado />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          {modal}
          <PiePagina ajustes={ajustes} />
          <WhatsappFlotante telefono={ajustes.contacto.whatsapp} />
        </MovimientoProvider>
      </body>
    </html>
  );
}
