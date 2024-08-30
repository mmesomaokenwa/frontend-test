import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import { baseUrl } from "@/lib/constants";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    url: baseUrl,
    siteName: "eTrade",
    images: [
      {
        url: "https://mfgadjucjxcfjhuaebjq.supabase.co/storage/v1/object/public/products/public/15-inch-macbook-air-2tb-midnight.png?t=2024-08-30T16%3A09%3A50.064Z", // add an image url
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
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
