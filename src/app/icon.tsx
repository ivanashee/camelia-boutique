import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon dinámico: 'C.' en Cormorant Garamond bold.
 * - Fondo champagne #FBEAD6
 * - C ink #3a2f2a
 * - Punto rose #C87D87 (igual que el logo)
 * - Bordes redondeados para look de badge/keycap
 */
async function getCormorantBold(): Promise<ArrayBuffer> {
  // Trae el CSS de Google Fonts (limitando charset a "C.")
  const cssRes = await fetch(
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&text=C.",
    {
      headers: {
        // User-Agent moderno para que Google devuelva woff2
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0",
      },
    }
  );
  const css = await cssRes.text();
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?woff2/);
  if (!match) throw new Error("No pude extraer la URL del woff2 de Google Fonts");
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

export default async function Icon() {
  const fontData = await getCormorantBold();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBEAD6",
          borderRadius: 12,
          fontFamily: "CormorantG",
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1,
          paddingBottom: 4,
        }}
      >
        <span style={{ color: "#3a2f2a" }}>C</span>
        <span style={{ color: "#C87D87" }}>.</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "CormorantG", data: fontData, style: "normal", weight: 700 },
      ],
    }
  );
}
