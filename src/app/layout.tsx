import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeycapButton from "@/components/KeycapButton";

export const metadata: Metadata = {
  title: "Camélia — Boutique de moda femenina",
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
        <KeycapButton />
      </body>
    </html>
  );
}
