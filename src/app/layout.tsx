import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  keywords: [
    "e-commerce",
    "product",
    "products",
    "phones",
    "laptop",
    "laptops",
    "shoes",
    "clothing",
    "watches",
    "electronics",
    "accessories",
    "sneakers",
    "tshirts",
    "sunglasses",
    "shoes",
    "jewelry",
    "kitchenware",
    "home decor",
    "home goods",
    "beauty",
  ],
  title: {
    default: "eTrade",
    template: "%s | eTrade",
  },
  description: "An e-commerce web app",
  openGraph: {
    title: "eTrade",
    description: "An e-commerce web app",
    url: process.env.NEXT_PUBLIC_URL!,
    siteName: "eTrade",
    images: [
      {
        url: process.env.NEXT_PUBLIC_URL!,
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
