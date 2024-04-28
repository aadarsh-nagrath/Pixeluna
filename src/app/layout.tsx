import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";


const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pixeluna",
  description: "A no-code Website builder with Agency Buildup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang='en'>
        <body className={font.className}>{children}</body>
      </html>
  );
}
