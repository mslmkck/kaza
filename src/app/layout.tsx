import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | Trafik Kazası ve Ceza İtiraz Danışmanlığı`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "trafik kazası",
    "trafik cezası",
    "ceza itiraz",
    "kaza tespit tutanağı",
    "kusur oranı",
    "trafik danışmanlığı",
    "trafik avukat",
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} | Trafik Kazası ve Ceza İtiraz Danışmanlığı`,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F2747" },
    { media: "(prefers-color-scheme: dark)", color: "#0F2747" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
