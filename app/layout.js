import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Open Analytics | free & privacy-friendly web analytics. ",
  description: "free & privacy-friendly web analytics software.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        data-domain="dayrh.com"
        src="http://localhost:3000/tracking-script.js"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
