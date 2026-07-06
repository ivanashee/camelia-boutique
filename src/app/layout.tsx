import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Camélia Boutique — Moda con alma Art Nouveau",
  description:
    "Boutique online de moda femenina. Sacos, suéteres, remeras, bufandas y accesorios seleccionados a mano.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
